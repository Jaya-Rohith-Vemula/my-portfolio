import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPortfolio } from "../../services/Service";

export default function ViewPortfolio() {
  const [portfolio, setPortfolio] = useState("");

  const { username = "", portfolioName = "" } = useParams();

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const result = await getPortfolio(username, portfolioName);
        console.log(result.page);
        setPortfolio(result.page);
      } catch (err) {
        setPortfolio("");
      }
    };
    fetchPortfolios();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: portfolio }} />;
}
