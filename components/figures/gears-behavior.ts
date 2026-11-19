// Interactive behaviour for the gears drawing: a motor that turns the train, drag any gear to spin it,
// hover a gear and the whole train speeds up.
// Ported from the original imperative script, so it works on the figure's DOM directly.
// @ts-nocheck
export function initGears(root: HTMLElement): () => void {
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
  const plane = svg.querySelector("[data-plane]"); // the driver's top face: its own x/y plane, centred on the axle
  const T = [30,14,22,11], D = [1,-1,1,-1];
  const spins = [...svg.querySelectorAll("[data-g]")].map((el) => [el, +el.dataset.g]);
  const BASE = 360 / 7.2; // driver speed, degrees per second
  const calm = matchMedia("(prefers-reduced-motion: reduce)");
  let angle = 0, vel = 0, target = 0, raf = 0, prev = 0, drag = null;
  function paint() {
    spins.forEach(([el, g]) => { el.style.transform = "rotate(" + (angle * (T[0] / T[g]) * D[g]).toFixed(2) + "deg)"; });
    root.toggleAttribute("data-run", Math.abs(vel) > 4 || !!drag);
  }
  function frame(t) {
    const dt = Math.min(0.05, (t - (prev || t)) / 1000);
    prev = t;
    if (!drag) { vel += (target - vel) * Math.min(1, dt * 1.4); angle += vel * dt; }
    paint();
    raf = requestAnimationFrame(frame);
  }
  function run(on) { if (on && !raf) { prev = 0; raf = requestAnimationFrame(frame); } else if (!on && raf) { cancelAnimationFrame(raf); raf = 0; } }
  IO((e) => run(e[e.length - 1].isIntersecting), { threshold: 0 }).observe(svg);
  // drag the train round by any gear; letting go keeps the spin, which eases back to the motor's speed
  function angleAt(e) {
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(plane.getScreenCTM().inverse());
    return Math.atan2(p.y, p.x) * 180 / Math.PI;
  }
  svg.addEventListener("pointerdown", (e) => {
    if (!e.target.closest(".gr-gear, .gr-crank")) return;
    e.preventDefault();
    svg.setPointerCapture(e.pointerId);
    drag = { a: angleAt(e), t: performance.now() };
    root.setAttribute("data-drag", "");
  });
  svg.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const a = angleAt(e), now = performance.now();
    let d = a - drag.a;
    if (d > 180) d -= 360; else if (d < -180) d += 360;
    angle += d;
    vel = vel * 0.6 + (d / Math.max(0.008, (now - drag.t) / 1000)) * 0.4;
    drag = { a, t: now };
    paint();
  });
  function release() { if (!drag) return; drag = null; root.removeAttribute("data-drag"); if (calm.matches) vel = 0; }
  svg.addEventListener("pointerup", release);
  svg.addEventListener("pointercancel", release);
  // hover a gear: it lights up and the whole train spins up; leave and it eases back
  svg.addEventListener("pointerover", (e) => {
    const hot = !!e.target.closest(".gr-gear, .gr-crank");
    root.toggleAttribute("data-hot", hot);
    if (!calm.matches) target = hot ? BASE * 2.6 : BASE;
  });
  svg.addEventListener("pointerleave", () => { root.removeAttribute("data-hot"); if (!calm.matches) target = BASE; });
  target = calm.matches ? 0 : BASE;
  return () => {
    run(false)
    observers.forEach((o) => o.disconnect())
  }
}
