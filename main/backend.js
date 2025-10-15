if (localStorage.getItem("databaseActive") == null) {
    localStorage.setItem("databaseActive", "true");
    sessionStorage.setItem("DBError", "0");
}

let databaseActive = localStorage.getItem("databaseActive");
let db;
let objectStoreNames = ["Quizzes", "ProgressTracker"];

const questionsUnit1 = {
    1: {"What is the derivative of \u00A0 $$5x$$?": {1: ["5x", "5", "10x^2", "0"]}, 
        "What is the derivative of \u00A0 $$6x^2?$$": {2: ["0", "6x", "12x", "3x"]}}/*,
    2: {1: {}, 
        2: {}},
    3: {1: {},
        2: {}},
    4: {1: {},
        2: {}},
    5: {1: {}, 
        2: {}}*/
}

let unitData = [questionsUnit1]

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

/* Game Data */
let currency = 0;
let upg1 = 0;
let upg2 = 0;
let upg3 = 0;
let upg4 = 0;
let upg5 = 0;
let upg1_price = 10 * Math.pow(1.25, upg1);
let upg2_price = 100 * Math.pow(1.4, upg2);
let upg3_price = 500 * Math.pow(1.75, upg3);
let upg4_price = 5000 * Math.pow(1.9, upg4);
let upg5_price = 50000 * Math.pow(2.3, upg5);
let rebirth = 0;
let totalRebirth = 0;
let rebirthCost = 100000 * Math.pow(1.5, totalRebirth);
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
let rUpg1_price = 1 * Math.pow(1.5, rUpg1);
let rUpg2_price = 4 * Math.pow(2.0, rUpg2);
let rUpg3_price = 8 * Math.pow(3, rUpg3);
let rUpg4_price = 20 * Math.pow(5, rUpg4);
let rUpg5_price = 50 * Math.pow(8, rUpg5);
let rMultiplier = 1 * (1 + rUpg4) * (1 + rUpg5) * (1 + card2 * card2Val) * (1 + card8 * card8Val);
let multiplier = 1 * (1 + upg1 * 10 + upg2 * 75 + upg3 * 500 + upg4 * 2500 + upg5 * 10000) * (1 + rUpg1 * 2 + rUpg2 * 5 + rUpg3 * 20 + rUpg4 * 50 + rUpg5 * 100) * (1 + card50 * card50Val + card30 * card30Val + card10 * card10Val + card8 * card8Val + card2 * card2Val) * (1 + rebirth);
let gameActive = false;
let initiation = true;
let valueUpdater = 0;
let perfLast = performance.now();
let FPS = 0;
let avgCounter = 0;
let avgSum = 0;
let mainFPS = 60;
let questionCounter = 0;
const rUpgs = [rUpg1, rUpg2, rUpg3, rUpg4, rUpg5];
const rUpgsPrice = [rUpg1_price, rUpg2_price, rUpg3_price, rUpg4_price, rUpg5_price];
let questionDivs = [];
let chosenQuestion = "";
let correctAnswer = "";

