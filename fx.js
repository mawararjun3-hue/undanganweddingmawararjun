/* fx.js — variasi transisi teks (dimuat paling akhir; memakai $, $$, io dari script.js) */
(() => {
  /* 1) Kutipan yang muncul kata demi kata: tiap kutipan punya gaya berbeda */
  const TX = [
    ["#intro .serif-q", "focus"],
    ["#intro .muted.center", "slideR"],
    ["#intro .intro-names", "flip"],
    ["#hero .quote", "drop"],
    ["#cine .serif-q", "zoom"],
    ["#rsvp .muted.center", "drop"],
    ["#final .quote", "focus"],
    ["#final .sign", "slideL"],
  ];
  TX.forEach(([sel, t]) => $$(sel).forEach(el => { el.dataset.tx = t; }));

  /* 2) Label & judul: efek berbeda-beda, bergantian */
  const FX = [
    [".salam", ["drop"]],
    [".eyebrow", ["spread"]],
    ["#intro .small, #save .small", ["spread"]],
    [".head", ["focus", "drop", "zoom", "bloom", "skew", "focus", "drop"]],
    ["#addr3", ["curtain"]],
  ];
  const lsOf = el => { const v = getComputedStyle(el).letterSpacing; return v === "normal" ? "0px" : v; };
  FX.forEach(([sel, list]) => $$(sel).forEach((el, i) => {
    el.dataset.fx = list[i % list.length];
    if (el.dataset.fx === "spread") el.style.setProperty("--ls", lsOf(el));
  }));

  /* 3) Teks di dalam kartu ikut punya gerak sendiri (muncul sedikit setelah kartunya) */
  const CARD = [
    [".chapter h3", "drop"], [".chapter .txt p", "focus"],
    [".person h3", "focus"], [".person .muted", "rise"],
    [".event h3", "drop"], [".event .time", "focus"], [".event address", "rise"],
    [".gift .acc", "focus"], [".gift .gc-name", "skew"],
  ];
  CARD.forEach(([sel, t]) => $$(sel).forEach(el => {
    if (el.classList.contains("rv")) return;
    el.classList.add("rv");
    el.dataset.fx = t;
    el.style.setProperty("--d", ".35s");
    io.observe(el);
  }));

  /* tombol/kartu yang sudah terlihat saat skrip ini jalan tetap ikut diamati */
  $$(".rv:not(.in)").forEach(el => io.observe(el));
})();
