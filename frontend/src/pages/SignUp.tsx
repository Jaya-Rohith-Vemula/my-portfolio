import { useNavigate } from "react-router-dom";
import AuthForm, { type AuthFormValues } from "../components/AuthForm";
import { Quote } from "../components/Quote";
import axios from "axios";
import { postSignUp } from "../services/Service";
import type { SignUpRequest, ErrorResponse } from "../types/auth";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: AuthFormValues) => {
    setLoading(true);
    try {
      const payload: SignUpRequest = {
        email: data.email,
        password: data.password,
        username: data.username ?? "",
      };

      const response = await postSignUp(payload);

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
          <AuthForm onSubmit={onSubmit} includeUsername loading={loading} />
        </div>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
