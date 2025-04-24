<script lang="ts" setup>
import SplashScreen from "./components/SplashScreen.vue";
import SettingsScreen from "./components/SettingsScreen.vue";
</script>

<template>
  <Suspense>
    <main>
      <SplashScreen />
      <SettingsScreen />
    </main>
  </Suspense>
</template>
