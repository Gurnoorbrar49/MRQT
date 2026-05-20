"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Star } from "lucide-react";

export default function MyWatchlist() {
  const [items, setItems] = useState<any[]>([]);

  const loadWatchlist = async () => {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      setItems([]);
      return;
    }

    const { data } = await supabase
      .from("watchlists")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false });

    setItems(data || []);
  };

  useEffect(() => {
    loadWatchlist();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadWatchlist();
    });

    return () => subscription.unsubscribe();
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1500px] px-4 py-8 lg:px-8">
      <div className="rounded-3xl border border-white/12 bg-white/[0.055] p-6 backdrop-blur-xl">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#FFC857]">
          My Watchlist
        </p>

        <h2 className="mt-2 text-3xl font-black text-white">
          Saved Markets
        </h2>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/12 bg-[#020617]/45 p-4"
            >
              <Star className="mb-3 h-5 w-5 text-[#FFC857]" />
              <p className="font-black text-white">{item.symbol}</p>
              <p className="text-sm text-slate-400">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}