function requestQuestionGameFrame() {
    const hiddenDivGame_mainScreen_gameScreen = document.getElementById("hiddenDivGame_mainScreen_gameScreen")
    const hiddenDivGame_mainScreen_gameScreen_upgHolder = document.getElementsByClassName("hiddenDivGame_mainScreen_gameScreen_upgHolder");
    let chosenLesson = questionContainer[Math.floor(Math.random() * questionContainer.length)];
    let unitObject = "";
    let lessonObject = "";
    let possibleChoicesArray = [];
    let tempRandomMath = 0;
    let actualStringQuestion = "";
    /* Make animationActive vars for all 4 answers */
    let animationActve = false;
    
    chosenQuestion = "";
    console.log("Chosen Lesson: " + chosenLesson)
    try {
        if (unitData[keyMapParser(chosenLesson.substring(0,2)) - 1] != undefined) {
            unitObject = unitData[keyMapParser(chosenLesson.substring(0,2)) - 1];
        } else {
            unitObject = unitData[0];
        }
    } catch(error) {
        unitObject = unitData[0];
    }
    try {
        if (unitObject[keyMapParser(chosenLesson.substring(2,4))] != undefined || Object.keys(unitObject[keyMapParser(chosenLesson.substring(2,4))]).length != 0) {
            console.log(Object.keys(unitObject[keyMapParser(chosenLesson.substring(2,4))]).length != 0)
            console.log(Object.keys(unitObject[keyMapParser(chosenLesson.substring(2,4))]).length)
            console.log(Object.keys(unitObject[keyMapParser(chosenLesson.substring(2,4))]))
            lessonObject = unitObject[keyMapParser(chosenLesson.substring(2,4))];
        } else {
            lessonObject = unitObject[1];
        }
    } catch(error) {
        lessonObject = unitObject[1];
    }
    tempRandomMath = Math.random();
    actualStringQuestion = Object.keys(lessonObject)[[Math.floor(tempRandomMath * Object.keys(lessonObject).length)]]
    chosenQuestion = lessonObject[Object.keys(lessonObject)[Math.floor(tempRandomMath * Object.keys(lessonObject).length)]]
    possibleChoicesArray = Object.values(chosenQuestion).flat();
    correctAnswer = possibleChoicesArray[Object.keys(chosenQuestion).flat()[0]];
    console.log(correctAnswer)
    console.log(possibleChoicesArray)
    questionDivs = [];
    for (let HDGUH=0; HDGUH<hiddenDivGame_mainScreen_gameScreen_upgHolder.length; HDGUH++) {
        hiddenDivGame_mainScreen_gameScreen_upgHolder[HDGUH].style.display = "none";
    }
    hiddenDivGame_mainScreen_gameScreen.style.flexDirection = "column";
    gameActive = false;
    const questionDiv = document.createElement("div");
    questionDiv.textContent = actualStringQuestion;
    questionDiv.classList.add("hiddenDivGame_mainScreen_gameScreen_question")
    const questionDiv2Holder1 = document.createElement("div");
    questionDiv2Holder1.classList.add("hiddenDivGame_mainScreen_gameScreen_twoQuestionHolder")
    const questionDiv2Holder2 = document.createElement("div");
    questionDiv2Holder2.classList.add("hiddenDivGame_mainScreen_gameScreen_twoQuestionHolder")

    tempRandomMath = Math.floor(Math.random() * (possibleChoicesArray.length-1));
    const possibleChoice1 = document.createElement("div");
    possibleChoice1.classList.add("hiddenDivGame_mainScreen_gameScreen_answer");
    possibleChoice1.id = possibleChoicesArray[tempRandomMath];
    possibleChoice1.textContent = "$$" + possibleChoicesArray[tempRandomMath] + "$$";
    questionDiv2Holder1.appendChild(possibleChoice1);
    possibleChoice1.addEventListener("mouseenter", () => {
        if (!animationActve) {
            possibleChoice1.style.backgroundColor = "#b7e1f4";
            possibleChoice1.style.transform = "scale(1.05)";
        }
        possibleChoice1.style.boxShadow = "0px 0px 4px grey";
    })
    possibleChoice1.addEventListener("mouseleave", () => {
        if (!animationActve) {
            possibleChoice1.style.backgroundColor = "#8dceec";
            possibleChoice1.style.transform = "scale(1)";
        }
        possibleChoice1.style.boxShadow = "0px 0px 0px grey";
    })
    possibleChoice1.addEventListener("click", () => {
        if (possibleChoice1.id == correctAnswer) {
            for (let GEROGFC=0; GEROGFC<questionDivs.length;GEROGFC++) {
                questionDivs[GEROGFC].remove();
            }
            gameActive = true;
            gameStart(60);
            for (let HDGUH=0; HDGUH<hiddenDivGame_mainScreen_gameScreen_upgHolder.length; HDGUH++) {
                hiddenDivGame_mainScreen_gameScreen_upgHolder[HDGUH].style.display = "flex";
                hiddenDivGame_mainScreen_gameScreen.style.flexDirection = "row";
            }
        } else {
            animationActve = true;
            possibleChoice1.style.backgroundColor = "#dc4545";
            possibleChoice1.style.transform = "translateX(8%)";
            possibleChoice1.style.pointerEvents = "none";
            setTimeout(() => {
                possibleChoice1.style.transform = "translateX(-6%)";
            }, 500)
            
            setTimeout(() => {
                possibleChoice1.style.backgroundColor = "#8dceec";
                possibleChoice1.style.pointerEvents = "auto";
                animationActve = false;
            }, 1100)
            setTimeout(() => {
                possibleChoice1.style.transform = "translateX(0)";
            }, 1000)
        }
    })
    MathJax.typesetPromise([possibleChoice1])
    possibleChoicesArray.splice(tempRandomMath, 1);

    tempRandomMath = Math.floor(Math.random() * (possibleChoicesArray.length-1));
    const possibleChoice2 = document.createElement("div");
    possibleChoice2.classList.add("hiddenDivGame_mainScreen_gameScreen_answer");
    possibleChoice2.textContent = "$$" + possibleChoicesArray[tempRandomMath] + "$$";
    questionDiv2Holder1.appendChild(possibleChoice2);
    possibleChoice2.id = possibleChoicesArray[tempRandomMath];
    possibleChoice2.addEventListener("mouseenter", () => {
        if (!animationActve) {
            possibleChoice2.style.backgroundColor = "#b7e1f4";
            possibleChoice2.style.transform = "scale(1.05)";
        }
        possibleChoice2.style.boxShadow = "0px 0px 4px grey";
    })
    possibleChoice2.addEventListener("mouseleave", () => {
        if (!animationActve) {
            possibleChoice2.style.backgroundColor = "#8dceec";
            possibleChoice2.style.transform = "scale(1)";
        }
        possibleChoice2.style.boxShadow = "0px 0px 0px grey";
    })
    possibleChoice2.addEventListener("click", () => {
        if (possibleChoice2.id == correctAnswer) {
            for (let GEROGFC=0; GEROGFC<questionDivs.length;GEROGFC++) {
                questionDivs[GEROGFC].remove();
            }
            gameActive = true;
            gameStart(60);
            for (let HDGUH=0; HDGUH<hiddenDivGame_mainScreen_gameScreen_upgHolder.length; HDGUH++) {
                hiddenDivGame_mainScreen_gameScreen_upgHolder[HDGUH].style.display = "flex";
                hiddenDivGame_mainScreen_gameScreen.style.flexDirection = "row";
            }
        } else {
            animationActve = true;
            possibleChoice2.style.backgroundColor = "#dc4545";
            possibleChoice2.style.transform = "translateX(8%)";
            possibleChoice2.style.pointerEvents = "none";
            setTimeout(() => {
                possibleChoice2.style.transform = "translateX(-6%)";
            }, 500)
            
            setTimeout(() => {
                possibleChoice2.style.backgroundColor = "#8dceec";
                possibleChoice2.style.pointerEvents = "auto";
                animationActve = false;
            }, 1100)
            setTimeout(() => {
                possibleChoice2.style.transform = "translateX(0)";
            }, 1000)
            
        }
    })
    possibleChoicesArray.splice(tempRandomMath, 1);
    tempRandomMath = Math.floor(Math.random() * (possibleChoicesArray.length-1));
    const possibleChoice3 = document.createElement("div");
    possibleChoice3.classList.add("hiddenDivGame_mainScreen_gameScreen_answer");
    possibleChoice3.textContent = "$$" + possibleChoicesArray[tempRandomMath] + "$$";
    questionDiv2Holder2.appendChild(possibleChoice3);
    possibleChoice3.id = possibleChoicesArray[tempRandomMath];
    possibleChoice3.addEventListener("mouseenter", () => {
        if (!animationActve) {
            possibleChoice3.style.backgroundColor = "#b7e1f4";
            possibleChoice3.style.transform = "scale(1.05)";
        }
        possibleChoice3.style.boxShadow = "0px 0px 4px grey";
    })
    possibleChoice3.addEventListener("mouseleave", () => {
        if (!animationActve) {
            possibleChoice3.style.backgroundColor = "#8dceec";
            possibleChoice3.style.transform = "scale(1)";
        }
        possibleChoice3.style.boxShadow = "0px 0px 0px grey";
    })
    possibleChoice3.addEventListener("click", () => {
        if (possibleChoice3.id == correctAnswer) {
            for (let GEROGFC=0; GEROGFC<questionDivs.length;GEROGFC++) {
                questionDivs[GEROGFC].remove();
            }
            gameActive = true;
            gameStart(60);
            for (let HDGUH=0; HDGUH<hiddenDivGame_mainScreen_gameScreen_upgHolder.length; HDGUH++) {
                hiddenDivGame_mainScreen_gameScreen_upgHolder[HDGUH].style.display = "flex";
                hiddenDivGame_mainScreen_gameScreen.style.flexDirection = "row";
            }
        } else {
            animationActve = true;
            possibleChoice3.style.backgroundColor = "#dc4545";
            possibleChoice3.style.transform = "translateX(8%)";
            possibleChoice3.style.pointerEvents = "none";
            setTimeout(() => {
                possibleChoice3.style.transform = "translateX(-6%)";
            }, 500)
            
            setTimeout(() => {
                possibleChoice3.style.backgroundColor = "#8dceec";
                possibleChoice3.style.pointerEvents = "auto";
                animationActve = false;
            }, 1100)
            setTimeout(() => {
                possibleChoice3.style.transform = "translateX(0)";
            }, 1000)
            
        }
    })
    possibleChoicesArray.splice(tempRandomMath, 1);
    console.log(possibleChoicesArray.length)
    tempRandomMath = Math.floor(Math.random() * (possibleChoicesArray.length-1));
    const possibleChoice4 = document.createElement("div");
    possibleChoice4.classList.add("hiddenDivGame_mainScreen_gameScreen_answer");
    possibleChoice4.textContent = "$$" + possibleChoicesArray[tempRandomMath] + "$$";
    questionDiv2Holder2.appendChild(possibleChoice4);
    possibleChoice4.id = possibleChoicesArray[tempRandomMath];
    possibleChoice4.addEventListener("mouseenter", () => {
        if (!animationActve) {
            possibleChoice4.style.backgroundColor = "#b7e1f4";
            possibleChoice4.style.transform = "scale(1.05)";
        }
        possibleChoice4.style.boxShadow = "0px 0px 4px grey";
    })
    possibleChoice4.addEventListener("mouseleave", () => {
        if (!animationActve) {
            possibleChoice4.style.backgroundColor = "#8dceec";
            possibleChoice4.style.transform = "scale(1)";
        }
        possibleChoice4.style.boxShadow = "0px 0px 0px grey";
    })
    possibleChoice4.addEventListener("click", () => {
        if (possibleChoice4.id == correctAnswer) {
            for (let GEROGFC=0; GEROGFC<questionDivs.length;GEROGFC++) {
                questionDivs[GEROGFC].remove();
            }
            gameActive = true;
            gameStart(60);
            for (let HDGUH=0; HDGUH<hiddenDivGame_mainScreen_gameScreen_upgHolder.length; HDGUH++) {
                hiddenDivGame_mainScreen_gameScreen_upgHolder[HDGUH].style.display = "flex";
                hiddenDivGame_mainScreen_gameScreen.style.flexDirection = "row";
            }
        } else {
            animationActve = true;
            possibleChoice4.style.backgroundColor = "#dc4545";
            possibleChoice4.style.transform = "translateX(8%)";
            possibleChoice4.style.pointerEvents = "none";
            setTimeout(() => {
                possibleChoice4.style.transform = "translateX(-6%)";
            }, 500)
            
            setTimeout(() => {
                possibleChoice4.style.backgroundColor = "#8dceec";
                possibleChoice4.style.pointerEvents = "auto";
                animationActve = false;
            }, 1100)
            setTimeout(() => {
                possibleChoice4.style.transform = "translateX(0)";
            }, 1000)
        }
    })
    possibleChoicesArray.splice(tempRandomMath, 1);
    MathJax.typesetPromise([possibleChoice2])
    MathJax.typesetPromise([possibleChoice3])
    MathJax.typesetPromise([possibleChoice4])
    MathJax.typesetPromise([questionDiv])
    
    hiddenDivGame_mainScreen_gameScreen.appendChild(questionDiv);
    hiddenDivGame_mainScreen_gameScreen.appendChild(questionDiv2Holder1);
    hiddenDivGame_mainScreen_gameScreen.appendChild(questionDiv2Holder2);
    questionDivs.push(questionDiv2Holder1);
    questionDivs.push(questionDiv2Holder2);
    questionDivs.push(possibleChoice1);
    questionDivs.push(possibleChoice2);
    questionDivs.push(possibleChoice3);
    questionDivs.push(possibleChoice4);
    questionDivs.push(questionDiv);
    questionDivs = questionDivs.flat();
    console.log(questionDivs)
}

