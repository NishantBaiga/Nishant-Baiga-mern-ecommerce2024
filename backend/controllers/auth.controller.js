import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv, { parse } from "dotenv";
dotenv.config();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
// const JWT_SECRET =  process.env.JWT_SECRET;

//register
const Register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const duplicate = await User.findOne({ email }).exec();
    if (duplicate) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPwd = await bcrypt.hash(password, SALT_ROUNDS);

    const userObject = new User({ name, email, password: hashedPwd });
    const user = await userObject.save(userObject);

    res.status(201).json({
      message: `New user ${name} created successfully`,
      success: true,
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
    if (!email ) {
      return res.status(400).json({ message: "email is required" });
    }
    
    if (!password) {
      return res.status(400).json({ message: "password is required" });
    }

    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(404).json({
        message: "User does not exist with this email! Please register",
        success: false,
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ message: "Invalid password try again", success: false });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        userName: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "60m" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        // expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        // sameSite: "none",
      })
      .status(201)
      .json({
        message: `New User logged in successfully`,
        success: true,
        user: {
          email: user.email,
          role: user.role,
          id: user._id,
          userName: user.name,
        },
      });
  } catch (error) {
    console.log("error in login controller:", error.message);
    res.status(500).json({ message: error.message, success: false });
  }
};

//logout
const Logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful", success: true });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // const user = await User.findById(decoded.id);
    // if (!user) {
    //   return res
    //     .status(401)
    //     .json({ message: "invalid token", success: false });
    // }

    req.user = decoded;
    next();
  } catch (error) {
    console.log("error in auth middleware:", error.message);
    res.status(401).json({ message: error.message, success: false });
  }
};

export { Register, Login, Logout, authMiddleware };
