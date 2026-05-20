import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function GET() {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { error: "Missing GROQ_API_KEY" },
      { status: 500 }
    );
  }

  try {
    const marketRes = await fetch("http://127.0.0.1:3000/api/markets");
    const newsRes = await fetch("http://127.0.0.1:3000/api/news");

    const marketData = await marketRes.json();
    const newsData = await newsRes.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are the AI market analyst for MQRKT, a premium financial intelligence platform. Be concise, professional, risk-aware, and never give financial advice.",
        },
        {
          role: "user",
          content: `
Create a premium daily market brief using the data below.

Market data:
${JSON.stringify(marketData).slice(0, 3000)}

News data:
${JSON.stringify(newsData).slice(0, 3000)}

Return exactly in this structure:

Market Mood:
Gold Bias:
Forex Bias:
Key Risks:
What Traders Should Watch:

Keep it clear, short, and useful for traders.
`,
        },
      ],
      temperature: 0.4,
      max_tokens: 700,
    });

    return NextResponse.json({
      brief: completion.choices[0]?.message?.content || "",
    });
  } catch (error: any) {
    console.error("Groq AI Brief Error:", error);

    return NextResponse.json(
      {
        error: "Failed to generate AI brief",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}