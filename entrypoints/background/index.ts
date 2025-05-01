import { onMessage } from "webext-bridge/background";

type AiPromptPayload = {
  prompt: string;
}

export default defineBackground(() => {

  async function callYourActualAiApi(promptText: string): Promise<string> {
    console.log(`[Background] Calling AI for: "${promptText}"`);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
      const aiResult = `Simulated AI response for: "${promptText}"`;
      console.log("[Background] AI Result:", aiResult);
      return aiResult;
    } catch (error) {
      console.error("[Background] Error calling AI API:", error);
      throw new Error(`AI API Call Failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  onMessage<AiPromptPayload, string>('get-ai-response', async (message) => {
    console.log("[Background] Received 'get-ai-response'");

    const prompt = message.data?.prompt;

    if (typeof prompt === 'string' && prompt.trim() !== '') {
      try {
        const aiResponse = await callYourActualAiApi(prompt);
        return aiResponse;
      } catch (error) {
        console.error("[Background] Error processing AI request:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error during AI processing.";
        return `Error: ${errorMessage}`;
      }
    } else {
      return "Error: Invalid prompt received.";
    }
  });

  // /** Commented since there's a day limit that can be surpassed if executing locally. */
  // const word = 'serendipity';

  // (async () => {
  //   const capabilities = await (browser as any).aiOriginTrial?.languageModel.capabilities();
  //   console.log('Capabilities Prompt API:', capabilities);

  //   const session = await (browser as any).aiOriginTrial.languageModel.create({
  //     systemPrompt: `
  //       You are a highly respected and experienced individual with decades of expertise across a vast range of topics.
  //       You possess a deep understanding of history, science, culture, and current events. You are known for your insightful analysis, nuanced perspectives, and ability to explain complex concepts with clarity and precision.
  //       Your communication style is that of a seasoned diplomat: exceptionally polite, respectful, and considerate. You always strive to provide accurate and comprehensive answers, avoiding speculation or unsubstantiated claims.
  //       You never offer opinions as facts, but rather present well-reasoned arguments and acknowledge the complexities of any issue. You avoid colloquialisms, slang, and overly casual language. When responding, prioritize providing context and background information to ensure a thorough understanding.
  //       If a question is ambiguous, politely ask for clarification before answering. If you are unsure of an answer, admit it gracefully and suggest resources for further research. Do not digress or wander off - topic.
  //       Maintain a focused and concise response, directly addressing the user\'s query. Always conclude your response with a courteous closing, such as \"I hope this is helpful,\" or \"Please let me know if you require further clarification.\"
  //       Your goal is to educate and inform with the utmost professionalism and intellectual honesty. You are a trusted advisor and a source of reliable knowledge.
  //     `
  //   });
  //   console.log('Session AI:', session);
  //   const response = await session.prompt(`
  //     Define the word ${word} according to the following criteria:

  //     1. ** Definition:** Provide a concise and accurate dictionary definition.
  //     2. ** Etymology:** Explain the origin and historical development of the word.
  //     3. ** Usage:** Illustrate common ways the word is used in sentences.Provide at least three example sentences.
  //     4. ** Connotations:** Describe the emotional associations and implied meanings of the word.
  //     5. ** Related Terms:** List 3 - 5 words that are closely related in meaning.
  //     6. ** Historical / Cultural Context:** Explain any significant historical or cultural influences on the word's meaning or usage.

  //     Respond as a linguistic expert.
  //   `);
  //   console.log(`Response to word ${word}:`, response);
  // })();
});
