if (localStorage.getItem("databaseActive") == null) {
    localStorage.setItem("databaseActive", "true");
    sessionStorage.setItem("DBError", "0");
}

let databaseActive = localStorage.getItem("databaseActive");
let db;
let objectStoreNames = ["Quizzes", "ProgressTracker"];

function databaseInitialization() {
    const request = window.indexedDB.open("mainDataBase", 6);
    request.onerror = (errorEvent) => {
        console.error("MainDataBase was not able to be loaded.");
        if (sessionStorage.getItem("DBError") != "1") {
            alert("Local database was not able to be loaded, try refreshing the website.");
        } else {
            alert("Local database cannot be loaded in due to the error: " + errorEvent.target.error + " Please copy and paste this error into my contact form.");
            let dataDeletionRequest = prompt('Do you want to delete your data to possibly resolve this issue? (please type "yes" or "no," which will disable the database for now)');
            dataDeletionRequest = dataDeletionRequest.toLowerCase();
            if (dataDeletionRequest == "yes") {
                alert("Database has been deleted.");
                indexedDB.deleteDatabase("mainDataBase");
            } else if (dataDeletionRequest == "no") {
                alert("Database has been disabled, please contact me to resolve this issue.")
                localStorage.setItem("databaseActive", "false");
            } else {
                alert("Invalid input.");
            }
        }
        sessionStorage.setItem("DBError", "1");
    }
    
    request.onupgradeneeded = (upgradeEvent) => {
        db = upgradeEvent.target.result;
        if (!db.objectStoreNames.contains("Quizzes")) {
            const quizzesDone = db.createObjectStore("Quizzes", {autoIncrement: true});
        }
        if (!db.objectStoreNames.contains("ProgressTracker")) {
            const progressTrackerData = db.createObjectStore("ProgressTracker", {autoIncrement: false})
        }
    }

    request.onsuccess = (successEvent) => {
        db = successEvent.target.result;
        console.log("MainDataBase was successfully loaded.");
        navigator.storage.estimate().then(estimationData => {
            console.log("Max data: " + estimationData.quota + " bytes.");
            console.log("Used data: " + estimationData.usage + " bytes.");
        })
    }


}

if (databaseActive == "true") {
    databaseInitialization();
}

function dataAmender(database, objectID, data, keySpecific, key) {
    const dataOpener = database.transaction(objectID, "readwrite").objectStore(objectID); 
    if (!keySpecific) {
        const dataAmenderRequest = dataOpener.add(data);
        dataAmenderRequest.onsuccess = dataAmenderSuccess => {
            console.log("Data successfully added." + " Details: " + "data: " + data + ".");
        }
        dataAmenderRequest.onerror = dataAmenderRequestError => {
            console.error("Data amendment error: " + dataAmenderRequestError.target.result + " Details: " + "data: " + data + ".")
        }
    } else if (keySpecific) {
        const dataAmenderRequest = dataOpener.add(data, key);
        dataAmenderRequest.onsuccess = dataAmenderRequestSuccess => {
            console.log("Data successfully added." + " Details: " + "key: " + key + "," + " data: " + data + ".");
        }
        dataAmenderRequest.onerror = dataAmenderRequestError => {
            console.error("Data amendment error: " + dataAmenderRequestError.target.result + ". Details: " + "key: " + key + "," + " data: " + data + ".");
        }
    } else {
        return null
    }
    
}

function dataAccessor(database, objectID, key, callback) {
    const dataOpener = database.transaction(objectID, "readwrite").objectStore(objectID);
    if (key != null) {
        const dataAccessorRequest = dataOpener.get(key);
        dataAccessorRequest.onsuccess = (dbAccessResults) => {
            callback(JSON.stringify(dbAccessResults.target.result));
        }
        dataAccessorRequest.onerror = (dbAccessResults) => {
            callback(null);
            console.error("Error with dataAccessorRequest for a key.");
        }
    } else {
        const dataAccessorRequest = dataOpener.getAll();
        dataAccessorRequest.onsuccess = (dbAccessResults) => {
            callback(JSON.stringify(dbAccessResults.target.result));
        }
        dataAccessorRequest.onerror = (dbAccessResults) => {
            callback(null);
            console.error("Error with dataAccessorRequest for all of the data in an object.")
        }
    }
}

function dataUpdater(database, objectID, key) {
    
}

function testing() {
    dataAccessor(db, "Quizzes", 1, dataAccessorData => {
        console.log(dataAccessorData)
    });
    dataAmender(db, "Quizzes", "hello", false, null);
    dataAmender(db, "ProgressTracker", "heljlhdwadwadio", true, "headwdfwadadwadwadwo");
}

function siteRedirect() {
    window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLScQn1CCsHeMndLWWdk6ilUlblrh4VHgvfa_Ap8azPtA-L3tww/viewform";
}

function pageRedirect(page) {
    window.location.href = page;
}

function test() {
    dataAmender(db, "Quizzes", {"test": 1, "no":3});
}

document.addEventListener("DOMContentLoaded", () => {
    const mainPageGraph = document.getElementById("mainPage_graph");
    mainPageGraph.style.width = "35vw";
    mainPageGraph.style.height = "35vh";
    mainPageGraph.style.color = "black";
    const mainPage_graphCreation = new Chart(mainPageGraph, {
        type: "line",
        data: {
            labels: [1, 2, 3, 4, 5, 6],
            datasets: [{
                label: "Amount of Quizzes completed",
                data: [215, 232, 2323, 424, 323, "<img src=x onerror=alert(1)>"]
            }, {
                label: "Amount of Tests completed",
                data: [2315, 3232, 23233, 4234, 3223, 23]
            }]
        },
        options: {responsive: false, maintainAspectRatio: false}
    })
    const mainPage_backgroundBlocker = document.getElementById("mainPage_backgroundBlocker");
    const homeSideBar_aHolderLeftBorderExpand = document.getElementsByClassName("sidebar_aHolder");
    const homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv = document.getElementsByClassName("homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv");
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
    for (let i = 0; i < homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv.length; i++) {
        homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv[i].addEventListener("mouseenter", () => {
            homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv[i].style.boxShadow = "0px 0px 10px rgb(71, 66, 66)";
        });
        homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv[i].addEventListener("mouseleave", () => {
            homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv[i].style.boxShadow = "0px 0px 0px rgb(71, 66, 66)";
        });
    }
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