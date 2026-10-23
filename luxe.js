/* luxe.js — dimuat SETELAH script.js (memakai $, $$, io, reduce, HEART, petalBurst dari script.js) */
(() => {
  const mk = (tag, cls, html, st) => { const e = document.createElement(tag); e.className = cls; if (html) e.innerHTML = html; if (st) e.style.cssText = st; return e; };
  const rv = (el) => { io.observe(el); return el; };
  const DIV = '<svg viewBox="0 0 240 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"><path pathLength="1" d="M2 12H96"/><path pathLength="1" d="M144 12H238"/><path pathLength="1" d="M120 3l8 9-8 9-8-9z"/><path pathLength="1" d="M104 12c-6-7-12-7-16 0 5 5 11 5 16 0zM136 12c6-7 12-7 16 0-5 5-11 5-16 0z"/></svg>';

  /* ---- Cover: bismillah, bintang, bingkai, segel bisa diklik ---- */
  $(".cover-in").prepend(mk("p", "ar fade", "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", "--d:.2s"));
  ["#cover", "#hero", "#final"].forEach(s => $(s).append(mk("i", "frame")));
  $("#envelope").addEventListener("click", () => $("#openBtn").click());

  /* ---- Orb cahaya lembut di bagian gelap ---- */
  $$(".sec").forEach(s => {
    const w = mk("div", "sw");
    if (s.classList.contains("dark")) for (let i = 0; i < 3; i++) w.append(mk("i", "orb", "", `width:${70 + Math.random() * 90 | 0}px;height:${70 + Math.random() * 90 | 0}px;left:${Math.random() * 85 | 0}%;top:${20 + Math.random() * 65 | 0}%;animation-delay:${-Math.random() * 10 | 0}s`));
    s.append(w);
  });

  /* ---- Salam pembuka & pembatas ornamen ---- */
  $("#intro .small").before(rv(mk("p", "salam rv", "Assalamu’alaikum Warahmatullahi Wabarakatuh")));
  $("#ayat .small").after(rv(mk("span", "divider rv", DIV)));
  $("#couple .couple").before(rv(mk("span", "divider rv", DIV)));
  $("#day .daydate").after(rv(mk("span", "divider rv", DIV)));

  /* ---- Kalender November 2026 (7 November = hati berdetak) ---- */
  const off = new Date(2026, 10, 1).getDay();
  let h = '<h4>November 2026</h4><div>' + "MSSRKJS".split("").map(d => "<b>" + d + "</b>").join("") + "<span></span>".repeat(off);
  for (let d = 1; d <= 30; d++) h += `<span${d === 7 ? ' class="me"' : ""}>${d}</span>`;
  $("#calBtn").before(rv(mk("div", "cal rv", h + "</div>")));

  /* ---- Penutup: salam ---- */
  $("#final .sign").before(
    rv(mk("p", "salam rv", "Wassalamu’alaikum Warahmatullahi Wabarakatuh", "--d:.75s;font-size:1.5rem;margin-top:1.4rem"))
  );

  /* ---- Foto cadangan jika file belum ada ---- */
  const fb = (img, list) => { if (!img) return; let i = 0; img.onerror = function () { if (i < list.length) this.src = list[i++]; else this.remove(); }; };
  fb($("#cine img"), ["images/10.jpg", "images/11.jpg", "images/01.jpg"]);
  fb($("#final img"), ["images/11.jpg", "images/01.jpg"]);

  /* ---- Lentera doa: tombol Aamiin & setelah kirim ucapan ---- */
  const lw = mk("div", "lanterns"); document.body.append(lw);
  function lanterns(n = 6) {
    if (reduce) return;
    for (let i = 0; i < n; i++) {
      const l = mk("i", "ln", "", `left:${8 + Math.random() * 84}%;--t:${8 + Math.random() * 5}s;width:${22 + Math.random() * 12 | 0}px;height:${30 + Math.random() * 14 | 0}px;animation-delay:${(i * .45).toFixed(2)}s,0s`);
      l.addEventListener("animationend", e => { if (e.animationName === "lnUp") l.remove(); });
      lw.append(l);
    }
  }
  const amin = mk("div", "amin rv", '<button class="btn" type="button">AAMIIN · LEPASKAN LENTERA DOA</button>');
  $("#wishes .head").after(rv(amin));
  amin.firstChild.addEventListener("click", () => { lanterns(7); petalBurst(innerWidth / 2, innerHeight * .75, 30, true); toast("Aamiin. Semoga doa-doa baik menyertai kita."); });
  $("#wishForm").addEventListener("submit", e => { if (e.target.dataset.busy) lanterns(6); });

  /* ---- Sentuh layar = hati kecil melayang ---- */
  document.addEventListener("pointerdown", e => {
    if (reduce || !$("#cover").classList.contains("gone")) return;
    if (e.target.closest("a,button,input,textarea,select,label,.slide,#lb,.dock,.music,.autoscroll")) return;
    for (let i = 0; i < 4; i++) {
      const t = mk("i", "tapheart", HEART, `left:${e.clientX}px;top:${e.clientY}px;--dx:${(Math.random() - .5) * 90 | 0}px;--r:${(Math.random() - .5) * 60 | 0}deg;animation-delay:${i * .08}s`);
      t.addEventListener("animationend", () => t.remove()); document.body.append(t);
    }
  }, { passive: true });

  /* ---- Detik hitung mundur berdenyut ---- */
  setInterval(() => { const s = $("#cdS"); s.classList.remove("pop"); void s.offsetWidth; s.classList.add("pop"); }, 1000);

  /* ---- Gulir otomatis adaptif: melambat di teks/kutipan/foto agar sempat dibaca & dirasakan ---- */
  const lg = $$(".serif-q,.ar,.intro-names,.quote,.head,.person,.event,.cal,.gift,.doa");
  let sf = 1;
  function target() {
    const vh = innerHeight, mid = vh / 2; let f = 1;
    for (const e of lg) {
      const r = e.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) continue;
      f = Math.min(f, .4 + .6 * Math.min(1, Math.abs((r.top + r.bottom) / 2 - mid) / (vh * .32)));
    }
    return f;
  }
  autoFrame = function (t) {
    if (!autoOn) return;
    const dt = Math.min((t - autoLast) / 1000, .1); autoLast = t;
    if (document.body.classList.contains("locked")) { autoPos = scrollY; autoRaf = requestAnimationFrame(autoFrame); return; }
    if (Math.abs(scrollY - autoPos) > 3) { autoStop(); return; }
    sf += (target() - sf) * .06;
    autoPos += AUTO_SPEED * sf * dt;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (autoPos >= max - 1) { scrollTo({ top: max, behavior: "instant" }); autoStop(); return; }
    scrollTo({ top: autoPos, behavior: "instant" });
    autoRaf = requestAnimationFrame(autoFrame);
  };
})();

