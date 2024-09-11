import Link from "next/link";
import { ReactNode } from "react";

interface NavigateButtonProps {
  href: string;
  label?: string; // Optional text label for the button
  icon?: ReactNode; // Optional SVG or icon component
}

export default function NavigateButton({
  href,
  label,
  icon,
}: NavigateButtonProps) {
  return (
    <div className="mt-6 flex justify-center">
      <Link href={href} className="block w-full max-w-md">
        <button className="w-full px-6 py-3 text-base md:text-lg font-medium text-tppPink bg-tppUnSelectedPink rounded-[9px] hover:bg-tppPink hover:text-tppWhite duration-300 whitespace-nowrap flex items-center justify-center">
          {icon ? icon : label}{" "}
          {/* Render the icon if present, otherwise the label */}
        </button>
      </Link>
    </div>
  );
}
