import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'off',
    },
  },
  {
    rules: {
      "react/jsx-no-duplicate-props": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
      "jsx-a11y/alt-text": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "prefer-rest-params": "off",
      "prefer-const": "off",
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/next-script-for-ga": "off",
      "@next/next/no-before-interactive-script-outside-document": "off",
      "@next/next/no-page-custom-font": "off",
      // Block reintroduction of top share bars
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXElement Literal[value=/Share this article|Enjoyed this article\? Share it!/i]",
          message:
            "Top share bars are disallowed. Use no top share UI; keep pages clean."
        }
      ]
    },
  },
  {
    files: ['scripts/**/*.{js,cjs,mjs}'],
    rules: {
      '@next/next/no-assign-module-variable': 'off',
    },
  },
];

export default eslintConfig;
