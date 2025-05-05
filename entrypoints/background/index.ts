import { onMessage } from "webext-bridge/background";
import { useThePromptApi, useTranslatorApi, useSummarizerApi } from "./scripts";

type RequestPayload = {
  actionType: PreferenceKeys;
  textSelection: string;
}

let fetchPromptApi: (actionType: Exclude<PreferenceKeys, 'translate' | 'summarize'>, textSelection: string) => Promise<string>;

export default defineBackground(() => {
  (async () => {
    const { promptApi } = await useThePromptApi();
    fetchPromptApi = promptApi;
  })();

  const getLanguagePreference = async () => {
    const currentPreferences = await preferences.getValue()
    return currentPreferences.sentence.translate
  }

  const promptBuiltInByActionType = async (actionType: PreferenceKeys, textSelection: string): Promise<string> => {
    // console.log(`[Background] Calling AI for: "${actionType}" with text selection: "${textSelection}"`);
    try {
      switch (actionType) {
        case 'translate':
          const language = await getLanguagePreference();
          return await useTranslatorApi(language, textSelection);
        case 'summarize':
          return await useSummarizerApi(textSelection);
        default:
          return await fetchPromptApi(actionType, textSelection);
      }
    } catch (error) {
      console.error("[Background] Error calling AI API:", error);
      throw new Error(`AI API Call Failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  onMessage<RequestPayload, string>('get-ai-response', async (message) => {
    const { actionType, textSelection } = message.data;

    if (typeof actionType === 'string' && actionType.trim() !== '') {
      try {
        return await promptBuiltInByActionType(actionType, textSelection);
      } catch (error) {
        console.error("[Background] Error processing AI request:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error during AI processing.";
        return `Error: ${errorMessage}`;
      }
    } else {
      return "Error: Invalid type request received.";
    }
  });
});
