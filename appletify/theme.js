(function moveNavElementsMod() {
  const globalNavBar = document.querySelector("#global-nav-bar");
  const navTarget = document.querySelector("#Desktop_LeftSidebar_Id > nav > div");
  const searchSection = document.querySelector("#global-nav-bar > div.main-globalNav-searchSection");
  const libraryContainer = document.querySelector("#Desktop_LeftSidebar_Id > nav > div > div.main-yourLibraryX-libraryContainer.YourLibraryX");
  const newElement = document.querySelector(".playback-bar");
  const nowPlayingWidget = document.querySelector(".main-nowPlayingWidget-nowPlaying");

  const nowPlayingBar = document.querySelector(".Root__now-playing-bar");
  const mainViewContainer = document.querySelector(".main-view-container");

  if (
    !globalNavBar ||
    !navTarget ||
    !searchSection ||
    !libraryContainer ||
    !newElement ||
    !nowPlayingWidget ||
    !nowPlayingBar ||
    !mainViewContainer
  ) {
    setTimeout(moveNavElementsMod, 300);
    return;
  }

  navTarget.insertBefore(globalNavBar, navTarget.firstChild);
  libraryContainer.insertBefore(searchSection, libraryContainer.firstChild);
  nowPlayingWidget.appendChild(newElement);

  // move into .main-view-container, keep natural DOM order
  mainViewContainer.appendChild(nowPlayingBar);
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

(function discographyMod() {
  if (!Spicetify?.Platform?.History || !Spicetify?.CosmosAsync) {
      setTimeout(discographyMod, 300);
      return;
  }

  const ARTIST_SELECTOR = "[data-test-uri^='spotify:artist']";
  const SOURCE_SELECTOR = ".main-actionBar-ActionBarContainer + .contentSpacing > [aria-label='Discography'] > .main-gridContainer-gridContainer > div:nth-child(1)";
  const TARGET_SELECTOR = ".main-actionBar-ActionBarContainer + .contentSpacing > div:nth-child(1)";
  const BUTTON_SELECTOR = ".main-gridContainer-gridContainerMargin > div:nth-child(1) > button";
  const CLONE_ID = "discography-first-card-clone";
  const DONE_ATTR = "data-discography-done";

  function addClickHandler(clone) {
      clone.addEventListener("click", (e) => {
          e.preventDefault();
          const anchor = e.target.closest("a") || clone.querySelector("a[href]");
          if (!anchor) return;
          const href = anchor.getAttribute("href");
          if (href) Spicetify.Platform.History.push(href);
      });
  }

  function run(retries = 10) {
      const page = document.querySelector(ARTIST_SELECTOR);
      if (!page) return;

      let somethingPending = false;

      // --- See more button ---
      if (!page.hasAttribute(DONE_ATTR)) {
          const button = page.querySelector(BUTTON_SELECTOR);
          if (button) {
              button.click();
              button.style.display = "none";
              page.setAttribute(DONE_ATTR, "true");
          } else {
              somethingPending = true;
          }
      }

      // --- Discography clone ---
      if (!document.getElementById(CLONE_ID)) {
          const source = page.querySelector(SOURCE_SELECTOR);
          const target = page.querySelector(TARGET_SELECTOR);

          if (source && target) {
              const img = source.querySelector("img");
              if (img && !img.complete) {
                  img.addEventListener("load", () => {
                      if (document.getElementById(CLONE_ID)) return;
                      const clone = source.cloneNode(true);
                      clone.id = CLONE_ID;
                      target.insertBefore(clone, target.firstChild);
                      addClickHandler(clone);
                  }, { once: true });
              } else {
                  const clone = source.cloneNode(true);
                  clone.id = CLONE_ID;
                  target.insertBefore(clone, target.firstChild);
                  addClickHandler(clone);
                  const clonedImg = clone.querySelector("img");
                  if (clonedImg) clonedImg.style.opacity = "1";
              }
          } else {
              somethingPending = true;
          }
      }

      // Retry if something wasn't in the DOM yet
      if (somethingPending && retries > 0) {
          setTimeout(() => run(retries - 1), 500);
      }
  }

  function onNavigate() {
      document.getElementById(CLONE_ID)?.remove();
      document.querySelector(ARTIST_SELECTOR)?.removeAttribute(DONE_ATTR);
      setTimeout(run, 800);
  }

  if (Spicetify?.Platform?.History) {
      Spicetify.Platform.History.listen(onNavigate);
  }

  setTimeout(run, 800);
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

(function () {
    const PAGE_SELECTOR = '[data-testid="album-page"], [data-testid="playlist-page"]';
    const WRAP_SELECTOR = '.main-entityHeader-image';

    let currentWrap = null;
    let imgObserver = null;
    let rafID = null;

    function applyGlow(wrap) {
        if (!wrap) return;

        // Ensure the wrapper has the class immediately
        wrap.classList.add("glow-wrap");

        // Try to read the image src if available
        const img = wrap.querySelector("img[src]");
        if (!img) return;

        const src = img.getAttribute("src");
        if (!src) return;

        wrap.style.setProperty("--glow-img", `url("${src.replace(/"/g, '\\"')}")`);
    }

    function watchImage(wrap) {
        if (!wrap) return;

        const img = wrap.querySelector("img");
        if (!img) return;

        // Observe image src changes (Spotify lazy loads and swaps images)
        imgObserver = new MutationObserver(mutations => {
            for (const m of mutations) {
                if (m.type === "attributes" && (m.attributeName === "src" || m.attributeName === "srcset")) {
                    applyGlow(wrap);
                }
            }
        });

        imgObserver.observe(img, { attributes: true, attributeFilter: ["src", "srcset"] });
    }

    function clearPrevious() {
        if (currentWrap) {
            currentWrap.classList.remove("glow-wrap");
            currentWrap.style.removeProperty("--glow-img");
        }
        if (imgObserver) {
            imgObserver.disconnect();
            imgObserver = null;
        }
        currentWrap = null;
    }

    function checkAlbum() {
        const page = document.querySelector(PAGE_SELECTOR);
        if (!page) {
            clearPrevious();
            return;
        }

        const wrap = page.querySelector(WRAP_SELECTOR);
        if (!wrap) {
            clearPrevious();
            return;
        }

        // If same wrapper, nothing to update
        if (wrap === currentWrap) return;

        // Switch to new wrapper
        clearPrevious();
        currentWrap = wrap;

        // Apply glow immediately — BEFORE image loads
        applyGlow(currentWrap);

        // Watch for changes to the image inside
        watchImage(currentWrap);
    }

    // Mutation observer → triggers checkAlbum on every DOM change
    const globalObs = new MutationObserver(() => {
        if (rafID) cancelAnimationFrame(rafID);
        rafID = requestAnimationFrame(checkAlbum); // instant reaction
    });

    globalObs.observe(document.body, { childList: true, subtree: true });

    // Initial run
    checkAlbum();

})();



