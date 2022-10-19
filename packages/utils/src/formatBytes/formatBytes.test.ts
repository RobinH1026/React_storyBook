import formatBytes from "./formatBytes";

it("should change bytes to size", () => {
  expect(formatBytes(1024)).toEqual("1 KB");
  expect(formatBytes(1234)).toEqual("1.21 KB");
  expect(formatBytes(1234, 3)).toEqual("1.205 KB");
});
