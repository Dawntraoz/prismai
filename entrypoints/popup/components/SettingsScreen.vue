<script lang="ts" setup>
const { currentPage } = await usePopupNavigation();
const { instancePreferences, updatePreferences } = await usePreferences();
</script>

<template>
  <p v-if="currentPage === 'settings-screen'">
    {{ instancePreferences }}
    <input
      type="checkbox"
      :value="instancePreferences.word.usage"
      @change="
        updatePreferences({
          ...instancePreferences,
          word: {
            ...instancePreferences.word,
            usage: !instancePreferences.word.usage,
          },
        })
      "
    />
  </p>
</template>
