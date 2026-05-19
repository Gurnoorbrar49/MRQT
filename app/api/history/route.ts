import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiKey = process.env.TWELVE_DATA_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing TWELVE_DATA_API_KEY" },
      { status: 500 }
    );
  }

  const searchParams = req.nextUrl.searchParams;

  const symbol = searchParams.get("symbol") || "XAU/USD";
  const interval = searchParams.get("interval") || "1day";

  try {
    const url =
      `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&outputsize=60&apikey=${apiKey}`;

    const response = await fetch(url, {
      next: { revalidate: 300 },
    });

    const data = await response.json();

   const candles =
  data.values
    ?.map((item: any) => ({
      time: Math.floor(new Date(item.datetime).getTime() / 1000),
      open: Number(item.open),
      high: Number(item.high),
      low: Number(item.low),
      close: Number(item.close),
    }))
    .filter(
      (item: any) =>
        item.time &&
        !Number.isNaN(item.open) &&
        !Number.isNaN(item.high) &&
        !Number.isNaN(item.low) &&
        !Number.isNaN(item.close)
    )
    .sort((a: any, b: any) => a.time - b.time) || [];

    return NextResponse.json({ candles });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch chart data" },
      { status: 500 }
    );
  }
}