import { useState, useRef } from "react";
import {
  Box,
  TextField,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
  Toolbar,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const titleRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);

  const navigate = useNavigate();

  const handleCardClick = (type: string) => {
    if (!title.trim()) {
      setTitleError(true);
      titleRef.current?.focus();
      return;
    }
    setTitleError(false);
    navigate(`/create/${type}`, {
      state: { title },
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (titleError && e.target.value.trim()) {
      setTitleError(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-50 to-gray-400 flex flex-col items-center justify-center px-4">
      <Box maxWidth={480} width="100%" mb={4}>
        <Card elevation={4} sx={{ borderRadius: 4, p: 3 }}>
          <TextField
            label="Title of this Portfolio"
            id="title"
            fullWidth
            required
            value={title}
            onChange={handleTitleChange}
            error={titleError}
            helperText={titleError ? "Title is required" : ""}
            variant="outlined"
            sx={{ mb: 1 }}
            inputRef={titleRef}
          />
        </Card>
      </Box>
      <Grid container spacing={3} justifyContent="center" maxWidth={800}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card
            elevation={6}
            sx={{
              borderRadius: 4,
              transition: "transform 0.2s ease, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-6px) scale(1.05)",
                boxShadow: 12,
                backgroundColor: "#f1f5fb",
              },
            }}
          >
            <CardActionArea
              onClick={() => handleCardClick("with-pdf")}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 1,
              }}
              aria-label="Create with PDF"
            >
              <CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    Create with PDF
                  </Typography>
                  <PictureAsPdfIcon sx={{ color: "grey" }} />
                </Box>
                <p className="text-md text-gray-600">
                  Import your existing portfolio as a PDF and get started
                  instantly.
                </p>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card
            elevation={6}
            sx={{
              borderRadius: 4,
              transition: "transform 0.2s ease, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-6px) scale(1.03)",
                boxShadow: 12,
                backgroundColor: "#f1f5fb",
              },
            }}
          >
            <CardActionArea
              onClick={() => handleCardClick("with-form")}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 1,
              }}
              aria-label="Create with PDF"
            >
              <CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    Create with Form
                  </Typography>
                  <FormatListBulletedIcon sx={{ color: "grey" }} />
                </Box>
                <p className="text-md text-gray-600">
                  Build your portfolio step-by-step with our guided form.
                </p>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <Toolbar />
    </div>
  );
}
