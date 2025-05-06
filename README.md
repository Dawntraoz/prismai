# PrismAI – Built with WXT, Vue 3, and browser built-in AI APIs

This repository is a demo project created for the talk “**Unlocking the power of Web Extensions with Vue**” by Alba Silvente ([@dawntraoz](https://links.dawntraoz.com/)).

> **Disclaimer**: This project is an experimental showcase of what's possible with Chrome's built-in AI APIs (available through registration) and Web Extension development using Vue and WXT. As of May 14, 2025, this is a work-in-progress and may include bugs, performance limitations, or unsupported features.

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

### Enabling Built-in AI APIs

To use the AI features, you need to register for **Origin Trials** and configure API tokens in your local environment.

> ⚠️ Important: Setting your Extension ID for Origin Trials
> When you load this extension locally via "Load unpacked," Chrome assigns it a temporary, unique ID. This ID is crucial for registering the built-in AI APIs for the Origin Trials (detailed in the steps below). You have two main approaches:
>
> 1. By default, Chrome assigns a new, **unique ID each time**. Find this ID on `chrome://extensions/` and use it for registration. Be aware that this ID can change, potentially requiring re-registration for the Origin Trials.
>
> 2. Set a consistent Extension ID (Recommended):
>
> - Follow Chrome's official guide to [keep a consistent extension ID](https://developer.chrome.com/docs/extensions/reference/manifest/key#keep-consistent-id).
> - Once you have your public key string, add it to your project's `.env` file like this: `WXT_WEB_EXTENSION_KEY=<PUBLIC_KEY>`. This key will ensure your extension ID remains constant during development.

#### 1. Translator & Language Detector API

- Register your web extension at [Language Detector Origin Trial](https://developer.chrome.com/origintrials/#/view_trial/662592095176884225) and [Translator Origin Trial](https://developer.chrome.com/origintrials/#/view_trial/4445615782168100865) using origin `chrome-extension://<YOUR_EXTENSION_ID>`
- Add the tokens to your `.env` file:

```ini
WXT_LANGUAGE_DETECTOR_API_TOKEN=<your_token_here>
WXT_TRANSLATOR_API_TOKEN=<your_token_here>
```

- Follow the steps on [Language Detector API docs](https://developer.chrome.com/docs/ai/language-detection) and [Translator API docs](https://developer.chrome.com/docs/ai/translator-api) to get started with this API

#### 2. Summarizer API

- Register your web extension at [Summarizer Origin Trial](https://developer.chrome.com/origintrials/#/view_trial/1923599990840623105) using origin `chrome-extension://<YOUR_EXTENSION_ID>`
- Add the token to your `.env` file:

```ini
WXT_SUMMARIZER_API_TOKEN=<your_token_here>
```

- Follow the steps on [Summarizer API docs](https://developer.chrome.com/docs/ai/summarizer-api) to get started with this API

#### 3. The Prompt API

> ⚠️ The Prompt API is experimental and intended for prototyping only. Features may change or never reach stable release.

- Register your web extension at [The Prompt API Origin Trial](https://developer.chrome.com/origintrials/#/view_trial/320318523496726529) using origin `chrome-extension://<YOUR_EXTENSION_ID>`
- Add the token to your `.env` file:

```ini
WXT_PROMPT_API_TOKEN=<your_token_here>
```

- Follow the steps on [The Prompt API docs](https://developer.chrome.com/docs/extensions/ai/prompt-api) to get started with this API

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

## Technology Stack

- Web Extension Framework: [WXT](https://wxt.dev/)
- Web Extension Storage: [Built-in WXT storage](https://wxt.dev/storage.html)
- Web Extension Messaging: [webext-bridge](https://www.npmjs.com/package/webext-bridge)
- [Vue 3](https://vuejs.org/) with Composition API
- Browser APIs: Chrome Built-in AI APIs (Summarizer, Translator, Language Detector, Prompt) via Origin Trials, and [Selection API](https://developer.mozilla.org/en-US/docs/Web/API/Selection_API)

## Resources

- [Official documentation at Chrome for Developers for Chrome Extensions](https://developer.chrome.com/docs/extensions/get-started)
- Free course at freeCodeCamp.org [Build a Chrome Extension – Course for Beginners](https://www.youtube.com/watch?v=0n809nd4Zu4)
- Book [“Browser extension development, simplified”](https://serversideup.net/building-multi-platform-browser-extensions/)
- To keep updated on everything related to extensions visit [What's new in Chrome extensions](https://developer.chrome.com/docs/extensions/whats-new)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
