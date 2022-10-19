import getYtVideoId from "./getYtVideoId";

describe("getYtVideoId", () => {
  it("should get youtube video id", () => {
    const url = "https://www.youtube.com/watch?v=1qrhnK6FGr0";
    const url2 = "https://youtu.be/vjexVOf-s2Y?t=49";
    expect(getYtVideoId(url)).toEqual("1qrhnK6FGr0");
    expect(getYtVideoId(url2)).toEqual("vjexVOf-s2Y");
  });
});
