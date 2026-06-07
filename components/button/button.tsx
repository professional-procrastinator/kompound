import React from "react";

export default function Button({
  children,
  className,
  click,
  loading,
  primary,
}: {
  children: React.ReactNode;
  className?: string;
  click?: () => void;
  loading?: boolean;
  primary?: boolean;
}) {
  return (
    <div
      onClick={!loading ? click : undefined}
      className={`${className} ${primary ? "bg-(--foreground)" : "bg-green-700"} 
        px-12 py-5 border-4 text-(--background) font-semibold text-[18px] rounded-xl border-(--border_brown) hover:cursor-pointer
      `}
    >
      {children}
    </div>
  );
}
