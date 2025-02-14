function main() {
  const skipButton = document.querySelector(".skip-button");

  skipButton.addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true }); // get current active tab

    await chrome.tabs.sendMessage(tab.id, { action: "skip" }); //send message from the tab
  });
}

main();
