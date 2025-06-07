(function moveNowPlayingBarMod() {
    // Select elements
    const nowPlayingBar = document.querySelector("#main > div.Root.global-nav.centered-layout > div.Root__top-container > div.Root__now-playing-bar");
    const targetContainer = document.querySelector("#main > div.Root.global-nav.centered-layout > div.Root__top-container > div.Root__main-view");

    // If elements aren't ready, retry
    if (!nowPlayingBar || !targetContainer) {
        setTimeout(moveNowPlayingBarMod, 300);
        return;
    }

    // Move now-playing-bar to first place in target container
    targetContainer.insertBefore(nowPlayingBar, targetContainer.firstChild);
})();