// Interactive behaviour for the desk drawing: a self-typing editor, keys that press under the cursor,
// a mouse that follows the pointer and a phone that wakes when you get close.
// Ported from the original imperative script, so it works on the figure's DOM directly.
// @ts-nocheck
import deskData from "@/lib/desk-data.json"
import { axisVector } from "@/lib/iso"

const D: any = deskData

export function initDesk(root: HTMLElement): () => void {
  const disposers: (() => void)[] = []
  const observers: IntersectionObserver[] = []
  const listen = (target: EventTarget, type: string, fn: any, opts?: any) => {
    target.addEventListener(type, fn, opts)
    disposers.push(() => target.removeEventListener(type, fn, opts))
  }
  const IO = (cb: IntersectionObserverCallback, opts?: IntersectionObserverInit) => {
    const o = new IntersectionObserver(cb, opts)
    observers.push(o)
    return o
  }
  const svg = root.querySelector("svg");
  const readout = root.querySelector("[data-readout]");
  const caret = svg.querySelector("[data-caret]");
  const frame = svg.querySelector("[data-frame]");
  const parts = [...svg.querySelectorAll("[data-part]")];
  const keyEls = D.keys.map((_, i) => svg.querySelector('[data-k="' + i + '"]'));
  const phone = svg.querySelector("[data-phone]");
  const segEls = D.code.map((line, i) => line.segs.map((_, j) => svg.querySelector('[data-l="' + i + '"][data-s="' + j + '"]')));
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  const LETTERS = "qwertyuiopasdfghjklzxcvbnm".split("").map((c) => D.keys.indexOf(c));
  const ENTER = D.keys.indexOf("Enter"), SPACE = D.keys.indexOf(" "), SHIFT = D.keys.indexOf("Shift");
  const down = axisVector({"origin":[332.33216278837256,278.3143792944632],"scale":1.3421853991714627,"azimuth":63,"elevation":30}, [0, 0, -0.9]);
  let timers = [], running = false, lines = 0, builds = 0;
  const wait = (ms) => new Promise((res) => timers.push(setTimeout(res, ms)));
  function say() { if (readout) readout.textContent = lines + " lines · " + builds + (builds === 1 ? " build" : " builds"); }
  function press(i, ms = 110) {
    const el = keyEls[i];
    if (!el) return;
    el.setAttribute("data-on", "");
    el.setAttribute("transform", "translate(" + down[0].toFixed(2) + " " + down[1].toFixed(2) + ")");
    timers.push(setTimeout(() => { el.removeAttribute("data-on"); el.removeAttribute("transform"); }, ms));
  }
  function place(x, y) { caret.setAttribute("x", x.toFixed(1)); caret.setAttribute("y", (y - 0.6).toFixed(1)); }
  function reset() {
    segEls.flat().forEach((el) => el.setAttribute("width", "0"));
    parts.forEach((el) => el.removeAttribute("data-on"));
    frame.removeAttribute("data-built");
    place(D.code[0].segs[0].x, D.code[0].y);
  }
  async function typeLine(i) {
    const line = D.code[i];
    root.setAttribute("data-busy", "");
    for (let j = 0; j < line.segs.length; j++) {
      const s = line.segs[j];
      for (let w = 0; w < s.w; w += 1.6) {
        if (!running) return;
        const now = Math.min(s.w, w + 1.6);
        segEls[i][j].setAttribute("width", now.toFixed(1));
        place(s.x + now + 0.4, line.y);
        if (Math.random() < 0.08) press(SHIFT, 150);
        press(LETTERS[Math.floor(Math.random() * LETTERS.length)]);
        await wait(55 + Math.random() * 70);
      }
      press(SPACE);
      await wait(90);
    }
    press(ENTER, 150);
    lines++; say();
    timers.push(setTimeout(() => root.removeAttribute("data-busy"), 900));
  }
  async function loop() {
    while (running) {
      reset();
      await wait(700);
      for (let i = 0; i < D.code.length && running; i++) {
        await typeLine(i);
        const show = Math.floor(((i + 1) / D.code.length) * D.parts) - 1;
        parts.forEach((el, n) => {
          if (n <= show && !el.hasAttribute("data-on")) { el.setAttribute("data-on", ""); el.setAttribute("data-new", ""); timers.push(setTimeout(() => el.removeAttribute("data-new"), 900)); }
        });
        await wait(160);
      }
      if (!running) return;
      frame.setAttribute("data-built", "");
      builds++; say();
      phone.setAttribute("data-on", "");
      timers.push(setTimeout(() => phone.removeAttribute("data-on"), 2400));
      await wait(3200);
    }
  }
  function start() { if (running || still.matches) return; running = true; loop(); }
  function stop() { running = false; timers.forEach(clearTimeout); timers = []; }
  say();
  if (still.matches) {
    segEls.forEach((line, i) => line.forEach((el, j) => el.setAttribute("width", String(D.code[i].segs[j].w))));
    parts.forEach((el) => el.setAttribute("data-on", ""));
  } else {
    reset();
    IO((entries) => { entries[entries.length - 1].isIntersecting ? start() : stop(); }, { threshold: 0.2 }).observe(svg);
  }
  // ---- hands-on ----
  const r0 = svg.getBoundingClientRect();
  let inView = r0.bottom > 0 && r0.top < innerHeight; // until the observer reports
  IO((entries) => { inView = entries[entries.length - 1].isIntersecting; }, { threshold: 0.2 }).observe(svg);
  const keyAt = (i) => keyEls[i] && keyEls[i].closest("[data-k]");
  // run the pointer across the keyboard and each key it crosses goes down
  svg.addEventListener("pointerover", (e) => {
    const k = e.target.closest("[data-k]");
    if (k) press(+k.dataset.k, 160);
  });
  // real typing presses the same keys while the desk is on screen
  const NAMED = { " ": " ", Enter: "Enter", Backspace: "Backspace", Tab: "Tab", CapsLock: "Caps" };
  const CODED = { ShiftLeft: "Shift", ShiftRight: "ShiftR", ControlLeft: "Ctrl", ControlRight: "CtrlR", AltLeft: "Alt", AltRight: "AltR" };
  listen(document, "keydown", (e) => {
    if (!inView || e.metaKey || e.ctrlKey && !CODED[e.code]) return;
    const t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    const name = CODED[e.code] || NAMED[e.key] || (e.key.length === 1 ? e.key.toLowerCase() : null);
    const i = name == null ? -1 : D.keys.indexOf(name);
    if (i < 0) return;
    press(i, 140);
    root.setAttribute("data-busy", "");
    clearTimeout(press.busy);
    press.busy = setTimeout(() => root.removeAttribute("data-busy"), 700);
  });
  // click the monitor: a build goes out, the preview flashes and the phone pings
  function notify() {
    phone.setAttribute("data-on", "");
    clearTimeout(notify.t);
    notify.t = setTimeout(() => phone.removeAttribute("data-on"), 2200);
  }
  svg.querySelector("[data-monitor]").addEventListener("click", () => {
    frame.removeAttribute("data-flash"); void frame.getBoundingClientRect(); frame.setAttribute("data-flash", "");
    frame.setAttribute("data-built", "");
    builds++; say();
    setTimeout(() => frame.removeAttribute("data-flash"), 700);
    notify();
  });
  svg.querySelector("[data-phone]").addEventListener("click", notify);
  const mouseEl = svg.querySelector("[data-mouse]");
  // the desk mouse follows your cursor across the pad; the phone wakes and buzzes when you get close
  const MOUSE_REACH = 9, PHONE_RADIUS = 70, PHONE_AT = [141, 285];
  let mTarget = [0, 0], mNow = [0, 0], mRaf = 0;
  function mouseStep() {
    mNow[0] += (mTarget[0] - mNow[0]) * 0.14;
    mNow[1] += (mTarget[1] - mNow[1]) * 0.14;
    mouseEl.style.setProperty("--mx", mNow[0].toFixed(2) + "px");
    mouseEl.style.setProperty("--my", mNow[1].toFixed(2) + "px");
    mRaf = Math.hypot(mTarget[0] - mNow[0], mTarget[1] - mNow[1]) > 0.02 ? requestAnimationFrame(mouseStep) : 0;
  }
  function aim(x, y) { mTarget = [x, y]; if (!mRaf) mRaf = requestAnimationFrame(mouseStep); }
  listen(document, "pointermove", (e) => {
    if (still.matches || e.pointerType === "touch") return;
    const m = svg.getScreenCTM();
    if (!m || !inView) return;
    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    const vb = svg.viewBox.baseVal;
    const nx = Math.max(-1, Math.min(1, (pt.x - (vb.x + vb.width / 2)) / (vb.width / 2)));
    const ny = Math.max(-1, Math.min(1, (pt.y - (vb.y + vb.height / 2)) / (vb.height / 2)));
    aim(nx * MOUSE_REACH, ny * MOUSE_REACH * 0.6);
    if (Math.hypot(pt.x - PHONE_AT[0], pt.y - PHONE_AT[1]) < PHONE_RADIUS) phone.setAttribute("data-near", "");
    else phone.removeAttribute("data-near");
  });
  listen(document, "pointerleave", () => { aim(0, 0); phone.removeAttribute("data-near"); });
  mouseEl.addEventListener("pointerdown", () => mouseEl.setAttribute("data-down", ""));
  ["pointerup", "pointerleave"].forEach((t) => mouseEl.addEventListener(t, () => mouseEl.removeAttribute("data-down")));
  return () => {
    stop()
    if (mRaf) cancelAnimationFrame(mRaf)
    disposers.forEach((d) => d())
    observers.forEach((o) => o.disconnect())
  }
}
