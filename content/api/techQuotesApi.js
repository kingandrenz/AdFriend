const QUOTE_API = "https://api.quotable.io/random?tags=technology";

export const techQuotes = async () => {
  try {
    const response = await fetch(QUOTE_API);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching tech Qoute:", error);
    throw error;
  }
};
