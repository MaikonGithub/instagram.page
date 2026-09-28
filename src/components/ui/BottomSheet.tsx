"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type BottomSheetProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function BottomSheet({ open, onClose, children }: BottomSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        aria-label="Fechar painel"
        className="absolute inset-0 bg-black/35"
        onClick={onClose}
      />
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.y > 100 || info.velocity.y > 400) onClose();
        }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 380, damping: 36 }}
        className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-auto rounded-t-[28px] safe-pad-bottom"
      >
        <div className="flex justify-center py-2">
          <span className="h-1 w-10 rounded-full bg-white/40" />
        </div>
        {children}
      </motion.div>
    </div>
  );
}
