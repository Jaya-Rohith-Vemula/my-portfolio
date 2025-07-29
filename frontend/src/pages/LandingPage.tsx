import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Typography, CardContent } from "@mui/material";
import { grey } from "@mui/material/colors";
import { getPortfoliosByUser } from "../services/Service";

interface Portfolio {
  id: string;
  name: string;
  user: { username: string };
}

export default function LandingPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const result = await getPortfoliosByUser();
        console.log(result);
        setPortfolios(result);
      } catch (err) {
        setPortfolios([]);
      }
    };
    fetchPortfolios();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-200 to-gray-400 px-4 py-10 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-gray-800">Your Portfolios</h1>
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
              className="border-3 border-dashed border-gray-500 rounded-lg shadow-md"
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: grey[800], mb: 1 }}>
                  {portfolio.name}
                </Typography>
                <div className="flex gap-4 mt-2">
                  <Link
                    to="/edit"
                    className="link"
                    state={{ portfolioName: portfolio.name }}
                  >
                    Edit
                  </Link>
                  <Link
                    to="/view"
                    className="link"
                    state={{ portfolioName: portfolio.name }}
                  >
                    View
                  </Link>
                  <span
                    className="link cursor-pointer"
                    onClick={() => {
                      console.log("Deleted");
                    }}
                  >
                    Delete
                  </span>
                </div>
              </CardContent>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
