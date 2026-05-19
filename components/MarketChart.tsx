"use client";

import { useEffect, useRef, useState } from "react";
import {
  createChart,
  ColorType,
  CandlestickSeries,
} from "lightweight-charts";

export default function MarketChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [symbol, setSymbol] = useState("XAU/USD");
const [interval, setIntervalValue] = useState("1day");

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#020617" },
        textColor: "#CBD5E1",
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.05)" },
        horzLines: { color: "rgba(255,255,255,0.05)" },
      },
      width: chartContainerRef.current.clientWidth,
      height: 420,
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries);

const loadCandles = async () => {
 const response = await fetch(
  `/api/history?symbol=${symbol}&interval=${interval}`
);
  const data = await response.json();

  candlestickSeries.setData(data.candles || []);
};

loadCandles();

    chart.timeScale().fitContent();

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current!.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [symbol, interval]);

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#020617]/60 p-4 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Live Chart
          </p>

          <div className="flex flex-wrap items-center gap-3">
  {["XAU/USD", "EUR/USD", "BTC/USD", "NVDA"].map((item) => (
    <button
      key={item}
      onClick={() => setSymbol(item)}
      className={`rounded-full px-3 py-1 text-xs font-bold transition ${
        symbol === item
          ? "bg-[#FFC857] text-black"
          : "bg-white/10 text-white hover:bg-white/20"
      }`}
    >
      {item}
    </button>
  ))}
</div>

<div className="mt-4 flex flex-wrap gap-2">
  {[
    ["1h", "1H"],
    ["4h", "4H"],
    ["1day", "1D"],
    ["1week", "1W"],
  ].map(([value, label]) => (
    <button
      key={value}
      onClick={() => setIntervalValue(value)}
      className={`rounded-full px-3 py-1 text-xs font-bold transition ${
        interval === value
          ? "bg-[#38BDF8] text-black"
          : "bg-white/10 text-white hover:bg-white/20"
      }`}
    >
      {label}
    </button>
  ))}
</div>
        </div>

        <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
          LIVE
        </div>
      </div>

      <div ref={chartContainerRef} />
    </div>
  );
}