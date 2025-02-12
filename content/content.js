import { motivationQuotes } from "./api/motivationQuotesApi.js";
import { techQuotes } from "./api/techQuotesApi.js";
import { activityReminder } from "./api/activityReminderApi.js";

// function to replace ad elements
function replaceAds() {
  const adElements = document.querySelectorAll('[class*="ad", [id*="ad"');

  adElements.forEach((ad) => {
    const widget = document.createElement("div");
    widget.style.border = "2px solid #4CAF50";
    widget.style.padding = "10px";
    widget.style.margin = "10px 0";
    widget.style.backgroundColor = "e8f5e9";
    widget.innerHTML = generateWidgetContent(); // A function to generate dynamic content

    // replace ad element with the new widget
    ad.parentNode.replaceChild(widget, ad);
  });
}

function generateWidgetContent() {
  const widgets = [
    '<strong>Motivational Quote:</strong> "Believe in yourself and all that you are!"',
    '<strong>Activity Reminder:</strong> "Have you done your burpees today?"',
    '<strong>Fun Fact:</strong> "Did you know honey never spoils?"',
    '<strong>Mindfulness Tip:</strong> "Take a deep breath and smile."',
  ];

  return widgets[Math.floor(Math.random() * widgets.length)];
}
