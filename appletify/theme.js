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


