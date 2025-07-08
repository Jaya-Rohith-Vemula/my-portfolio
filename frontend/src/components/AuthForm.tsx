import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

interface AuthFormProps {
  includeUsername?: boolean;
  onSubmit: (data: AuthFormValues) => void;
  title?: string;
  loading: boolean;
}

export interface AuthFormValues {
  username?: string;
  email: string;
  password: string;
}

export default function AuthForm({
  includeUsername = false,
  onSubmit,
  title = "Sign Up",
  loading,
}: AuthFormProps) {
  const schema = yup.object({
    ...(includeUsername
      ? { username: yup.string().required("Username is required") }
      : {}),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: yupResolver(schema as yup.ObjectSchema<AuthFormValues>),
  });

  const handleFormSubmit = (data: AuthFormValues) => {
    onSubmit(data);
  };

  return (
    <div className="max-w-md bg-gray-200 rounded-2xl p-8 m-4">
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        {includeUsername && (
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        )}
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              borderRadius: "16px",
              px: 4,
              py: 1.5,
              backgroundColor: grey[800],
              "&:hover": { backgroundColor: grey[900] },
            }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              title
            )}
          </Button>
        </Box>
      </form>
      <p className="text-center mt-4 text-gray-600">
        {title === "Sign Up"
          ? "Already have an account?"
          : `Don't have an account yet?`}{" "}
        <Link to={title === "Sign Up" ? "/signin" : "/signup"} className="link">
          {title === "Sign Up" ? "Sign In" : "Sign Up"}
        </Link>
      </p>
    </div>
  );
}
