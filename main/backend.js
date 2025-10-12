if (localStorage.getItem("databaseActive") == null) {
    localStorage.setItem("databaseActive", "true");
    sessionStorage.setItem("DBError", "0");
}

let databaseActive = localStorage.getItem("databaseActive");
let db;
let objectStoreNames = ["Quizzes", "ProgressTracker"];

/* Game Data */
let currency = 0;
let upg1 = 0;
let upg2 = 0;
let upg3 = 0;
let upg4 = 0;
let upg5 = 0;
let upg1_price = 100 * (1.25^upg1);
let upg2_price = 1000 * (1.40^upg2);
let upg3_price = 10000 * (1.75^upg3);
let upg4_price = 100000 * (1.90^upg4);
let upg5_price = 1000000 * (2^upg5);
let rebirth = 0;
let rebirthCost = 100000 * (4^rebirth);
let rUpg1 = 0;
let rUpg2 = 0;
let rUpg3 = 0;
let rUpg4 = 0;
let rUpg5 = 0;
let card50Val = 2;
let card30Val = 3;
let card10Val = 5;
let card8Val = 10;
let card2Val = 20;
let card50 = 0;
let card30 = 0;
let card10 = 0;
let card8 = 0;
let card2 = 0;
let rUpg1_price = 1 * (1.50^rUpg1);
let rUpg2_price = 1 * (2.0^rUpg2);
let rUpg3_price = 1 * (2.50^rUpg3);
let rUpg4_price = 1 * (4.0^rUpg4);
let rUpg5_price = 1 * (8.0^rUpg5);
let rMultiplier = 1 * (1 + rUpg4_price) * (1+ rUpg5_price) * (1 + card8) * (1 + card2);
let multiplier = 1 * (1 + upg1 * 2 + upg2 * 3 + upg3 * 5 + upg4 * 10 + upg5 * 25) * (1 + rUpg1 * 2 + rUpg2 * 5 + rUpg3 * 20 + rUpg4 * 50 + rUpg5 * 100) * (1 + card50 + card30 + card10 + card8 + card2);

function gameInitiation() {
    const dataSet = [upg1, upg2, upg3, upg4, upg5];
    const up1Button = document.getElementById("up1Button");
    const up2Button = document.getElementById("up2Button");
    const up3Button = document.getElementById("up3Button");
    const up4Button = document.getElementById("up4Button");
    const up5Button = document.getElementById("up5Button");
    currency = 0;
    upg1 = 0;
    upg2 = 0;
    upg3 = 0;
    upg4 = 0;
    upg5 = 0;
    rebirth = 0;
    rUpg1 = 0;
    rUpg2 = 0;
    rUpg3 = 0;
    rUpg4 = 0;
    rUpg5 = 0;
    card50 = 0;
    card30 = 0;
    card10 = 0;
    card8 = 0;
    card2 = 0;

}

function gameLogic() {
    currency += multiplier;
}


const questionsUnit1 = {
    1: {"What is the derivative of 5x?": {1: ["5x", "5", "10x^2", "0"]}, 
        2: {"What is the derivative of $$6x^2?$$": {2: ["0", "6x", "12x", "3x"]}}},
    2: {1: {}, 
        2: {}},
    3: {1: {},
        2: {}},
    4: {1: {},
        2: {}},
    5: {1: {}, 
        2: {}}
}


const dataMap = {1: [
    "Unit 1", 
    "Derivatives", {
        1: "Basic Derivation",
        2: "Product Rule",
        3: "Quotient Rule",
        4: "Chain Rule",
        5: "Derivative Relationships"
    }], 
    2: [
    "Unit 2",
    "Graphical Analysis", {
        1: "Interpretations of Functions",
        2: "Interpretations of Derivatives",
        3: "Interpretations of Double Derivatives",
        4: "Extreme Value Theorem",
        5: "Intermediate Value Theorem",
        6: "Mean Value Theorm",
        7: "Rolle's Theorem"
    }],
    3: [
    "Unit 3",
    "Integrals", {
        1: "Integral Approximations",
        2: "Antiderivatives",
        3: "First and Second Theorem of Calculus",
        4: "Definite Integrals",
        5: "Indefinite Integrals",
    }
    ],
    4: [
    "Unit 4",
    "Applications of Integrals", {
        1: "Washer Method",
        2: "Disc Method",
        3: "Cross Sections"
    } 
    ],
    5: [
    "Unit 5",
    "Introductory Kinematic Equations", {
        1: "Derivation of Kinematics",
        2: "Change by Integration"
    }
    ]
}

