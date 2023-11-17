// functions.test.js

const { filterStampRate, bankNoFormat } = require("./functions");
const _ = require("lodash"); // Use require for lodash in CommonJS

describe("filterStampRate", () => {
  const customStampMaster = [
    { doc_code: "doc1", renew_doc_code: "time1", stamp_rate: 1 },
    { doc_code: "doc2", renew_doc_code: "time2", stamp_rate: 2 },
    // Add more sample data as needed
  ];

  it("should filter stamp rate for valid input", () => {
    const result = filterStampRate(customStampMaster, "doc1", "time1");
    expect(result).toBe(1);
  });

  it("should return 0 for empty customStampMaster", () => {
    const result = filterStampRate([], "doc1", "time1");
    expect(result).toBe(0);
  });

  it("should return 0 for unknown docType and renewal_time", () => {
    const result = filterStampRate(
      customStampMaster,
      "unknownDocType",
      "unknownTime"
    );
    expect(result).toBe(0);
  });
});

describe("bankNoFormat", () => {
  it("should return 10 for a nil bankName", () => {
    const result = bankNoFormat(null);
    expect(result).toBe(10);
  });

  it('should return [12, 15] for "ออมสิน"', () => {
    const result = bankNoFormat({ value: "ออมสิน" });
    expect(result).toEqual([12, 15]);
  });

  it('should return 14 for "เกียรตินาคิน" or "ทิสโก้"', () => {
    const result1 = bankNoFormat({ value: "เกียรตินาคิน" });
    const result2 = bankNoFormat({ value: "ทิสโก้" });
    expect(result1).toBe(14);
    expect(result2).toBe(14);
  });

  it('should return 12 for "ธอส." or "ธกส."', () => {
    const result1 = bankNoFormat({ value: "ธอส." });
    const result2 = bankNoFormat({ value: "ธกส." });
    expect(result1).toBe(12);
    expect(result2).toBe(12);
  });

  it("should return 10 for other bank names", () => {
    const result = bankNoFormat({ value: "OtherBank" });
    expect(result).toBe(10);
  });
});
