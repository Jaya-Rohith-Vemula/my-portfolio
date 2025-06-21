import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-50 to-gray-400 flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Build Your Stunning{" "}
          <span className="gradient-text hover:scale-105 transition-transform inline-block hover:rotate-[-3deg]">
            Portfolio
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Create a unique digital presence to showcase your skills, projects,
          and achievements with ease.
        </p>
        <p className="text-md md:text-lg text-gray-600 mb-10">
          Our platform offers elegant templates, powerful customization tools,
          and seamless hosting — everything you need to present your work
          professionally.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup">
            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{
                borderRadius: "16px",
                px: 4,
                py: 1.5,
                backgroundColor: grey[800],
                "&:hover": { backgroundColor: grey[900] },
              }}
            >
              Get Started
            </Button>
          </Link>
          <Link to="/signin">
            <Button
              variant="outlined"
              size="large"
              fullWidth
              sx={{
                borderRadius: "16px",
                px: 4,
                py: 1.5,
                color: grey[800],
                borderColor: grey[600],
                "&:hover": {
                  borderColor: grey[800],
                  backgroundColor: grey[500],
                },
              }}
            >
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
