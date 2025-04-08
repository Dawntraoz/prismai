import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  manifest: {
    key: import.meta.env.WEB_EXTENSION_KEY,
    permissions: ['aiLanguageModelOriginTrial'],
    'trial_tokens': [import.meta.env.PROMPT_API_TOKEN]
  }
});
