import { describe, expect, it } from "vitest";

import { splitBuffer } from "swissqrbill:tests:utils/buffer";


describe("buffer", () => {

  describe("splitBuffer", () => {

    it("should split the buffer at the correct positions", () => {

      const buffer = Buffer.from("split at every space");
      const separator = Buffer.from(" ");
      const chunks = splitBuffer(buffer, separator);

      expect(chunks.map(chunk => chunk.toString())).toEqual([
        "split",
        "at",
        "every",
        "space"
      ]);

    });

    it("should work with multi character separators", () => {

      const buffer = Buffer.from("split - at - every - multi - character - separator");
      const separator = Buffer.from(" - ");
      const chunks = splitBuffer(buffer, separator);

      expect(chunks.map(chunk => chunk.toString())).toEqual([
        "split",
        "at",
        "every",
        "multi",
        "character",
        "separator"
      ]);

    });

  });

});
