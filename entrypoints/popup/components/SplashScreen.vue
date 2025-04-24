<script lang="ts" setup>
const { currentPage, updatePage } = await usePopupNavigation();
</script>

<template>
  <div v-if="currentPage === 'splash-screen'">
    <button type="button" @click="updatePage('settings-screen')">
      Get started
    </button>
  </div>
</template>
