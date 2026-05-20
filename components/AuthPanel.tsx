"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);

    await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    alert("Check your email.");
  };

  const signIn = async () => {
    setLoading(true);

    await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    alert("Logged in.");
  };

  return (
    <section>
      <div className="rounded-3xl border border-white/12 bg-white/[0.055] p-6 backdrop-blur-xl">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#FFC857]">
          Account
        </p>

        <h2 className="mt-2 text-3xl font-black text-white">
          Join MQRKT
        </h2>

        <div className="mt-6 grid gap-4 md:max-w-md">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-2xl border border-white/10 bg-[#020617]/50 p-4 text-white outline-none"
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-2xl border border-white/10 bg-[#020617]/50 p-4 text-white outline-none"
          />

          <div className="flex gap-3">
            <button
              onClick={signUp}
              disabled={loading}
              className="rounded-2xl bg-[#FFC857] px-5 py-3 font-black text-black"
            >
              Sign Up
            </button>

            <button
              onClick={signIn}
              disabled={loading}
              className="rounded-2xl bg-[#38BDF8] px-5 py-3 font-black text-black"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}