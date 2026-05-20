"use client";

const tickerItems = [
  "XAU/USD +1.24%",
  "BTC/USD +2.18%",
  "NVDA +1.82%",
  "NIFTY +0.52%",
  "GBP/JPY -0.31%",
  "AAPL +0.22%",
  "TSLA -0.74%",
  "Silver +0.41%",
];

export default function LiveTicker() {
  return (
    <div className="overflow-hidden border-y border-white/10 bg-[#020617]/80 py-3">
      <div className="flex w-max min-w-full animate-[marquee_24s_linear_infinite] gap-12 whitespace-nowrap">
        {[...tickerItems, ...tickerItems].map((item, index) => (
          <div
            key={index}
            className="text-sm font-black tracking-wide text-white"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}