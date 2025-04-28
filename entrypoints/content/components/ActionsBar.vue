<script lang="ts" setup>
import ActionAccordion from "./ActionAccordion.vue";

defineProps<{
  type: "word" | "sentence";
}>();

const { instancePreferences } = await usePreferences();
</script>

<template>
  <ul class="prismai-accordions">
    <li v-if="type === 'word'" class="prismai-accordions__item">
      <ActionAccordion
        :preference-value="true"
        preference-key="description"
        auto
      />
    </li>
    <li
      v-for="(preferenceValue, preferenceKey) in instancePreferences[type]"
      class="prismai-accordions__item"
    >
      <ActionAccordion
        :preference-value="preferenceValue"
        :preference-key="preferenceKey"
      />
    </li>
  </ul>
</template>

<style scoped>
/* -- Accordion */
.prismai-accordions {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
