<script lang="ts" setup>
import InputToggle from "@/components/inputs/InputToggle.vue";
import InputSelect from "@/components/inputs/InputSelect.vue";

const { preferencesMetadata, instancePreferences, updatePreferences } =
  await usePreferences();
</script>

<template>
  <section
    v-for="(preferenceType, typeKey) in preferencesMetadata"
    class="prismai-preferences-section"
  >
    <h2>Preferences ({{ typeKey }})</h2>
    <form @submit.prevent>
      <template
        v-for="(preference, key) in preferenceType"
        :key="preference.id"
      >
        <InputToggle
          v-if="preference.type === 'checkbox'"
          :preference="preference"
          :modelValue="instancePreferences[typeKey][key]"
          @update:modelValue="
            ($event: boolean) =>
              updatePreferences({
                ...instancePreferences,
                [typeKey]: {
                  ...instancePreferences[typeKey],
                  [key]: $event,
                },
              })
          "
        />
        <InputSelect
          v-else-if="preference.type === 'select'"
          :preference="preference"
          :modelValue="instancePreferences[typeKey][key]"
          @update:modelValue="
            ($event: boolean) =>
              updatePreferences({
                ...instancePreferences,
                [typeKey]: {
                  ...instancePreferences[typeKey],
                  [key]: $event,
                },
              })
          "
        />
      </template>
    </form>
  </section>
</template>

<style scoped>
.prismai-preferences-section {
  display: flex;
  flex-direction: column;
  gap: 12px;

  h2 {
    font-size: 18px;
    text-transform: capitalize;
  }

  form {
    padding: 8px 12px;
    border: 1px solid var(--prismai-main-gray-light);
    border-radius: 8px;
    background-color: var(--prismai-main-white);

    .prismai-preference:not(:last-child) {
      border-bottom: 1px solid var(--prismai-main-gray-light);
    }
  }
}
</style>
