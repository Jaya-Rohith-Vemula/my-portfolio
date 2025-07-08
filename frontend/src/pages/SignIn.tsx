import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthForm, { type AuthFormValues } from "../components/AuthForm";
import { Quote } from "../components/Quote";
import type { SignInRequest, ErrorResponse } from "../types/auth";
import { postSignIn } from "../services/Service";
import { useState } from "react";

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: AuthFormValues) => {
    setLoading(true);
    try {
      const payload: SignInRequest = {
        email: data.email,
        password: data.password,
      };

      const response = await postSignIn(payload);

      localStorage.setItem("token", response.jwt);
      navigate("/landingpage");
    } catch (error) {
      if (axios.isAxiosError<ErrorResponse>(error)) {
        alert(error.response?.data?.message ?? "Sign in failed");
      } else {
        alert("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-200 to-gray-400 flex flex-col items-center justify-center px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center">
          <AuthForm onSubmit={onSubmit} title="Sign In" loading={loading} />{" "}
        </div>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
