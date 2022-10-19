import getDispositionFileName from "./getDispositionFileName";

describe("getDispositionFileName", () => {
  it("should get FileName From Content-Disposition", () => {
    const cd = 'Content-Disposition: attachment; filename="filename.jpg"';
    const cd2 = 'Content-Disposition: attachment; filename="檔案.jpg"';
    expect(getDispositionFileName(cd)).toEqual("filename.jpg");
    expect(getDispositionFileName(cd2)).toEqual(decodeURI("檔案.jpg"));
  });
});