const keyMap = {
        "AB": 1,
        "BC": 2,
        "FC": 3,
        "GH": 4,
        "JK": 5,
        "KL": 6,
        "PI": 7,
        "TY": 8,
        "RE": 9,
        "QW": 0
}

const keyMapReversed = {
        1: "AB",
        2: "BC",
        3: "FC",
        4: "GH",
        5: "JK",
        6: "KL",
        7: "PI",
        8: "TY",
        9: "RE",
        0: "QW"
}



function dataTraverser(database, objectStore, keys, callback) {
    if (keys.length != 0) {
        dataAccessor(database, objectStore, keys[0], DTDA => {
            if (DTDA != null){
                let temporaryHolder = JSON.parse(DTDA);
                for (DTFor=1; DTFor<keys.length; DTFor++) {
                    temporaryHolder = temporaryHolder[keys[DTFor]];
                }
                callback(temporaryHolder);
            }
        })
    } else {
        callback(null);
    }
}


function deleteDatabase(aDatabase) {
    const DBR = indexedDB.deleteDatabase(aDatabase);
    DBR.onerror = DBRONE => {
        console.error("Error: " + DBRONE.target.error + ", database was not able to be successfully deleted.");
    }
    DBR.onsuccess = DBRONS => {
        console.log("Database was successfully deleted.");
    }
}

function databaseInitialization(callback) {
    let tempDBIU = false; 
    const request = window.indexedDB.open("mainDatabase", 3);
    request.onerror = (errorEvent) => {
        console.error("mainDatabase was not able to be loaded.");
        if (sessionStorage.getItem("DBError") != "1") {
            alert("Local database was not able to be loaded, try refreshing the website.");
        } else {
            alert("Local database cannot be loaded in due to the error: " + errorEvent.target.error + " Please copy and paste this error into my contact form.");
            let dataDeletionRequest = prompt('Do you want to delete your data to possibly resolve this issue? (please type "yes" or "no," which will disable the database for now)');
            dataDeletionRequest = dataDeletionRequest.toLowerCase();
            if (dataDeletionRequest == "yes") {
                alert("Database has been deleted.");
                deleteDatabase("mainDatabase");
            } else if (dataDeletionRequest == "no") {
                alert("Database has been disabled, please contact me to resolve this issue.")
                localStorage.setItem("databaseActive", "false");
            } else {
                alert("Invalid input.");
            }
        }
        sessionStorage.setItem("DBError", "1");
        callback(0);
    }
    
    request.onupgradeneeded = (upgradeEvent) => {
        db = upgradeEvent.target.result;
        tempDBIU = true
        if (!db.objectStoreNames.contains("Quizzes")) {
            const quizzesDone = db.createObjectStore("Quizzes", {autoIncrement: true});
        }
        if (!db.objectStoreNames.contains("RecentLessons")) {
            const recentLessons = db.createObjectStore("RecentLessons", {autoIncrement: true});
        }
        if (!db.objectStoreNames.contains("ProgressTracker")) {
            const progressTrackerData = db.createObjectStore("ProgressTracker", {autoIncrement: false});
        }
        if (!db.objectStoreNames.contains("AdaptiveFeedback")) {
            const adaptiveFeedback = db.createObjectStore("AdaptiveFeedback", {autoIncrement: true});
        }
        if (!db.objectStoreNames.contains("temporaryQuestionHolder")) {
            const temporaryQuestionHolder = db.createObjectStore("temporaryQuestionHolder", {autoIncrement: false});
        }
        console.log("Database upgraded.");
    }

    request.onblocked = (databaseBlocked) => {
        console.error("Blocked database request.")
        callback(3);
    }

    request.onsuccess = (successEvent) => {
        db = successEvent.target.result;
        console.log("mainDatabase was successfully loaded.");
        navigator.storage.estimate().then(estimationData => {
            console.log("Max data: " + estimationData.quota + " bytes.");
            console.log("Used data: " + estimationData.usage + " bytes.");
        })
        if (tempDBIU == true)  {
            callback(2);
        } else {
            callback(1);
        }
    }
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
            if (dataOpener.get(data) != undefined) {
                console.error("Key conflict error");
            }
            console.error("Data amendment error: " + dataAmenderRequestError.target.result + ". Details: " + "key: " + key + "," + " data: " + data + ".");
        }
    } else {
        return null
    }
    
}

