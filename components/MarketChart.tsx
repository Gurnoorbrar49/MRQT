"use client";

import { useEffect, useRef } from "react";
import {
  createChart,
  ColorType,
  CandlestickSeries,
} from "lightweight-charts";

export default function MarketChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);

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

    candlestickSeries.setData([
      { time: "2026-05-14", open: 2420, high: 2432, low: 2414, close: 2428 },
      { time: "2026-05-15", open: 2428, high: 2440, low: 2422, close: 2438 },
      { time: "2026-05-16", open: 2438, high: 2448, low: 2431, close: 2442 },
      { time: "2026-05-17", open: 2442, high: 2455, low: 2436, close: 2450 },
      { time: "2026-05-18", open: 2450, high: 2462, low: 2441, close: 2458 },
    ]);

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
  }, []);

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#020617]/60 p-4 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Live Chart
          </p>

          <h2 className="mt-2 text-2xl font-black text-white">
            Gold Market Structure
          </h2>
        </div>

        <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
          LIVE
        </div>
      </div>

      <div ref={chartContainerRef} />
    </div>
  );
}