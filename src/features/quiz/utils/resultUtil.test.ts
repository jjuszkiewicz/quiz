import { convertResultToString } from "./resultUtil";

describe("result should be the Diligent failure", () => {
  it("result 0 should be the Diligent failure", () => {
    const result = convertResultToString(0);
    expect(result).toBe("Diligent failure");
  });

  it("result 40 should be the Diligent failure", () => {
    const result = convertResultToString(40);
    expect(result).toBe("Diligent failure");
  });

  it("result 41 should be Failed", () => {
    const result = convertResultToString(41);
    expect(result).toBe("Failed");
  });

  it("result 60 should be Failed", () => {
    const result = convertResultToString(60);
    expect(result).toBe("Failed");
  });

  it("result 61 should be Good", () => {
    const result = convertResultToString(61);
    expect(result).toBe("Good");
  });

  it("result 80 should be the Good", () => {
    const result = convertResultToString(80);
    expect(result).toBe("Good");
  });

  it("result 81 should be Very good", () => {
    const result = convertResultToString(81);
    expect(result).toBe("Very good");
  });

  it("result 90 should be Very good", () => {
    const result = convertResultToString(90);
    expect(result).toBe("Very good");
  });

  it("result 91 should be Excellent", () => {
    const result = convertResultToString(91);
    expect(result).toBe("Excellent");
  });

  it("result 100 should be Excellent", () => {
    const result = convertResultToString(100);
    expect(result).toBe("Excellent");
  });
});