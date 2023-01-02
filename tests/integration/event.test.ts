import { describe, expect, test } from "vitest";

import { PDF } from "swissqrbill:node/pdf.js";
import { minimalRequired } from "swissqrbill:tests:data/data.js";
import { WritableMemory } from "swissqrbill:tests:utils/writable-memory.js";


describe("Finalize", () => {

  test("Event", async () => {
    const promise = new Promise(resolve => {
      const stream = new WritableMemory();
      const pdf = new PDF(minimalRequired, stream, { autoGenerate: true, size: "A4" });
      pdf.on("finish", () => {
        resolve(true);
      });
    });
    return expect(promise).resolves.toBe(true);
  });

  test("Callback", async () => {
    const promise = new Promise(resolve => {
      const stream = new WritableMemory();
      const pdf = new PDF(minimalRequired, stream, { autoGenerate: true, size: "A4" }, () => {
        resolve(true);
      });
    });
    return expect(promise).resolves.toBe(true);
  });

});
