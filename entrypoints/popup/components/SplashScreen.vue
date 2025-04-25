<script lang="ts" setup>
import LogoPrismai from "@/components/LogoPrismai.vue";

const { currentPage, updatePage } = await usePopupNavigation();
</script>

<template>
  <div v-if="currentPage === 'splash-screen'" class="splash-screen">
    <header class="splash-screen__logo">
      <LogoPrismai />
      <h1>PrismAI</h1>
    </header>
    <button type="button" @click="updatePage('settings-screen')">
      Get started
    </button>
  </div>
</template>

<style scoped>
.splash-screen {
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100% - 24px);
  background-color: var(--prismai-main-black);
  padding: 12px 16px;

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
    background-image: url(./prismai-bg.svg);
    background-size: contain;
    background-repeat: no-repeat;
  }
}

.splash-screen__logo {
  margin: auto 0;

  & .prismai-logo {
    width: 196px;
    height: 160px;
  }

  & h1 {
    font-family: "Gantari", sans-serif;
    font-size: 54px;
    font-weight: 600;
    margin: 0;
    background: var(--prismai-main-gradient);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
