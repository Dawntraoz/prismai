<script lang="ts" setup>
import { IconDropdown, IconSparkles, IconLoading } from "@/components/icons";
import { sendMessage } from "webext-bridge/content-script";

const props = defineProps<{
  preferenceValue: boolean | string;
  preferenceKey: string;
  auto?: boolean;
}>();

const result = ref<string | null>(props.auto ? "some" : null);
const isLoading = ref(false);
const error = ref<string | null>(null);

const openResult = ref(true);

async function fetchAiResponse(promptText: string) {
  if (!promptText || isLoading.value) return;

  console.log(`[ContentScript] Sending prompt: "${promptText}"`);
  isLoading.value = true;
  result.value = null;
  error.value = null;

  try {
    const response = await sendMessage(
      "get-ai-response",
      { prompt: promptText },
      "background"
    );

    console.log("[ContentScript] Received response:", response);
    if (typeof response === "string" && response.startsWith("Error:")) {
      throw new Error(response.substring(7)); // Remove "Error: " prefix
    }

    if (typeof response === "string") {
      result.value = response;
    } else {
      throw new Error("Unexpected response format received.");
    }
  } catch (err) {
    console.error("[ContentScript] Error fetching AI response:", error);
    error.value =
      err instanceof Error ? err.message : "An unknown error occurred.";
    result.value = null;
  } finally {
    isLoading.value = false;
  }
}
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
      <IconSparkles
        v-if="!auto && !isLoading && !result"
        @click="fetchAiResponse(preferenceKey)"
      />
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
