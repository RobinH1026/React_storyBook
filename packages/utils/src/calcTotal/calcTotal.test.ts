import calcTotal from "./calcTotal";

it("should get sum of amounts", () => {
  const amounts = [10, 20, 30, 40, 50, 60];
  const amounts2 = [0, 0, 10, 20, 30, 40, 50, 60];
  expect(calcTotal(amounts)).toEqual(210);
  expect(calcTotal(amounts2)).toEqual(210);
});
