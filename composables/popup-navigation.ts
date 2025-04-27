const currentPage = ref()

export async function usePopupNavigation() {
  currentPage.value = await popupCurrentPage.getValue()

  const updatePage = async (newValue: string) => {
    await popupCurrentPage.setValue(newValue)
    currentPage.value = await popupCurrentPage.getValue()
  }

  return {
    currentPage,
    updatePage,
  }
}