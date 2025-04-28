<script lang="ts" setup>
import LogoPrismai from "@/components/LogoPrismai.vue";
import ActionsBar from "./ActionsBar.vue";

const textSelection = ref("");
const selectionType = ref("word");
const styleTop = ref("0");
const styleLeft = ref("0");
const styleDisplay = ref("none");

const containerRef = ref<HTMLElement>();

const showContainer = () => {
  requestAnimationFrame(() => {
    const selection = window.getSelection();

    if (
      selection &&
      !selection.isCollapsed &&
      selection.toString().trim() !== "" &&
      selection.rangeCount > 0
    ) {
      textSelection.value = selection.toString();
      selectionType.value =
        selection.toString().split(" ").length > 1 ? "sentence" : "word";

      try {
        const rect = selection.getRangeAt(0).getBoundingClientRect();

        // Check if rect has dimensions (valid selection)
        if (rect.width > 0 || rect.height > 0) {
          styleDisplay.value = "block"; // Make it visible

          // Calculate position relative to the document
          styleTop.value = `${window.scrollY + rect.top}px`;
          styleLeft.value = `${window.scrollX + rect.right}px`;
        } else {
          // Selection exists but has no dimension (e.g., whitespace)
          styleDisplay.value = "none";
        }
      } catch (e) {
        console.warn(
          "Prismai Web Extension: Error getting selection range or rect.",
          e
        );
        styleDisplay.value = "none"; // Hide if we encounter an error
      }
    }
  });
};

const handleClickOutside = (event: MouseEvent) => {
  if (styleDisplay.value === "block" && containerRef.value) {
    // Get the event path, including shadow DOM nodes
    const path = event.composedPath();

    // Check if the container element itself is present anywhere in the event path.
    if (!path.includes(containerRef.value)) {
      // If it's not, the click was truly outside.
      console.log(
        "Hiding container because click path does not include containerRef."
      );
      styleDisplay.value = "none";
    } else {
      // If it is, the click started inside or on the container.
      console.log(
        "Not hiding container because click path includes containerRef."
      );
    }
  }
};

const handleScroll = () => {
  if (styleDisplay.value === "block") {
    // // Complex approach: re-calculate position on scroll
    // showContainer();
    // Alternative simpler approach: hide on scroll
    styleDisplay.value = "none";
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

// Call background script via Extension messaging: https://wxt.dev/guide/essentials/messaging.html
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
      <ActionsBar :type="selectionType" />
    </main>
  </Suspense>
</template>
