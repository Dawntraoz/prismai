<script lang="ts" setup>
import SplashScreen from "./components/SplashScreen.vue";
import SettingsScreen from "./components/SettingsScreen.vue";
</script>

<template>
  <Suspense>
    <main class="popup-container">
      <SplashScreen />
      <SettingsScreen />
    </main>
  </Suspense>
</template>

<style scoped>
.popup-container {
  width: 100%;
  height: 100%;
}
</style>
