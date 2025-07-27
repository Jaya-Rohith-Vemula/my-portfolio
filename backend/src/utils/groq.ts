import fetch from "node-fetch";

const generateHtmlPrompt = (data: { content: string }) => `
You are an expert portfolio website generator. Based on the following JSON data, generate a responsive HTML page with all CSS inlined in the <style> tag inside <head> (no external stylesheets). The HTML should be clean, modern, and mobile-friendly.

JSON Input:
${JSON.stringify(data, null, 2)}

Requirements:
- Use a modern web design.
- Responsive layout for desktop and mobile.
- Use semantic HTML5 where possible.
- Use inline CSS only (no external files).
- Do not hallucinate or add/remove information.
- Start with <!DOCTYPE html>.
- Do NOT add markdown, comments, explanations, or summaries.
- Only return the HTML — no text before or after it.
`;

export const generateHtmlWithGroq = async (
  data: {
    content: string;
  },
  apiKey: string
): Promise<string> => {
  const prompt = generateHtmlPrompt(data);

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
      }),
    }
  );

  const json = await response.json();
  console.log(json);
  return json.choices[0]?.message?.content ?? "<!-- Error generating HTML -->";
};
