"use client";

import {
  ArrowUpRight,
  ArrowDownRight,
  Flame,
} from "lucide-react";

const movers = [
  {
    symbol: "XAU/USD",
    price: "2458.20",
    change: "+1.24%",
    trend: "up",
  },
  {
    symbol: "BTC/USD",
    price: "68420",
    change: "+2.11%",
    trend: "up",
  },
  {
    symbol: "NVDA",
    price: "924.80",
    change: "+1.82%",
    trend: "up",
  },
  {
    symbol: "GBP/JPY",
    price: "191.42",
    change: "-0.32%",
    trend: "down",
  },
];

export default function LiveSidebar() {
  return (
   <section className="mx-auto max-w-[1500px] px-4 py-8 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-white/12 bg-[#020617]/85 shadow-[0_0_42px_rgba(56,189,248,0.08)] backdrop-blur-2xl">
        <div className="border-b border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#FFC857]">
                Live Movers
              </p>

              <h2 className="mt-2 text-xl font-black text-white">
                Market Pulse
              </h2>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              LIVE
            </div>
          </div>
        </div>

        <div className="divide-y divide-white/10">
          {movers.map((item) => (
            <div
              key={item.symbol}
              className="flex items-center justify-between p-4 transition hover:bg-white/[0.05]"
            >
              <div>
                <p className="font-black text-white">
                  {item.symbol}
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  {item.price}
                </p>
              </div>

              <div className="text-right">
                <div
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-black ${
                    item.trend === "up"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-rose-500/10 text-rose-400"
                  }`}
                >
                  {item.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}

                  {item.change}
                </div>

                <div className="mt-2 flex items-center justify-end gap-1 text-xs text-[#FFC857]">
                  <Flame className="h-3 w-3" />
                  Trending
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}