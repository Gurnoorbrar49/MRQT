"use client";
import SentimentBar from "@/components/SentimentBar";
import WatchlistButton from "@/components/WatchlistButton";
import LiveTicker from "@/components/LiveTicker";
import MyWatchlist from "@/components/MyWatchlist";
import AuthPanel from "@/components/AuthPanel";
import LiveSidebar from "@/components/LiveSidebar";
import MarketChart from "@/components/MarketChart";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Award,
  BarChart3,
  Bell,
  Brain,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronRight,
  Eye,
  Flame,
  Gauge,
  GraduationCap,
  Landmark,
  LineChart,
  Lock,
  Mail,
  Menu,
  PlayCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingDown,
  TrendingUp,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const assets = [
  { symbol: "XAU/USD", name: "Gold", price: "2,438.20", change: "+0.82%", trend: "up", category: "Metals", bias: "Bullish above 2428", risk: "Medium", volume: "High", score: 89 },
  { symbol: "XAG/USD", name: "Silver", price: "31.18", change: "+0.41%", trend: "up", category: "Metals", bias: "Compression breakout", risk: "Medium", volume: "Medium", score: 74 },
  { symbol: "EUR/USD", name: "Euro Dollar", price: "1.0874", change: "-0.16%", trend: "down", category: "Forex", bias: "Range below 1.0920", risk: "Low", volume: "Medium", score: 61 },
  { symbol: "GBP/JPY", name: "Pound Yen", price: "191.42", change: "+0.29%", trend: "up", category: "Forex", bias: "Momentum long", risk: "High", volume: "High", score: 82 },
  { symbol: "USD/JPY", name: "Dollar Yen", price: "156.22", change: "+0.18%", trend: "up", category: "Forex", bias: "Intervention risk", risk: "High", volume: "High", score: 68 },
  { symbol: "NIFTY", name: "Nifty 50", price: "24,921", change: "+0.52%", trend: "up", category: "India", bias: "Buy dips", risk: "Medium", volume: "High", score: 79 },
  { symbol: "BANKNIFTY", name: "Bank Nifty", price: "53,120", change: "+0.34%", trend: "up", category: "India", bias: "Resistance watch", risk: "High", volume: "High", score: 72 },
  { symbol: "FINNIFTY", name: "Fin Nifty", price: "23,804", change: "-0.22%", trend: "down", category: "India", bias: "Trap risk", risk: "High", volume: "Medium", score: 58 },
  { symbol: "BTC/USD", name: "Bitcoin", price: "68,420", change: "+1.24%", trend: "up", category: "Crypto", bias: "Risk-on bid", risk: "High", volume: "High", score: 77 },
  { symbol: "NVDA", name: "Nvidia", price: "924.80", change: "+2.10%", trend: "up", category: "Stocks", bias: "AI leader", risk: "Medium", volume: "High", score: 86 },
  { symbol: "TSLA", name: "Tesla", price: "178.22", change: "-0.74%", trend: "down", category: "Stocks", bias: "Sentiment mixed", risk: "High", volume: "High", score: 55 },
  { symbol: "AAPL", name: "Apple", price: "191.50", change: "+0.22%", trend: "up", category: "Stocks", bias: "Stable mega-cap", risk: "Low", volume: "Medium", score: 67 },
];

const topStories = [
  {
    category: "Markets",
    title: "Gold holds above key liquidity zone as traders wait for US data",
    summary: "AI desk flags 2428 as the key intraday line. A hold above it keeps buyers in control, while a breakdown shifts focus to 2418.",
    time: "2 min ago",
    impact: "High impact",
  },
  {
    category: "Technology",
    title: "AI chip demand keeps Nvidia at the centre of global market attention",
    summary: "Retail and institutional flows remain focused on chips, data centres, robotics and enterprise AI adoption.",
    time: "11 min ago",
    impact: "Trending",
  },
  {
    category: "Politics",
    title: "World leaders prepare for economic summit as inflation concerns return",
    summary: "Policy comments may influence bond yields, currencies, gold, energy and equity sentiment through the week.",
    time: "23 min ago",
    impact: "Macro watch",
  },
  {
    category: "India",
    title: "Nifty open range becomes the battleground for expiry-week positioning",
    summary: "Index traders are watching 24,760 support and 25,050 resistance for the next directional clue.",
    time: "31 min ago",
    impact: "India open",
  },
];

