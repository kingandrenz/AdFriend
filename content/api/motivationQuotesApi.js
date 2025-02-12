const QUOTE_API = "https://zenquotes.io/api/random";

export const motivationQuotes = async () => {
  try {
    const response = await fetch(QUOTE_API);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching quote:", error);
    throw error;
  }
};
