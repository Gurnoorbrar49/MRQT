"use client";

import { Activity, Flame, ShieldAlert, TrendingUp } from "lucide-react";

export default function SentimentBar() {
  const score = 72;

  return (
    <section className="mx-auto max-w-[1500px] px-4 py-8 lg:px-8">
      <div className="rounded-3xl border border-white/12 bg-white/[0.055] p-6 shadow-[0_0_42px_rgba(56,189,248,0.06)] backdrop-blur-xl">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#FFC857]">
              Market Sentiment
            </p>
            <h2 className="mt-2 text-3xl font-black text-white">
              Risk-On Momentum
            </h2>
          </div>

          <div className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-black text-emerald-400">
            AI Score: {score}/100
          </div>
        </div>

        <div className="mb-5 h-4 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose-400 via-[#FFC857] to-emerald-400 shadow-[0_0_24px_rgba(255,200,87,0.45)]"
            style={{ width: `${score}%` }}
          />
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          {[
            ["Bullish Assets", "Gold, Nvidia, Bitcoin", TrendingUp],
            ["High Volatility", "GBP/JPY, Bank Nifty", Flame],
            ["Risk Watch", "US data, Fed comments", ShieldAlert],
            ["Market Mode", "Selective risk-on", Activity],
          ].map(([label, value, Icon]) => (
            <div
              key={label as string}
              className="rounded-2xl border border-white/12 bg-[#020617]/45 p-4"
            >
              <Icon className="mb-3 h-5 w-5 text-[#38BDF8]" />
              <p className="text-xs uppercase tracking-wider text-slate-400">
                {label as string}
              </p>
              <p className="mt-1 font-black text-white">{value as string}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}