function gameInitiation() {
    const dataSet = [upg1, upg2, upg3, upg4, upg5];
    const up1Button = document.getElementById("firstUpgradeDiv");
    const up2Button = document.getElementById("secondUpgradeDiv");
    const up3Button = document.getElementById("thirdUpgradeDiv");
    const up4Button = document.getElementById("forthUpgradeDiv");
    const up5Button = document.getElementById("fifthUpgradeDiv");
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
    totalRebirth = 0;
    console.log("Game initiated.");
    console.log("test")
    up1Button.textContent = "Multiplier: 10x | Cost: " + Math.floor(upg1_price) + " | Owned: " + Math.floor(upg1);
    up2Button.textContent = "Multiplier: 75x | Cost: " + Math.floor(upg2_price) + " | Owned: " + Math.floor(upg2);
    up3Button.textContent = "Multiplier: 500x | Cost: " + Math.floor(upg3_price) + " | Owned: " + Math.floor(upg3);
    up4Button.textContent = "Multiplier: 2500x | Cost: " + Math.floor(upg4_price) + " | Owned: " + Math.floor(upg4);
    up5Button.textContent = "Multiplier: 10000x | Cost: " + Math.floor(upg5_price) + " | Owned: " + Math.floor(upg5);
}

function gameLogic() {
    currency += multiplier;
}

function gameEnd() {
    for (let GE=0; GE<questionDivs.length;GE++) {
        questionDivs[GE].remove();
    }
    gameActive = false;
    initiation = true;
    valueUpdater = 0;
    perfLast = performance.now();
    FPS = 0;
    avgCounter = 0;
    avgSum = 0;
    mainFPS = 60;
    questionCounter = 0;
}

