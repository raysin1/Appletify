(function moveNavElementsMod() {
   const globalNavBar = document.querySelector("#global-nav-bar");
   const navTarget = document.querySelector("#Desktop_LeftSidebar_Id > nav > div");
   const searchSection = document.querySelector("#global-nav-bar > div.main-globalNav-searchSection");
   const libraryContainer = document.querySelector("#Desktop_LeftSidebar_Id > nav > div > div.main-yourLibraryX-libraryContainer.YourLibraryX");
   const newElement = document.querySelector(".playback-bar");
   const nowPlayingWidget = document.querySelector(".main-nowPlayingWidget-nowPlaying");
   
   if (!globalNavBar || !navTarget || !searchSection || !libraryContainer || !newElement || !nowPlayingWidget) {
       setTimeout(moveNavElementsMod, 300);
       return;
   }
   
   navTarget.insertBefore(globalNavBar, navTarget.firstChild);
   libraryContainer.insertBefore(searchSection, libraryContainer.firstChild);
   nowPlayingWidget.appendChild(newElement);
})();

(function SpotifySearchMod() {
    const selector = '[data-encore-id="formInput"]';
    if (!document.querySelector(selector)) {
        setTimeout(SpotifySearchMod, 300);
        return;
    }

    function modifySearchPlaceholder() {
        const searchInput = document.querySelector(selector);
        if (searchInput) {
            searchInput.placeholder = "Search";
        }
    }

    modifySearchPlaceholder();

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
  document.querySelectorAll(".main-image-image.main-entityHeader-image[srcset]").forEach(img => {
    img.setAttribute("sizes", "9999px");
  });

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

  observer.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', enhanceImageSizes);
} else {
  enhanceImageSizes();
}
