<script lang="ts" setup>
import { IconDropdown, IconSparkles, IconLoading } from "@/components/icons";

const props = defineProps<{
  preferenceValue: boolean;
  preferenceKey: string;
  auto?: boolean;
}>();

const result = ref(props.auto ? "some" : undefined);
const isLoading = ref(false);
const openResult = ref(true);
</script>

<template>
  <template v-if="preferenceValue">
    <header
      class="prismai-accordions__item-header"
      :class="{ 'is-open': result && openResult }"
      @click="() => (result ? (openResult = !openResult) : null)"
    >
      <span class="prismai-accordions__item-title">{{
        preferenceKey.replaceAll("-", " ")
      }}</span>
      <IconSparkles v-if="!auto" />
      <IconLoading v-else-if="isLoading" />
      <IconDropdown v-else class="dropdown-icon" />
    </header>
    <p v-if="result && openResult" class="prismai-accordions__item-content">
      {{ result }}
    </p>
  </template>
</template>

<style scoped>
/* -- Accordion Item */
.prismai-accordions__item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 8px;

  border-top: 1px solid var(--prismai-main-gray-light);

  &.is-open {
    border-bottom: 1px solid var(--prismai-main-gray-light);
  }

  &:not(.is-open) {
    .dropdown-icon {
      scale: -1;
    }
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
</style>
