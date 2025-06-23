import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Typography, CardContent } from "@mui/material";
import { grey } from "@mui/material/colors";

interface Portfolio {
  id: string;
  title: string;
  link: string;
}

export default function LandingPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  useEffect(() => {
    setPortfolios([
      { id: "1", title: "Developer Portfolio", link: "/portfolio/1" },
      { id: "2", title: "UX Case Study", link: "/portfolio/2" },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-200 to-gray-400 px-4 py-10 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <Typography variant="h4" sx={{ color: grey[800], fontWeight: 600 }}>
            Your Portfolios
          </Typography>
          <Link to="/create">
            <Button
              variant="contained"
              sx={{
                backgroundColor: grey[800],
                borderRadius: "16px",
                px: 4,
                py: 1.5,
                "&:hover": { backgroundColor: grey[900] },
              }}
            >
              Create New
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolios.map((portfolio) => (
            <div
              key={portfolio.id}
              className="border-3 border-dashed border-gray-500 rounded-lg shadow-md "
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: grey[800], mb: 1 }}>
                  {portfolio.title}
                </Typography>
                <Link to={portfolio.link} className="link">
                  View Portfolio
                </Link>
              </CardContent>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
