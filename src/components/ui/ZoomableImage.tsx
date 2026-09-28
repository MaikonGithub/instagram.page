"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ZoomableImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function ZoomableImage({ src, alt, className = "", sizes, priority }: ZoomableImageProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="absolute inset-0 cursor-zoom-in"
        aria-label={`Ampliar ${alt}`}
      >
        <Image src={src} alt={alt} fill className={className} sizes={sizes} priority={priority} />
      </button>
      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-6"
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white"
            >
              Fechar
            </button>
            <div
              className="relative h-[min(90vh,1200px)] w-[min(92vw,1200px)]"
              onClick={(event) => event.stopPropagation()}
            >
              <Image src={src} alt={alt} fill className="object-contain" sizes="92vw" />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
