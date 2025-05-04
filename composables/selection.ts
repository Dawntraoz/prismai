const textSelection = ref("")

const selectionType = ref<"word" | "sentence">("word");
const styleTop = ref("0");
const styleLeft = ref("0");
const styleDisplay = ref("none");

export function useSelection() {

  const showContainer = () => {
    requestAnimationFrame(() => {
      // Selection API docs: https://developer.mozilla.org/en-US/docs/Web/API/Selection
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
            const rightPosition = window.scrollX + rect.right;
            styleLeft.value = `${rightPosition + 260 > window.innerWidth ? window.innerWidth - 260 : rightPosition}px`;
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

  return {
    textSelection,
    selectionType,
    styleTop,
    styleLeft,
    styleDisplay,
    showContainer,
  }
}