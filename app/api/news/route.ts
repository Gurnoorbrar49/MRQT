import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing NEWS_API_KEY" },
      { status: 500 }
    );
  }

  const query =
    "gold OR forex OR nifty OR nvidia OR bitcoin OR federal reserve OR inflation OR stock market";

  try {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      query
    )}&language=en&sortBy=publishedAt&pageSize=8&apiKey=${apiKey}`;

    const response = await fetch(url, {
      next: { revalidate: 300 },
    });

    const data = await response.json();

    const articles =
      data.articles?.map((article: any) => ({
        title: article.title,
        summary: article.description,
        source: article.source?.name,
        url: article.url,
        image: article.urlToImage,
        publishedAt: article.publishedAt,
      })) || [];

    return NextResponse.json({ articles });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}