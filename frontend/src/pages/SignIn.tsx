import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { Quote } from "../components/Quote";

const SignIn = () => {
  const navigate = useNavigate();
  const onSubmit = () => {
    localStorage.setItem("token", "dummy-token");
    navigate("/landingpage");
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-200 to-gray-400 flex flex-col items-center justify-center px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center">
          <AuthForm onSubmit={onSubmit} title="Sign In" />
        </div>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
