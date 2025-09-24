// --- Utility Function for merging Tailwind classes ---
export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}
