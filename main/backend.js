function siteRedirect() {
    window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLScQn1CCsHeMndLWWdk6ilUlblrh4VHgvfa_Ap8azPtA-L3tww/viewform";
}

function pageRedirect(page) {
    window.location.href = page;
}

document.addEventListener("DOMContentLoaded", () => {
    const mainPageGraph = document.getElementById("mainPage_graph");
    mainPageGraph.style.width = "35vw";
    mainPageGraph.style.height = "35vh";
    mainPageGraph.style.color = "black";
    const mainPage_graphCreation = new Chart(mainPageGraph, {
        type: "line",
        data: {
            labels: [1, 2, 3, 4, 5],
            datasets: [{
                label: "Amount of Quizzes completed",
                data: [215, 232, 2323, 424, 323]
            }, {
                label: "Amount of Tests completed",
                data: [2315, 3232, 23233, 4234, 3223]
            }]
        },
        options: {responsive: false, maintainAspectRatio: false}
    })
    const mainPage_backgroundBlocker = document.getElementById("mainPage_backgroundBlocker");
    const homeSideBar_aHolderLeftBorderExpand = document.getElementsByClassName("sidebar_aHolder");
    const sidebar = document.getElementById("sidebar");
    const hrDivider = document.getElementById("sideBarDivider");
    const homePage_rightSide_upperDiv_leftDiv = document.getElementById("homePage_rightSide_upperDiv_leftDiv");
    const homePage_rightSide_upperDiv_rightDiv = document.getElementById("homePage_rightSide_upperDiv_rightDiv");
    homePage_rightSide_upperDiv_leftDiv.addEventListener("mouseenter", () => {
        homePage_rightSide_upperDiv_leftDiv.style.boxShadow = "0px 0px 10px rgb(71, 66, 66)";
    });
    homePage_rightSide_upperDiv_leftDiv.addEventListener("mouseleave", () => {
        homePage_rightSide_upperDiv_leftDiv.style.boxShadow = "0px 0px 0px rgb(71, 66, 66)";
    });
    homePage_rightSide_upperDiv_rightDiv.addEventListener("mouseenter", () => {
        homePage_rightSide_upperDiv_rightDiv.style.boxShadow = "0px 0px 10px rgb(71, 66, 66)";
    });
    homePage_rightSide_upperDiv_rightDiv.addEventListener("mouseleave", () => {
        homePage_rightSide_upperDiv_rightDiv.style.boxShadow = "0px 0px 0px rgb(71, 66, 66)";
    });
    for (let i = 0; i < homeSideBar_aHolderLeftBorderExpand.length; i++) {
        homeSideBar_aHolderLeftBorderExpand[i].addEventListener("mouseenter", () => {
            homeSideBar_aHolderLeftBorderExpand[i].querySelector(".sideBar_aHolderLeftBorderExpand").style.transform = "scaleY(1.5)";
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
            mainPage_backgroundBlocker.style.opacity = .35;
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
            mainPage_backgroundBlocker.style.opacity = 0;

        });
    
    }

})

document.addEventListener("DOMContentLoaded", () => {
    console.log("Loaded!");
})