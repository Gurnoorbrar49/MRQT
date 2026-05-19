import { NextResponse } from "next/server";

const symbols = [
  "XAU/USD",
  "XAG/USD",
  "EUR/USD",
];

export async function GET() {
  const apiKey = process.env.TWELVE_DATA_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing TWELVE_DATA_API_KEY" },
      { status: 500 }
    );
  }

  try {
    const url = `https://api.twelvedata.com/quote?symbol=${symbols.join(",")}&apikey=${apiKey}`;
    const response = await fetch(url, { next: { revalidate: 60 } });
    const data = await response.json();

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch market data" },
      { status: 500 }
    );
  }
}