/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeClosed } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { Loader } from "@mantine/core";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { Logine, signInWithGoogle } from "../redux/Slice/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isEyeClick, setEyeClick] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authenticated, preferences, loading } = useSelector(
    (state) => state.auth
  );
  // console.log(authenticated);

  useEffect(() => {
    if (authenticated && preferences.length > 0) {
      navigate("/");
    } else if (authenticated && preferences.length <= 0) {
      navigate("/Preferences");
    }
  }, [authenticated]);

  const LoginSchema = z.object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled" })
      .email("This is not a valid email"),

    password: z.string().min(1, { message: "Password is Required" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  console.log(register("email"));
  console.log(errors);

  const handleEyeClick = () => {
    setEyeClick(!isEyeClick);
  };

  const onSubmit = (data) => {
    dispatch(Logine(data));
  };
  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-96 rounded-2xl p-4 shadow-md bg-white"
      >
        <h1 className="text-center text-2xl font-bold mb-4">Welcome Back</h1>
        <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2 items-center border-b border-gray-200">
            <Mail className="text-gray-500" size={20} />
            <input
              type="email"
              placeholder="Enter Email..."
              className="focus outline-none w-full "
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
          <div className="flex gap-2 relative border-b border-gray-200">
            <Lock className="text-gray-400" size={20} />
            <div onClick={handleEyeClick} className="absolute right-2">
              {isEyeClick ? <Eye /> : <EyeClosed />}
            </div>

            <input
              type={isEyeClick ? "text" : "password"}
              className="focus outline-none  w-full "
              placeholder="Enter Password..."
              {...register("password")}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Keep me logged in
            </label>
            <a href="/ResetPassword" className="text-sky-500 hover:underline">
              Forgot Password?
            </a>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
          <Button type="submit" fullWidth>
            {loading ? <Loader size={16} color="white" /> : "Login"}
          </Button>
          <Button
            fullWidth
            variant="outline"
            onClick={() => dispatch(signInWithGoogle())}
          >
            Login with Google
          </Button>
          <p className="text-center text-gray-800">
            Don&apos;t have an account?{" "}
            <Link to="/Register" className="text-sky-500 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
