import { motivationQuotes } from "../api/motivationQuotesApi.js";
import { activityReminder } from "../api/activityReminderApi.js";
import { techQuotes } from "../api/techQuotesApi.js";

function replaceAds() {
  const adElements = document.querySelectorAll('[class*="ad"], [id*="ad"]');

  adElements.forEach(async (ad) => {
    const widget = document.createElement("div");
    widget.style.border = "2px solid #4CAF50";
    widget.style.padding = "10px";
    widget.style.margin = "10px 0";
    widget.style.backgroundColor = "#e8f5e9"; // Note the '#' for valid CSS color

    // Await the async content before setting innerHTML
    widget.innerHTML = await getRandomWidgetContent();

    // Replace ad element with the new widget
    ad.parentNode.replaceChild(widget, ad);
  });
}

async function getRandomWidgetContent() {
  const category = Math.floor(Math.random() * 3);
  try {
    switch (category) {
      case 0: {
        const data = await motivationQuotes();
        return `<strong>Motivational Quote:</strong> "${data[0].q}" — ${data[0].a}`;
      }
      case 1: {
        const data = await techQuotes();
        return `<strong>Tech Quote:</strong> "${data.quote}" — ${data.author}`;
      }
      case 2: {
        const data = await activityReminder();
        console.log(`techQuotes: ${data.value}`);
        return `<strong>Activity Reminder:</strong> ${data.value}`;
      }
      default:
        return "No widget available";
    }
  } catch (error) {
    console.error("Failed to fetch widget content:", error);
    return "Error fetching content.";
  }
}

// youtub skipAd
function skipAd() {
  // getting ths video element and the skip button that youtube renders
  const videoElement = document.querySelector("video");
  const skipButton = document.querySelector("button.ytp-ad-skip-button-modern");

  // move current video to the end and click the skip button
  if (videoElement && isFinite(videoElement.duration)) {
    videoElement.currentTime = videoElement.duration;
  }

  if (skipButton) {
    skipButton.click();
  }
}

function main() {
  // listen to message fro chrome extention Api

  chrome.runtime.onMessage.addListener(
    async (request, sender, sendResponse) => {
      if (request.action === "skip") {
        skipAd();
      }
    }
  );
}

main();

// Wait until the page is fully loaded before running replaceAds
window.addEventListener("load", replaceAds);
