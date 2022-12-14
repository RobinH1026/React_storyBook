/**
 * Use ratio to get padding-top percent for RWD image or Iframe.
 * @param ratio
 * @returns
 */
export default function calcPaddingTop(ratio: string) {
  const array = ratio.split(":");
  const denominator = parseInt(array[0], 10);
  const numerator = parseInt(array[1], 10);
  return `${(numerator / denominator) * 100}%`;
}
