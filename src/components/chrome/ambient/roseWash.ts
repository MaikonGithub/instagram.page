export function roseWash(roseX: number, roseY: number) {
  return `radial-gradient(1200px 700px at 12% -8%, var(--bg-grad-a), transparent 55%), radial-gradient(980px 760px at ${roseX}% ${roseY}%, var(--bg-grad-b), transparent 52%), linear-gradient(160deg, var(--bg-base), color-mix(in srgb, var(--bg-grad-a) 35%, var(--bg-base)))`;
}
