import Image from "next/image";
import { appIcons } from "@/content/profile";
import type { AppIconName } from "@/lib/types";

type AppIconProps = {
  name: AppIconName;
  size: number;
  className?: string;
};

export function AppIcon({ name, size, className = "" }: AppIconProps) {
  return (
    <Image
      src={appIcons[name]}
      alt=""
      aria-hidden
      width={size}
      height={size}
      className={`shrink-0 select-none ${className}`}
      draggable={false}
    />
  );
}
