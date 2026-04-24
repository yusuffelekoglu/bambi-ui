import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReact from "eslint-plugin-react";

const browserGlobals = {
  alert: "readonly",
  clearTimeout: "readonly",
  console: "readonly",
  document: "readonly",
  localStorage: "readonly",
  navigator: "readonly",
  setTimeout: "readonly",
  window: "readonly",
};

const baseConfig = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**"],
  },
];

/** @type {import("eslint").Linter.Config[]} */
const config = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: browserGlobals,
    },
  },
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    files: ["src/**/*.astro"],
    rules: {},
  },
];

export default config;