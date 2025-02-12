const REMINDER_API = "https://www.boredapi.com/api/activity";

export const activityReminder = async () => {
  try {
    const response = await fetch(REMINDER_API);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching Activities:", error);
    throw error;
  }
};
