/**
 * Masks a lease code for public display by showing only the first 4 characters
 * and the first 4 characters after the last hyphen, with "..." in between.
 * 
 * @param code - The full lease code (UUID) to mask
 * @returns The masked display string, or empty string if code is invalid
 * 
 * @example
 * maskLeaseCodeForPublicDisplay("1234-5678-90ab-cdef")
 * // returns "1234...cdef"
 */
export function maskLeaseCodeForPublicDisplay(code: string | undefined | null): string {
  // Handle missing, empty, or invalid codes
  if (!code || typeof code !== 'string' || code.trim().length === 0) {
    return '';
  }

  const trimmedCode = code.trim();

  // If the code is too short to mask meaningfully, return empty string
  if (trimmedCode.length < 8) {
    return '';
  }

  // Find the last hyphen
  const lastHyphenIndex = trimmedCode.lastIndexOf('-');

  // Get first 4 characters
  const firstFour = trimmedCode.substring(0, 4);

  // Get first 4 characters after the last hyphen (or last 4 if no hyphen)
  let lastFour: string;
  if (lastHyphenIndex !== -1 && lastHyphenIndex < trimmedCode.length - 1) {
    // There's a hyphen and content after it
    const afterLastHyphen = trimmedCode.substring(lastHyphenIndex + 1);
    lastFour = afterLastHyphen.substring(0, 4);
  } else {
    // No hyphen found, use last 4 characters
    lastFour = trimmedCode.substring(trimmedCode.length - 4);
  }

  return `${firstFour}...${lastFour}`;
}
