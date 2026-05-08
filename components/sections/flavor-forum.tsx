"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FlavorForum() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = input.trim();
    if (!name || status === "sending") return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/flavors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();

      if (data.ok) {
        setInput("");
        setStatus("success");
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setErrorMsg(data.message ?? "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Couldn't connect. Try again.");
      setStatus("error");
    }
  }

  return (
    <section
      id="flavor-forum"
      style={{ background: "linear-gradient(180deg, #091912 0%, #0c1f14 100%)" }}
      className="py-20 px-5 border-t border-white/5"
    >
      <div className="max-w-md mx-auto text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7dcea0]/25 bg-[#7dcea0]/8 px-4 py-1.5 mb-5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#7dcea0] animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#7dcea0]">
              Weekly Flavor Request
            </span>
          </div>

          <h2
            className="font-display font-bold text-white leading-[0.95] tracking-[-0.03em] mb-3"
            style={{ fontSize: "clamp(1.9rem, 7vw, 3rem)" }}
          >
            WHAT SHOULD WE<br />
            <span style={{
              background: "linear-gradient(135deg, #7dcea0 0%, #c4f0d5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              DROP NEXT?
            </span>
          </h2>

          <p className="text-white/40 text-sm max-w-xs mx-auto leading-relaxed mb-10">
            Got a flavor idea? Drop it here — we read every request and the best ones make it on the menu.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="rounded-2xl py-8 px-6"
                style={{ background: "rgba(125,206,160,0.08)", border: "1px solid rgba(125,206,160,0.2)" }}
              >
                <div className="text-3xl mb-3">🍵</div>
                <p className="text-[#7dcea0] font-bold text-sm uppercase tracking-widest mb-1">Request Sent!</p>
                <p className="text-white/40 text-sm">We got it — stay tuned for next week&apos;s drop.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl p-5"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={e => { setInput(e.target.value); if (status === "error") setStatus("idle"); }}
                  placeholder="e.g. Brown Sugar Matcha, Lavender Latte..."
                  maxLength={80}
                  className="w-full rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none transition-all mb-3"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: status === "error"
                      ? "1px solid rgba(239,68,68,0.35)"
                      : "1px solid rgba(255,255,255,0.09)",
                  }}
                />

                <button
                  type="submit"
                  disabled={!input.trim() || status === "sending"}
                  className="w-full py-3.5 rounded-xl text-sm font-bold uppercase tracking-[0.08em] transition-all disabled:opacity-35 disabled:cursor-not-allowed"
                  style={{ background: "#7dcea0", color: "#091912" }}
                >
                  {status === "sending" ? "Sending…" : "Submit Request"}
                </button>

                <AnimatePresence>
                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-2.5 text-xs text-red-400 text-left"
                    >
                      {errorMsg}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="mt-5 text-[10px] text-white/20 tracking-wide">
            New special drops weekly · Requests reviewed every Sunday
          </p>
        </motion.div>
      </div>
    </section>
  );
}
