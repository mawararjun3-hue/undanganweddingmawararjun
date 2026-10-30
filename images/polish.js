/* polish.js — dimuat paling akhir (memakai $, $$, io dari script.js) */
(() => {
  /* HP spek rendah / hemat data: matikan hiasan berat agar gulir tetap mulus */
  const c = navigator.connection;
  if ((navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 3 || (c && c.saveData))
    document.documentElement.classList.add("lite");

  /* label kecil berbahasa Indonesia di atas tiap judul (melengkapi judul Inggris) */
  const EB = { story: "Kisah Kami", day: "Hari Bahagia", gallery: "Kenangan", rsvp: "RSVP", wishes: "Doa & Ucapan", gift: "Tanda Kasih", find: "Lokasi Acara" };
  Object.entries(EB).forEach(([id, t]) => {
    const h = $("#" + id + " .head"); if (!h) return;
    const e = document.createElement("span");
    e.className = "eyebrow rv"; e.textContent = t; e.setAttribute("aria-hidden", "true");
    h.before(e); io.observe(e);
  });

  /* batas panjang input agar rapi & aman */
  $$("#rsvpForm [name=name],#wishForm [name=name]").forEach(i => { i.maxLength = 60; });
  $$("#rsvpForm textarea,#wishForm textarea").forEach(t => { t.maxLength = 400; });
})();
