/**
 * Short name
 * @param username
 * @returns
 */
export default function shortUsername(username: string) {
  if (!username || !username.length) return undefined;

  const isEnglish = /^[A-Za-z0-9]*$/.test(username);
  if (isEnglish) {
    return username.charAt(0).toUpperCase();
  }
  return username.slice(-2);
}
