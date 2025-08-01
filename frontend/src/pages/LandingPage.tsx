import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Typography, CardContent, CircularProgress } from "@mui/material";
import { grey } from "@mui/material/colors";
import { getPortfoliosByUser } from "../services/Service";

export interface Portfolio {
  content: string;
  createdAt: string;
  id: string;
  name: string;
  page: string;
  publicId: string;
  user: { username: string };
}

export default function LandingPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPortfolios = async () => {
      setIsLoading(true);
      try {
        const result = await getPortfoliosByUser();
        setPortfolios(result);
      } catch (err) {
        console.error("Error fetching portfolios:", err);
        setPortfolios([]);
      }
      setIsLoading(false);
    };
    fetchPortfolios();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-200 to-gray-400 px-4 py-10 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-gray-800">Your Portfolios</h1>
          <Link to="/create" state={{ portfolios }}>
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
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress />
          </div>
        ) : portfolios.length === 0 ? (
          <Typography variant="h5" color="textSecondary" align="center">
            No portfolios found. Create your first portfolio!
          </Typography>
        ) : (
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
                      state={{ publicId: portfolio.publicId }}
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/portfolio/${portfolio.publicId}`}
                      className="link"
                      target="_blank"
                    >
                      View
                    </Link>
                    <Link
                      className="link cursor-pointer"
                      onClick={() => {
                        console.log("Deleted");
                      }}
                      to={""}
                    >
                      Delete
                    </Link>
                  </div>
                </CardContent>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
