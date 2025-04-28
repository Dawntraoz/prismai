<script lang="ts" setup>
import { IconDropdown, IconSparkles, IconLoading } from "@/components/icons";

defineProps<{
  type: "word" | "sentence";
}>();

const openDetails = ref(false);

const { instancePreferences } = await usePreferences();
</script>

<template>
  <ul class="prismai-accordions">
    <li v-if="type === 'word'" class="prismai-accordions__item">
      <header
        class="prismai-accordions__item-header"
        :class="{ 'is-open': openDetails }"
        @click="() => (openDetails = !openDetails)"
      >
        <span>Description</span>
        <IconDropdown />
      </header>
      <p v-if="openDetails" class="prismai-accordions__item-content">
        The occurrence and development of events by chance in a happy or
        beneficial way.
      </p>
    </li>
    <li
      v-for="(preferenceValue, preferenceKey) in instancePreferences[type]"
      class="prismai-accordions__item"
    >
      <header v-if="preferenceValue" class="prismai-accordions__item-header">
        <span class="prismai-accordions__item-title">{{
          preferenceKey.replaceAll("-", " ")
        }}</span>
        <IconSparkles v-if="true" />
        <IconLoading v-else />
      </header>
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

.prismai-accordions__item {
  .prismai-accordions__item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 8px;

    border-top: 1px solid var(--prismai-main-gray-light);

    &.is-open {
      border-bottom: 1px solid var(--prismai-main-gray-light);
    }

    .prismai-accordions__item-title {
      text-transform: capitalize;
    }
  }

  .prismai-accordions__item-header,
  .prismai-accordions__item-content {
    padding: 12px 8px;
  }

  .prismai-accordions__item-content {
    margin: 0;
    background-color: var(--prismai-main-gray);
    font-size: 12px;
    color: var(--prismai-main-gray-dark);
  }
}
</style>
