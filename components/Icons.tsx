// components/icons.tsx
import type { FC } from 'react';

interface IconProps {
  className?: string;
}

export const ActsIcon: FC<IconProps> = ({ className }) => (
  <svg 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className || "text-orange-600"}
  >
    <path 
      d="M16 4C17.5 7 19.5 8.5 22 9C19.5 9.5 17.5 11 16 14C14.5 11 12.5 9.5 10 9C12.5 8.5 14.5 7 16 4Z" 
      fill="currentColor"
    />
  </svg>
);

export const PrayerIcon: FC<IconProps> = ({ className }) => (
  <svg 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className || "text-orange-600"}
  >
    <path 
      d="M16 5C14 8 13 12 13 16C13 20 14 24 16 27C18 24 19 20 19 16C19 12 18 8 16 5Z" 
      fill="currentColor"
    />
  </svg>
);

export const ParableIcon: FC<IconProps> = ({ className }) => (
  <svg 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className || "text-orange-600"}
  >
    <path 
      d="M6 4H26V28H6V4Z" 
      stroke="currentColor" 
      strokeWidth="2"
      fill="none"
    />
    <path 
      d="M10 8H22M10 16H22M10 24H18" 
      stroke="currentColor" 
      strokeWidth="2"
    />
  </svg>
);

export const CrossIcon: FC<IconProps> = ({ className }) => (
  <svg 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className || "text-orange-600"}
  >
    <path 
      d="M16 4V28M10 16H22" 
      stroke="currentColor" 
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);