const briefCards = [
  {
    asset: "Gold",
    title: "XAU/USD: trade the liquidity, not the emotion",
    bias: "Bullish above 2428",
    levels: "2418 / 2428 / 2445 / 2452",
    scenario: "If price holds above 2428, watch for a sweep into 2445. Below 2418, bullish thesis weakens.",
  },
  {
    asset: "Nifty 50",
    title: "Nifty open range: breakout or trap?",
    bias: "Buy dips above 24,760",
    levels: "24,760 / 24,900 / 25,050",
    scenario: "First 30 minutes decide the day. Avoid chasing the opening candle without confirmation.",
  },
  {
    asset: "GBP/JPY",
    title: "GBP/JPY momentum remains strong but risky",
    bias: "Bullish while above 190.70",
    levels: "190.70 / 191.40 / 192.10",
    scenario: "Strong pair for volatility, but position size must be smaller due to spread and wick risk.",
  },
];

const channels = [
  { name: "Markets", icon: LineChart, description: "Forex, metals, crypto, indices and commodities." },
  { name: "Technology", icon: Brain, description: "AI, Nvidia, Apple, Tesla, chips and future tech." },
  { name: "Finance", icon: BriefcaseBusiness, description: "Banks, earnings, funds, IPOs and global business." },
  { name: "Politics", icon: Landmark, description: "Policy, elections, leaders and geopolitical risk." },
  { name: "Viral", icon: Flame, description: "World-leader clips, CEO moments and social market stories." },
  { name: "Academy", icon: GraduationCap, description: "Trading lessons, psychology, risk and explainers." },
];

const viralClips = [
  "Jensen Huang eating noodles becomes the internet’s favourite AI moment",
  "Central bank chief comments move gold and dollar sentiment",
  "World leader handshake clip goes viral before economic summit",
  "Tesla robotics demo sparks fresh debate on automation stocks",
];

const trustPoints = [
  "Verified source labelling",
  "Timestamped updates",
  "Risk warning on every market idea",
  "Human review for premium briefs",
  "No fake signals or guaranteed profit claims",
  "Clear split between news, analysis and opinion",
];

const premiumStack = [
  "Premium daily market report",
  "AI watchlist alerts",
  "Gold, Forex and Nifty session plans",
  "Members-only live briefings",
  "Trading journal dashboard",
  "Weekly psychology and performance review",
];

const tabs = ["All", "Forex", "Metals", "India", "Stocks", "Crypto"];

const panel = "rounded-3xl border border-white/12 bg-white/[0.055] shadow-[0_0_42px_rgba(56,189,248,0.06)] backdrop-blur-xl";
const innerPanel = "rounded-2xl border border-white/12 bg-[#020617]/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]";

