const isBrowser = typeof navigator !== "undefined";

/**
 * Get browser navigator
 * @param defaultValue
 * @returns
 */
export default function getNavigatorLanguage(defaultValue = "en") {
  if (!isBrowser) return defaultValue;
  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0];
  }
  return navigator.language;
}
