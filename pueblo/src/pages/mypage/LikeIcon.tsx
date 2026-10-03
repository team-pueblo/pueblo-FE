import React from "react";

interface LikeIconProps {
  isFilled?: boolean;
  size?: number;
  color?: string;
  strokeColor?: string;
}

export const LikeIcon: React.FC<LikeIconProps> = ({
  isFilled = false,
  size = 18,
  color = "currentColor",
  strokeColor = "currentColor",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={isFilled ? color : "none"}
      stroke={strokeColor}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable={false}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
};
