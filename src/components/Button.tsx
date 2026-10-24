import React, { ButtonHTMLAttributes } from "react";
import { Sound } from "../lib/sound";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  onClick,
  ...props
}: ButtonProps) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    Sound.init();
    Sound.uiClick();
    if (onClick) onClick(e);
  }

  const baseClass = "btn";
  const variantClass = `btn-${variant}`;
  const sizeClass = size !== "md" ? `btn-${size}` : "";
  const widthClass = fullWidth ? "w-full" : "";

  const finalClass = [baseClass, variantClass, sizeClass, widthClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={finalClass} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
