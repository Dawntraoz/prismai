<script lang="ts" setup>
import LogoPrismai from "@/components/LogoPrismai.vue";
import ActionsBar from "./components/ActionsBar.vue";

const {
  textSelection,
  selectionType,
  styleTop,
  styleLeft,
  styleDisplay,
  showContainer,
} = useSelection();

const containerRef = ref<HTMLElement>();

const handleClickOutside = (event: MouseEvent) => {
  if (styleDisplay.value === "block" && containerRef.value) {
    // Get the event path, including shadow DOM nodes
    const path = event.composedPath();

    // Check if the container element itself is present anywhere in the event path.
    // If it's not, the click was truly outside.
    if (!path.includes(containerRef.value)) {
      styleDisplay.value = "none";
    }
  }
};

const handleScroll = () => {
  if (styleDisplay.value === "block") {
    // Complex approach: re-calculate position on scroll
    showContainer();
    // // Alternative approach: Hide on scroll
    // styleDisplay.value = "none";
  }
};

onMounted(() => {
  window.addEventListener("mouseup", () => setTimeout(showContainer, 0));
  window.addEventListener("mousedown", handleClickOutside, true);
  window.addEventListener("scroll", handleScroll, true);
});

onUnmounted(() => {
  window.removeEventListener("mouseup", () => setTimeout(showContainer, 0));
  window.removeEventListener("mousedown", handleClickOutside, true);
  window.removeEventListener("scroll", handleScroll, true);
});
</script>

<template>
  <Suspense>
    <main
      ref="containerRef"
      class="prismai-container"
      :style="{
        top: styleTop,
        left: styleLeft,
        display: styleDisplay,
      }"
      @mousedown.prevent
    >
      <header class="prismai-header">
        <LogoPrismai />
        <p class="prismai-selection-type">{{ selectionType }}:</p>
        <p
          class="prismai-tag"
          :class="selectionType === 'sentence' && 'prismai-tag--full'"
        >
          <span>{{ textSelection }}</span>
        </p>
      </header>
      <ActionsBar :key="textSelection" :type="selectionType" />
    </main>
  </Suspense>
</template>
