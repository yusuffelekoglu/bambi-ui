import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReact from "eslint-plugin-react";

const browserGlobals = {
	alert: "readonly",
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
		languageOptions: {
			...pluginReact.configs.flat.recommended.languageOptions,
			globals: {
				...browserGlobals,
			},
		},
	},
	{
		plugins: {
			"react-hooks": pluginReactHooks,
		},
		settings: { react: { version: "detect" } },
		rules: {
			...pluginReactHooks.configs.recommended.rules,
			"react/react-in-jsx-scope": "off",
		},
	},
];

export default config;
