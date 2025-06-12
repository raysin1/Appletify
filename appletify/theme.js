
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

(function ImageSrcModifier() {
    const newImageUrl = "https://scontent.fyyc3-1.fna.fbcdn.net/v/t39.30808-6/481102905_1155699489888498_7004212485082003953_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=7BVck9UOWA8Q7kNvwEicA1e&_nc_oc=AdnuyywKt1iMU-FlvrRffIeRvEKn1CrNaGJReTW1dd2dKg22VVvQICyh5gZkR4LEfuLSblwDom1HcsRQ3XV1OU-V&_nc_zt=23&_nc_ht=scontent.fyyc3-1.fna&_nc_gid=Yd5lNIN8AVG5Sqosfr3kog&oh=00_AfNiiKjnNdw4njAt96lQ4p3diHdFIfCRURo_u7YnlsZYbQ&oe=684E0FF5";
    
    // Selectors
    const selector1 = '.main-yourLibraryX-libraryItemContainer.ZjfaJlGQZ42nCWjD3FDm li.main-useDropTarget-base.main-useDropTarget-track.main-useDropTarget-local.main-useDropTarget-album.main-useDropTarget-artist.CU0fvofmxUbTupSDNOQ3.main-useDropTarget-playlist.main-useDropTarget-show.main-useDropTarget-folder.main-useDropTarget-pseudoPlaylist > div > div > div.D_1eJKOJ3wTCKO93GX06 > div > div > img';
    const selector2 = '[aria-label="Spotify – Liked Songs"] .main-entityHeader-image > img';

    // Check if elements exist
    if (!document.querySelector(selector1) || !document.querySelector(selector2)) {
        setTimeout(ImageSrcModifier, 300);
        return;
    }

    // Modify src and srcset
    function modifyImages() {
        const img1 = document.querySelector(selector1);
        const img2 = document.querySelector(selector2);
        if (img1) img1.src = newImageUrl;
        if (img2) img2.srcset = newImageUrl;
    }

    // Initial execution
    modifyImages();

    // Observe changes
    const observer = new MutationObserver(modifyImages);
    [selector1, selector2].forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            observer.observe(element, {
                attributes: true,
                attributeFilter: ['src', 'srcset']
            });
        }
    });
})();
