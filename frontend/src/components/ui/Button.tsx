// src/components/ui/Button.tsx
import React from "react";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  className?: string;
};

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}: Props) {
  const base =
    "px-4 py-2 rounded transition font-medium focus:outline-none focus:ring";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300",
    secondary: "bg-gray-300 text-black hover:bg-gray-400 focus:ring-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(base, variants[variant], className)}
    >
      {children}
    </button>
  );
}
