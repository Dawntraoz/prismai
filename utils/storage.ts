// WXT Storage docs: https://wxt.dev/storage.html#defining-storage-items
export const popupCurrentPage = storage.defineItem<string>(
  'local:popupCurrentPage',
  {
    fallback: 'splash-screen',
    version: 1,
  },
);

type WordPreferences = {
  usage: boolean;
  etymology: boolean;
  connotations: boolean;
  'related-terms': boolean;
}

type SentencePreferences = {
  language: string;
  summarize: boolean;
}

export type Preferences = {
  word: WordPreferences;
  sentence: SentencePreferences;
}

export const preferences = storage.defineItem<Preferences>(
  'local:preferences',
  {
    fallback: {
      word: {
        usage: true,
        etymology: false,
        connotations: false,
        'related-terms': false,
      },
      sentence: {
        language: 'en',
        summarize: true,
      }
    },
    version: 1,
  },
);