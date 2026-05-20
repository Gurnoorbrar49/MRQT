import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing GROQ_API_KEY" },
      { status: 500 }
    );
  }

  const groq = new Groq({ apiKey });

  try {
    const origin = req.nextUrl.origin;

    const marketRes = await fetch(`${origin}/api/markets`);
    const newsRes = await fetch(`${origin}/api/news`);

    const marketData = await marketRes.json();
    const newsData = await newsRes.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are the AI market analyst for MQRKT. Be concise, premium, risk-aware, and do not provide financial advice.",
        },
        {
          role: "user",
          content: `
Create a premium daily market brief using this data.

Market data:
${JSON.stringify(marketData).slice(0, 3000)}

News data:
${JSON.stringify(newsData).slice(0, 3000)}

Return exactly:
Market Mood:
Gold Bias:
Forex Bias:
Key Risks:
What Traders Should Watch:
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
    return NextResponse.json(
      {
        error: "Failed to generate AI brief",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}