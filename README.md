# PrismAI – Built with WXT, Vue 3, and browser built-in AI APIs

This repository is a demo project created for the talk “**Unlocking the power of Web Extensions with Vue**” by Alba Silvente ([@dawntraoz](https://links.dawntraoz.com/)).

> **Disclaimer**: This project is a showcase of Chrome's built-in AI APIs and Web Extension development using Vue and WXT. The built-in AI APIs are now stable in Chrome 127+. This project may include bugs, performance limitations, or experimental features as it continues to evolve.

## What is PrismAI?

![PrismAI GIF showcase](https://github.com/user-attachments/assets/cbf191ef-6b0f-4120-bc36-2aff87445429)

PrismAI is a browser extension built with Vue 3 and the WXT framework, showcasing how to integrate modern web technologies with built-in browser AI APIs. It enables users to:

- Explore word meanings quickly: When a user selects a word on any web page, PrismAI displays a menu with a description and additional options based on the user's preferences. Using the Prompt API, it can provide deeper insights into the selected text.

- Translate or summarize longer text: For selections longer than a single word, PrismAI leverages integrated AI APIs—such as a Translator & Language Detector and a Summarizer—to translate or generate concise summaries of the selected content.

## Features

A quick overview of what PrismAI offers technically.

### Web Extension components

- **Popup ([entrypoints/popup/](entrypoints/popup/))**: The main user interface for configuring the extension and viewing a summary of current settings.
- **Content Scripts ([entrypoints/content/](entrypoints/content/))**: Injected into web pages to detect selected text, trigger the context menu, and send AI-related requests to the background service.
- **Options Page ([entrypoints/options/](entrypoints/options/))**: Provides a dedicated interface for customizing user preferences, similar to the popup settings.
- **Background ([entrypoints/background/](entrypoints/background/))**: A service worker that handles communication with Chrome’s built-in AI APIs, responding to messages from the content script.

### AI Browser Built-in APIs

PrismAI leverages the following built-in browser AI APIs to deliver its smart features:

- [The Prompt API](https://developer.chrome.com/docs/extensions/ai/prompt-api): Powers menu actions on selected text when it is a word, generating details like descriptions, usage scenarios, or references using custom prompts, often maintaining context within the same user session.
- [Summarizer API](https://developer.chrome.com/docs/ai/summarizer-api): Delivers quick "tl;dr" summaries of selected text.
- [Language Detector API](https://developer.chrome.com/docs/ai/language-detection) & [Translator API](https://developer.chrome.com/docs/ai/translator-api): Work together for translation. First, the source language of selected content is identified, then it's translated into the user's chosen language (set in the extension's preferences).

## Getting Started

### Install and run the project

```sh
# Install dependencies
pnpm install

# Run the project
pnpm dev
```

To load the extension in Chrome:

1. Open [chrome://extensions/](chrome://extensions/) in your Chrome browser.
2. Enable **Developer mode** (toggle in the top-right corner).
3. Click **Load unpacked** and select the folder: `<YOUR_PROJECT_FOLDER_PATH>/.output/chrome-mv3-dev`.

### Testing e2e with Playwright

> Remember to run `pnpm build` before running the tests so the extension exists.

```sh
# Runs the end-to-end tests
pnpm test:e2e

# Starts the interactive UI mode
pnpm test:e2e-ui

# Runs the codegen tests specifically
pnpm test:codegen

# Runs the tests in debug mode
pnpm test:e2e -- --debug
```

### Using Built-in AI APIs

The AI features in PrismAI use Chrome's built-in AI APIs, which are now stable and available in Chrome 127+. No Origin Trials registration or API tokens are required.

#### Prerequisites

- **Chrome 127 or later**: The built-in AI APIs are available as stable features in Chrome 127+
- **AI model availability**: Some APIs may require downloading AI models on first use

#### Available APIs

#### 1. Language Detector & Translator API

These APIs work together to detect the source language and translate text:

- **Language Detector API**: Automatically detects the language of selected text
- **Translator API**: Translates content to the user's preferred language

Follow the [Language Detector API docs](https://developer.chrome.com/docs/ai/language-detection) and [Translator API docs](https://developer.chrome.com/docs/ai/translator-api) for implementation details.

#### 2. Summarizer API

Provides quick "tl;dr" summaries of longer text selections.

Follow the [Summarizer API docs](https://developer.chrome.com/docs/ai/summarizer-api) for implementation details.

#### 3. Prompt API

Powers contextual actions on selected words and text, generating descriptions, usage examples, and other insights.

Follow the [Prompt API docs](https://developer.chrome.com/docs/extensions/ai/prompt-api) for implementation details.

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

## Technology Stack

- Web Extension Framework: [WXT](https://wxt.dev/)
- Web Extension Storage: [Built-in WXT storage](https://wxt.dev/storage.html)
- Web Extension Messaging: [webext-bridge](https://www.npmjs.com/package/webext-bridge)
- [Vue 3](https://vuejs.org/) with Composition API
- Browser APIs: Chrome Built-in AI APIs (Summarizer, Translator, Language Detector, Prompt) and [Selection API](https://developer.mozilla.org/en-US/docs/Web/API/Selection_API)

## Resources

- [Official documentation at Chrome for Developers for Chrome Extensions](https://developer.chrome.com/docs/extensions/get-started)
- Free course at freeCodeCamp.org [Build a Chrome Extension – Course for Beginners](https://www.youtube.com/watch?v=0n809nd4Zu4)
- Book [“Browser extension development, simplified”](https://serversideup.net/building-multi-platform-browser-extensions/)
- To keep updated on everything related to extensions visit [What's new in Chrome extensions](https://developer.chrome.com/docs/extensions/whats-new)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