function dataAccessor(database, objectID, key, callback) {
    const dataOpener = database.transaction(objectID, "readwrite").objectStore(objectID);
    try {
        if (key != null) {
            if (parseInt(key) == NaN) {
                console.log(parseInt(key))
                parsedKey = parseInt(key);
            } else {
                parsedKey = key;
            }
            console.log(parsedKey)
            const dataAccessorRequest = dataOpener.get(parsedKey);
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
    } catch(error) {
        console.error("Data accessor error.")
        callback(error);
    }
}

function dataUpdater(database, objectID, key) {
    
}

function dataRemover(database, objectID, keyroute) {
    const dataOpener = database.transaction(objectID, "readwrite").objectStore(objectID);
    if (keyroute.length > 1) {
        dataOpener.openCursor().onsuccess = DROC => {
            console.log(2);
        }
    dataOpener.close();
    } else if (keyroute.length == 1) {
        dataAccessor(database, objectID, keyroute[0], DRDA => {
            if (DRDA != null) {
                const dataOpener = database.transaction(objectID, "readwrite").objectStore(objectID);
                const DRRequest = dataOpener.delete(keyroute[0]);
                DRRequest.onsuccess = DDRS => {
                    console.log("Data with the key, " + keyroute[0] + ", was successfully deleted.");
                } 
                DRRequest.onerror = DDRE => {
                    console.error("Failed to delete data with the key: " + keyroute[0] + ".")
                }
            } else {
                console.error("Data remover error: " + "database: " + database + ", objectID: " + objectID + ", key route: " + keyroute + ".");
            }
        })
        
    }
    
}



function testing() {
    dataAccessor(db, "Quizzes", 1, dataAccessorData => {
        console.log(dataAccessorData)
    });
    dataAmender(db, "Quizzes", "hello", false, null);
    dataAmender(db, "ProgressTracker", "heljlhdwa2dwadio", true, "headwdfwkwwadadwadwadwo");
}

function siteRedirect() {
    window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLScQn1CCsHeMndLWWdk6ilUlblrh4VHgvfa_Ap8azPtA-L3tww/viewform";
}

function pageRedirect(page) {
    window.location.href = page;
}

function keyMapParser(key) {
    let KMPS = "";
    if (key.length % 2 == 1) {
        return null
    }
    for (counter=0; counter<(key.length/2); counter++) {
        let currentKey = key.substring(counter*2, (counter+1)*2);
        if (keyMap.hasOwnProperty(currentKey)) {
            KMPS += keyMap[currentKey].toString();
        } else {
            return null
        }
    }
    return parseInt(KMPS)
}


function numberParser(number) {
    let NPNS = "";
    let newNum = number.toString();
    for (NPC=0; NPC<newNum.length; NPC++) {
        if (keyMapReversed.hasOwnProperty(newNum[NPC])) {
            NPNS = NPNS + keyMapReversed[newNum[NPC]];
        } else {
            return null
        }
    }
    return NPNS
}

let gameActive = true;
let initiation = true;
function gameStart(quizData) {
    if (!gameActive) {
        return
    }
    if (initiation) {
        initiation = false;
        gameInitiation
    }

    requestAnimationFrame(gameStart);
} 



document.addEventListener("DOMContentLoaded", () => {
    if (databaseActive == "true") {
        databaseInitialization(DBI => {
            if (DBI == 2) {
                const quizzesDataFramework = {
                    1: {"AB":{3:4}},
                    2: {3:{"AB":5}},
                    3: {4:{"BC":6}},
                    4: {5:{6:7}},
                    5: {6:{7:8}}
                }

                const recentLessonsDataFramework = {
                    1: [0],
                    2: [0],
                    3: [0],
                    4: [0]
                }
                
                /* Keep data in dictionaries 
                const progressTrackerdataFramework = {
                    1: [[1], [2], [3], [4], [5]],
                    2: [[1], [2], [3], [4], [5], [6], [7]],
                    3: [[1], [2], [3], [4], [5]],
                    4: [[1], [2], [3]],
                    5: [[1], [2]]
                } */

                console.log(quizzesDataFramework.length);
                for (QDFDBI=0; QDFDBI<Object.keys(quizzesDataFramework).length; QDFDBI++) {
                    console.log(Object.keys(quizzesDataFramework));
                    dataAmender(db, "Quizzes", quizzesDataFramework[Object.keys(quizzesDataFramework)[QDFDBI]], false, null);
                }
            } else if (DBI == 4) {
                console.error("Undocumented error. (error code: 4)");
                alert("Error Code 4: Try refreshing your webpage, and if that does not work, delete your webpage data. (On Google, click on the lock button on the top left, site settings, and press on delete data)");
            } else if (DBI == 1) {
                console.log("The database was successfully loaded without any upgrades necessary.")
            } else {
                console.error("Unknown error.")
            }
    }
    )}
    if (window.location.pathname.split("/").pop() == "lessons.html" || window.location.pathname.split("/").pop() == "lessons") {
        const lessons_rightSide_lessonDiv_lessons = document.getElementsByClassName("lessons_rightSide_lessonDiv_lessons");
        const lessons_rightSide_lessonDiv_lessons_sublesson_content_lessonCompletion = document.getElementsByClassName("lessons_rightSide_lessonDiv_lessons_sublesson_content_lessonCompletion");
        console.log(lessons_rightSide_lessonDiv_lessons_sublesson_content_lessonCompletion);
        const lessons_rightSide_lessonDiv_lessons_sublesson = document.getElementsByClassName("lessons_rightSide_lessonDiv_lessons_sublesson");
        for (let lessonCompButton=0; lessonCompButton<lessons_rightSide_lessonDiv_lessons_sublesson_content_lessonCompletion.length; lessonCompButton++) {
            lessons_rightSide_lessonDiv_lessons_sublesson_content_lessonCompletion[lessonCompButton].addEventListener("click", event => {
                lessons_rightSide_lessonDiv_lessons_sublesson_content_lessonCompletion[lessonCompButton].classList.toggle("lessonCompButtonActive");                
            })
        }
        for (let lesson=0; lesson<lessons_rightSide_lessonDiv_lessons.length; lesson++) {
            lessons_rightSide_lessonDiv_lessons[lesson].addEventListener("mouseenter", event => {
                lessons_rightSide_lessonDiv_lessons[lesson].style.boxShadow = "0px 0px 10px rgb(71, 66, 66)";
            })
        }
        for (let lesson=0; lesson<lessons_rightSide_lessonDiv_lessons.length; lesson++) {
            lessons_rightSide_lessonDiv_lessons[lesson].addEventListener("mouseleave", event => {
                lessons_rightSide_lessonDiv_lessons[lesson].style.boxShadow = "0px 0px 0px rgb(71, 66, 66)";
            })
        }
        for (let sublesson=0; sublesson<lessons_rightSide_lessonDiv_lessons_sublesson.length; sublesson++) {
            lessons_rightSide_lessonDiv_lessons_sublesson[sublesson].addEventListener("mouseenter", LRLLS => {
                for (const sublessonChild of lessons_rightSide_lessonDiv_lessons_sublesson[sublesson].children) {
                    if (sublessonChild.className != "lessons_rightSide_lessonDiv_lessons_sublesson_content") {
                        sublessonChild.style.position = "static";
                        sublessonChild.style.transform = "scaleY(1)";
                        sublessonChild.style.opacity = 1;
                        sublessonChild.style.pointerEvents = "auto";
                    }     
                }
            })
            lessons_rightSide_lessonDiv_lessons_sublesson[sublesson].addEventListener("mouseleave", LRLLS => {
                for (const sublessonChild of lessons_rightSide_lessonDiv_lessons_sublesson[sublesson].children) {
                    if (sublessonChild.className != "lessons_rightSide_lessonDiv_lessons_sublesson_content") {
                        sublessonChild.style.transform = "scaleY(.001)";
                        sublessonChild.style.position = "absolute";
                        sublessonChild.style.opacity = 0;
                        sublessonChild.style.pointerEvents = "none";
                    }
                }
            })

        }
    }
    if (window.location.pathname.split("/").pop() == "practice" || window.location.pathname.split("/").pop() == "practice.html") {
        const dropdownUnitSelector = document.getElementById("SUnits");
        const dropdownLessonSelector = document.getElementById("OLessons")
        const questionAdderButton = document.getElementById("mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_addQuestion");
        const mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_questionPreviewHolder_questionHolder = document.getElementById("mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_questionPreviewHolder_questionHolder");
        const mainPage = document.getElementById("mainPage-divHolder");
        const gameButton = document.getElementById("gameStartButton");
        gameButton.addEventListener("click", GBC => {
            mainPage.style.display = "none";
        })
        dropdownUnitSelector.addEventListener("change", DUSC => {
            const DUSCOptionValue = DUSC.target.value;
            if (keyMapParser(DUSCOptionValue) != null) {
                const lessonData = dataMap[keyMapParser(DUSCOptionValue)][2];
                dropdownLessonSelector.disabled = false;
                dropdownLessonSelector.innerHTML = '<option class="mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_options" selected="selected" value="none">-- Select a Lesson --</option> <option class="mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_options" value="QW">Every Lesson</option>';
                for (DUSCLessonCounter=0; DUSCLessonCounter<Object.keys(lessonData).length; DUSCLessonCounter++) {
                    const DUSCLesson = document.createElement("option");
                    DUSCLesson.value = numberParser(DUSCLessonCounter + 1);
                    DUSCLesson.textContent = "Lesson " + (DUSCLessonCounter + 1) + ": " + Object.values(lessonData)[DUSCLessonCounter];
                    DUSCLesson.classList.add("mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_options");
                    dropdownLessonSelector.appendChild(DUSCLesson);
                }
            } else {
                dropdownLessonSelector.innerHTML = '<option class="mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_options" selected="selected" value="none">-- Select a Lesson --</option>';
                dropdownLessonSelector.disabled = true;
            }
        })
        dropdownLessonSelector.addEventListener("change", DLSC => {
            if (dropdownUnitSelector.value != "none" && dropdownLessonSelector.value != "none") {
                questionAdderButton.style.pointerEvents = "auto";
                questionAdderButton.style.backgroundColor = "#93d8f8"
            } else {
                questionAdderButton.style.pointerEvents = "none";
                questionAdderButton.style.backgroundColor = "#5abdea"
            }
        })

        questionAdderButton.addEventListener("click", DABC => {
                dataAmender(db, "temporaryQuestionHolder", [dropdownUnitSelector.value, dropdownLessonSelector.value], true, dropdownUnitSelector.value + dropdownLessonSelector.value);
                questionContainer = [];
                const dataOpener = db.transaction("temporaryQuestionHolder", "readwrite").objectStore("temporaryQuestionHolder");
                const dataLooperRequest = dataOpener.openCursor();
                dataLooperRequest.onsuccess = DLR => {
                    if (DLR.target.result) {
                        const successResults = DLR.target.result;
                        questionContainer.push(successResults.key);
                        successResults.continue();
                    } else {
                        console.log("Data collection complete.")
                    }
                    questionContainer = questionContainer.flat();
                    for (questionAdder=0; questionAdder<questionContainer.length; questionAdder++) {
                        if (document.querySelector("#" + questionContainer[questionAdder]) == null) {
                            const newChild = document.createElement("div");
                            newChild.id = questionContainer[questionAdder];
                            newChild.classList.add("mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_questionPreviewHolder_questionHolder_question");
                            if (questionContainer[questionAdder].substring(2, 4) != "QW"){
                                newChild.textContent = "Unit: " + keyMapParser(questionContainer[questionAdder].substring(0, 2)) + ", Lesson: " +  keyMapParser(questionContainer[questionAdder].substring(2, 4)) + " Questions";
                            } else {
                                newChild.textContent = "Unit: " + keyMapParser(questionContainer[questionAdder].substring(0, 2)) + ", Every Question";
                            } 
                            const childOfNewChild = document.createElement("div");
                            childOfNewChild.classList.add("mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_questionPreviewHolder_questionHolder_question_removalDiv")
                            childOfNewChild.textContent = "X";
                            childOfNewChild.addEventListener("click", CONCC => {
                                childOfNewChild.parentElement.remove();
                                console.log(childOfNewChild.parentElement.id)
                                dataRemover(db, "temporaryQuestionHolder", [childOfNewChild.parentElement.id]);
                            })
                            newChild.appendChild(childOfNewChild);
                            mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_questionPreviewHolder_questionHolder.appendChild(newChild);
                    }
                }
            }  
        })
    }
    if (window.location.pathname.split("/").pop() == "home" || window.location.pathname.split("/").pop() == "lessons" || window.location.pathname.split("/").pop() == "vocabulary" || window.location.pathname.split("/").pop() == "settings" || window.location.pathname.split("/").pop() == "practice" || window.location.pathname.split("/").pop() == "home.html" || window.location.pathname.split("/").pop() == "lessons.html" || window.location.pathname.split("/").pop() == "vocabulary.html" || window.location.pathname.split("/").pop() == "settings.html" || window.location.pathname.split("/").pop() == "practice.html") {
        if (window.location.pathname.split("/").pop() == "home.html" || window.location.pathname.split("/").pop() == "home") {
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
            const homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv = document.getElementsByClassName("homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv");
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
        }

        const mainPage_backgroundBlocker = document.getElementById("mainPage_backgroundBlocker");
        const homeSideBar_aHolderLeftBorderExpand = document.getElementsByClassName("sidebar_aHolder");
        const sidebar = document.getElementById("sidebar");
        const hrDivider = document.getElementById("sideBarDivider");

        for (let i = 0; i < homeSideBar_aHolderLeftBorderExpand.length; i++) {
            homeSideBar_aHolderLeftBorderExpand[i].addEventListener("mouseenter", () => {
                homeSideBar_aHolderLeftBorderExpand[i].querySelector(".sideBar_aHolderLeftBorderExpand").style.transform = "scaleY(1.5)";
                for (let a = 0; a < homeSideBar_aHolderLeftBorderExpand.length; a++) {
                    homeSideBar_aHolderLeftBorderExpand[a].querySelector(".sidebar_widgetNextToSideBar_a").style.opacity = 1;
                    homeSideBar_aHolderLeftBorderExpand[a].querySelector(".sidebar_widgetNextToSideBar_a").style.transform = "scaleX(1)";
                    homeSideBar_aHolderLeftBorderExpand[a].querySelector(".sidebar_widgetNextToSideBar_a").style.transitionDelay = ".20s";
                    homeSideBar_aHolderLeftBorderExpand[a].querySelector(".sidebar_widgetNextToSideBar_a").style.transitionDuration = ".6s";
                }
                

                
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
                for (let g = 0; g < homeSideBar_aHolderLeftBorderExpand.length; g++) {
                    homeSideBar_aHolderLeftBorderExpand[g].querySelector(".sidebar_widgetNextToSideBar_a").style.transitionDelay = "0s";
                    homeSideBar_aHolderLeftBorderExpand[g].querySelector(".sidebar_widgetNextToSideBar_a").style.transform = "scaleX(.1)";
                    homeSideBar_aHolderLeftBorderExpand[g].querySelector(".sidebar_widgetNextToSideBar_a").style.opacity = 0;
                }

                homeSideBar_aHolderLeftBorderExpand[i].style.backgroundColor = "#9ddefc";
                hrDivider.style.transform = "scaleX(1)";
                sidebar.style.width = "5.5vw";
                mainPage_backgroundBlocker.style.opacity = 0;

            });
        }
    }
})

document.addEventListener("DOMContentLoaded", () => {
    console.log("Loaded!");
})