export default function TradingMediaCompanyWebsite() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [marketData, setMarketData] = useState<any>(null);
  const [news, setNews] = useState<any[]>([]);
  const [aiBrief, setAiBrief] = useState("");
  const [query, setQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedChannel, setSelectedChannel] = useState("Markets");
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const response = await fetch("/api/markets");
        const data = await response.json();
        setMarketData(data.data);
      } catch (error) {
        console.error("Failed to fetch markets", error);
      }
    };

    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();
        setNews(data.articles || []);
      } catch (error) {
        console.error("Failed to fetch news", error);
      }
    };

    const fetchAiBrief = async () => {
      try {
        const response = await fetch("/api/ai-brief");
        const data = await response.json();
        setAiBrief(data.brief || "");
      } catch (error) {
        console.error("Failed to fetch AI brief", error);
      }
    };

    fetchMarkets();
    fetchNews();
    fetchAiBrief();

    const interval = setInterval(() => {
      fetchMarkets();
      fetchNews();
      fetchAiBrief();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesTab = selectedTab === "All" || asset.category === selectedTab;
      const matchesSearch = `${asset.symbol} ${asset.name} ${asset.category}`.toLowerCase().includes(query.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [query, selectedTab]);

  const handleJoin = () => {
    if (email.trim().includes("@")) setJoined(true);
  };

  const getLiveAsset = (asset: any) => {
    if (!marketData) return asset;

    const live = marketData[asset.symbol];

    if (!live || live.status === "error") return asset;

    const changeNumber = Number(live.percent_change || 0);

    return {
      ...asset,
      price: live.close || asset.price,
      change: `${changeNumber >= 0 ? "+" : ""}${changeNumber.toFixed(2)}%`,
      trend: changeNumber >= 0 ? "up" : "down",
    };
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#060B14] text-white selection:bg-[#FFC857]/30">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_12%_4%,rgba(255,200,87,0.20),transparent_30%),radial-gradient(circle_at_86%_8%,rgba(56,189,248,0.18),transparent_32%),radial-gradient(circle_at_50%_105%,rgba(37,99,235,0.16),transparent_36%),linear-gradient(180deg,#060B14,#0B1120_48%,#071018)]" />
      <div className="fixed inset-x-0 top-0 -z-10 h-36 bg-gradient-to-b from-[#FFC857]/10 via-[#38BDF8]/5 to-transparent" />
      <div className="fixed left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#38BDF8]/10 blur-3xl" />

      <header className="sticky top-0 z-50 border-b border-white/12 bg-[#060B14]/88 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#FFC857] to-[#38BDF8] text-black shadow-lg shadow-[#FFC857]/20">
              <Activity className="h-7 w-7" />
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-rose-400 ring-4 ring-[#060B14]" />
            </div>
            <div>
              <p className="text-xl font-black tracking-tight">MQRKT</p>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">AI Financial Intelligence</p>
            </div>
          </div>

          <nav className="hidden items-center gap-7 text-sm font-bold text-slate-300 lg:flex">
            <a href="#news" className="hover:text-[#FFC857]">News</a>
            <a href="#markets" className="hover:text-[#FFC857]">Markets</a>
            <a href="#ai-desk" className="hover:text-[#FFC857]">AI Desk</a>
            <a href="#viral" className="hover:text-[#FFC857]">Viral</a>
            <a href="#premium" className="hover:text-[#FFC857]">Premium</a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button
  variant="ghost"
  onClick={() => setAuthOpen(true)}
  className="rounded-2xl text-slate-200 hover:bg-white/10 hover:text-white"
>
  Login
</Button>
            <Button className="rounded-2xl bg-gradient-to-r from-[#FFC857] to-[#38BDF8] font-black text-black shadow-lg shadow-[#FFC857]/20 hover:opacity-90">Open Terminal</Button>
          </div>

          <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/12 px-4 py-4 lg:hidden">
            <div className="grid gap-3 text-sm text-slate-300">
              <a href="#news">News</a>
              <a href="#markets">Markets</a>
              <a href="#ai-desk">AI Desk</a>
              <a href="#viral">Viral</a>
              <a href="#premium">Premium</a>
              <Button className="mt-2 rounded-2xl bg-gradient-to-r from-[#FFC857] to-[#38BDF8] font-black text-black">Open Terminal</Button>
            </div>
          </div>
        )}
      </header>

      <section className="border-b border-white/12 bg-[#020617]/45 py-3 shadow-[0_0_40px_rgba(56,189,248,0.06)]">
        <div className="mx-auto flex max-w-[1500px] gap-6 overflow-hidden px-4 text-sm lg:px-8">
          {assets.slice(0, 10).map((item) => {
            const liveItem = getLiveAsset(item);

            return (
              <div key={liveItem.symbol} className="flex shrink-0 items-center gap-2">
                <span className="font-black text-white">{liveItem.symbol}</span>
                <span className="text-slate-400">{liveItem.price}</span>
                <span className={liveItem.trend === "up" ? "text-emerald-400" : "text-rose-400"}>{liveItem.change}</span>
              </div>
            );
          })}
        </div>
      </section>
      {authOpen && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md">
    <div className="relative w-full max-w-lg px-4">
      <button
        onClick={() => setAuthOpen(false)}
        className="absolute right-7 top-5 text-white/60 hover:text-white"
      >
        ✕
      </button>

      <AuthPanel />
    </div>
  </div>
)}
<LiveTicker />
      <main>
        <SentimentBar />
        <LiveSidebar />
        <MyWatchlist />
        <section className="mx-auto grid max-w-[1500px] gap-6 px-4 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#FFC857]/30 bg-[#FFC857]/10 px-4 py-2 text-sm font-bold text-[#FFE2A3] shadow-lg shadow-[#FFC857]/5">
              <Sparkles className="h-4 w-4" /> The daily intelligence layer for modern traders
            </div>
            <h1 className="max-w-5xl text-5xl font-black leading-[0.92] tracking-tight md:text-7xl xl:text-8xl">
              Understand markets, power, money and viral moments — <span className="bg-gradient-to-r from-[#FFC857] to-[#38BDF8] bg-clip-text text-transparent">before the crowd.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              MQRKT is an AI-native finance media platform combining market data, global news, tech, politics, viral clips, trading briefs and risk-first intelligence in one premium daily habit.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="h-14 rounded-2xl bg-gradient-to-r from-[#FFC857] to-[#38BDF8] px-7 text-base font-black text-black shadow-lg shadow-[#FFC857]/20 hover:opacity-90">
                Start Live Brief <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="h-14 rounded-2xl border-white/20 bg-white/[0.07] px-7 text-base font-bold text-white hover:bg-white/12">
                <PlayCircle className="mr-2 h-5 w-5" /> Watch Market Pulse
              </Button>
            </div>

            <div className="mt-8 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
              {[
                ["24/5", "market coverage"],
                ["AI", "instant briefs"],
                ["Global", "newsroom"],
                ["Trust", "first design"],
              ].map(([stat, label]) => (
                <div key={stat} className={`${innerPanel} p-4`}>
                  <p className="text-2xl font-black text-white">{stat}</p>
                  <p className="text-xs uppercase tracking-wider text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.1 }}>
            <Card className={panel}>
              <CardContent className="p-0">
                <div className="border-b border-white/12 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="flex items-center gap-2 font-black text-white"><Brain className="h-5 w-5 text-[#FFC857]" /> AI Intelligence Desk</p>
                      <p className="text-sm text-slate-400">Bias, catalysts, risk and market impact</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-bold text-rose-300">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-rose-400" /> LIVE
                    </div>
                  </div>
                </div>
                <div className="grid gap-3 p-5 sm:grid-cols-2">
                  {[
                    ["Best opportunity", "Gold NY session", Award],
                    ["News risk", "Medium", Gauge],
                    ["Market mood", "Risk-on mixed", Activity],
                    ["Next catalyst", "US data", CalendarDays],
                  ].map(([label, value, Icon]) => (
                    <div key={label} className={`${innerPanel} p-4`}>
                      <Icon className="mb-3 h-5 w-5 text-[#38BDF8]" />
                      <p className="text-xs uppercase tracking-wider text-slate-400">{label}</p>
                      <p className="text-lg font-black text-white">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/12 p-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-slate-400">AI summary</p>
                  <p className="whitespace-pre-line text-sm leading-7 text-slate-300">
                    {aiBrief || "Generating AI market brief..."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <section id="news" className="mx-auto grid max-w-[1500px] gap-6 px-4 py-6 lg:grid-cols-[1.25fr_0.75fr] lg:px-8">
          <Card className={panel}>
            <CardContent className="p-0">
              <div className="border-b border-white/12 p-5">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#FFC857]">Top Stories</p>
                <h2 className="mt-2 text-3xl font-black md:text-5xl">Trusted global newsroom</h2>
              </div>
              <div className="divide-y divide-white/12">
                {topStories.map((story, index) => (
                  <article key={story.title} className="group grid cursor-pointer gap-5 p-5 transition hover:bg-white/[0.055] md:grid-cols-[0.15fr_0.85fr]">
                    <div className="text-5xl font-black text-white/10">0{index + 1}</div>
                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-gradient-to-r from-[#FFC857] to-[#38BDF8] px-3 py-1 text-xs font-black text-black">{story.category}</span>
                        <span className="text-xs font-bold text-rose-300">{story.impact}</span>
                        <span className="text-xs text-slate-400">{story.time}</span>
                      </div>
                      <h3 className="max-w-4xl text-2xl font-black leading-tight text-white group-hover:text-[#FFE2A3] md:text-3xl">{story.title}</h3>
                      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">{story.summary}</p>
                    </div>
                  </article>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card className={panel}>
              <CardContent className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-black text-white">Watchlist Search</p>
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search gold, nifty, bitcoin..." className="rounded-2xl border-white/12 bg-[#020617]/45 text-white placeholder:text-slate-500" />
                <div className="mt-4 grid gap-3">
                  {filteredAssets.slice(0, 5).map((asset) => {
                    const liveAsset = getLiveAsset(asset);

                    return (
                      <div key={liveAsset.symbol} className={`${innerPanel} flex items-center justify-between p-3`}>
                        <div>
                          <p className="font-black text-white">{liveAsset.symbol}</p>
                          <p className="text-xs text-slate-400">{liveAsset.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-white">{liveAsset.price}</p>
                          <p className={liveAsset.trend === "up" ? "text-xs font-bold text-emerald-400" : "text-xs font-bold text-rose-400"}>{liveAsset.change}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-white/12 bg-gradient-to-br from-[#FFC857]/15 via-white/[0.055] to-[#38BDF8]/10 shadow-[0_0_42px_rgba(255,200,87,0.08)] backdrop-blur-xl">
              <CardContent className="p-5">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#FFC857]">Owner strategy</p>
                <h3 className="mt-3 text-2xl font-black text-white">Trust is the product.</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">The site must never feel like a fake signal page. It should feel like a modern financial newsroom: clean, fast, verified, timestamped and risk-aware.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-[1500px] px-4 py-8 lg:px-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#FFC857]">Channels</p>
              <h2 className="mt-2 text-3xl font-black md:text-5xl">Finance, power, tech and culture</h2>
            </div>
            <p className="hidden max-w-lg text-sm leading-7 text-slate-400 md:block">This is the key difference: not only price data, but context, attention and interpretation.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((channel) => (
              <button key={channel.name} onClick={() => setSelectedChannel(channel.name)} className={`rounded-3xl border p-5 text-left transition hover:-translate-y-1 ${selectedChannel === channel.name ? "border-[#FFC857] bg-gradient-to-br from-[#FFC857] to-[#38BDF8] text-black shadow-lg shadow-[#38BDF8]/10" : "border-white/12 bg-white/[0.055] text-white hover:border-[#38BDF8]/35 hover:bg-white/[0.09]"}`}>
                <channel.icon className="mb-5 h-8 w-8" />
                <p className="text-xl font-black">{channel.name}</p>
                <p className={`mt-2 text-sm leading-6 ${selectedChannel === channel.name ? "text-black/70" : "text-slate-400"}`}>{channel.description}</p>
              </button>
            ))}
          </div>
        </section>
<section className="mx-auto max-w-[1500px] px-4 py-8 lg:px-8">
  <MarketChart />
</section>
        <section id="markets" className="mx-auto max-w-[1500px] px-4 py-8 lg:px-8">
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#FFC857]">Market Command Center</p>
              <h2 className="mt-2 text-3xl font-black md:text-5xl">Live-style prices and daily bias</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button key={tab} onClick={() => setSelectedTab(tab)} className={`rounded-full px-4 py-2 text-sm font-black transition ${selectedTab === tab ? "bg-gradient-to-r from-[#FFC857] to-[#38BDF8] text-black shadow-lg shadow-[#38BDF8]/10" : "bg-white/10 text-slate-300 hover:bg-white/15"}`}>{tab}</button>
              ))}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {filteredAssets.map((asset) => {
  const liveAsset = getLiveAsset(asset);

  return (
              <Card key={liveAsset.symbol} className="rounded-3xl border-white/12 bg-white/[0.055] shadow-[0_0_34px_rgba(56,189,248,0.04)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#38BDF8]/35 hover:bg-white/[0.09] hover:shadow-[0_0_34px_rgba(56,189,248,0.10)]">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xl font-black text-white">{liveAsset.symbol}</p>
                      <p className="text-sm text-slate-400">{liveAsset.name}</p>
                    </div>
                   <div className="flex items-center gap-2">
  <WatchlistButton symbol={liveAsset.symbol} name={liveAsset.name} />
  <BarChart3 className="h-6 w-6 text-[#38BDF8]" />
</div>
                  </div>
                  <p className="mt-6 text-3xl font-black text-white">{liveAsset.price}</p>
                  <div className="mt-2 flex items-center gap-2">
                    {liveAsset.trend === "up" ? <TrendingUp className="h-4 w-4 text-emerald-400" /> : <TrendingDown className="h-4 w-4 text-rose-400" />}
                    <span className={liveAsset.trend === "up" ? "font-black text-emerald-400" : "font-black text-rose-400"}>{liveAsset.change}</span>
                  </div>
                  <div className={`${innerPanel} mt-5 p-3`}>
                    <p className="text-xs uppercase tracking-wider text-slate-400">AI bias</p>
                    <p className="mt-1 font-bold text-slate-200">{liveAsset.bias}</p>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#FFC857] to-[#38BDF8] shadow-[0_0_18px_rgba(255,200,87,0.45)]" style={{ width: `${liveAsset.score}%` }} />
                    </div>
                    <p className="mt-2 text-xs text-slate-400">Risk: {liveAsset.risk} • Volume: {liveAsset.volume}</p>
                  </div>
                </CardContent>
              </Card>
  );
})}
          </div>
        </section>

        <section id="ai-desk" className="mx-auto max-w-[1500px] px-4 py-8 lg:px-8">
          <div className="mb-5">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#FFC857]">AI Trading Briefs</p>
            <h2 className="mt-2 text-3xl font-black md:text-5xl">Actionable, but not reckless</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {briefCards.map((brief) => (
              <Card key={brief.asset} className={panel}>
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-black text-[#FFE2A3]">{brief.asset}</div>
                  <h3 className="text-2xl font-black leading-tight text-white">{brief.title}</h3>
                  <div className="mt-5 grid gap-3">
                    <div className={`${innerPanel} p-3`}>
                      <p className="text-xs uppercase tracking-wider text-slate-400">Bias</p>
                      <p className="font-black text-emerald-300">{brief.bias}</p>
                    </div>
                    <div className={`${innerPanel} p-3`}>
                      <p className="text-xs uppercase tracking-wider text-slate-400">Levels</p>
                      <p className="font-bold text-white">{brief.levels}</p>
                    </div>
                    <p className="text-sm leading-7 text-slate-400">{brief.scenario}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="viral" className="mx-auto grid max-w-[1500px] gap-6 px-4 py-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#FFC857]">Viral Intelligence</p>
            <h2 className="mt-2 text-3xl font-black md:text-5xl">The stories people share</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">MQRKT should capture attention through viral world-leader moments, CEO clips, AI culture, political drama and market-moving social clips.</p>
          </div>
          <div className="grid gap-4">
            {viralClips.map((video) => (
              <div key={video} className="group flex items-center gap-4 rounded-3xl border border-white/12 bg-white/[0.055] p-4 transition hover:border-[#38BDF8]/35 hover:bg-white/[0.09] hover:shadow-[0_0_34px_rgba(56,189,248,0.10)]">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#FFC857] to-[#38BDF8] text-black shadow-lg shadow-[#FFC857]/15">
                  <PlayCircle className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <p className="font-black text-white group-hover:text-[#FFE2A3]">{video}</p>
                  <p className="mt-1 text-sm text-slate-400">Clip + AI context + market relevance + short-form script</p>
                </div>
                <Eye className="hidden h-5 w-5 text-slate-400 sm:block" />
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1500px] px-4 py-8 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <Card className={panel}>
              <CardContent className="p-6">
                <ShieldCheck className="h-9 w-9 text-[#FFC857]" />
                <h2 className="mt-5 text-3xl font-black text-white md:text-5xl">Designed to feel trustworthy instantly.</h2>
                <p className="mt-4 text-sm leading-7 text-slate-400">The first reaction should be: serious, clean, fast and reliable. That means strong typography, verified labels, timestamps, source discipline and no cheap signal-page behaviour.</p>
              </CardContent>
            </Card>
            <div className="grid gap-3 sm:grid-cols-2">
              {trustPoints.map((point) => (
                <div key={point} className={`${innerPanel} p-4 text-sm font-bold text-slate-200`}>
                  <Star className="mb-3 h-5 w-5 text-[#FFC857]" /> {point}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1500px] px-4 py-8 lg:px-8">
          <Card className={panel}>
            <CardContent className="grid gap-6 p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FFC857] to-[#38BDF8] px-3 py-1 text-xs font-black text-black"><Mail className="h-4 w-4" /> Daily brief</div>
                <h2 className="text-3xl font-black md:text-5xl">Build the habit with email first.</h2>
                <p className="mt-4 text-sm leading-7 text-slate-400">Before building an expensive app, capture users with a daily email: gold, forex, Nifty, tech, politics, viral clips and AI summary.</p>
              </div>
              <div className="flex flex-col justify-center gap-3">
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="h-14 rounded-2xl border-white/12 bg-white/[0.06] text-white placeholder:text-slate-500" />
                <Button onClick={handleJoin} className="h-14 rounded-2xl bg-gradient-to-r from-[#FFC857] to-[#38BDF8] font-black text-black shadow-lg shadow-[#38BDF8]/10 hover:opacity-90">Join the waitlist</Button>
                {joined && <p className="flex items-center gap-2 text-sm font-bold text-emerald-400"><Check className="h-4 w-4" /> You’re on the list. This is where Supabase/email automation connects later.</p>}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="premium" className="mx-auto max-w-[1500px] px-4 py-12 lg:px-8">
          <div className="grid gap-6 rounded-[2rem] border border-white/12 bg-gradient-to-br from-[#FFC857]/20 via-white/[0.06] to-[#38BDF8]/14 p-6 shadow-[0_0_70px_rgba(56,189,248,0.08)] backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-[#FFE2A3]">
                <WalletCards className="h-4 w-4" /> Monetisation engine
              </div>
              <h2 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">Build the media company traders check every morning.</h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">Start with free trust-building news and market updates. Monetise with premium briefs, AI tools, alerts, community, sponsorships, newsletters, app subscriptions and education products.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button className="rounded-2xl bg-gradient-to-r from-[#FFC857] to-[#38BDF8] px-7 font-black text-black shadow-lg shadow-[#FFC857]/15 hover:opacity-90"><Bell className="mr-2 h-5 w-5" /> Join Free Alerts</Button>
                <Button variant="outline" className="rounded-2xl border-white/20 bg-white/7 px-7 font-bold text-white hover:bg-white/12"><Lock className="mr-2 h-5 w-5" /> Unlock Premium</Button>
              </div>
            </div>
            <Card className="rounded-3xl border-white/12 bg-[#020617]/45 backdrop-blur-xl">
              <CardContent className="p-6">
                <p className="mb-4 text-xl font-black text-white">Premium Stack</p>
                {premiumStack.map((item) => (
                  <div key={item} className={`${innerPanel} mb-3 flex items-center gap-3 p-3 text-sm text-slate-300`}>
                    <Zap className="h-4 w-4 text-[#FFC857]" /> {item}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-[1500px] px-4 py-12 lg:px-8">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#FFC857]">Live News</p>
              <h2 className="mt-2 text-3xl font-black md:text-5xl">Market Intelligence Feed</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-400">
              Fresh headlines pulled from your news API and formatted into a premium MQRKT-style intelligence feed.
            </p>
          </div>

          {news.length === 0 ? (
            <Card className={panel}>
              <CardContent className="p-6">
                <p className="text-sm text-slate-400">Loading live news feed...</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              {news.map((article, index) => (
                <a
                  key={`${article.url}-${index}`}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded-3xl border border-white/12 bg-white/[0.055] shadow-[0_0_34px_rgba(56,189,248,0.04)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#38BDF8]/35 hover:bg-white/[0.09] hover:shadow-[0_0_34px_rgba(56,189,248,0.10)]"
                >
                  {article.image && (
                    <img
                      src={article.image}
                      alt={article.title || "Market news"}
                      className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  )}

                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FFC857]">
                        {article.source || "Market News"}
                      </p>
                      <span className="rounded-full bg-[#38BDF8]/10 px-3 py-1 text-xs font-bold text-[#38BDF8]">
                        Live
                      </span>
                    </div>

                    <h3 className="line-clamp-2 text-xl font-black leading-tight text-white group-hover:text-[#FFE2A3]">
                      {article.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
                      {article.summary || "Open the article to read the full story."}
                    </p>

                    {article.publishedAt && (
                      <p className="mt-5 text-xs text-slate-500">
                        {new Date(article.publishedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

        <section className="mx-auto max-w-[1500px] px-4 pb-12 lg:px-8">
          <div className="rounded-3xl border border-[#FFC857]/30 bg-[#FFC857]/10 p-5 text-sm leading-7 text-[#FFE2A3]">
            <div className="mb-2 flex items-center gap-2 font-black"><AlertTriangle className="h-5 w-5" /> Important product note</div>
            This front-end is using demo data. In production, connect live market data APIs, licensed news/RSS feeds, Supabase authentication, database storage, OpenAI summaries, email automation and a compliant source policy.
          </div>
        </section>
      </main>

      <footer className="border-t border-white/12 px-4 py-8 lg:px-8">
        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-4 text-sm text-slate-400 md:flex-row md:items-center">
          <p>© 2026 MQRKT. Market education and media only. Not financial advice.</p>
          <div className="flex flex-wrap gap-5">
            <span>Risk Disclaimer</span>
            <span>Editorial Policy</span>
            <span>Source Policy</span>
            <span>Privacy</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
