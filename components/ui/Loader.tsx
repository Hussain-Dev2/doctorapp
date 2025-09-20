"use client";

import React from "react";

type SpinnerProps = {
  size?: number;
  className?: string;
};

export const Spinner: React.FC<SpinnerProps> = ({ size = 24, className }) => {
  const dimension = `${size}px`;
  return (
    <svg
      className={`animate-spin text-primary ${className ?? ""}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={dimension}
      height={dimension}
      role="status"
      aria-label="Loading"
    >
      <circle
        className="opacity-20 stroke-current"
        cx="12"
        cy="12"
        r="10"
        strokeWidth="4"
      />
      <path
        className="opacity-90 fill-current"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
};

export const PageLoader: React.FC = () => {
  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center">
      <div className="flex items-center gap-3">
        <Spinner size={28} />
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;


