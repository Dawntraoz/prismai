<script lang="ts" setup>
const { preferencesMetadata, instancePreferences, updatePreferences } =
  await usePreferences();
</script>

<template>
  <section v-for="(preferenceType, typeKey) in preferencesMetadata">
    <h2>Preferences ({{ typeKey }})</h2>
    <div v-for="(preference, key) in preferenceType" :key="preference.id">
      <label :for="preference.id">
        {{ preference.title }}
        <span>{{ preference.description }}</span>
      </label>
      <input
        :id="preference.id"
        type="checkbox"
        :checked="instancePreferences[typeKey][key]"
        @change="
          updatePreferences({
            ...instancePreferences,
            [typeKey]: {
              ...instancePreferences[typeKey],
              [key]: !instancePreferences[typeKey][key],
            },
          })
        "
      />
    </div>
  </section>
</template>
