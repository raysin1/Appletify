(function moveNavElementsMod() {
   // Select elements
   const globalNavBar = document.querySelector("#global-nav-bar");
   const navTarget = document.querySelector("#Desktop_LeftSidebar_Id > nav > div");
   const searchSection = document.querySelector("#global-nav-bar > div.main-globalNav-searchSection");
   const libraryContainer = document.querySelector("#Desktop_LeftSidebar_Id > nav > div > div.main-yourLibraryX-libraryContainer.YourLibraryX");
   const newElement = document.querySelector(".gglUjikTBtMzCZFgSmpS");
   const nowPlayingWidget = document.querySelector(".main-nowPlayingWidget-nowPlaying");
   
   // Check if elements exist, retry if not
   if (!globalNavBar || !navTarget || !searchSection || !libraryContainer || !newElement || !nowPlayingWidget) {
       setTimeout(moveNavElementsMod, 300);
       return;
   }
   
   // Move global-nav-bar to first place in nav > div
   navTarget.insertBefore(globalNavBar, navTarget.firstChild);
   
   // Move search section to first place in library container
   libraryContainer.insertBefore(searchSection, libraryContainer.firstChild);
   
   // Move .gglUjikTBtMzCZFgSmpS to inside .main-nowPlayingWidget-nowPlaying
   nowPlayingWidget.appendChild(newElement);
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


function enhanceImageSizes() {
  // Handle existing images
  document.querySelectorAll(".main-image-image.main-entityHeader-image[srcset]").forEach(img => {
    img.setAttribute("sizes", "9999px");
  });

  // Set up MutationObserver to handle future images
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.matches(".main-image-image.main-entityHeader-image[srcset]")) {
              node.setAttribute("sizes", "9999px");
            }
            node.querySelectorAll(".main-image-image.main-entityHeader-image[srcset]").forEach(img => {
              img.setAttribute("sizes", "9999px");
            });
          }
        });
      }
    });
  });

  // Observe the document body for changes
  observer.observe(document.body, { childList: true, subtree: true });
}
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', upgradeImage);
} else {
  upgradeImage();
}
