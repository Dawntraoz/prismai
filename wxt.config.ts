import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  // To use environment variables in the manifest, you need to use the function syntax: https://wxt.dev/guide/essentials/config/environment-variables.html#manifest
  manifest: () => ({
    key: import.meta.env.WXT_WEB_EXTENSION_KEY,
    permissions: ['aiLanguageModelOriginTrial'],
    'trial_tokens': [import.meta.env.WXT_PROMPT_API_TOKEN]
  }),
});
