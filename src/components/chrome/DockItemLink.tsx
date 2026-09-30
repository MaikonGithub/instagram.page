import { AppIcon } from "@/components/ui/AppIcon";
import type { NavItem } from "@/lib/types";

type DockItemLinkProps = {
  item: NavItem;
  axis: "vertical" | "horizontal";
};

const axisClass = {
  vertical:
    "h-12 w-12 origin-left hover:translate-x-1 hover:scale-110 [&_img]:h-12 [&_img]:w-12",
  horizontal:
    "h-9 w-9 shrink-0 origin-bottom hover:z-10 hover:-translate-y-1 hover:scale-110 [&_img]:h-9 [&_img]:w-9",
} as const;

const labelClass = {
  vertical: "left-full ml-5",
  horizontal: "bottom-full mb-2",
} as const;

export function DockItemLink({ item, axis }: DockItemLinkProps) {
  const size = axis === "vertical" ? 48 : 36;
  return (
    <a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noreferrer" : undefined}
      className={`group relative flex items-center justify-center transition-transform duration-200 ${axisClass[axis]}`}
      aria-label={item.label}
    >
      <AppIcon name={item.icon} size={size} className="drop-shadow-md" />
      <span
        className={`glass-strong pointer-events-none absolute whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100 ${labelClass[axis]}`}
      >
        {item.label}
      </span>
    </a>
  );
}
