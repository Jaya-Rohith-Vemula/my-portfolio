import { useEffect, useState } from "react";
import { getQuote } from "../services/Service";

export const Quote = () => {
  const [quote, setQuote] = useState({ quote: "", author: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setLoading(true);
        const response = await getQuote();
        setQuote(response);
      } catch (error) {
        console.error("Error fetching quote:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center flex-col p-5 max-w-lg mx-auto">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-300 rounded mb-4"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex justify-center flex-col p-5">
      <div className="flex justify-center">
        <div className="max-w-lg">
          <div className="text-3xl font-bold">{quote.quote}</div>
          <div className="max-w-md text-xl font-semibold text-left mt-4">
            - {quote.author}
          </div>
        </div>
      </div>
    </div>
  );
};
