import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { createBaseConfig } from "@krosoft/tooling-eslint";

interface ReactConfigOptions {
  tsconfigRootDir: string;
  project?: string[];
}

export function createReactConfig(
  options: ReactConfigOptions,
): ReturnType<typeof tseslint.config> {
  return tseslint.config(...createBaseConfig(options), {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "error",
        { allowConstantExport: true },
      ],
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-no-leaked-render": "error",
      "react/jsx-no-useless-fragment": "error",
      "react/self-closing-comp": "error",
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
    },
  });
}

export function createReactLovableConfig(
  options: ReactConfigOptions,
): ReturnType<typeof tseslint.config> {
  return tseslint.config(...createReactConfig(options), {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // Rules incompatible with strictNullChecks: false (Lovable-generated code)
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
      // Rules too noisy for Lovable-generated code
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-useless-default-assignment": "off",
    },
  });
}
