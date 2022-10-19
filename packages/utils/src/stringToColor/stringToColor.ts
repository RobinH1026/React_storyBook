export default function stringToColor(text: string) {
  if (!text || !text.length) return undefined;

  let hash = 0;
  let i: number;

  /* eslint-disable no-bitwise */
  for (i = 0; i < text.length; i += 1) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  let colour = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += `00${value.toString(16)}`.substr(-2);
  }
  return colour;
}
