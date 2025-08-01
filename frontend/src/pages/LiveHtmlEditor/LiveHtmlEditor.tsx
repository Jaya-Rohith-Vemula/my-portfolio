import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPortfolio, updatePortfolio } from "../../services/Service";
import Split from "react-split";
import { Button, CircularProgress, Grid, Stack } from "@mui/material";

export default function LiveHtmlEditor() {
  const [code, setCode] = useState("");
  const { publicId } = useLocation().state;
  const [originalCode, setOriginalCode] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPortfolio(publicId).then((result) => {
      setCode(result.page);
      setOriginalCode(result.page);
    });
  }, [publicId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCode(code);
    }, 250);
    return () => clearTimeout(timeout);
  }, [code]);

  function handleSave() {
    if (code === originalCode) {
      alert("No changes made to save.");
      return;
    }
    if (!code.trim()) {
      alert("Portfolio content cannot be empty.");
      return;
    }
    setSaveLoading(true);
    updatePortfolio({
      publicId,
      portfolioCode: code,
    })
      .then(() => {
        navigate("/landingPage");
      })
      .catch((error) => {
        console.error("Error updating portfolio:", error);
        alert("Failed to update portfolio. Please try again.");
        setSaveLoading(false);
      });
  }

  function handleReset() {
    setCode(originalCode);
  }

  function handleBack() {
    navigate("/landingPage");
  }

  return (
    <div>
      <Split
        sizes={[50, 50]}
        minSize={200}
        expandToMin={false}
        gutterSize={8}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
        style={{ display: "flex", height: "100vh" }}
      >
        <Grid
          container
          direction="column"
          spacing={2}
          sx={{ height: "100%", p: 1 }}
        >
          <Grid style={{ flex: 1 }}>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{
                width: "100%",
                height: "100%",
                fontSize: 16,
                fontFamily: "monospace",
                padding: 12,
                border: "1px solid #ccc",
                resize: "none",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </Grid>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid>
              <Button variant="outlined" color="inherit" onClick={handleBack}>
                Back
              </Button>
            </Grid>
            <Grid>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  {saveLoading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Save"
                  )}
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={handleReset}
                  disabled={code === originalCode}
                >
                  Reset
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <div
            dangerouslySetInnerHTML={{ __html: code }}
            style={{
              height: "100%",
              overflowY: "auto",
              padding: 12,
            }}
          />
        </Grid>
      </Split>
    </div>
  );
}
