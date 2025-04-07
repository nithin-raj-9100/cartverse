import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  const displayAmount = amount >= 100 ? amount / 100 : amount;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: displayAmount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(displayAmount);
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
