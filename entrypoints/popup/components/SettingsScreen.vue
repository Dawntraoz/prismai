<script lang="ts" setup>
import { IconSettings } from "@/components/icons";
import LogoPrismai from "@/components/LogoPrismai.vue";
import SettingsPreferences from "@/components/SettingsPreferences.vue";

const { currentPage } = await usePopupNavigation();

const openOptions = () => {
  if (browser.runtime.openOptionsPage) {
    browser.runtime.openOptionsPage();
  } else {
    console.error("Options page API not available.");
  }
};
</script>

<template>
  <div v-if="currentPage === 'settings-screen'" class="settings-screen">
    <header class="settings-screen__header">
      <LogoPrismai />
      <p class="settings-screen__brand">PrismAI</p>
      <button class="settings-screen__button icon" @click="openOptions">
        <IconSettings />
      </button>
    </header>
    <div class="settings-screen__content">
      <section class="prismai-banner">
        <h1>
          Understand Web Content Instantly with
          <span class="prismai-highlight">AI</span>
        </h1>
        <p>Select text for definitions, summaries, translations & more.</p>
      </section>
      <SettingsPreferences />
    </div>
  </div>
</template>

<style scoped>
.settings-screen {
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--prismai-main-white);

  &::after {
    content: "";
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: -1;
    translate: -15% -10%;
    rotate: 40deg;
    width: 600px;
    height: 342px;
    background-image: url(/prismai-bg.svg);
    background-size: contain;
    background-repeat: no-repeat;
  }

  .settings-screen__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 12px 16px;
    gap: 12px;
    border-bottom: 1px solid var(--prismai-main-gray-light);

    .prismai-logo {
      width: 40px;
      height: 32px;
    }

    .settings-screen__brand {
      font-family: "Gantari", sans-serif;
      font-size: 24px;
      font-weight: 500;
      margin: 0;
      background: var(--prismai-main-gradient);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .settings-screen__button {
      margin-left: auto;
    }
  }

  .settings-screen__content {
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 16px;

    .prismai-banner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 16px;
      text-align: center;
      background-color: var(--prismai-main-gray-lighter);
      border-radius: 8px;

      h1 {
        font-size: 20px;
      }

      p {
        font-size: 12px;
        line-height: 16px;
        color: var(--prismai-main-gray-dark);
      }

      .prismai-highlight {
        background: var(--prismai-main-gradient);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
}
</style>
