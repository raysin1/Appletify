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
