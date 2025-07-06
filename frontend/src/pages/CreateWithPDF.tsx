import React, { useState } from "react";
import Dropzone from "../components/Dropzone";

const CreateWithPDF: React.FC = () => {
  const [extractedText, setExtractedText] = useState("");

  return (
    <div>
      <Dropzone onExtracted={setExtractedText} />
      <div>
        <h3>Extracted Text:</h3>
        <p style={{ whiteSpace: "pre-wrap" }}>{extractedText}</p>
      </div>
    </div>
  );
};

export default CreateWithPDF;
