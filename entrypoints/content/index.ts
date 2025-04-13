import './style.css';
import { createApp } from 'vue';
import App from './App.vue';

// Content Scripts references: https://wxt.dev/guide/essentials/content-scripts
export default defineContentScript({
  matches: ['*://*.google.com/*'], // For production should be: ['<all_urls>'],
  cssInjectionMode: 'ui',
  async main(ctx) {
    console.log('Hello content.');
    const ui = await createShadowRootUi(ctx, {
      name: 'example-ui',
      position: 'inline',
      anchor: 'body',
      onMount: (container) => {
        const app = createApp(App);
        app.mount(container);
        return app;
      },
      onRemove: (app) => {
        app?.unmount();
      },
    });

    ui.mount();
  },
});
