import { motivationQuotes } from "../api/motivationQuotesApi.js";
import { activityReminder } from "../api/chunkNorisJokes.js";
import { techQuotes } from "../api/techQuotesApi.js";

// Replaces detected ad elements with a custom widget
async function replaceAds() {
  const adElements = document.querySelectorAll(
    ".ad, .ads, .advertisement, .ad-container, .ad-banner, .ad-box, .ad-space, .ad-slot, .ad-section, .ad-item, " +
      ".sponsor, .sponsored, .sponsor-link, .sponsor-box, .sponsor-section, " +
      "#ad-container, #ad-banner, #ad-slot, #ad-section, #ad-item, " +
      "[id^='ad-'], [id^='ad_'], " +
      "[class^='ad-'], [class^='ad_'], " +
      "[class*=' ad-'], [class*=' ad_'], " +
      ".ytwAdImageViewModelHostImage, .ad-slot-header__wrapper"
  );

  adElements.forEach(async (ad) => {
    if (ad.tagName.toLowerCase() === "a" || ad.id === "downloadLink") {
      return;
    }

    const widget = document.createElement("div");
    widget.style.border = "2px solid #4CAF50";
    widget.style.padding = "10px";
    widget.style.margin = "10px 0";
    widget.style.backgroundColor = "#e8f5e9";

    try {
      widget.innerHTML = await getRandomWidgetContent();
    } catch (error) {
      widget.innerHTML = "Error fetching content.";
      console.error("Failed to fetch widget content:", error);
    }

    // Check if the ad is still in the document before replacing
    if (ad.parentNode && document.contains(ad)) {
      ad.parentNode.replaceChild(widget, ad);
    } else {
      console.warn("Ad element has no parent, cannot replace:", ad);
    }
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
        const data = await randomJokes();
        console.log(`Joke: ${data.value}`);
        return `<strong>Activity Reminder:</strong> ${data.value}`;
      }
      default:
        return "No widget available";
    }
  } catch (error) {
    console.error("Failed to fetch widget content:", error);
    return "Don't fear what's ahead—those behind you care..";
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
