import {
  Box,
  Typography,
  Grid,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import Dropzone from "../../components/Dropzone";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { CreatePortfolio, ErrorResponse } from "../../types/types";
import { postCreatePortfolio } from "../../services/Service";
import axios from "axios";

const CreateWithPDF = () => {
  const navigate = useNavigate();
  const title = useLocation().state.title;
  const [extractedText, setExtractedText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!extractedText.trim()) {
      setError("Please upload a PDF and extract text before generating.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const payload: CreatePortfolio = {
        name: title,
        content: extractedText,
      };

      const response = await postCreatePortfolio(payload);
      if (response.id) navigate("/landingpage");
    } catch (error) {
      if (axios.isAxiosError<ErrorResponse>(error)) {
        alert(error.response?.data?.message ?? "unable to create portfolio");
      } else {
        alert("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
    console.log("Generate portfolio with text:", extractedText);
  };

  return (
    <Box className="min-h-screen bg-gradient-to-bl from-gray-50 to-gray-400 px-4 py-8 flex flex-col items-center justify-center">
      <Typography variant="h4" sx={{ color: grey[800], pb: 2 }}>
        <b>{title}</b> Portfolio
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box className="max-w-4xl w-full bg-gray-100 p-6 rounded-xl shadow">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 10 }}>
            <Dropzone
              onExtracted={(text) => {
                setExtractedText(text);
                setError("");
              }}
            />
          </Grid>
          <Grid
            size={{ xs: 12, md: 2 }}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: grey[800],
                borderRadius: 2,
                px: 4,
                py: 1.5,
                "&:hover": { backgroundColor: grey[900] },
              }}
              onClick={handleGenerate}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Generate"
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CreateWithPDF;
