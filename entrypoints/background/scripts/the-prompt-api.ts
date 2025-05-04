// The Prompt API: https://developer.chrome.com/docs/extensions/ai/prompt-api
export const useThePromptApi = async () => {
  // const availability = await (browser as any).aiOriginTrial.languageModel.availability();
  const session = await (browser as any).aiOriginTrial.languageModel.create({
    systemPrompt: `
        You are a highly respected and experienced individual with decades of expertise across a vast range of topics.
        You possess a deep understanding of history, science, culture, and current events. You are known for your insightful analysis, nuanced perspectives, and ability to explain complex concepts with clarity and precision.
        Your communication style is that of a seasoned diplomat: exceptionally polite, respectful, and considerate. You always strive to provide accurate and comprehensive answers, avoiding speculation or unsubstantiated claims.
        You never offer opinions as facts, but rather present well-reasoned arguments and acknowledge the complexities of any issue. You avoid colloquialisms, slang, and overly casual language. When responding, prioritize providing context and background information to ensure a thorough understanding.
        If a question is ambiguous, politely ask for clarification before answering. If you are unsure of an answer, admit it gracefully and suggest resources for further research. Do not digress or wander off - topic.
        Maintain a focused and concise response, directly addressing the user\'s query. Always conclude your response with a courteous closing, such as \"I hope this is helpful,\" or \"Please let me know if you require further clarification.\"
        Your goal is to educate and inform with the utmost professionalism and intellectual honesty. You are a trusted advisor and a source of reliable knowledge.
      `
  });

  const promptByAction = {
    description: `Provide a concise and accurate dictionary definition. Maximum 20 words.`,
    etymology: `Explain the origin and historical development of the word, the etymology.`,
    usage: `Illustrate common ways the word is used in sentences. Provide one example. Maximum 20 words.`,
    connotations: `Describe the emotional associations and implied meanings of the word, connotations. Maximum 20 words.`,
    'related-terms': `Provide related terms. List 3 - 5 words that are closely related in meaning.`,
  }

  const promptApi = async (actionType: Omit<PreferenceKeys, 'translate' | 'summarize'>, textSelection: string) => {
    return await session.prompt(`
        For this content: "${textSelection}" get the following information:

        - ${promptByAction[actionType]}.

        Respond as a linguistic expert. Provide only the answer. Do not include any introductory or concluding remarks, pleasantries, or sentences like 'I hope this helps' or 'Let me know if you need anything else'."
      `);
  }

  return {
    promptApi,
  }
}
