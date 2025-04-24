const instancePreferences = ref()

export async function usePreferences() {
  instancePreferences.value = await preferences.getValue()

  const updatePreferences = async (newValue: Preferences) => {
    await preferences.setValue(newValue)
    instancePreferences.value = await preferences.getValue()
  }

  return {
    instancePreferences,
    updatePreferences,
  }
}