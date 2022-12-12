import { defineConfig } from "vitest/config";
import GithubActionsReporter from "vitest-github-actions-reporter";


export default defineConfig({
  test: {
    reporters: process.env.GITHUB_ACTIONS
      ? ["verbose", new GithubActionsReporter()]
      : "default"
  }
});
