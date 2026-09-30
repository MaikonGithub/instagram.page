export type CardReveal = {
  initial: false | { opacity: number; y: number; scale: number };
  whileInView: { opacity: number; y: number; scale: number };
  viewport: { once: true; amount: number };
  transition: { duration: number; ease: "easeOut" };
};

export function cardReveal(
  reduceMotion: boolean | null,
  isMobile: boolean,
  amount: number,
): CardReveal {
  const enterY = reduceMotion ? 0 : isMobile ? 56 : 28;
  return {
    initial: reduceMotion ? false : { opacity: 0, y: enterY, scale: 0.96 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount },
    transition: { duration: 0.7, ease: "easeOut" },
  };
}
