type PreferencesMetadata = {
  [key: string]: {
    [key: string]: {
      id: string;
      title: string;
      description: string;
      type: 'checkbox' | 'select';
    }
  }
}

const instancePreferences = ref()

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
      language: {
        id: 'sentence-language',
        title: 'Translation Language',
        description: 'Set your desired target language.',
        type: 'select',
      },
      summarize: {
        id: 'sentence-summarize',
        title: 'Summarize',
        description: 'Summarize the sentence.',
        type: 'checkbox',
      },
    }
  }

  instancePreferences.value = await preferences.getValue()

  const updatePreferences = async (newValue: Preferences) => {
    await preferences.setValue(newValue)
    instancePreferences.value = await preferences.getValue()
  }

  return {
    preferencesMetadata,
    instancePreferences,
    updatePreferences,
  }
}