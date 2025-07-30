import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPortfolio } from "../../services/Service";

export default function LiveHtmlEditor() {
  const [code, setCode] = useState("");
  const { publicId = "" } = useParams();

  useEffect(() => {
    getPortfolio(publicId)
      .then((result) => {
        setCode(result.page);
      })
      .catch((error) => {
        console.error("Error fetching portfolio:", error);
        setCode("<h1>Error loading portfolio</h1>");
      });
  }, [publicId]);

  return <div dangerouslySetInnerHTML={{ __html: code }} />;
}
