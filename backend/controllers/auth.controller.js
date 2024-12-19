import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import redisClient from "../config/redis.js";
dotenv.config();

// generate tokens
const generateTokens = (id) => {
  try {
    const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("error in generateTokens function", error.message);
    throw error;
  }
};

const storeRefreshToken = async (id, refreshToken) => {
  try {
    await redisClient.set(`${id}`, refreshToken, "EX", 7 * 24 * 60 * 60);
  } catch (error) {
    console.log("error in storeRefreshToken function", error.message);
    throw error;
  }
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //strict mode when in production
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //strict mode when in production
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return passwordRegex.test(password);
};



//register
const Register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: "name is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "password is required" });
    }

    if (!validatePassword(password)) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.", success: false });
    }

    //  check if user exists
    const duplicate = await User.findOne({ email }).exec();
    if (duplicate) {
      return res.status(409).json({ message: "Email already exists", success: false });
    }
    
    //  create new user
    const userObject = new User({ name, email, password });
    const user = await userObject.save(userObject);
    // generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      message: `New user ${name} created successfully`,
      success: true,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("error in register controller", error.message);
    res.status(500).json({ message: error.message, success: false });
  }
};
//login
const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "password is required" });
    }
    // check if user exists
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(404).json({
        message: "User does not exist with this email! Please register",
        success: false,
      });
    }

    // check if password is correct
    const match = await user.comparePassword(password);
    if (!match) {
      return res
        .status(401)
        .json({ message: "Invalid password try again", success: false });
    }

    // generateTokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // store refreshToken in redis
    await storeRefreshToken(user._id, refreshToken);

    // set cookies
    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      message: `New User logged in successfully`,
      success: true,
      user: {
        id: user._id,
        userName: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("error in login controller:", error.message);
    res.status(500).json({ message: error.message, success: false });
  }
};
//logout
const Logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET);
      await redisClient.del(req.user);
    } else {
      return res.status(401).json({
        message: "Unauthorized - no access token provided",
        success: false,
      });
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logout successful", success: true });
  } catch (error) {
    console.log("error in logout controller:", error.message);
    res.status(500).json({ message: error.message, success: false });
  }
};




export { Register, Login, Logout}; 
