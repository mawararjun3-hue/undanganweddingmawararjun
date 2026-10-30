/* romance.js — hashtag penutup + hati melayang (dimuat paling akhir) */
(() => {
  const fin = document.getElementById("final");
  if (!fin) return;
  const rnd = (a, b) => a + Math.random() * (b - a);

  /* hashtag: pecah per huruf agar muncul satu per satu */
  const ht = document.getElementById("htBtn");
  if (ht) {
    const t = ht.textContent.trim();
    ht.setAttribute("aria-label", "Salin hashtag " + t);
    ht.innerHTML = [...t].map((c, i) => `<span class="tc" style="--i:${i}" aria-hidden="true">${c}</span>`).join("");
    ht.addEventListener("click", () => {
      const done = () => { toast("Hashtag " + t + " disalin. Terima kasih!"); const r = ht.getBoundingClientRect(); petalBurst(r.left + r.width / 2, r.top + r.height / 2, 18, true); };
      (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(done).catch(done);
    });
  }

  /* hati-hati kecil melayang naik di penutup */
  const box = document.createElement("div"); box.className = "fhearts"; box.setAttribute("aria-hidden", "true");
  for (let i = 0; i < 14; i++) {
    const h = document.createElement("i"); h.className = "fh"; h.textContent = "♥";
    h.style.cssText = `--l:${rnd(4, 94).toFixed(1)}%;--s:${rnd(.7, 1.5).toFixed(2)}rem;--t:${rnd(9, 16).toFixed(1)}s;--dl:${(-rnd(0, 14)).toFixed(1)}s;--dx:${rnd(-40, 40) | 0}px`;
    box.append(h);
  }
  fin.append(box);
})();
