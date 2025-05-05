// Summarizer API: https://developer.chrome.com/docs/ai/summarizer-api
export const useSummarizerApi = async (textSelection: string) => {
  const options = {
    type: 'tl;dr',
    format: 'plain-text',
    length: 'medium',
  }

  if ('Summarizer' in self) {
    const summarizer = await Summarizer.create(options);
    return await summarizer.summarize(textSelection);
  }

  return new Error('Summarizer API is not supported in this environment.');
}