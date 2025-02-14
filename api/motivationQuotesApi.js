export const motivationQuotes = async () => {
  const QUOTE_API = "https://zenquotes.io/api/random";
  try {
    const response = await fetch(QUOTE_API);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching quote:", error);
    throw error;
  }
};