/* ===== Ilustrasi bunga rumit + efek miring foto ===== */
(() => {
  const mk = (tag, cls, html) => { const e = document.createElement(tag); e.className = cls; e.innerHTML = html; return e; };
  let rz = '<g fill="currentColor" fill-opacity=".1" stroke="currentColor" stroke-width="1">';
  for (let k = 0; k < 5; k++) rz += `<path d="M50 50C36 40 34 20 50 8C66 20 64 40 50 50Z" transform="rotate(${k * 72} 50 50)"/>`;
  for (let k = 0; k < 5; k++) rz += `<path d="M50 50C42 43 41 31 50 22C59 31 58 43 50 50Z" transform="rotate(${k * 72 + 36} 50 50)"/>`;
  rz += '<path fill="none" d="M50 50c-3-3-1-7 2-7 4 0 5 5 2 8-3 4-10 3-12-2-2-6 3-12 10-12 8 0 12 8 8 15"/><circle cx="50" cy="50" r="1.6" fill="currentColor" stroke="none"/></g>';
  const lf = '<g fill="currentColor" fill-opacity=".12" stroke="currentColor" stroke-width="1"><path d="M0 0C8-10 24-10 34 0C24 10 8 10 0 0Z"/><path fill="none" d="M2 0H30"/></g>';
  document.body.append(mk("div", "", `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><symbol id="rz" viewBox="0 0 100 100">${rz}</symbol><symbol id="lf" viewBox="-2 -12 40 24">${lf}</symbol></defs></svg>`));
  const R = (x, y, w, c = "rz") => `<use class="${c}" href="#rz" x="${x}" y="${y}" width="${w}" height="${w}"/>`;
  const L = (x, y, a) => `<g transform="translate(${x} ${y}) rotate(${a})"><use href="#lf" y="-10" width="34" height="20"/></g>`;
  const S = (d) => `<path d="${d}" fill="none" stroke="currentColor" stroke-width="1"/>`;

  /* karangan simetris */
  const half = S("M170 44C130 44 100 36 50 30") + L(135, 43, 195) + L(108, 39, 160) + L(82, 35, 200) + L(58, 31, 165) + R(60, 6, 36) + R(94, 24, 30) + '<circle cx="42" cy="29" r="3" fill="currentColor"/>';
  const garland = `<svg viewBox="0 0 340 80" aria-hidden="true">${half}<g transform="translate(340 0) scale(-1 1)">${half}</g>${R(140, 10, 60)}</svg>`;
  ["ayat", "couple", "day", "rsvp", "gift"].forEach(id => { const g = mk("span", "garland rv", garland); $("#" + id + " .orn").after(g); io.observe(g); });

  /* buket di sudut cover & penutup */
  const bq = `<svg viewBox="0 0 200 200" aria-hidden="true">${S("M0 200C40 150 70 110 120 80")}${S("M0 200C60 170 110 160 170 120")}${S("M0 200C30 140 40 90 70 40")}${L(30, 160, -50)}${L(70, 130, -35)}${L(90, 172, -20)}${L(20, 120, -75)}${L(120, 150, -25)}${R(92, 52, 56)}${R(48, 14, 44)}${R(146, 98, 40)}${R(14, 100, 34, "")}</svg>`;
  ["#cover", "#final"].forEach(s => ["bl", "tr"].forEach(p => { const b = mk("i", "bq " + p, bq); $(s).append(b); io.observe(b); }));

  /* mahkota bunga di atas foto mempelai */
  const side = R(16, 8, 30) + L(14, 34, 195) + L(40, 38, 160);
  const crown = `<svg viewBox="0 0 150 50" aria-hidden="true">${side}<g transform="translate(150 0) scale(-1 1)">${side}</g>${R(53, 0, 44)}</svg>`;
  $$(".person").forEach(p => { const c = mk("i", "crown rv", crown); p.append(c); io.observe(c); });

  /* miring: gyro di HP, mouse di laptop */
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let tx = 0, ty = 0, cx = 0, cy = 0, bg = null, bb = null, gyro = false, run = false;
  const clamp = v => Math.max(-1, Math.min(1, v));
  const loop = () => {
    cx += (tx - cx) * .12; cy += (ty - cy) * .12;
    document.body.style.setProperty("--tx", cx.toFixed(2)); document.body.style.setProperty("--ty", cy.toFixed(2));
    if (Math.abs(tx - cx) + Math.abs(ty - cy) > .01) requestAnimationFrame(loop); else run = false;
  };
  const kick = () => { if (!run) { run = true; requestAnimationFrame(loop); } };
  const onOri = e => {
    if (e.gamma == null || e.beta == null) return;
    gyro = true;
    if (bg === null) { bg = e.gamma; bb = e.beta; }
    bg += (e.gamma - bg) * .01; bb += (e.beta - bb) * .01;   // titik acuan menyesuaikan posisi pegangan
    tx = clamp((e.gamma - bg) / 22); ty = clamp((e.beta - bb) / 22); kick();
  };
  $("#openBtn").addEventListener("click", () => {
    const D = window.DeviceOrientationEvent;
    if (D && typeof D.requestPermission === "function") D.requestPermission().then(r => { if (r === "granted") addEventListener("deviceorientation", onOri); }).catch(() => { });
    else addEventListener("deviceorientation", onOri);
  });
  if (matchMedia("(hover:hover)").matches) addEventListener("pointermove", e => {
    if (gyro) return;
    tx = clamp((e.clientX / innerWidth - .5) * 2); ty = clamp((e.clientY / innerHeight - .5) * 2); kick();
  }, { passive: true });
})();

