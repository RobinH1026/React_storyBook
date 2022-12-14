/**
 * Sum of number array.
 * @param array
 * @returns
 */
const calcTotal = (array: number[]) => array.reduce((a, b) => a + b, 0);

export default calcTotal;