function updateGameScreen() { 
    upg1_price = 10 * Math.pow(1.25, upg1);
    upg2_price = 100 * Math.pow(1.4, upg2);
    upg3_price = 500 * Math.pow(1.75, upg3);
    upg4_price = 5000 * Math.pow(1.9, upg4);
    upg5_price = 50000 * Math.pow(2.3, upg5);
    rUpg1_price = 1 * Math.pow(1.5, rUpg1);
    rUpg2_price = 4 * Math.pow(2.0, rUpg2);
    rUpg3_price = 8 * Math.pow(3, rUpg3);
    rUpg4_price = 20 * Math.pow(5, rUpg4);
    rUpg5_price = 50 * Math.pow(8, rUpg5);
    rebirthCost = 100000 * Math.pow(1.5, totalRebirth);
    rMultiplier = 1 * (1 + rUpg4) * (1 + rUpg5) * (1 + card2 * card2Val) * (1 + card8 * card8Val);
    multiplier = 1 * (1 + upg1 * 10 + upg2 * 75 + upg3 * 500 + upg4 * 2500 + upg5 * 10000) * (1 + rUpg1 * 2 + rUpg2 * 5 + rUpg3 * 20 + rUpg4 * 50 + rUpg5 * 100) * (1 + card50 * card50Val + card30 * card30Val + card10 * card10Val + card8 * card8Val + card2 * card2Val) * (1 + rebirth);
    const rUpgDiv1 = document.getElementById("rUpgDiv1");
    const rUpgDiv2 = document.getElementById("rUpgDiv2");
    const rUpgDiv3 = document.getElementById("rUpgDiv3");
    const rUpgDiv4 = document.getElementById("rUpgDiv4");
    const rUpgDiv5 = document.getElementById("rUpgDiv5");
    const up1Button = document.getElementById("firstUpgradeDiv");
    const up2Button = document.getElementById("secondUpgradeDiv");
    const up3Button = document.getElementById("thirdUpgradeDiv");
    const up4Button = document.getElementById("forthUpgradeDiv");
    const up5Button = document.getElementById("fifthUpgradeDiv");
    const hiddenDivGame_mainScreen_gameScreen_upgHolder_rebirthAmount = document.getElementById("hiddenDivGame_mainScreen_gameScreen_upgHolder_rebirthAmount");
    const hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpgMoney = document.getElementById("hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpgMoney");
    hiddenDivGame_mainScreen_gameScreen_upgHolder_rebirthAmount.textContent = "Rebirths: " + Math.floor(rebirth) + " (" + rMultiplier + "x multpier) | Rebirth Cost: " + Math.floor(rebirthCost);
    rUpgDiv1.textContent = "Multiplier: 2x | Cost: " + Math.floor(rUpg1_price) + " | Owned: " + Math.floor(rUpg1);
    rUpgDiv2.textContent = "Multiplier: 5x | Cost: " + Math.floor(rUpg2_price) + " | Owned: " + Math.floor(rUpg2);
    rUpgDiv3.textContent = "Multiplier: 20x | Cost: " + Math.floor(rUpg3_price) + " | Owned: " + Math.floor(rUpg3);
    rUpgDiv4.textContent = "Multiplier: 50x | Cost: " + Math.floor(rUpg4_price) + " | Owned: " + Math.floor(rUpg4);
    rUpgDiv5.textContent = "Multiplier: 100x | Cost: " + Math.floor(rUpg5_price) + " | Owned: " + Math.floor(rUpg5);
    up1Button.textContent = "Multiplier: 5x | Cost: " + Math.floor(upg1_price) + " | Owned: " + Math.floor(upg1);
    up2Button.textContent = "Multiplier: 75x | Cost: " + Math.floor(upg2_price) + " | Owned: " + Math.floor(upg2);
    up3Button.textContent = "Multiplier: 500x | Cost: " + Math.floor(upg3_price) + " | Owned: " + Math.floor(upg3);
    up4Button.textContent = "Multiplier: 2500x | Cost: " + Math.floor(upg4_price) + " | Owned: " + Math.floor(upg4);
    up5Button.textContent = "Multiplier: 10000x | Cost: " + Math.floor(upg5_price) + " | Owned: " + Math.floor(upg5);
    hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpgMoney.textContent = "Money: " + Math.floor(currency) + " (" + multiplier + "/s)";
}