/* ===== Kelopak, cover sinematik, kilau emas, form mewah ===== */
(() => {
  const mk = (tag, cls, html, st) => { const e = document.createElement(tag); e.className = cls; if (html) e.innerHTML = html; if (st) e.style.cssText = st; return e; };
  const rnd = (a, b) => a + Math.random() * (b - a);

  /* kelopak mawar melayang di tiap bagian & cover */
  const petals = (host, n, dy) => {
    for (let i = 0; i < n; i++) {
      const w = rnd(10, 20) | 0;
      host.append(mk("i", "pt", "", `left:${rnd(0, 95) | 0}%;width:${w}px;height:${w * 1.2 | 0}px;--dx:${rnd(-80, 80) | 0}px;--dy:${dy}px;--r:${rnd(120, 420) | 0}deg;animation-duration:${rnd(16, 28).toFixed(1)}s;animation-delay:${(-rnd(0, 24)).toFixed(1)}s`));
    }
  };
  $$(".sec").forEach(s => petals(s.querySelector(".sw"), s.classList.contains("dark") ? 7 : 5, Math.max(s.offsetHeight, 700) + 60));
  const cw = mk("div", "sw"); cw.append(mk("i", "bloom")); petals(cw, 8, innerHeight + 60); $("#cover").prepend(cw);

  /* nama di cover muncul huruf demi huruf + garis emas */
  const nm = $(".names"); let idx = 0;
  nm.setAttribute("aria-label", "Mawar & Arjun");
  [...nm.childNodes].forEach(n => {
    if (n.nodeType === 3) {
      const wd = mk("i", "wd");
      [...n.textContent].forEach(c => wd.append(mk("i", "ltr", c, `--i:${idx++}`)));
      n.replaceWith(wd);
    } else idx += 2;
  });
  nm.after(mk("i", "gl"));

  /* kilau emas */
  $$(".names,.big,.head,.sign").forEach(t => {
    for (let i = 0; i < 3; i++) t.append(mk("i", "spk", "", `left:${rnd(2, 96) | 0}%;top:${rnd(-10, 90) | 0}%;--s:${rnd(9, 17) | 0}px;animation-delay:${(-rnd(0, 5)).toFixed(1)}s;animation-duration:${rnd(3, 5.5).toFixed(1)}s`));
  });

  /* hiasan di atas form RSVP & ucapan */
  const crest = '<svg viewBox="0 0 220 44" aria-hidden="true"><path d="M10 22H84M136 22H210" stroke="currentColor" fill="none"/><use class="rz" href="#rz" x="88" y="2" width="44" height="44"/><circle cx="10" cy="22" r="2.5" fill="currentColor"/><circle cx="210" cy="22" r="2.5" fill="currentColor"/></svg>';
  ["#rsvpForm", "#wishForm"].forEach(f => { const c = mk("div", "crest rv", crest); $(f).before(c); io.observe(c); });
  $("#rsvpForm").addEventListener("submit", e => { if (e.target.dataset.busy) petalBurst(innerWidth / 2, innerHeight * .6, 40, true); });
})();

