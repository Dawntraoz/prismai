export type PreferenceMetadata = {
  id: string;
  title: string;
  description: string;
  type: 'checkbox' | 'select';
  options?: {
    code: string;
    label: string;
  }[];
}

type PreferencesMetadata = {
  [key: string]: {
    [key: string]: PreferenceMetadata;
  }
}

const instancePreferences = ref<Preferences>(defaultPreferences)

export async function usePreferences() {
  const preferencesMetadata: PreferencesMetadata = {
    word: {
      usage: {
        id: 'word-usage',
        title: 'Usage',
        description: 'Show common ways the word is used in sentences.',
        type: 'checkbox',
      },
      etymology: {
        id: 'word-etymology',
        title: 'Etymology',
        description: 'Show the origin and historical development of the word.',
        type: 'checkbox',
      },
      connotations: {
        id: 'word-connotations',
        title: 'Connotations',
        description: 'Show emotional associations and implied meanings of the word.',
        type: 'checkbox',
      },
      'related-terms': {
        id: 'word-related-terms',
        title: 'Related Terms',
        description: 'Show words that are closely related in meaning.',
        type: 'checkbox',
      },
    },
    sentence: {
      translate: {
        id: 'sentence-translate',
        title: 'Translation Language',
        description: 'Set your desired target language to translate.',
        type: 'select',
        options: [
          { code: 'en', label: 'English' },
          { code: 'es', label: 'Spanish' },
          { code: 'fr', label: 'French' },
          { code: 'de', label: 'German' },
          { code: 'zh', label: 'Chinese' },
          { code: 'ja', label: 'Japanese' },
        ]
      },
      summarize: {
        id: 'sentence-summarize',
        title: 'Summarize',
        description: 'Summarize the sentence.',
        type: 'checkbox',
      },
    }
  }

  const unwatch = preferences.watch((newValue) => {
    instancePreferences.value = newValue
  })

  onUnmounted(() => {
    unwatch()
  })

  instancePreferences.value = await preferences.getValue()

  const updatePreferences = async (newValue: Preferences) => {
    await preferences.setValue(newValue)
  }

  return {
    preferencesMetadata,
    instancePreferences,
    updatePreferences,
  }
}