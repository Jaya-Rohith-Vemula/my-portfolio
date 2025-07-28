import fetch from "node-fetch";

const generateHtmlPrompt = (data: { content: string }) => `
You are an expert professional portfolio Frontend website designer. Based on the following Resume JSON data, generate a clean, modern, and highly professional responsive HTML page with all CSS inlined in the <style> tag inside <head> (no external stylesheets).

Requirements:
- Use semantic HTML5 elements.
- Mobile-first responsive design using CSS Flexbox or Grid.
- Minimalist design inspired by popular professional portfolios.
- Use harmonious, professional color palettes.
- Use readable, elegant fonts with proper hierarchy.
- Style should be aesthetically pleasing with good spacing, margins, and accessible color contrast.
- Include subtle hover and focus states for interactive elements.
- Use base font-size 16px, scaling for headings and text.
- Begin with <!DOCTYPE html>.
- Do NOT add markdown, comments, explanations, or summaries.
- Only return the HTML — no text before or after it.

JSON Resume Data:
${data.content}

Only respond with the full, complete HTML.
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
        temperature: 0.5,
      }),
    }
  );

  const json = await response.json();
  console.log(json);
  return json.choices[0]?.message?.content ?? "<!-- Error generating HTML -->";
};