function dataTraverser(database, objectStore, keys, callback) {
    if (keys.length != 0) {
        dataAccessor(database, objectStore, keys[0], DTDA => {
            if (DTDA != null){
                let temporaryHolder = JSON.parse(DTDA);
                for (let DTFor=1; DTFor<keys.length; DTFor++) {
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
    for (let counter=0; counter<(key.length/2); counter++) {
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
    for (let NPC=0; NPC<newNum.length; NPC++) {
        if (keyMapReversed.hasOwnProperty(newNum[NPC])) {
            NPNS = NPNS + keyMapReversed[newNum[NPC]];
        } else {
            return null
        }
    }
    return NPNS
}



function gameStart(perfReq) {
    if (!gameActive) {
        return
    }
    if (initiation) {
        initiation = false;
        gameInitiation();
        console.log("Initiated the game.")
    }
    
    
    if (avgCounter <= 10) {
        FPS++;
        if (perfReq - perfLast >= 1000) {
            avgCounter++;
            perfLast = perfReq;
            avgSum = avgSum + FPS;
            FPS = 0;
            
        }
    } else {
        mainFPS = avgSum/avgCounter;
    }
    valueUpdater++;
    if (valueUpdater >= mainFPS) {
        questionCounter++;
        if (questionCounter>10) {
            requestQuestionGameFrame();
            questionCounter = 0;
        }
        valueUpdater = 0;
        gameLogic();
    }
    updateGameScreen();
    requestAnimationFrame(gameStart);
} 



document.addEventListener("DOMContentLoaded", () => {
    if (databaseActive == "true") {
        databaseInitialization(DBI => {
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
                for (let questionAdder=0; questionAdder<questionContainer.length; questionAdder++) {
                    if (document.querySelector("#" + questionContainer[questionAdder]) == null) {               
                        if (questionContainer[questionAdder].substring(2, 4) != "QW") {
                            const newChild = document.createElement("div");
                            const dropdownUnitSelector = document.getElementById("SUnits");
                            const dropdownLessonSelector = document.getElementById("OLessons");
                            newChild.id = questionContainer[questionAdder];
                            newChild.classList.add("mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_questionPreviewHolder_questionHolder_question");
                            newChild.textContent = "Unit: " + keyMapParser(questionContainer[questionAdder].substring(0, 2)) + ", Lesson: " +  keyMapParser(questionContainer[questionAdder].substring(2, 4)) + " Questions";

                            const childOfNewChild = document.createElement("div");
                            childOfNewChild.classList.add("mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_questionPreviewHolder_questionHolder_question_removalDiv")
                            childOfNewChild.textContent = "X";
                            childOfNewChild.addEventListener("click", CONCC => {
                                childOfNewChild.parentElement.remove();
                                dataRemover(db, "temporaryQuestionHolder", [childOfNewChild.parentElement.id]);
                                if (dropdownUnitSelector.value == newChild.id.substring(0, 2)) {
                                        const DUSCLesson = document.createElement("option");
                                        DUSCLesson.value = newChild.id.substring(2, 4);
                                        DUSCLesson.id = String(keyMapParser(newChild.id.substring(0, 2))) + String(keyMapParser(newChild.id.substring(2, 4)));
                                        DUSCLesson.textContent = "Lesson " + (keyMapParser(newChild.id.substring(2, 4))) + ": " + dataMap[keyMapParser(newChild.id.substring(0, 2))][2][keyMapParser(newChild.id.substring(2, 4))];
                                        DUSCLesson.classList.add("mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_options");
                                        dropdownLessonSelector.appendChild(DUSCLesson);
                                        
                                    }
                                    let indexOfData = questionContainer.indexOf(newChild.id)
                                    if (indexOfData > -1) {
                                        questionContainer.splice(indexOfData, 1)
                                    }
                                    
                            })
                            newChild.appendChild(childOfNewChild);
                            mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_questionPreviewHolder_questionHolder.appendChild(newChild);
                        } 
                }
            }}
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
                for (let QDFDBI=0; QDFDBI<Object.keys(quizzesDataFramework).length; QDFDBI++) {
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
        const dropdownLessonSelector = document.getElementById("OLessons");
        const questionAdderButton = document.getElementById("mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_addQuestion");
        const mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_questionPreviewHolder_questionHolder = document.getElementById("mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_questionPreviewHolder_questionHolder");
        const mainPage = document.getElementById("mainPage-divHolder");
        const gameButton = document.getElementById("gameStartButton");
        const hiddenGamePage = document.getElementById("hiddenDivGame");
        const returnButton = document.getElementById("hiddenDivGame_returnButton");
        const hiddenDivGame_title = document.getElementById("hiddenDivGame_title");
        const hiddenDivGame_mainScreen_gameScreen = document.getElementById("hiddenDivGame_mainScreen_gameScreen");
        const hiddenDivGame_mainScreen_gameScreen_upgHolder = document.getElementsByClassName("hiddenDivGame_mainScreen_gameScreen_upgHolder");
        const hiddenDivGame_mainScreen_gameScreen_description = document.getElementById("hiddenDivGame_mainScreen_gameScreen_description")
        const hiddenDivGame_mainScreen_gameScreen_title = document.getElementById("hiddenDivGame_mainScreen_gameScreen_title");
        const hiddenDivGame_mainScreen_gameScreen_startButton = document.getElementById("hiddenDivGame_mainScreen_gameScreen_startButton");
        const hiddenDivGame_restartButton = document.getElementById("hiddenDivGame_restartButton");
        const up1Button = document.getElementById("firstUpgradeDiv");
        const up2Button = document.getElementById("secondUpgradeDiv");
        const up3Button = document.getElementById("thirdUpgradeDiv");
        const up4Button = document.getElementById("forthUpgradeDiv");
        const up5Button = document.getElementById("fifthUpgradeDiv");
        const up1ButtonDiv = document.getElementById("firstUpgradeDivHolder");
        const up2ButtonDiv = document.getElementById("secondUpgradeDivHolder");
        const up3ButtonDiv = document.getElementById("thirdUpgradeDivHolder");
        const up4ButtonDiv = document.getElementById("forthUpgradeDivHolder");
        const up5ButtonDiv = document.getElementById("fifthUpgradeDivHolder");
        const rUpgDiv1 = document.getElementById("rUpgDiv1");
        const rUpgDiv2 = document.getElementById("rUpgDiv2");
        const rUpgDiv3 = document.getElementById("rUpgDiv3");
        const rUpgDiv4 = document.getElementById("rUpgDiv4");
        const rUpgDiv5 = document.getElementById("rUpgDiv5");
        const rUpgDivHolder1 = document.getElementById("rUpgDivHolder1");
        const rUpgDivHolder2 = document.getElementById("rUpgDivHolder2");
        const rUpgDivHolder3 = document.getElementById("rUpgDivHolder3");
        const rUpgDivHolder4 = document.getElementById("rUpgDivHolder4");
        const rUpgDivHolder5 = document.getElementById("rUpgDivHolder5");
        const rUpgDivTitle1 = document.getElementById("rUpgDivTitle1");
        const rUpgDivTitle2 = document.getElementById("rUpgDivTitle2");
        const rUpgDivTitle3 = document.getElementById("rUpgDivTitle3");
        const rUpgDivTitle4 = document.getElementById("rUpgDivTitle4");
        const rUpgDivTitle5 = document.getElementById("rUpgDivTitle5");
        const hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg = document.getElementsByClassName("hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg");
        const hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg_title = document.getElementsByClassName("hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg_title");
        const hiddenDivGame_mainScreen_gameScreen_upgHolder_rebirthButton = document.getElementById("hiddenDivGame_mainScreen_gameScreen_upgHolder_rebirthButton");
        const hiddenDivGame_mainScreen_gameScreen_upgHolder_mRUpg = document.getElementsByClassName("hiddenDivGame_mainScreen_gameScreen_upgHolder_mRUpg");
        
        rUpgDivHolder1.addEventListener("click", UP1C => {
            rUpgDivHolder1.classList.add("clickEventRB");
            setTimeout(HDGST => {
                rUpgDivHolder1.classList.remove("clickEventRB");
            }, 250)
            if (rebirth >= rUpg1_price) {
                rUpg1 += 1;
                rebirth -= rUpg1_price;
                rUpgDivTitle1.style.color = "#24bf73";
                rUpgDiv1.style.color = "#24bf73";
                setTimeout(() => {
                    rUpgDivTitle1.style.color = "rgb(243, 243, 145)";
                    rUpgDiv1.style.color = "rgb(243, 243, 145)";
                }, 100)
            } else {
                rUpgDivTitle1.style.color = "#dc4545";
                rUpgDiv1.style.color = "#dc4545";
                setTimeout(() => {
                    rUpgDivTitle1.style.color = "rgb(243, 243, 145)";
                    rUpgDiv1.style.color = "rgb(243, 243, 145)";
                }, 400)
            }
            updateGameScreen();

        })
        rUpgDivHolder2.addEventListener("click", UP1C => {
            rUpgDivHolder2.classList.add("clickEventRB");
            setTimeout(HDGST => {
                rUpgDivHolder2.classList.remove("clickEventRB");
            }, 250)
            if (rebirth >= rUpg2_price) {
                rUpg2 += 1;
                rebirth -= rUpg2_price;
                rUpgDivTitle2.style.color = "#24bf73";
                rUpgDiv2.style.color = "#24bf73";
                setTimeout(() => {
                    rUpgDivTitle2.style.color = "rgb(243, 243, 145)";
                    rUpgDiv2.style.color = "rgb(243, 243, 145)";
                }, 100)
            } else {
                rUpgDivTitle2.style.color = "#dc4545";
                rUpgDiv2.style.color = "#dc4545";
                setTimeout(() => {
                    rUpgDivTitle2.style.color = "rgb(243, 243, 145)";
                    rUpgDiv2.style.color = "rgb(243, 243, 145)";
                }, 400)
            }
            updateGameScreen();

        })
        rUpgDivHolder3.addEventListener("click", UP1C => {
            rUpgDivHolder3.classList.add("clickEventRB");
            setTimeout(HDGST => {
                rUpgDivHolder3.classList.remove("clickEventRB");
            }, 250)
            if (rebirth >= rUpg3_price) {
                rUpg3 += 1;
                rebirth -= rUpg3_price;
                rUpgDivTitle3.style.color = "#24bf73";
                rUpgDiv3.style.color = "#24bf73";
                setTimeout(() => {
                    rUpgDivTitle3.style.color = "rgb(243, 243, 145)";
                    rUpgDiv3.style.color = "rgb(243, 243, 145)";
                }, 100)
            } else {
                rUpgDivTitle3.style.color = "#dc4545";
                rUpgDiv3.style.color = "#dc4545";
                setTimeout(() => {
                    rUpgDivTitle3.style.color = "rgb(243, 243, 145)";
                    rUpgDiv3.style.color = "rgb(243, 243, 145)";
                }, 400)
            }
            updateGameScreen();

        })
        rUpgDivHolder4.addEventListener("click", UP1C => {
            rUpgDivHolder4.classList.add("clickEventRB");
            setTimeout(HDGST => {
                rUpgDivHolder4.classList.remove("clickEventRB");
            }, 250)
            if (rebirth >= rUpg4_price) {
                rUpg4 += 1;
                rebirth -= rUpg4_price;
                rUpgDivTitle4.style.color = "#24bf73";
                rUpgDiv4.style.color = "#24bf73";
                setTimeout(() => {
                    rUpgDivTitle4.style.color = "rgb(243, 243, 145)";
                    rUpgDiv4.style.color = "rgb(243, 243, 145)";
                }, 100)
            } else {
                rUpgDivTitle4.style.color = "#dc4545";
                rUpgDiv4.style.color = "#dc4545";
                setTimeout(() => {
                    rUpgDivTitle4.style.color = "rgb(243, 243, 145)";
                    rUpgDiv4.style.color = "rgb(243, 243, 145)";
                }, 400)
            }
            updateGameScreen();

        })
        rUpgDivHolder5.addEventListener("click", UP1C => {
            rUpgDivHolder5.classList.add("clickEventRB");
            setTimeout(HDGST => {
                rUpgDivHolder5.classList.remove("clickEventRB");
            }, 250)
            if (rebirth >= rUpg5_price) {
                rUpg5 += 1;
                rebirth -= rUpg5_price;
                rUpgDivTitle5.style.color = "#24bf73";
                rUpgDiv5.style.color = "#24bf73";
                setTimeout(() => {
                    rUpgDivTitle5.style.color = "rgb(243, 243, 145)";
                    rUpgDiv5.style.color = "rgb(243, 243, 145)";
                }, 100)
            } else {
                rUpgDivTitle5.style.color = "#dc4545";
                rUpgDiv5.style.color = "#dc4545";
                setTimeout(() => {
                    rUpgDivTitle5.style.color = "rgb(243, 243, 145)";
                    rUpgDiv5.style.color = "rgb(243, 243, 145)";
                }, 400)
            }
            updateGameScreen();

        })
        hiddenDivGame_mainScreen_gameScreen_upgHolder_rebirthButton.addEventListener("click", HDGRBC => {
            if (currency >= rebirthCost) {
                rebirth += rMultiplier;
                totalRebirth += rMultiplier;
                currency -= rebirthCost;
                updateGameScreen();
            }
            hiddenDivGame_mainScreen_gameScreen_upgHolder_rebirthButton.classList.add("clickEventRB");
            setTimeout(() => {
                hiddenDivGame_mainScreen_gameScreen_upgHolder_rebirthButton.classList.remove("clickEventRB");
            }, 250)
        })
        up1ButtonDiv.addEventListener("click", UP1C => {
            hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg[0].classList.add("clickEvent");
            setTimeout(HDGST => {
                hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg[0].classList.remove("clickEvent");
            }, 250)
            if (currency >= upg1_price) {
                upg1 += 1;
                currency -= upg1_price;
                hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg_title[0].style.color = "#24bf73";
                up1Button.style.color = "#24bf73";
                setTimeout(() => {
                    hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg_title[0].style.color = "white";
                    up1Button.style.color = "white";
                }, 100)
            } else {
                hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg_title[0].style.color = "#dc4545";
                up1Button.style.color = "#dc4545";
                setTimeout(() => {
                    hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg_title[0].style.color = "white";
                    up1Button.style.color = "white";
                }, 400)
            }
            updateGameScreen();

        })
        up2ButtonDiv.addEventListener("click", UP2C => {
            hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg[1].classList.add("clickEvent");
            setTimeout(HDGST => {
                hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg[1].classList.remove("clickEvent");
            }, 250)
            if (currency >= upg2_price) {
                upg2 += 1;
                currency -= upg2_price;
                hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg_title[1].style.color = "#24bf73";
                up2Button.style.color = "#24bf73";
                setTimeout(() => {
                    hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg_title[1].style.color = "white";
                    up2Button.style.color = "white";
                }, 400)
            } else {
                hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg_title[1].style.color = "#dc4545";
                up2Button.style.color = "#dc4545";
                setTimeout(() => {
                    hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg_title[1].style.color = "white";
                    up2Button.style.color = "white";
                }, 400)
            }
            updateGameScreen();

        })
        up3ButtonDiv.addEventListener("click", UP3C => {
            hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg[2].classList.add("clickEvent");
            setTimeout(HDGST => {
                hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg[2].classList.remove("clickEvent");
            }, 250)
            if (currency >= upg3_price) {
                upg3 += 1;
                currency -= upg3_price;
                hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg_title[2].style.color = "#24bf73";
                up3Button.style.color = "#24bf73";
                setTimeout(() => {
                    hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg_title[2].style.color = "white";
                    up3Button.style.color = "white";
                }, 400)
            } else {
                hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg_title[2].style.color = "#dc4545";
                up3Button.style.color = "#dc4545";
                setTimeout(() => {
                    hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg_title[2].style.color = "white";
                    up3Button.style.color = "white";
                }, 400)
            }
            updateGameScreen();

        })
        up4ButtonDiv.addEventListener("click", UP4C => {
            hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg[3].classList.add("clickEvent");
            setTimeout(HDGST => {
                hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg[3].classList.remove("clickEvent");
            }, 250)
            if (currency >= upg4_price) {
                upg4 += 1;
                currency -= upg4_price;
                hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg_title[3].style.color = "#24bf73";
                up4Button.style.color = "#24bf73";
                setTimeout(() => {
                    hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg_title[3].style.color = "white";
                    up4Button.style.color = "white";
                }, 400)
            } else {
                hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg_title[3].style.color = "#dc4545";
                up4Button.style.color = "#dc4545";
                setTimeout(() => {
                    hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg_title[3].style.color = "white";
                    up4Button.style.color = "white";
                }, 400)
            }
            updateGameScreen();

        })
        up5ButtonDiv.addEventListener("click", UP5C => {
            hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg[4].classList.add("clickEvent");
            setTimeout(HDGST => {
                hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg[4].classList.remove("clickEvent");
            }, 250)
            if (currency >= upg5_price) {
                upg5 += 1;
                currency -= upg5_price;
                hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg_title[4].style.color = "#24bf73";
                up5Button.style.color = "#24bf73";
                setTimeout(() => {
                    hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg_title[4].style.color = "white";
                    up5Button.style.color = "white";
                }, 400)
            } else {
                hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg_title[4].style.color = "#dc4545";
                up5Button.style.color = "#dc4545";
                setTimeout(() => {
                    hiddenDivGame_mainScreen_gameScreen_upgHolder_mUpg_title[4].style.color = "white";
                    up5Button.style.color = "white";
                }, 400)
            }
            updateGameScreen();

        })
        
        hiddenDivGame_mainScreen_gameScreen_startButton.addEventListener("click", HDGSBC => {
            hiddenDivGame_mainScreen_gameScreen_description.style.display = "none";
            hiddenDivGame_mainScreen_gameScreen_title.style.display = "none";
            hiddenDivGame_mainScreen_gameScreen_startButton.style.display = "none";
            hiddenDivGame_mainScreen_gameScreen.style.transform = "scaleY(100%)"
            hiddenDivGame_title.style.transform = "translateY(0%)";
            for (let upgElements=0; upgElements<hiddenDivGame_mainScreen_gameScreen_upgHolder.length; upgElements++){
                hiddenDivGame_mainScreen_gameScreen_upgHolder[upgElements].style.display = "flex";
            }
            hiddenDivGame_mainScreen_gameScreen.style.flexDirection = "row";
            gameActive = true;
            gameStart(60);
        })
        hiddenDivGame_restartButton.addEventListener("click", HDGRBC => {
            hiddenDivGame_mainScreen_gameScreen_description.style.display = "flex";
            hiddenDivGame_mainScreen_gameScreen_title.style.display = "flex";
            hiddenDivGame_mainScreen_gameScreen_startButton.style.display = "flex";
            hiddenDivGame_mainScreen_gameScreen.style.transform = "scaleY(115%)"
            hiddenDivGame_title.style.transform = "translateY(-100%)";
            for (let upgElements=0; upgElements<hiddenDivGame_mainScreen_gameScreen_upgHolder.length; upgElements++){
                hiddenDivGame_mainScreen_gameScreen_upgHolder[upgElements].style.display = "none";
            }
            hiddenDivGame_mainScreen_gameScreen.style.flexDirection = "column";
            gameEnd();
            
        })
        returnButton.addEventListener("click", RBC => {
            hiddenDivGame_mainScreen_gameScreen_description.style.display = "flex";
            hiddenDivGame_mainScreen_gameScreen_title.style.display = "flex";
            hiddenDivGame_mainScreen_gameScreen_startButton.style.display = "flex";
            hiddenDivGame_mainScreen_gameScreen.style.transform = "scaleY(115%)"
            hiddenDivGame_title.style.transform = "translateY(-100%)";
            for (let upgElements=0; upgElements<hiddenDivGame_mainScreen_gameScreen_upgHolder.length; upgElements++){
                hiddenDivGame_mainScreen_gameScreen_upgHolder[upgElements].style.display = "none";
            }
            hiddenDivGame_mainScreen_gameScreen.style.flexDirection = "column";
            mainPage.style.display = "flex";
            hiddenGamePage.style.display = "none";
            gameEnd();
            
        })
        gameButton.addEventListener("click", GBC => {
            mainPage.style.display = "none";
            hiddenGamePage.style.display = "flex";
        })
        
        dropdownUnitSelector.addEventListener("change", DUSC => {
            const DUSCOptionValue = DUSC.target.value;
            questionAdderButton.style.pointerEvents = "none";
            questionAdderButton.style.backgroundColor = "#5abdea"
            if (keyMapParser(DUSCOptionValue) != null) {
                let lessonCounter = 0;
                const lessonData = dataMap[keyMapParser(DUSCOptionValue)][2];
                dropdownLessonSelector.disabled = false;
                dropdownLessonSelector.innerHTML = '<option class="mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_options" selected="selected" value="none">-- Select a Lesson --</option> <option class="mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_options" value="QW">Every Lesson</option>';
                for (DUSCLessonCounter=0; DUSCLessonCounter<Object.keys(lessonData).length; DUSCLessonCounter++) {
                    if (!questionContainer.includes(DUSCOptionValue + numberParser(DUSCLessonCounter + 1))){
                        const DUSCLesson = document.createElement("option");
                        DUSCLesson.value = numberParser(DUSCLessonCounter + 1);
                        DUSCLesson.id = String(keyMapParser(DUSCOptionValue)) + String(DUSCLessonCounter + 1);
                        DUSCLesson.textContent = "Lesson " + (DUSCLessonCounter + 1) + ": " + Object.values(lessonData)[DUSCLessonCounter];
                        DUSCLesson.classList.add("mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_options");
                        dropdownLessonSelector.appendChild(DUSCLesson);
                    } else {
                        lessonCounter++;
                        if (lessonCounter == Object.keys(lessonData).length) {
                            dropdownLessonSelector.innerHTML = '<option class="mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_options" selected="selected" value="none">-- Select a Lesson --</option>';
                        }
                    }
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
                if (dropdownLessonSelector.value != "QW") {
                    dataAmender(db, "temporaryQuestionHolder", [dropdownUnitSelector.value, dropdownLessonSelector.value], true, dropdownUnitSelector.value + dropdownLessonSelector.value);
                } else {
                    let temporaryAllUnits = Object.keys(dataMap[keyMapParser(dropdownUnitSelector.value)][2]);
                    console.log(temporaryAllUnits)
                    for (let DDUSAllUnits=0; DDUSAllUnits<temporaryAllUnits.length; DDUSAllUnits++) {
                        dataAmender(db, "temporaryQuestionHolder", [dropdownUnitSelector.value, numberParser(temporaryAllUnits[DDUSAllUnits])], true, dropdownUnitSelector.value + numberParser(temporaryAllUnits[DDUSAllUnits]));
                    }
                }
                questionContainer = [];
                const dataOpener = db.transaction("temporaryQuestionHolder", "readwrite").objectStore("temporaryQuestionHolder");
                const dataLooperRequest = dataOpener.openCursor();
                questionAdderButton.style.pointerEvents = "none";
                questionAdderButton.style.backgroundColor = "#5abdea"
                dataLooperRequest.onsuccess = DLR => {
                    if (DLR.target.result) {
                        const successResults = DLR.target.result;
                        questionContainer.push(successResults.key);
                        successResults.continue();
                    } else {
                        console.log("Data collection complete.")
                    }
                    questionContainer = questionContainer.flat();
                    for (let questionAdder=0; questionAdder<questionContainer.length; questionAdder++) {
                        if (document.querySelector("#" + questionContainer[questionAdder]) == null) {               
                            if (questionContainer[questionAdder].substring(2, 4) != "QW") {
                                const newChild = document.createElement("div");
                                newChild.id = questionContainer[questionAdder];
                                newChild.classList.add("mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_questionPreviewHolder_questionHolder_question");
                                newChild.textContent = "Unit: " + keyMapParser(newChild.id.substring(0, 2)) + ", Lesson: " +  keyMapParser(newChild.id.substring(2, 4)) + " Questions";
                                const childOfNewChild = document.createElement("div");
                                childOfNewChild.classList.add("mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_questionPreviewHolder_questionHolder_question_removalDiv")
                                childOfNewChild.textContent = "X";
                                childOfNewChild.addEventListener("click", CONCC => {
                                    childOfNewChild.parentElement.remove();
                                    dataRemover(db, "temporaryQuestionHolder", [childOfNewChild.parentElement.id]);
                                    
                                    if (dropdownUnitSelector.value == newChild.id.substring(0, 2)) {
                                        const DUSCLesson = document.createElement("option");
                                        DUSCLesson.value = newChild.id.substring(2, 4);
                                        DUSCLesson.id = String(keyMapParser(newChild.id.substring(0, 2))) + String(keyMapParser(newChild.id.substring(2, 4)));
                                        DUSCLesson.textContent = "Lesson " + (keyMapParser(newChild.id.substring(2, 4))) + ": " + dataMap[keyMapParser(newChild.id.substring(0, 2))][2][keyMapParser(newChild.id.substring(2, 4))];
                                        DUSCLesson.classList.add("mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_options");
                                        dropdownLessonSelector.appendChild(DUSCLesson);
                                        
                                    }
                                    let indexOfData = questionContainer.indexOf(newChild.id)
                                    if (indexOfData > -1) {
                                        questionContainer.splice(indexOfData, 1)
                                    }
                                    
                                    
 
                                    
                                })
                                newChild.appendChild(childOfNewChild);
                                mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_questionPreviewHolder_questionHolder.appendChild(newChild);
                            } 
                    }

                    if (document.getElementById(String(keyMapParser(dropdownUnitSelector.value)) + String(keyMapParser(dropdownLessonSelector.value))) != null || dropdownLessonSelector.value == "QW") {
                        if (dropdownLessonSelector.value != "QW") {
                            document.getElementById(String(keyMapParser(dropdownUnitSelector.value)) + String(keyMapParser(dropdownLessonSelector.value))).remove();
                        } else {
                            dropdownLessonSelector.innerHTML = '<option class="mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_options" selected="selected" value="none">-- Select a Lesson --</option>';
                        }
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
                options: {responsive: false, maintainAspectRatio: true}
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
                for (let t=0; t<homeSideBar_aHolderLeftBorderExpand.length; t++){
                    homeSideBar_aHolderLeftBorderExpand[t].style.width = "20vw";
                }
                homeSideBar_aHolderLeftBorderExpand[i].style.backgroundColor = "#79cbf0";
                hrDivider.style.transform = "scaleX(5)";
                mainPage_backgroundBlocker.style.opacity = .35;
            });
            homeSideBar_aHolderLeftBorderExpand[i].addEventListener("mouseleave", () => {
                homeSideBar_aHolderLeftBorderExpand[i].querySelector(".sideBar_aHolderLeftBorderExpand").style.transform = "scaleY(0)";
                for (let b=0; b<homeSideBar_aHolderLeftBorderExpand.length; b++){
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