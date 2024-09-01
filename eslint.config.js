import sharedRules from "@schoero/configs/eslint";
import eslintPluginTypeScript from "@typescript-eslint/eslint-plugin";
import eslintParserTypeScript from "@typescript-eslint/parser";

/** @type { import("eslint").Linter.Config[] } */
export default [
  ...sharedRules,

  {
    ignores: ["src/shared/qr-code-generator.ts"]
  },
  {
    files: ["**/*.ts"],
    rules: {
      "eslint-plugin-typescript/no-unnecessary-condition": "off"
    }
  },
  {
    files: ["examples/**/*.js", "examples/**/*.ts"],
    rules: {
      "no-undef": "off"
    }
  },
  {
    files: ["vite.config.ts", "vite.config.cjs.ts", "vite.config.bundle.ts"],
    languageOptions: {
      parser: eslintParserTypeScript,
      parserOptions: {
        project: "./tsconfig.vite.json",
        projectService: false
      }
    },
    plugins: {
      "eslint-plugin-typescript": eslintPluginTypeScript
    }
  },
  {
    files: ["examples/**/*.js", "examples/**/*.ts"],
    rules: {
      "eslint-plugin-unicorn/prefer-node-protocol": "off"
    }
  }
];
