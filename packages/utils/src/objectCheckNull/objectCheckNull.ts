
export type Options = {
  // Check if object keys with empty string, default false
  checkEmptyString?: boolean
  // Check if object keys with 0, default false
  checkZero?: boolean
  // Check if object keys with false, default false
  checkFalse?: boolean
}
/**
 * Check if object keys with null or undefined value(Shallow).
 */
export default function objectCheckNull<P>(obj: P, options?: Options) {
  const { checkEmptyString, checkZero, checkFalse } = options || {}
  const originLength = Object.keys(obj).length;
  const vaildLength = Object.values(obj).filter((el) => {
    const conditionEmptyString = checkEmptyString ? el !== "" : true
    const conditionZero = checkZero ? el !== 0 : true
    const conditionFalse = checkFalse ? el !== false : true
    return el != null && conditionEmptyString && conditionZero && conditionFalse
  }).length;
  return originLength !== vaildLength;
}
