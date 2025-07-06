import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { extractText } from "../utils/pdfUtils";
import { Delete } from "@mui/icons-material";
import { Box } from "@mui/material";

interface DropzoneProps {
  onExtracted: (text: string) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onExtracted }) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        try {
          setFile(acceptedFiles[0]);
          const text = await extractText(acceptedFiles[0]);
          onExtracted(text);
        } catch (error) {
          console.error("Failed to extract text:", error);
        }
      }
    },
    [onExtracted]
  );

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    onDrop,
    multiple: false,
    maxFiles: 1,
    disabled: !!file,
  });

  const handleDelete = () => {
    setFile(null);
    onExtracted("");
  };

  return !file ? (
    <>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #777",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <p>Drag and drop a PDF file here, or click to select</p>
      </div>
      {fileRejections.length > 0 && (
        <div style={{ color: "red", marginTop: "4px" }}>
          Only PDF files are accepted.
        </div>
      )}
    </>
  ) : (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        border: "2px solid #777",
        borderRadius: "4px",
      }}
    >
      <p>
        File uploaded: <b>{file.name}</b>
      </p>
      <Delete style={{ cursor: "pointer" }} onClick={handleDelete} />
    </Box>
  );
};

export default Dropzone;
