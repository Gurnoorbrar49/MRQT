"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function WatchlistButton({
  symbol,
  name,
}: {
  symbol: string;
  name: string;
}) {
  const [saved, setSaved] = useState(false);

  const toggleSave = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      alert("Please login first.");
      return;
    }

    if (!saved) {
      await supabase.from("watchlists").insert({
        user_id: data.user.id,
        symbol,
        name,
      });

      setSaved(true);
    } else {
      await supabase
        .from("watchlists")
        .delete()
        .eq("user_id", data.user.id)
        .eq("symbol", symbol);

      setSaved(false);
    }
  };

  return (
    <button
      onClick={toggleSave}
      className={`rounded-full p-2 transition ${
        saved
          ? "bg-[#FFC857] text-black"
          : "bg-white/10 text-white hover:bg-white/20"
      }`}
      title="Save to watchlist"
    >
      <Star className="h-4 w-4" />
    </button>
  );
}