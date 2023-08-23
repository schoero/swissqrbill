/* eslint-disable @typescript-eslint/naming-convention */
import { describe, expect, it } from "vitest";


describe("imports", () => {

  describe("node", async () => {

    const { PDF, SVG, Types, default: nodeDefault, utils, ...rest } = await import("swissqrbill:node");

    it("should have a default export that exports all components", () => {
      expect(nodeDefault).toBeDefined();
      expect(nodeDefault).toHaveProperty("PDF");
      expect(nodeDefault).toHaveProperty("SVG");
      expect(nodeDefault).toHaveProperty("utils");
    });

    it("should export all components separately", () => {
      expect(PDF).toBeDefined();
      expect(SVG).toBeDefined();
      expect(Types).toBeDefined();
      expect(utils).toBeDefined();
    });

    it("should not export any other properties", () => {
      expect(rest).toEqual({});
    });

    it("should export the same components in the default export as in the named exports", () => {
      expect(nodeDefault.PDF).toBe(PDF);
      expect(nodeDefault.SVG).toBe(SVG);
      expect(nodeDefault.utils).toBe(utils);
    });

  });

  describe("browser", async () => {

    const {
      BlobStream,
      PDF,
      SVG,
      Types,
      blobStream,
      default: browserDefault,
      utils,
      ...rest
    } = await import("swissqrbill:browser");

    it("should have a default export that exports all components", () => {
      expect(browserDefault).toBeDefined();
      expect(browserDefault).toHaveProperty("PDF");
      expect(browserDefault).toHaveProperty("SVG");
      expect(browserDefault).toHaveProperty("utils");
      expect(browserDefault).toHaveProperty("BlobStream");
      expect(browserDefault).toHaveProperty("blobStream");
    });

    it("should export all components separately", () => {
      expect(PDF).toBeDefined();
      expect(SVG).toBeDefined();
      expect(Types).toBeDefined();
      expect(utils).toBeDefined();
      expect(BlobStream).toBeDefined();
      expect(blobStream).toBeDefined();
    });

    it("should not export any other properties", () => {
      expect(rest).toEqual({});
    });

    it("should export the same components in the default export as in the named exports", () => {
      expect(browserDefault.PDF).toBe(PDF);
      expect(browserDefault.SVG).toBe(SVG);
      expect(browserDefault.utils).toBe(utils);
      expect(browserDefault.BlobStream).toBe(BlobStream);
      expect(browserDefault.blobStream).toBe(blobStream);
    });

  });

});
