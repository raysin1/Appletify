(function moveNavElementsMod() {
    // Select elements
    const globalNavBar = document.querySelector("#global-nav-bar");
    const navTarget = document.querySelector("#Desktop_LeftSidebar_Id > nav > div");
    const searchSection = document.querySelector("#global-nav-bar > div.main-globalNav-searchSection");
    const libraryContainer = document.querySelector("#Desktop_LeftSidebar_Id > nav > div > div.main-yourLibraryX-libraryContainer.YourLibraryX");

    // Check if elements exist, retry if not
    if (!globalNavBar || !navTarget || !searchSection || !libraryContainer) {
        setTimeout(moveNavElementsMod, 300);
        return;
    }

    // Move global-nav-bar to first place in nav > div
    navTarget.insertBefore(globalNavBar, navTarget.firstChild);

    // Move search section to first place in library container
    libraryContainer.insertBefore(searchSection, libraryContainer.firstChild);
})();

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

(function SpotifySearchMod() {
    // Wait for search input to be ready
    const selector = '[data-encore-id="formInput"]';
    if (!document.querySelector(selector)) {
        setTimeout(SpotifySearchMod, 300);
        return;
    }

    // Function to modify search placeholder
    function modifySearchPlaceholder() {
        const searchInput = document.querySelector(selector);
        if (searchInput) {
            searchInput.placeholder = "Search";
        }
    }

    // Initial execution
    modifySearchPlaceholder();

    // Create an observer for the search input
    const searchObserver = new MutationObserver(modifySearchPlaceholder);
    const searchInput = document.querySelector(selector);
    if (searchInput) {
        searchObserver.observe(searchInput, {
            attributes: true,
            attributeFilter: ['placeholder']
        });
    }
})();