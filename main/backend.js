function siteRedirect() {
    window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLScQn1CCsHeMndLWWdk6ilUlblrh4VHgvfa_Ap8azPtA-L3tww/viewform";
}

function pageRedirect(page) {
    window.location.href = page;
}

document.addEventListener("DOMContentLoaded", () => {
    const homeSideBar_aHolderLeftBorderExpand = document.getElementsByClassName("sidebar_aHolder");
    const sidebar = document.getElementById("sidebar");
    const hrDivider = document.getElementById("sideBarDivider");
    for (let i = 0; i < homeSideBar_aHolderLeftBorderExpand.length; i++) {
        homeSideBar_aHolderLeftBorderExpand[i].addEventListener("mouseenter", () => {
            homeSideBar_aHolderLeftBorderExpand[i].querySelector(".sideBar_aHolderLeftBorderExpand").style.transform = "scaleY(1)";
            homeSideBar_aHolderLeftBorderExpand[0].querySelector(".sidebar_widgetNextToSideBar_a").style.opacity = 1;
            homeSideBar_aHolderLeftBorderExpand[0].querySelector(".sidebar_widgetNextToSideBar_a").style.transform = "scaleX(1)";
            homeSideBar_aHolderLeftBorderExpand[0].querySelector(".sidebar_widgetNextToSideBar_a").style.transitionDelay = ".20s";
            homeSideBar_aHolderLeftBorderExpand[0].querySelector(".sidebar_widgetNextToSideBar_a").style.transitionDuration = ".6s";
            sidebar.style.width = "20vw";
            for (t=0; t<homeSideBar_aHolderLeftBorderExpand.length; t++){
                homeSideBar_aHolderLeftBorderExpand[t].style.width = "20vw";
            }
            homeSideBar_aHolderLeftBorderExpand[i].style.backgroundColor = "#79cbf0";
            hrDivider.style.transform = "scaleX(5)";
        });
        homeSideBar_aHolderLeftBorderExpand[i].addEventListener("mouseleave", () => {
            homeSideBar_aHolderLeftBorderExpand[i].querySelector(".sideBar_aHolderLeftBorderExpand").style.transform = "scaleY(0)";
            for (b=0; b<homeSideBar_aHolderLeftBorderExpand.length; b++){
                homeSideBar_aHolderLeftBorderExpand[b].style.width = "5.5vw";
            }
            homeSideBar_aHolderLeftBorderExpand[0].querySelector(".sidebar_widgetNextToSideBar_a").style.transitionDelay = "0s";
            homeSideBar_aHolderLeftBorderExpand[0].querySelector(".sidebar_widgetNextToSideBar_a").style.transform = "scaleX(.1)";
            homeSideBar_aHolderLeftBorderExpand[0].querySelector(".sidebar_widgetNextToSideBar_a").style.opacity = 0;
            homeSideBar_aHolderLeftBorderExpand[i].style.backgroundColor = "#9ddefc";
            hrDivider.style.transform = "scaleX(1)";
            sidebar.style.width = "5.5vw";

        });
    
    }

})

document.addEventListener("DOMContentLoaded", () => {
    console.log("Loaded!");
})