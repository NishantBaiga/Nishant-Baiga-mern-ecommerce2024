import CommonForm from "@/components/common/form";
import { loginFormControls} from "@/config";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/store/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(login(formData))
      .then((data) => {
        if (data?.payload?.success) {
          toast({
            variant: "default",
            title: data?.payload?.message,
          });
        } else {
          toast({
            variant: "destructive",
            title: data?.payload?.message,
          });
        } 

      });
  }

  console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Login To Your Account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Login"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;