/* ===== Garis waktu, gift, galeri, transisi variatif ===== */
(() => {
  const mk = (tag, cls, html, st) => { const e = document.createElement(tag); e.className = cls; if (html) e.innerHTML = html; if (st) e.style.cssText = st; return e; };
  const rnd = (a, b) => a + Math.random() * (b - a);

  /* garis waktu bercahaya mengikuti gulir */
  const st = $("#story"), chs = $$("#story .chapter");
  if (st && chs.length) {
    const tl = mk("div", "tl", "<b></b><i></i>"); st.prepend(tl);
    chs.forEach(c => c.prepend(mk("i", "tn")));
    let top = 0, h = 1, last = -1e4, tk = false;
    const measure = () => {
      top = chs[0].offsetTop + 12; const e = chs[chs.length - 1];
      h = Math.max(1, e.offsetTop + e.offsetHeight - top - 40);
      tl.style.cssText = `left:${chs[0].offsetLeft}px;top:${top}px;height:${h}px`;
    };
    const upd = () => {
      const now = performance.now(); if (now - last > 800) { measure(); last = now; }
      const mid = innerHeight * .55, p = Math.max(0, Math.min(1, (mid - st.getBoundingClientRect().top - top) / h));
      tl.firstChild.style.transform = `scaleY(${p.toFixed(3)})`;
      tl.lastChild.style.transform = `translateY(${(p * h).toFixed(1)}px)`;
      chs.forEach(c => c.firstChild.classList.toggle("lit", c.getBoundingClientRect().top < mid));
    };
    addEventListener("scroll", () => { if (!tk) { tk = true; requestAnimationFrame(() => { tk = false; upd(); }); } }, { passive: true });
    addEventListener("resize", () => { last = -1e4; upd(); }); addEventListener("load", () => { last = -1e4; upd(); }); upd();
  }

  /* kartu gift berkilau + hati saat salin rekening */
  $$(".gift").forEach(g => g.append(mk("i", "sh")));
  $$(".gc-copy").forEach(b => b.addEventListener("click", () => { const r = b.getBoundingClientRect(); petalBurst(r.left + r.width / 2, r.top, 14, true); }));

  /* karangan bunga juga di Galeri & Find Us */
  const src = $(".garland");
  if (src) ["#gallery", "#find"].forEach(id => { const g = src.cloneNode(true); g.classList.remove("in"); $(id + " .orn").after(g); io.observe(g); });

  /* jenis transisi berbeda untuk tiap elemen */
  const fx = (sel, list) => $$(sel).forEach((e, i) => { if (!e.dataset.fx) e.dataset.fx = list[i % list.length]; });
  fx("#story .chapter", ["left", "right"]); fx(".person", ["left", "right"]); fx(".event", ["wipe"]);
  fx(".gift", ["flip"]); fx(".form", ["rise"]); fx(".crest,.cal,.amin", ["bloom"]);

  /* tirai cahaya romantis saat masuk bagian baru */
  const cols = ["rgba(244,182,198,.5)", "rgba(241,220,174,.4)", "rgba(217,91,124,.32)"], seen = new Set(); let ci = 0;
  const vio = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting || seen.has(en.target) || !$("#cover").classList.contains("gone")) return;
    seen.add(en.target); if (reduce) return;
    const v = mk("i", "veil", "", `--vx:${rnd(15, 85) | 0}%;--vc:${cols[ci++ % 3]}`);
    v.addEventListener("animationend", () => v.remove()); document.body.append(v);
  }), { rootMargin: "0px 0px -45% 0px", threshold: 0 });
  $$(".sec").forEach(s => vio.observe(s));
})();
