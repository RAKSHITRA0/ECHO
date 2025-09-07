// /api/echo.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are ECHO (Experimental Cognitive Handler Online). 
Your creator is Rakshit Rao. Always be concise, helpful, and avoid repeating your identity unless asked. 
User says: ${message}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    return res.status(200).json({
      reply:
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ No response from Gemini."
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
