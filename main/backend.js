function siteRedirect() {
    window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLScQn1CCsHeMndLWWdk6ilUlblrh4VHgvfa_Ap8azPtA-L3tww/viewform";
}

function pageRedirect(page) {
    window.location.href = page;
}

document.addEventListener("DOMContentLoaded", () => {
    const homeSideBar_aHolderLeftBorderExpand = document.getElementsByClassName("sidebar_aHolder");
    for (let i = 0; i < homeSideBar_aHolderLeftBorderExpand.length; i++) {
        homeSideBar_aHolderLeftBorderExpand[i].addEventListener("mouseenter", () => {
            homeSideBar_aHolderLeftBorderExpand[i].querySelector(".sideBar_aHolderLeftBorderExpand").style.transform = "scaleY(1)";
        });
        homeSideBar_aHolderLeftBorderExpand[i].addEventListener("mouseleave", () => {
            homeSideBar_aHolderLeftBorderExpand[i].querySelector(".sideBar_aHolderLeftBorderExpand").style.transform = "scaleY(0)";
        });
    
    }

})

document.addEventListener("DOMContentLoaded", () => {
    console.log("Loaded!");
})