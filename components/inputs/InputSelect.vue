<script lang="ts" setup>
import { PreferenceMetadata } from "@/composables/preferences";

defineProps<{
  preference: PreferenceMetadata;
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="prismai-preference">
    <label class="prismai-preference__label">
      {{ preference.title }}
      <span class="prismai-preference__description">{{
        preference.description
      }}</span>
    </label>
    <select
      class="prismai-preference__select"
      :id="preference.id"
      :value="modelValue"
      @change="
        emit('update:modelValue', ($event.target as HTMLInputElement)?.value)
      "
    >
      <option
        v-for="option in preference.options"
        :key="option.code"
        :value="option.code"
      >
        {{ option.code }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.prismai-preference {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0;

  .prismai-preference__label {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 4px;
    font-size: 16px;
    font-weight: 500;
  }

  .prismai-preference__description {
    font-size: 12px;
    font-weight: 400;
    color: var(--prismai-main-gray-dark);
  }
}
</style>
