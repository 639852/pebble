/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */

const config: import('prettier').Config = {
  $schema: 'https://json.schemastore.org/prettierrc',
  semi: false,
  singleQuote: true,
  printWidth: 150,
  vueIndentScriptAndStyle: false,
  checkIgnorePragma: true,
  singleAttributePerLine: true,
}

export default config
