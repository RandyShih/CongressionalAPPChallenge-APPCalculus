if (localStorage.getItem("databaseActive") == null) {
    localStorage.setItem("databaseActive", "true");
    sessionStorage.setItem("DBError", "0");
}

let databaseActive = localStorage.getItem("databaseActive");
let db;
let objectStoreNames = ["Quizzes", "ProgressTracker"];
const questionsUnit1 = {
    1: {"What is the derivative of \u00A0 $5x$?": {1: ["5x", "5", "10x^2", "0"]}, 
        "What is the derivative of \u00A0 $6x^2?$": {2: ["0", "6x", "12x", "3x"]},
        "What is the derivative of \u00A0 $12x^{-2}$?": {3: ["24x^{-1}", "-24", "24x^{-3}", "-24x^{-3}"]}
    },
    2: {"What is the derivative of \u00A0 $(2x-1)(4x+2)$?": {0: ["2(4x+2) + 4(2x-1)", "2(4x+2) * 4(2x-1)", "4(4x+2) + 2(2x-1)", "6"]}
    }
}

let questionExplanationObject = {
    "5": "This is the correct answer due to the fact This is the correct answer due to tThis is the correct answer due to tThis is the correct answer due to tThis is the correct answer due to t",
    "12x": "This is the answer choice, which is 12x.This is the correct answer due to tThis is the correct answer due to tThis is the correct answer due to tThis is the correct answer due to tThis is the correct answer due to t",
    "-24x^{-3}": "This is the answer choice, which is -24x^{-3}.This is the correct answer due to tThis is the correct answer due to tThis is the correct answer due to tThis is the correct answer due to tThis is the correct answer due to t",
    "2(4x+2) + 4(2x-1)": "This is the answer choice, which is 2(4x+2) + 4(2x-1).This is the correct answer due to tThis is the correct answer due to tThis is the correct answer due to tThis is the correct answer due to tThis is the correct answer due to t"
}

const unitReferenceHolder = ["placeholder",
    questionsUnit1
]

const unit1VocabularyWords = {
    "1placeholder": "definition",
    "2placfeholder": "definition",
    "3placehodlfder": "definition",
    "2placeholdfer": "definition",
    "3placeholdefr": "definition",
    "2placeholderf": "definition",
    "1placehowlderf": "definition",
    "3placehodlderf": "definition",
    "1placedholderf": "definition",
    
}

const unit2VocabularyWords = {
    "1placeaholder": "definition",
    "2plaaceholder": "definition",
    "1placaeholader": "definition",
    "1money": "definition",
    "2placehbolder": "definition",
    "2placeahcolder": "definition",
    "2placeholxder": "definition",
    "2placeholdzer": "definition",
    "2placeholdeccr": "definition",
    "1placeholdecr": "definition",
    
}

const unit3VocabularyWords = {
    "1placeholder": "definition",
    "1placejholder": "definition",
    "1placehjolder": "definition",
    "1placehohdflder": "definition",
    "1placeholdedr": "definition",
    "1placeholddsaer": "definition",
    "2power": "definition",
    "1placehdwadolder": "definition",
    "1placehdwaolder": "definition",
    "2placehdwadolder": "definition",
    
}

const unit4VocabularyWords = {
    "1placewadholder": "definition",
    "2placehodwadlder": "definition",
    "1placehdwadaolder": "definition",
    "1placehdwadolder": "definition",
    "1placehdwadaolder": "definition",
    "1placedwadawholder": "definition",
    "2placeholdawdcccder": "definition",
    "2moni": "definition",
    "2placeholwadcder": "definition",
    
}

const unit5VocabularyWords = {
    "2placehoczcslder": "definition",
    "2placeholcwacacder": "definition",
    "2placeholcsddawder": "definition",
    "2placeholdwzcer": "definition",
    "2placeholwdadcder": "definition",
    "2placehocwzclder": "definition",
    "2mower": "definition",
    "1zcwzcwcwz": "definition",
    "2placeholder": "definition",
    "2placedwdahczcoldcwzczer": "definition",
    "2placehdwadadvolder": "definition",
    "2placehodawdwadwadlder": "definition",
    "2placehcawcawcwawcolder": "definition",
}

const unitVocabularyWordsReferenceArray = [
    unit1VocabularyWords, unit2VocabularyWords, unit3VocabularyWords, unit4VocabularyWords, unit5VocabularyWords
]

let unitData = [questionsUnit1];
let unitVideoInformation = {
    1: {1: "www.youtube.com", 2: "www.youtube.com"},
    2: {1: "www.youtube.com", 2: "www.youtube.com"},
    3: {1: "www.youtube.com", 2: "www.youtube.com"},
    4: {1: "www.youtube.com", 2: "www.youtube.com"},
    5: {1: "www.youtube.com", 2: "www.youtube.com"},
}

const dataLinkMap = {
    1: {
        1: "unit1_lesson1.html",
        2: "unit1_lesson2.html",
        3: "unit1_lesson3.html"
    },
    2: {
        1: "unit2_lesson1.html",
        2: "unit2_lesson2.html",
    },
    3: {
        1: "unit3_lesson1.html",
        2: "unit3_lesson2.html",
    },
    4: {
        1: "unit4_lesson1.html",
        2: "unit4_lesson2.html",
    },
    5: {
        1: "unit5_lesson1.html",
        2: "unit5_lesson2.html",
    }
}


const dataMap = {1: [
    "Unit 1", 
    "Derivatives", {
        1: "Basic Derivation",
        2: "Product Rule",
        3: "Quotient Rule",
    }], 
    2: [
    "Unit 2",
    "Graphical Analysis", {
        1: "Interpretations of Functions",
        2: "Interpretations of Derivatives",
    }],
    3: [
    "Unit 3",
    "Integrals", {
        1: "Integral Approximations",
        2: "Antiderivatives",
    }
    ],
    4: [
    "Unit 4",
    "Applications of Integrals", {
        1: "Washer Method",
        2: "Disc Method",
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
let RQQFC = 0;
let RQQCounter = 0;
let RQQInit = true;
let correctQuestionTracker = [];
let temporaryQuestionBlockerArray = [];
let RQQFTemporaryQuestionArray = [];
let totalCorrectQuestions = 0;
let timeWaitT = 4000;
let RQQCounterMax = 5;
let quizGameDivTracker = []

function createEndCardScreen(quizAccurracyData, quizData, chosenDivName) {
    let chosenDiv = null;
    if (document.getElementsByClassName(chosenDivName)[0] != undefined) {
        chosenDiv = document.getElementsByClassName(chosenDivName)[0];
    } else {
        chosenDiv = document.getElementById(chosenDivName);
    }
    const lesson_rightSide_lowerPage_quizPage_endCardTitle = document.createElement("div");
    lesson_rightSide_lowerPage_quizPage_endCardTitle.classList.add("lesson_rightSide_lowerPage_quizPage_endCardTitle");
    lesson_rightSide_lowerPage_quizPage_endCardTitle.textContent = "Good job! You have completed the quiz!";
    const lesson_rightSide_lowerPage_quizPage_disclaimer = document.createElement("div");
    lesson_rightSide_lowerPage_quizPage_disclaimer.classList.add("lesson_rightSide_lowerPage_quizPage_disclaimer");
    lesson_rightSide_lowerPage_quizPage_disclaimer.textContent = "Score has been recorded, check your dashboard for the graphed results.";
    const lesson_rightSide_lowerPage_quizPage_quizAccuracy = document.createElement("div");
    lesson_rightSide_lowerPage_quizPage_quizAccuracy.classList.add("lesson_rightSide_lowerPage_quizPage_quizAccuracy");
    lesson_rightSide_lowerPage_quizPage_quizAccuracy.textContent = "Accuracy: " + quizAccurracyData + "%";
    const lesson_rightSide_lowerPage_quizPage_endRestartButton = document.createElement("div");
    lesson_rightSide_lowerPage_quizPage_endRestartButton.classList.add("lesson_rightSide_lowerPage_quizPage_endRestartButton");
    lesson_rightSide_lowerPage_quizPage_endRestartButton.textContent = "Restart";
    lesson_rightSide_lowerPage_quizPage_endRestartButton.addEventListener("mouseenter", () => {
        lesson_rightSide_lowerPage_quizPage_endRestartButton.style.backgroundColor = "#86cded";
        lesson_rightSide_lowerPage_quizPage_endRestartButton.style.transform = "scale(1.05)";
        lesson_rightSide_lowerPage_quizPage_endRestartButton.style.boxShadow = "0px 0px 4px grey";
    })
    lesson_rightSide_lowerPage_quizPage_endRestartButton.addEventListener("mouseleave", () => {
        lesson_rightSide_lowerPage_quizPage_endRestartButton.style.backgroundColor = "#dcf4ff";
        lesson_rightSide_lowerPage_quizPage_endRestartButton.style.transform = "scale(1)";
        lesson_rightSide_lowerPage_quizPage_endRestartButton.style.boxShadow = "0px 0px 0px grey";
    })
    const endCardElements = [lesson_rightSide_lowerPage_quizPage_endCardTitle, lesson_rightSide_lowerPage_quizPage_disclaimer, lesson_rightSide_lowerPage_quizPage_quizAccuracy, lesson_rightSide_lowerPage_quizPage_endRestartButton];
    for (let CECSCA=0; CECSCA<endCardElements.length; CECSCA++) {
            chosenDiv.appendChild(endCardElements[CECSCA]);
        }
    lesson_rightSide_lowerPage_quizPage_endRestartButton.addEventListener("click", () => {
        for (let CECSC=0; CECSC<endCardElements.length; CECSC++) {
            endCardElements[CECSC].remove();
        }
        RQQInit = true;
        requestQuestionQuizFrame(quizData, chosenDivName);
    })
} 

function requestQuestionQuizFrame(quizData, chosenDivName) {
    if (RQQInit) {
        RQQCounter = 0;
        RQQInit = false;
        totalCorrectQuestions = 0;
        correctQuestionTracker = [];
        temporaryQuestionBlockerArray = [];
    }
    let questionDivHolder = [];
    let questionTrackerScore = [];
    let answerCorrect = true;
    let animationActve1 = false;
    let animationActve2 = false;
    let animationActve3 = false;
    let animationActve4 = false;
    let quizGameDiv = false;
    let randomAnswer = 0;
    let appendedDiv = null;
    const randomizedQuestionIndex = Math.floor(Object.keys(unitReferenceHolder[quizData[0]][quizData[1]]).length * Math.random());
    if (document.getElementsByClassName(chosenDivName)[0] != undefined) {
        appendedDiv = document.getElementsByClassName(chosenDivName)[0];
    } else {
        appendedDiv = document.getElementById(chosenDivName);
        quizGameDiv = true;
    }
    for (let RQQCHDEL=0; RQQCHDEL<appendedDiv.children.length; RQQCHDEL++) {
        if (appendedDiv.children[RQQCHDEL].id != "DND") {
            appendedDiv.children[RQQCHDEL].style.display = "none";
        }
    }
    for (let RAQQ=0; RAQQ<appendedDiv.length; RAQQ++) {
        appendedDiv[RAQQ].style.display = "none";
    }

    const questionDiv = document.createElement("div");
    questionDiv.textContent = Object.keys(unitReferenceHolder[quizData[0]][quizData[1]])[randomizedQuestionIndex];
    questionDiv.classList.add("hiddenDivGame_mainScreen_gameScreen_question");
    questionDiv.style.marginRight = "1%";

    const questionDiv2Holder1 = document.createElement("div");
    questionDiv2Holder1.classList.add("hiddenDivGame_mainScreen_gameScreen_twoQuestionHolder")

    const questionDiv2Holder2 = document.createElement("div");
    questionDiv2Holder2.classList.add("hiddenDivGame_mainScreen_gameScreen_twoQuestionHolder")

    const possibleChoice1 = document.createElement("div");
    possibleChoice1.classList.add("hiddenDivGame_mainScreen_gameScreen_answer");
    let actualQuestion = Object.keys(unitReferenceHolder[quizData[0]][quizData[1]])[randomizedQuestionIndex];
    let entireDataset = unitReferenceHolder[quizData[0]][quizData[1]];
    let questionDictionary = entireDataset[actualQuestion];
    let possibleAnswers = Object.values(questionDictionary)[0];
    RQQFTemporaryQuestionArray = possibleAnswers.slice();
    let actualAnswer = possibleAnswers[Object.keys(questionDictionary)[0]];

    randomAnswer = Math.floor((Math.random() * RQQFTemporaryQuestionArray.length))
    possibleChoice1.id = RQQFTemporaryQuestionArray[randomAnswer];
    possibleChoice1.textContent = "$$" + RQQFTemporaryQuestionArray[randomAnswer] + "$$";
    RQQFTemporaryQuestionArray.splice(randomAnswer, 1);
    questionDiv2Holder1.appendChild(possibleChoice1);
    possibleChoice1.addEventListener("mouseenter", () => {
        if (!animationActve1) {
            possibleChoice1.style.backgroundColor = "#a3d6eeff";
            possibleChoice1.style.transform = "scale(1.05)";
        }
        possibleChoice1.style.boxShadow = "0px 0px 4px grey";
    })
    possibleChoice1.addEventListener("mouseleave", () => {
        if (!animationActve1) {
            possibleChoice1.style.backgroundColor = "#8dceec";
            possibleChoice1.style.transform = "scale(1)";
        }
        possibleChoice1.style.boxShadow = "0px 0px 0px grey";
    })
    possibleChoice1.addEventListener("click", () => {
        if (possibleChoice1.id == actualAnswer) {
            for (let GEROGFC=0; GEROGFC<questionDivHolder.length;GEROGFC++) {
                questionDivHolder[GEROGFC].remove();
            }
            if (RQQCounter < RQQCounterMax) {
                    requestQuestionQuizFrame(quizData, chosenDivName);
                    questionTrackerScore.push(answerCorrect);
                    const temporaryQuizCover = document.createElement("div");
                    temporaryQuizCover.classList.add("lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker");
                    if (quizGameDiv) {
                        temporaryQuizCover.style.height = "90%";
                    }
                    const lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_titleTextContent = document.createElement("div");
                    lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_titleTextContent.classList.add("lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_titleTextContent");
                    lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_titleTextContent.textContent = "Correct Answer!";
                    const lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_briefExplanation = document.createElement("div");
                    lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_briefExplanation.classList.add("lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_briefExplanation");
                    lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_briefExplanation.textContent = questionExplanationObject[actualAnswer];

                    temporaryQuizCover.appendChild(lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_titleTextContent);
                    temporaryQuizCover.appendChild(lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_briefExplanation);
                    temporaryQuestionBlockerArray.push(temporaryQuizCover);
                    temporaryQuestionBlockerArray.push(lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_titleTextContent);
                    temporaryQuestionBlockerArray.push(lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_briefExplanation);
                    appendedDiv.appendChild(temporaryQuizCover);
                    setTimeout(() => {
                        for (let TQC=0; TQC<temporaryQuestionBlockerArray.length; TQC++) {
                            temporaryQuestionBlockerArray[TQC].remove();
                        }
                    }, timeWaitT);
                    correctQuestionTracker.push(true);
                    RQQCounter++
            } else {
                for (let CQT=0; CQT<correctQuestionTracker.length; CQT++) {
                    if (correctQuestionTracker[CQT] == true) {
                        totalCorrectQuestions++;
                    }
                }
                quizzesTrackerDataUpdater(db, "Quizzes", 1, ((totalCorrectQuestions/correctQuestionTracker.length)*100), () => {});
                createEndCardScreen(Math.floor(((totalCorrectQuestions/correctQuestionTracker.length)*100)), quizData, chosenDivName);
            }
            dataUpdater(db, "ProgressTracker", quizData, -10, 0, true, () => {})
        } else {
            correctQuestionTracker.push(false);
            dataUpdater(db, "ProgressTracker", quizData, 5, 0, true, () => {})
            if (animationActve1 == false) {
                animationActve1 = true;
                possibleChoice1.style.backgroundColor = "#dc4545";
                possibleChoice1.style.transform = "translateX(8%)";
                possibleChoice1.style.pointerEvents = "none";
                setTimeout(() => {
                    possibleChoice1.style.transform = "translateX(-6%)";
                }, 500)
                setTimeout(() => {
                    possibleChoice1.style.backgroundColor = "#8dceec";
                    possibleChoice1.style.pointerEvents = "auto";
                    animationActve1 = false;
                }, 1100)
                setTimeout(() => {
                    possibleChoice1.style.transform = "translateX(0)";
                }, 1000)
            }
        }
    })
    
    const possibleChoice2 = document.createElement("div");
    possibleChoice2.classList.add("hiddenDivGame_mainScreen_gameScreen_answer");
    randomAnswer = Math.floor((Math.random() * RQQFTemporaryQuestionArray.length))
    possibleChoice2.id = RQQFTemporaryQuestionArray[randomAnswer];
    possibleChoice2.textContent = "$$" + RQQFTemporaryQuestionArray[randomAnswer] + "$$";
    RQQFTemporaryQuestionArray.splice(randomAnswer, 1);
    questionDiv2Holder1.appendChild(possibleChoice2);
    possibleChoice2.addEventListener("mouseenter", () => {
        if (!animationActve2) {
            possibleChoice2.style.backgroundColor = "#a3d6eeff";
            possibleChoice2.style.transform = "scale(1.05)";
        }
        possibleChoice2.style.boxShadow = "0px 0px 4px grey";
    })
    possibleChoice2.addEventListener("mouseleave", () => {
        if (!animationActve2) {
            possibleChoice2.style.backgroundColor = "#8dceec";
            possibleChoice2.style.transform = "scale(1)";
        }
        possibleChoice2.style.boxShadow = "0px 0px 0px grey";
    })
    possibleChoice2.addEventListener("click", () => {
        if (possibleChoice2.id == actualAnswer) {
            for (let GEROGFC=0; GEROGFC<questionDivHolder.length;GEROGFC++) {
                questionDivHolder[GEROGFC].remove();
            }
            if (RQQCounter < RQQCounterMax) {
                temporaryQuestionBlockerArray = []
                correctQuestionTracker.push(true);
                requestQuestionQuizFrame(quizData, chosenDivName);
                /* Main Correct Answer Manager */
                const temporaryQuizCover = document.createElement("div");
                temporaryQuizCover.classList.add("lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker");
                if (quizGameDiv) {
                        temporaryQuizCover.style.height = "90%";
                }
                const lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_titleTextContent = document.createElement("div");
                lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_titleTextContent.classList.add("lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_titleTextContent");
                lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_titleTextContent.textContent = "Correct Answer!";
                const lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_briefExplanation = document.createElement("div");
                lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_briefExplanation.classList.add("lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_briefExplanation");
                lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_briefExplanation.textContent = questionExplanationObject[actualAnswer];

                temporaryQuizCover.appendChild(lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_titleTextContent);
                temporaryQuizCover.appendChild(lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_briefExplanation);
                temporaryQuestionBlockerArray.push(temporaryQuizCover);
                temporaryQuestionBlockerArray.push(lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_titleTextContent);
                temporaryQuestionBlockerArray.push(lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_briefExplanation);
                appendedDiv.appendChild(temporaryQuizCover);

                setTimeout(() => {
                    for (let TQC=0; TQC<temporaryQuestionBlockerArray.length; TQC++) {
                        temporaryQuestionBlockerArray[TQC].remove();
                    }
                }, timeWaitT);
                RQQCounter++;
            } else {
                for (let CQT=0; CQT<correctQuestionTracker.length; CQT++) {
                    if (correctQuestionTracker[CQT] == true) {
                        totalCorrectQuestions++;
                    }
                }
                quizzesTrackerDataUpdater(db, "Quizzes", 1, ((totalCorrectQuestions/correctQuestionTracker.length)*100), () => {});
                createEndCardScreen(Math.floor(((totalCorrectQuestions/correctQuestionTracker.length)*100)), quizData, chosenDivName);
            }
            dataUpdater(db, "ProgressTracker", quizData, -10, 0, true, () => {});
        } else {
            correctQuestionTracker.push(false);
            dataUpdater(db, "ProgressTracker", quizData, 5, 0, true, () => {});
            if (animationActve2 == false) {
                animationActve2 = true;
                possibleChoice2.style.backgroundColor = "#dc4545";
                possibleChoice2.style.transform = "translateX(8%)";
                possibleChoice2.style.pointerEvents = "none";
                setTimeout(() => {
                    possibleChoice2.style.transform = "translateX(-6%)";
                }, 500)
                
                setTimeout(() => {
                    possibleChoice2.style.backgroundColor = "#8dceec";
                    possibleChoice2.style.pointerEvents = "auto";
                    animationActve2 = false;
                }, 1100)
                setTimeout(() => {
                    possibleChoice2.style.transform = "translateX(0)";
                }, 1000)
            }
        }
    })

    const possibleChoice3 = document.createElement("div");
    possibleChoice3.classList.add("hiddenDivGame_mainScreen_gameScreen_answer");
    randomAnswer = Math.floor((Math.random() * RQQFTemporaryQuestionArray.length))
    possibleChoice3.id = RQQFTemporaryQuestionArray[randomAnswer];
    possibleChoice3.textContent = "$$" + RQQFTemporaryQuestionArray[randomAnswer] + "$$";
    RQQFTemporaryQuestionArray.splice(randomAnswer, 1);
    questionDiv2Holder2.appendChild(possibleChoice3);
    possibleChoice3.addEventListener("mouseenter", () => {
        if (!animationActve3) {
            possibleChoice3.style.backgroundColor = "#a3d6eeff";
            possibleChoice3.style.transform = "scale(1.05)";
        }
        possibleChoice3.style.boxShadow = "0px 0px 4px grey";
    })
    possibleChoice3.addEventListener("mouseleave", () => {
        if (!animationActve3) {
            possibleChoice3.style.backgroundColor = "#8dceec";
            possibleChoice3.style.transform = "scale(1)";
        }
        possibleChoice3.style.boxShadow = "0px 0px 0px grey";
    })
    possibleChoice3.addEventListener("click", () => {
        if (possibleChoice3.id == actualAnswer) {
            for (let GEROGFC=0; GEROGFC<questionDivHolder.length;GEROGFC++) {
                questionDivHolder[GEROGFC].remove();
            }
            if (RQQCounter < RQQCounterMax) {
                requestQuestionQuizFrame(quizData, chosenDivName);
                const temporaryQuizCover = document.createElement("div");
                temporaryQuizCover.classList.add("lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker");
                if (quizGameDiv) {
                        temporaryQuizCover.style.height = "90%";
                }
                const lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_titleTextContent = document.createElement("div");
                lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_titleTextContent.classList.add("lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_titleTextContent");
                lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_titleTextContent.textContent = "Correct Answer!";
                const lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_briefExplanation = document.createElement("div");
                lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_briefExplanation.classList.add("lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_briefExplanation");
                lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_briefExplanation.textContent = questionExplanationObject[actualAnswer];

                temporaryQuizCover.appendChild(lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_titleTextContent);
                temporaryQuizCover.appendChild(lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_briefExplanation);
                temporaryQuestionBlockerArray.push(temporaryQuizCover);
                temporaryQuestionBlockerArray.push(lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_titleTextContent);
                temporaryQuestionBlockerArray.push(lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_briefExplanation);
                appendedDiv.appendChild(temporaryQuizCover);
                    setTimeout(() => {
                        for (let TQC=0; TQC<temporaryQuestionBlockerArray.length; TQC++) {
                            temporaryQuestionBlockerArray[TQC].remove();
                        }
                    }, timeWaitT);
                RQQCounter++;
                correctQuestionTracker.push(true);
            } else {
                for (let CQT=0; CQT<correctQuestionTracker.length; CQT++) {
                    if (correctQuestionTracker[CQT] == true) {
                        totalCorrectQuestions++;
                    }
                }
                quizzesTrackerDataUpdater(db, "Quizzes", 1, ((totalCorrectQuestions/correctQuestionTracker.length)*100), () => {});
                createEndCardScreen(Math.floor(((totalCorrectQuestions/correctQuestionTracker.length)*100)), quizData, chosenDivName);
            }
            dataUpdater(db, "ProgressTracker", quizData, -10, 0, true, () => {})
        } else {
            correctQuestionTracker.push(false);
            dataUpdater(db, "ProgressTracker", quizData, 5, 0, true, () => {})
            if (animationActve3 == false) {
                animationActve3 = true;
                possibleChoice3.style.backgroundColor = "#dc4545";
                possibleChoice3.style.transform = "translateX(8%)";
                possibleChoice3.style.pointerEvents = "none";
                setTimeout(() => {
                    possibleChoice3.style.transform = "translateX(-6%)";
                }, 500)
                setTimeout(() => {
                    possibleChoice3.style.backgroundColor = "#8dceec";
                    possibleChoice3.style.pointerEvents = "auto";
                    animationActve3 = false;
                }, 1100)
                setTimeout(() => {
                    possibleChoice3.style.transform = "translateX(0)";
                }, 1000)
            }
        }
    })

    const possibleChoice4 = document.createElement("div");
    possibleChoice4.classList.add("hiddenDivGame_mainScreen_gameScreen_answer");
    randomAnswer = Math.floor((Math.random() * RQQFTemporaryQuestionArray.length))
    possibleChoice4.id = RQQFTemporaryQuestionArray[randomAnswer];
    possibleChoice4.textContent = "$$" + RQQFTemporaryQuestionArray[randomAnswer] + "$$";
    RQQFTemporaryQuestionArray.splice(randomAnswer, 1);
    questionDiv2Holder2.appendChild(possibleChoice4);
    possibleChoice4.addEventListener("mouseenter", () => {
        if (!animationActve4) {
            possibleChoice4.style.backgroundColor = "#a3d6eeff";
            possibleChoice4.style.transform = "scale(1.05)";
        }
        possibleChoice4.style.boxShadow = "0px 0px 4px grey";
    })
    possibleChoice4.addEventListener("mouseleave", () => {
        if (!animationActve4) {
            possibleChoice4.style.backgroundColor = "#8dceec";
            possibleChoice4.style.transform = "scale(1)";
        }
        possibleChoice4.style.boxShadow = "0px 0px 0px grey";
    })
    possibleChoice4.addEventListener("click", () => {
        if (possibleChoice4.id == actualAnswer) {
            for (let GEROGFC=0; GEROGFC<questionDivHolder.length;GEROGFC++) {
                questionDivHolder[GEROGFC].remove();
            }
            if (RQQCounter < RQQCounterMax) {
                requestQuestionQuizFrame(quizData, chosenDivName);
                const temporaryQuizCover = document.createElement("div");
                temporaryQuizCover.classList.add("lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker");
                if (quizGameDiv) {
                        temporaryQuizCover.style.height = "90%";
                }
                const lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_titleTextContent = document.createElement("div");
                lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_titleTextContent.classList.add("lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_titleTextContent");
                lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_titleTextContent.textContent = "Correct Answer!";
                const lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_briefExplanation = document.createElement("div");
                lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_briefExplanation.classList.add("lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_briefExplanation");
                lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_briefExplanation.textContent = questionExplanationObject[actualAnswer];

                temporaryQuizCover.appendChild(lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_titleTextContent);
                temporaryQuizCover.appendChild(lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_briefExplanation);
                temporaryQuestionBlockerArray.push(temporaryQuizCover);
                temporaryQuestionBlockerArray.push(lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_titleTextContent);
                temporaryQuestionBlockerArray.push(lesson_rightSide_lowerPage_quizPage_temporaryQuizPageBlocker_briefExplanation);
                appendedDiv.appendChild(temporaryQuizCover);
                setTimeout(() => {
                    for (let TQC=0; TQC<temporaryQuestionBlockerArray.length; TQC++) {
                        temporaryQuestionBlockerArray[TQC].remove();
                    }
                }, timeWaitT);
                correctQuestionTracker.push(true);
                RQQCounter++;
            } else {
                for (let CQT=0; CQT<correctQuestionTracker.length; CQT++) {
                    if (correctQuestionTracker[CQT] == true) {
                        totalCorrectQuestions++;
                    }
                }
                quizzesTrackerDataUpdater(db, "Quizzes", 1, ((totalCorrectQuestions/correctQuestionTracker.length)*100), () => {});
                createEndCardScreen(Math.floor(((totalCorrectQuestions/correctQuestionTracker.length)*100)), quizData, chosenDivName);
            }
            dataUpdater(db, "ProgressTracker", quizData, -10, 0, true, () => {})
        } else {
            correctQuestionTracker.push(false);
            dataUpdater(db, "ProgressTracker", quizData, 5, 0, true, () => {})
            if (animationActve4 == false) {
                animationActve4 = true;
                possibleChoice4.style.backgroundColor = "#dc4545";
                possibleChoice4.style.transform = "translateX(8%)";
                possibleChoice4.style.pointerEvents = "none";
                setTimeout(() => {
                    possibleChoice4.style.transform = "translateX(-6%)";
                }, 500)
                
                setTimeout(() => {
                    possibleChoice4.style.backgroundColor = "#8dceec";
                    possibleChoice4.style.pointerEvents = "auto";
                    animationActve4 = false;
                }, 1100)
                setTimeout(() => {
                    possibleChoice4.style.transform = "translateX(0)";
                }, 1000)
            }            
        }
    })


    MathJax.typesetPromise([possibleChoice1])
    MathJax.typesetPromise([possibleChoice2])
    MathJax.typesetPromise([possibleChoice3])
    MathJax.typesetPromise([possibleChoice4])
    MathJax.typesetPromise([questionDiv])
    appendedDiv.appendChild(questionDiv);
    appendedDiv.appendChild(questionDiv2Holder1);
    appendedDiv.appendChild(questionDiv2Holder2);  

    quizGameDivTracker.push(questionDiv2Holder1);
    quizGameDivTracker.push(questionDiv2Holder2);
    quizGameDivTracker.push(possibleChoice1);
    quizGameDivTracker.push(possibleChoice2);
    quizGameDivTracker.push(possibleChoice3);
    quizGameDivTracker.push(possibleChoice4);
    quizGameDivTracker.push(questionDiv);

    questionDivHolder.push(questionDiv2Holder1);
    questionDivHolder.push(questionDiv2Holder2);
    questionDivHolder.push(possibleChoice1);
    questionDivHolder.push(possibleChoice2);
    questionDivHolder.push(possibleChoice3);
    questionDivHolder.push(possibleChoice4);
    questionDivHolder.push(questionDiv);
    questionDivHolder = questionDivHolder.flat();
}




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
    console.log(unitObject);
    console.log(lessonObject)
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
            dataUpdater(db, "ProgressTracker", keyMapParser(chosenLesson).toString(), -10, 0, true, () => {});
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
            dataUpdater(db, "ProgressTracker", keyMapParser(chosenLesson).toString(), 5, 0, true, () => {});
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
    possibleChoice2.textContent = "$" + possibleChoicesArray[tempRandomMath] + "$";
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
            dataUpdater(db, "ProgressTracker", keyMapParser(chosenLesson).toString(), -10, 0, true, () => {});
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
            dataUpdater(db, "ProgressTracker", keyMapParser(chosenLesson).toString(), 5, 0, true, () => {});
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
    possibleChoice3.textContent = "$" + possibleChoicesArray[tempRandomMath] + "$";
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
            dataUpdater(db, "ProgressTracker", keyMapParser(chosenLesson).toString(), -10, 0, true, () => {});
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
            dataUpdater(db, "ProgressTracker", keyMapParser(chosenLesson).toString(), 5, 0, true, () => {});
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
    possibleChoice4.textContent = "$" + possibleChoicesArray[tempRandomMath] + "$";
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
            dataUpdater(db, "ProgressTracker", keyMapParser(chosenLesson).toString(), -10, 0, true, () => {});
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
            dataUpdater(db, "ProgressTracker", keyMapParser(chosenLesson).toString(), 5, 0, true, () => {});
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

function removeAllUnits(dDisplay) {
    const lessons_rightSide_lessonDiv_lessons = document.getElementsByClassName("lessons_rightSide_lessonDiv_lessons");
    for (let RAU=0; RAU<lessons_rightSide_lessonDiv_lessons.length; RAU++) {
        lessons_rightSide_lessonDiv_lessons[RAU].style.display = dDisplay;
    }
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
    const request = window.indexedDB.open("mainDatabase", 1);
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
            const recentLessons = db.createObjectStore("RecentLessons", {autoIncrement: false});
        }
        if (!db.objectStoreNames.contains("ProgressTracker")) {
            const progressTrackerData = db.createObjectStore("ProgressTracker", {autoIncrement: false});
        }
        if (!db.objectStoreNames.contains("TemporaryQuestionHolder")) {
            const TemporaryQuestionHolder = db.createObjectStore("TemporaryQuestionHolder", {autoIncrement: false});
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

window.dataAccessor = function(database, objectID, key, callback) {
    const dataOpener = database.transaction(objectID, "readwrite").objectStore(objectID);
    try {
        if (key != null) {
            if (parseInt(key) == NaN) {
                console.log(parseInt(key))
                parsedKey = parseInt(key);
            } else {
                parsedKey = key;
            }
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

async function updateProgressBar() {
    const lesson_rightSide_lessonDiv_lessons_title_progressBarPercentage = [document.getElementById("lesson_rightSide_lessonDiv_lessons_title_progressBar_innerProgressBar_unit1"), document.getElementById("lesson_rightSide_lessonDiv_lessons_title_progressBar_innerProgressBar_unit2"), document.getElementById("lesson_rightSide_lessonDiv_lessons_title_progressBar_innerProgressBar_unit3"), document.getElementById("lesson_rightSide_lessonDiv_lessons_title_progressBar_innerProgressBar_unit4"), document.getElementById("lesson_rightSide_lessonDiv_lessons_title_progressBar_innerProgressBar_unit5")];
    const lesson_rightSide_lessonDiv_lessons_title_progressBarPercentageText = document.getElementsByClassName("lesson_rightSide_lessonDiv_lessons_title_progressBarPercentage");
    let totalActive = 0;
    let total = 0;
    let mData = null;
    for (let UPB=0; UPB<lesson_rightSide_lessonDiv_lessons_title_progressBarPercentage.length; UPB++) {
        totalActive = 0;
        total = 0;
        for (let UPBL=0; UPBL<Object.keys(dataMap[UPB+1][2]).length; UPBL++) {
            mData = await new Promise(resolve => {dataAccessor(db, "ProgressTracker", (UPB + 1).toString() + (UPBL + 1).toString(), data => {resolve(data)})});
            mData = JSON.parse(mData);
            totalActive += + mData[2] + mData[3];
            total += 2;
          
        }
        lesson_rightSide_lessonDiv_lessons_title_progressBarPercentageText[UPB].textContent = Math.ceil((totalActive/total)*100).toString() + "%";
        lesson_rightSide_lessonDiv_lessons_title_progressBarPercentage[UPB].style.width = Math.ceil((totalActive/total)*100).toString() + "%";
    }
    
}

window.getUnitData = function(key) {
    return dataMap[key];
}

/* Works under the condition that the object data is a dictionary with its keys being an int or string and its values being an array */
window.dataUpdater = function(database, objectID, key, data, location, add, callback) {
    const dataOpener = database.transaction(objectID, "readwrite").objectStore(objectID); 
    const keyLocationRequest = dataOpener.get(key);
    keyLocationRequest.onsuccess = (DUS) => {
        if (DUS.target.result != undefined) {
            if (DUS.target.result.length < location-1) {
                console.log("Invalid index.")
                callback("Invalid index.");
            }
            const updatedData = DUS.target.result;
            if (add) {
                updatedData.splice(location, 1, data + updatedData[location]);
            } else {
                updatedData.splice(location, 1, data);
            }
            const dataReplacementRequest = dataOpener.put(updatedData, key);
            dataReplacementRequest.onsuccess = DUDRS => {
                console.log("Data updated: " + updatedData + ", objectID: " + objectID + ", key: " + key + ", data: " + data + ", location: " + location + ", add: " + add);
                callback("Data was successfully updated");
            }
            dataReplacementRequest.onerror = DUDRS => {
                console.log("Data Updater: Data placement error!");
            }
        } else {
            console.log("Key not found.")
            callback("Key not found.")
        }
    }
    keyLocationRequest.onerror = DUS => {
        console.error("Data Updater: Failure finding data.")
    }
}
    
window.quizzesTrackerDataUpdater = function(database, objectID, key, data, callback) {
    const dataOpener = database.transaction(objectID, "readwrite").objectStore(objectID); 
    const keyLocationRequest = dataOpener.get(key);
    keyLocationRequest.onsuccess = (DUS) => {
        if (DUS.target.result != undefined) {
            const updatedData = DUS.target.result;
            updatedData.push(data);
            const dataReplacementRequest = dataOpener.put(updatedData, key);
            dataReplacementRequest.onsuccess = DUDRS => {
                callback("Data was successfully updated");
            }
            dataReplacementRequest.onerror = DUDRS => {
                console.log("Data Updater: Data placement error!");
            }
        } else {
            callback("Key not found.")
        }
    }
    keyLocationRequest.onerror = DUS => {
        console.error("Data Updater: Failure finding data.")
    }
}

window.continueDataUpdater = function(database, objectID, key, data, callback) {
    const dataOpener = database.transaction(objectID, "readwrite").objectStore(objectID); 
    const keyLocationRequest = dataOpener.get(key);
    keyLocationRequest.onsuccess = (DUS) => {
        if (DUS.target.result != undefined) {
            const updatedData = DUS.target.result;
            if (!updatedData.includes(data)) {
                updatedData.splice(0, 0, data);
                if (updatedData.length == 5) { 
                    updatedData.splice(4, 1);
                }
            } else {
                updatedData.splice(updatedData.indexOf(data), 1);
                updatedData.splice(0, 0, data);
            }
            
            const dataReplacementRequest = dataOpener.put(updatedData, key);
            dataReplacementRequest.onsuccess = DUDRS => {
                callback("Data was successfully updated");
            }
            dataReplacementRequest.onerror = DUDRS => {
                console.log("Data Updater: Data placement error!");
            }
        } else {
            callback("Key not found.")
        }
    }
    keyLocationRequest.onerror = DUS => {
        console.error("Data Updater: Failure finding data.")
    }
}

window.dataUpdaterAmender = function(database, objectID, key, data, callback) {
    const dataOpener = database.transaction(objectID, "readwrite").objectStore(objectID); 
    const keyLocationRequest = dataOpener.get(key);
    keyLocationRequest.onsuccess = (DUS) => {
        if (DUS.target.result != undefined) {
            const updatedData = DUS.target.result;
            updatedData.push(data);
            const dataReplacementRequest = dataOpener.put(updatedData, key);
            dataReplacementRequest.onsuccess = DUDRS => {
                callback("Data was successfully updated");
            }
            dataReplacementRequest.onerror = DUDRS => {
                console.log("Data Updater: Data placement error!");
            }
        } else {
            callback("Key not found.")
        }
    }
    keyLocationRequest.onerror = DUS => {
        console.error("Data Updater: Failure finding data.")
    }
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
                if (window.location.pathname.split("/").pop() == "practice" || window.location.pathname.split("/").pop() == "practice.html") {
                    questionContainer = [];
                    const dataOpener = db.transaction("TemporaryQuestionHolder", "readwrite").objectStore("TemporaryQuestionHolder");
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
                        if (questionContainer.length == 0) {
                            const gameButton = document.getElementById("gameStartButton");
                            const quizStartButton = document.getElementById("quizStartButton");
                            gameButton.style.pointerEvents = "none";
                            gameButton.style.opacity = ".7";
                            quizStartButton.style.pointerEvents = "none";
                            quizStartButton.style.opacity = ".7";
                        }
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
                                        dataRemover(db, "TemporaryQuestionHolder", [childOfNewChild.parentElement.id]);
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
                                            if (questionContainer.length == 0) {
                                                const gameButton = document.getElementById("gameStartButton");
                                                const quizStartButton = document.getElementById("quizStartButton");
                                                gameButton.style.pointerEvents = "none";
                                                gameButton.style.opacity = ".7";
                                                quizStartButton.style.pointerEvents = "none";
                                                quizStartButton.style.opacity = ".7";
                                            }
                                    })
                                    newChild.appendChild(childOfNewChild);
                                    mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_questionPreviewHolder_questionHolder.appendChild(newChild);
                                } 
                            }
                        }}
                }
            if (DBI == 2) {
                const quizzesDataFramework = []

                const recentLessonsDataFramework = ["L11"];
                /*[improvementIndex, video completion, interactive lesson completion, quiz completion] */
                const progressTrackerdataFramework = {
                   11: [1, 0, 0, 0],
                   12: [0, 0, 0, 0],
                   13: [0, 0, 0, 0],
                   21: [0, 0, 0, 0],
                   22: [0, 0, 0, 0],
                   31: [0, 0, 0, 0],
                   32: [0, 0, 0, 0],
                   41: [0, 0, 0, 0],
                   42: [0, 0, 0, 0],
                   51: [0, 0, 0, 0],
                   52: [0, 0, 0, 0]
                } 

                for (let QDFDBI=0; QDFDBI<Object.keys(progressTrackerdataFramework).length; QDFDBI++) {
                    dataAmender(db, "ProgressTracker", progressTrackerdataFramework[Object.keys(progressTrackerdataFramework)[QDFDBI]], true, Object.keys(progressTrackerdataFramework)[QDFDBI]);
                }
                dataAmender(db, "RecentLessons", recentLessonsDataFramework, true, 1);
                dataAmender(db, "Quizzes", recentLessonsDataFramework, true, 1);
            } else if (DBI == 4) {
                console.error("Undocumented error. (error code: 4)");
                alert("Error Code 4: Try refreshing your webpage, and if that does not work, delete your webpage data. (On Google, click on the lock button on the top left, site settings, and press on delete data)");
            } else if (DBI == 1) {
                console.log("The database was successfully loaded without any upgrades necessary.")
            } else {
                console.error("Unknown error.")
            }
            
            if (window.location.pathname.split("/").pop() == "quiz_practice.html" || window.location.pathname.split("/").pop() == "quiz_practice") {
                const newUrlData = new URLSearchParams(window.location.search);
                const unitLessonData = newUrlData.get("id");
                const homePage_rightSide_titleDiv_title = document.getElementById("homePage_rightSide_titleDiv_title");
                const homePage_rightSide_titleDiv_titleText = document.getElementById("homePage_rightSide_titleDiv_titleContent");
                const lesson_rightSide_lowerPage_quizPage_nextButton = document.getElementsByClassName("lesson_rightSide_lowerPage_quizPage_nextButton")[0];
                const lesson_rightSide_lowerPage_quizPage_returnButton = document.getElementsByClassName("lesson_rightSide_lowerPage_quizPage_returnButton")[0];
                lesson_rightSide_lowerPage_quizPage_nextButton.addEventListener("click", () => {
                    if (dataLinkMap[parseInt(unitLessonData[0])][parseInt(unitLessonData[1]) + 1] != undefined) {
                        pageRedirect(dataLinkMap[parseInt(unitLessonData[0])][parseInt(unitLessonData[1]) + 1]);
                        dataUpdater(db, "ProgressTracker", unitLessonData[0] + (1 + parseInt(unitLessonData[1])).toString(), 1, 2, false, () => {});
                        dataUpdater(db, "ProgressTracker", unitLessonData[0] + (1 + parseInt(unitLessonData[1])).toString(), -10, 0, true, () => {});
                        continueDataUpdater(db, "RecentLessons", 1, "L" + unitLessonData[0] + (1 + parseInt(unitLessonData[1])).toString(), () => {});
                    } else {
                        pageRedirect(dataLinkMap[parseInt(unitLessonData[0]) + 1][1]);
                        dataUpdater(db, "ProgressTracker", (parseInt(unitLessonData[0]) + 1).toString() + "1", 1, 2, false, () => {});
                        dataUpdater(db, "ProgressTracker", (parseInt(unitLessonData[0]) + 1).toString() + "1", -10, 0, true, () => {});
                        continueDataUpdater(db, "RecentLessons", 1, "L" +(parseInt(unitLessonData[0]) + 1).toString() + "1", () => {});
                    }
                })
                homePage_rightSide_titleDiv_titleText.textContent = "Unit " + unitLessonData[0] + ", Lesson " + unitLessonData[1] + ": " + dataMap[unitLessonData[0]][2][unitLessonData[1]] + " Quiz";
                homePage_rightSide_titleDiv_titleText.style.fontSize = "1.5vmax";
                homePage_rightSide_titleDiv_titleText.style.color = "#04afff"
                document.addEventListener("DOMContentLoaded", () => {
                    const lesson_rightSide_lowerPage_videoDiv_improvementIndex = document.getElementById("lesson_rightSide_lowerPage_videoDiv_improvementIndex");
                    dataAccessor(db, "ProgressTracker", unitLessonData, foundData => {
                        lesson_rightSide_lowerPage_videoDiv_improvementIndex.textContent = "Improvement Index: " + JSON.parse(foundData)[0];
                })
                });
                const lesson_rightSide_lowerPage_quizPage_quizStartButton = document.getElementsByClassName("lesson_rightSide_lowerPage_quizPage_quizStartButton")[0];
                const lesson_rightSide_lowerPage_quizPage_extraInformation = document.getElementsByClassName("lesson_rightSide_lowerPage_quizPage_extraInformation")[0];
                const lesson_rightSide_lowerPage_quizPage_title = document.getElementsByClassName("lesson_rightSide_lowerPage_quizPage_extraInformation")[0];
                const lesson_rightSide_lowerPage_quizPage_improvementIndexDiv = document.getElementsByClassName("lesson_rightSide_lowerPage_quizPage_improvementIndexDiv")[0];
                const lesson_rightSide_lowerPage_quizPage_buttonDiv_improvementIndexInformation = document.getElementsByClassName("lesson_rightSide_lowerPage_quizPage_buttonDiv_improvementIndexInformation")[0];
                const hideDivArray = [];
                lesson_rightSide_lowerPage_quizPage_quizStartButton.addEventListener("mouseenter", () => {
                    lesson_rightSide_lowerPage_quizPage_quizStartButton.style.boxShadow = "0px 0px 4px grey";
                    lesson_rightSide_lowerPage_quizPage_quizStartButton.style.backgroundColor = "#a9daefff"
                })
                lesson_rightSide_lowerPage_quizPage_quizStartButton.addEventListener("mouseleave", () => {
                    lesson_rightSide_lowerPage_quizPage_quizStartButton.style.boxShadow = "0px 0px 0px grey";
                    lesson_rightSide_lowerPage_quizPage_quizStartButton.style.backgroundColor = "#dcf4ff";
                })
                lesson_rightSide_lowerPage_quizPage_quizStartButton.addEventListener("click", () => {
                    requestQuestionQuizFrame(unitLessonData, "lesson_rightSide_lowerPage_quizPage");
                })
                lesson_rightSide_lowerPage_quizPage_improvementIndexDiv.addEventListener("mouseenter", () => {
                    lesson_rightSide_lowerPage_quizPage_buttonDiv_improvementIndexInformation.style.display = "flex";
                });
                lesson_rightSide_lowerPage_quizPage_improvementIndexDiv.addEventListener("mouseleave", () => {
                    lesson_rightSide_lowerPage_quizPage_buttonDiv_improvementIndexInformation.style.display = "none";
                })
            }
            if (window.location.pathname.split("/").pop() == "lessons.html" || window.location.pathname.split("/").pop() == "lessons") {
                updateProgressBar();
                const lessons_rightSide_lessonDiv_lessons_sublesson_content_lessonCompletion = document.getElementsByClassName("lessons_rightSide_lessonDiv_lessons_sublesson_content_lessonCompletion");
                dataAccessor(db, "ProgressTracker", null, LCDATA => {
                    let mainData = JSON.parse(LCDATA);
                    const progressTrackerdataFramework = {
                        11: [4, 0, 1, 0],
                        12: [0, 0, 1, 0],
                        13: [3, 1, 0, 0],
                        21: [0, 0, 0, 0],
                        22: [66, 0, 0, 0],
                        31: [11, 0, 1, 0],
                        32: [0, 1, 0, 0],
                        41: [0, 0, 0, 0],
                        42: [0, 0, 0, 0],
                        51: [0, 1, 1, 1],
                        52: [22, 0, 0, 1]
                    } 
                    for (let LC=0; LC<lessons_rightSide_lessonDiv_lessons_sublesson_content_lessonCompletion.length; LC++) {
                        let dataSet = mainData[Object.keys(progressTrackerdataFramework).indexOf(lessons_rightSide_lessonDiv_lessons_sublesson_content_lessonCompletion[LC].id.substring(3, 6))];
                        let mainElement = lessons_rightSide_lessonDiv_lessons_sublesson_content_lessonCompletion[LC];
                        let elementIDKey = lessons_rightSide_lessonDiv_lessons_sublesson_content_lessonCompletion[LC].id.substring(3, 6);
                        let elementIDIndex = Object.keys(progressTrackerdataFramework).indexOf(elementIDKey);
                        if (lessons_rightSide_lessonDiv_lessons_sublesson_content_lessonCompletion[LC].id[2] == "W") {
                            dataSet = mainData[Object.keys(progressTrackerdataFramework).indexOf(lessons_rightSide_lessonDiv_lessons_sublesson_content_lessonCompletion[LC].id.substring(3, 6))];
                            mainElement = lessons_rightSide_lessonDiv_lessons_sublesson_content_lessonCompletion[LC];
                            elementIDKey = lessons_rightSide_lessonDiv_lessons_sublesson_content_lessonCompletion[LC].id.substring(3, 6);
                            elementIDIndex = Object.keys(progressTrackerdataFramework).indexOf(elementIDKey);
                            if (dataSet[1] == 1 && dataSet[2] == 1 && dataSet[3] == 1) {
                                mainElement.classList.toggle("lessonCompButtonActive");
                            } else if (dataSet[2] == 1 && dataSet[3] == 1) {
                                mainElement.classList.toggle("lessonCompButtonActive");  
                                dataUpdater(db, "ProgressTracker", elementIDKey, 1, 1, false, () => {}) 
                                
                                mainData[elementIDIndex].splice(1, 1, 1); 
                            } else {
                                console.log(mainData) 
                                dataUpdater(db, "ProgressTracker", elementIDKey, 0, 1, false, () => {})   
                                mainData[elementIDIndex].splice(1, 1, 0); 
                            }    
                            mainElement.addEventListener("click", event => {
                                event.stopPropagation();
                                mainElement.classList.toggle("lessonCompButtonActive");
                                console.log(dataSet[1])
                                const lLesson = document.getElementById("LCL" + elementIDKey);
                                const qLesson = document.getElementById("LCQ" + elementIDKey);
                                if (dataSet[1] == 1) {
                                    dataUpdater(db, "ProgressTracker", elementIDKey, 0, 1, false, () => {});
                                    if (dataSet[2] == 1) {
                                        lLesson.classList.toggle("lessonCompButtonActive");
                                        dataUpdater(db, "ProgressTracker", elementIDKey, 0, 2, false, () => {});
                                        mainData[elementIDIndex].splice(2, 1, 0);
                                    }
                                    if (dataSet[3] == 1) {
                                        qLesson.classList.toggle("lessonCompButtonActive");
                                        dataUpdater(db, "ProgressTracker", elementIDKey, 0, 3, false, () => {});
                                        mainData[elementIDIndex].splice(3, 1, 0);
                                    }
                                    mainData[elementIDIndex].splice(1, 1, 0);                
                                } else {
                                    dataUpdater(db, "ProgressTracker", elementIDKey, 1, 1, false, () => {});
                                    if (dataSet[2] == 0) {
                                        lLesson.classList.toggle("lessonCompButtonActive");
                                        dataUpdater(db, "ProgressTracker", elementIDKey, 1, 2, false, () => {});
                                        mainData[elementIDIndex].splice(2, 1, 1);
                                    }
                                    if (dataSet[3] == 0) {
                                        qLesson.classList.toggle("lessonCompButtonActive");
                                        dataUpdater(db, "ProgressTracker", elementIDKey, 1, 3, false, () => {});
                                        mainData[elementIDIndex].splice(3, 1, 1);
                                    }
                                    mainData[elementIDIndex].splice(1, 1, 1);              
                                }
                                updateProgressBar();
                            })
                        } else if (lessons_rightSide_lessonDiv_lessons_sublesson_content_lessonCompletion[LC].id[2] == "L") {
                            dataSet = mainData[Object.keys(progressTrackerdataFramework).indexOf(lessons_rightSide_lessonDiv_lessons_sublesson_content_lessonCompletion[LC].id.substring(3, 6))];
                            mainElement = lessons_rightSide_lessonDiv_lessons_sublesson_content_lessonCompletion[LC];
                            elementIDKey = lessons_rightSide_lessonDiv_lessons_sublesson_content_lessonCompletion[LC].id.substring(3, 6);
                            elementIDIndex = Object.keys(progressTrackerdataFramework).indexOf(elementIDKey);
                            if (dataSet[2] == 1) {
                                mainElement.classList.toggle("lessonCompButtonActive");
                            }  else if (dataSet[1] == 1) {
                                mainElement.classList.toggle("lessonCompButtonActive");
                                dataUpdater(db, "ProgressTracker", elementIDKey, 1, 2, false, () => {});
                                mainData[elementIDIndex].splice(2, 1, 1);               
                            }
                            mainElement.addEventListener("click", event => {
                                event.stopPropagation();
                                mainElement.classList.toggle("lessonCompButtonActive");
                                if (dataSet[2] == 1) {
                                    dataUpdater(db, "ProgressTracker", elementIDKey, 0, 2, false, () => {});
                                    mainData[elementIDIndex].splice(2, 1, 0);               
                                } else {
                                    dataUpdater(db, "ProgressTracker", elementIDKey, 1, 2, false, () => {});
                                    mainData[elementIDIndex].splice(2, 1, 1);              
                                }
                                if (dataSet[2] == 1 && dataSet[3] == 1) {
                                    let wLesson = document.getElementById("LCW" + elementIDKey);
                                    wLesson.classList.toggle("lessonCompButtonActive");
                                    dataUpdater(db, "ProgressTracker", elementIDKey, 1, 1, false, () => {});
                                    mainData[elementIDIndex].splice(1, 1, 1); 
                                } else if ((dataSet[2] != 1 || dataSet[3] != 1) && dataSet[1] == 1) {
                                    let wLesson = document.getElementById("LCW" + elementIDKey);
                                    wLesson.classList.toggle("lessonCompButtonActive");
                                    dataUpdater(db, "ProgressTracker", elementIDKey, 0, 1, false, () => {});
                                    mainData[elementIDIndex].splice(1, 1, 0); 
                                }
                                updateProgressBar();
                            })
                        } else if (lessons_rightSide_lessonDiv_lessons_sublesson_content_lessonCompletion[LC].id[2] == "Q") {
                            dataSet = mainData[Object.keys(progressTrackerdataFramework).indexOf(lessons_rightSide_lessonDiv_lessons_sublesson_content_lessonCompletion[LC].id.substring(3, 6))];
                            mainElement = lessons_rightSide_lessonDiv_lessons_sublesson_content_lessonCompletion[LC];
                            elementIDKey = lessons_rightSide_lessonDiv_lessons_sublesson_content_lessonCompletion[LC].id.substring(3, 6);
                            elementIDIndex = Object.keys(progressTrackerdataFramework).indexOf(elementIDKey);
                            if (dataSet[3] == 1) {
                                mainElement.classList.toggle("lessonCompButtonActive");
                            } else if (dataSet[1] == 1) {
                                mainElement.classList.toggle("lessonCompButtonActive");  
                                dataUpdater(db, "ProgressTracker", elementIDKey, 1, 3, false, () => {});
                                mainData[elementIDIndex].splice(3, 1, 1); 
                            }
                            mainElement.addEventListener("click", event => {
                                event.stopPropagation();
                                mainElement.classList.toggle("lessonCompButtonActive");
                                if (dataSet[3] == 1) {
                                    dataUpdater(db, "ProgressTracker", elementIDKey, 0, 3, false, () => {});
                                    mainData[elementIDIndex].splice(3, 1, 0);                 
                                } else {
                                    dataUpdater(db, "ProgressTracker", elementIDKey, 1, 3, false, () => {});
                                    mainData[elementIDIndex].splice(3, 1, 1);                 
                                }
                                if (dataSet[2] == 1 && dataSet[3] == 1) {
                                    let wID = "LCW" + elementIDKey;
                                    const wLesson = document.getElementById(wID);
                                    wLesson.classList.toggle("lessonCompButtonActive");
                                    dataUpdater(db, "ProgressTracker", elementIDKey, 1, 1, false, () => {});
                                    mainData[elementIDIndex].splice(1, 1, 1); 
                                } else if ((dataSet[2] != 1 || dataSet[3] != 1) && dataSet[1] == 1) {
                                    let wLesson = document.getElementById("LCW" + elementIDKey);
                                    wLesson.classList.toggle("lessonCompButtonActive");
                                    dataUpdater(db, "ProgressTracker", elementIDKey, 0, 1, false, () => {});
                                    mainData[elementIDIndex].splice(1, 1, 0); 
                                }
                                updateProgressBar();
                            })
                        } else {}
                    }
                })
            } 
            if (window.location.pathname.split("/").pop() == "home.html" || window.location.pathname.split("/").pop() == "home") {
                const homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder = document.getElementById("homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder");
                dataAccessor(db, "RecentLessons", 1, DAHOMEC => {
                    const mainData = JSON.parse(DAHOMEC);
                    for (let DAHOMECC=0; DAHOMECC<mainData.length; DAHOMECC++) {
                        const continueDiv = document.createElement("div");
                        continueDiv.classList.add("homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv");
                        const continueDivText = document.createElement("div");
                        continueDivText.classList.add("homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv_lessonText");
                        continueDivText.textContent = "Unit " + mainData[DAHOMECC][1] + ": " + dataMap[mainData[DAHOMECC][1]][1] + ", Lesson: " + mainData[DAHOMECC][2] + ": " +  dataMap[mainData[DAHOMECC][1]][2][mainData[DAHOMECC][2]];
                        const homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv_divider = document.createElement("div");
                        homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv_divider.classList.add("homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv_divider");
                        const homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv_lessonType = document.createElement("div");
                        homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv_lessonType.classList.add("homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv_lessonType");
                        const homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv_improvementIndex = document.createElement("div");
                        homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv_improvementIndex.classList.add("homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv_improvementIndex");
                        dataAccessor(db, "ProgressTracker", mainData[DAHOMECC].substring(1, 3), DAHOMEII => {
                            homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv_improvementIndex.textContent = "Improvement Index: " + JSON.parse(DAHOMEII)[0];
                        })
                        continueDiv.addEventListener("mouseenter", () => {
                            continueDiv.style.boxShadow = "0px 0px 4px grey";
                        })      
                        continueDiv.addEventListener("mouseleave", () => {
                            continueDiv.style.boxShadow = "0px 0px 0px grey";
                        })                
                        console.log(mainData)
                        if (mainData[DAHOMECC][0] == "L") {
                            continueDiv.addEventListener("click", () => {
                                pageRedirect("lessonFiles/" + dataLinkMap[mainData[DAHOMECC][1]][mainData[DAHOMECC][2]]);
                                continueDataUpdater(db, "RecentLessons", 1, mainData[DAHOMECC], () => {});
                                dataUpdater(db, "ProgressTracker", mainData[DAHOMECC].substring(1, 3), -5, 0, true, () => {})
                                dataUpdater(db, "ProgressTracker", mainData[DAHOMECC].substring(1, 3), 1, 2, false, () => {})

                            })
                            homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv_lessonType.textContent = "Video and Article";
                        } else {
                            continueDiv.addEventListener("click", () => {
                                pageRedirect("lessonFiles/quiz_practice.html?id=" + mainData[DAHOMECC].substring(1, 3));
                                continueDataUpdater(db, "RecentLessons", 1, mainData[DAHOMECC], () => {});
                                dataUpdater(db, "ProgressTracker", mainData[DAHOMECC].substring(1, 3), 1, 3, false, () => {})
                                dataUpdater(db, "ProgressTracker", mainData[DAHOMECC].substring(1, 3), -5, 0, true, () => {})
                            })
                            homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv_lessonType.textContent = "Quiz Practice";
                        }
                        continueDiv.appendChild(continueDivText);
                        continueDiv.appendChild(homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv_divider);
                        continueDiv.appendChild(homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv_lessonType);
                        continueDiv.appendChild(homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder_continueDiv_improvementIndex);
                        homePage_rightSide_upperDiv_rightDiv_verticalDiv_mainContinueDivHolder.appendChild(continueDiv);
                    }
                })
                const mainPageGraph = document.getElementById("mainPage_graph");
                let mainGraphLabels = [];
                let mainGraphData = []
                dataAccessor(db, "Quizzes", 1, DAGRAPH => {
                    mainGraphData = JSON.parse(DAGRAPH).slice(1);
                    for (let DALGRAPH=1; DALGRAPH<mainGraphData.length; DALGRAPH++) {
                        mainGraphLabels.push(DALGRAPH+1);
                    }
                    mainPageGraph.style.width = "90%";
                    mainPageGraph.style.height = "80%";
                    mainPageGraph.style.color = "black";
                    const mainPage_graphCreation = new Chart(mainPageGraph, {
                        type: "line",
                        data: {
                            labels: mainGraphLabels,
                            datasets: [{
                                label: "Score of Quizzes Taken",
                                data: mainGraphData
                            }]
                        },
                        options: {responsive: false, maintainAspectRatio: true}
                    })
                })
                
                dataAccessor(db, "ProgressTracker", null, DARLC => {
                    const progressTrackerdataFramework = {
                        11: [0, 0, 0, 0],
                        12: [0, 0, 0, 0],
                        13: [0, 0, 0, 0],
                        21: [0, 0, 0, 0],
                        22: [0, 0, 0, 0],
                        31: [0, 0, 0, 0],
                        32: [0, 0, 0, 0],
                        41: [0, 0, 0, 0],
                        42: [0, 0, 0, 0],
                        51: [0, 0, 0, 0],
                        52: [0, 0, 0, 0]
                    } 
                    const unitLessons = [];
                    for (let PTDF=0; PTDF<Object.keys(progressTrackerdataFramework).length; PTDF++) {
                        unitLessons.push(Object.keys(progressTrackerdataFramework)[PTDF]);
                    } 
                    const homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent = document.getElementsByClassName("homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent")[0];
                    const homePage_rightSide_lowerDiv_mainDiv_rightDiv_mainContent = document.getElementsByClassName("homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent")[1];
                    dataAccessor(db, "ProgressTracker", null, mainData => {
                        const mainDataJSON = JSON.parse(mainData);
                        for (let DALS=0; DALS<mainDataJSON.length; DALS++) {
                            const contextOfTextDiv = document.createElement("div");
                            const homePage_rightSide_lowerDiv_mainDiv_rightDiv_decrease = document.createElement("div");
                            homePage_rightSide_lowerDiv_mainDiv_rightDiv_decrease.classList.add("homePage_rightSide_lowerDiv_mainDiv_rightDiv_decrease");
                            homePage_rightSide_lowerDiv_mainDiv_rightDiv_decrease.textContent = "-";
                            const homePage_rightSide_lowerDiv_mainDiv_rightDiv_increase = document.createElement("div");
                            homePage_rightSide_lowerDiv_mainDiv_rightDiv_increase.classList.add("homePage_rightSide_lowerDiv_mainDiv_rightDiv_increase");
                            homePage_rightSide_lowerDiv_mainDiv_rightDiv_increase.textContent = "+";
                            contextOfTextDiv.classList.add("contextOfTextDiv");
                            let contentOfText = "Unit " + unitLessons[DALS][0] + ": " + dataMap[unitLessons[DALS][0]][1] + ", Lesson " + unitLessons[DALS][1] + ": " + dataMap[unitLessons[DALS][0]][2][unitLessons[DALS][1]];
                            contextOfTextDiv.textContent = contentOfText;
                            const homePage_rightSide_lowerDiv_mainDiv_rightDiv_mainContent_lessons = document.createElement("div");
                            homePage_rightSide_lowerDiv_mainDiv_rightDiv_mainContent_lessons.classList.add("homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessons");
                            const homePage_rightSide_lowerDiv_mainDiv_rightDiv_mainContent_lessonsImprovementIndex = document.createElement("div");
                            homePage_rightSide_lowerDiv_mainDiv_rightDiv_mainContent_lessonsImprovementIndex.classList.add("homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessonsImprovementIndex");
                            homePage_rightSide_lowerDiv_mainDiv_rightDiv_mainContent_lessonsImprovementIndex.textContent = "Improvement Index: " + mainDataJSON[DALS][0];
                            homePage_rightSide_lowerDiv_mainDiv_rightDiv_increase.addEventListener("click", () => {
                                homePage_rightSide_lowerDiv_mainDiv_rightDiv_increase.style.transform = "scale(1.2)"
                                setTimeout(() => {
                                    homePage_rightSide_lowerDiv_mainDiv_rightDiv_increase.style.transform = "scale(1)"
                                }, 400);
                                dataUpdater(db, "ProgressTracker", unitLessons[DALS], 10, 0, true, () => {
                                    dataAccessor(db, "ProgressTracker", null, newMainData => {
                                        homePage_rightSide_lowerDiv_mainDiv_rightDiv_mainContent_lessonsImprovementIndex.textContent = "Improvement Index: " + JSON.parse(newMainData)[DALS][0];
                                    })
                                })
                            })
                            homePage_rightSide_lowerDiv_mainDiv_rightDiv_decrease.addEventListener("click", () => {
                                homePage_rightSide_lowerDiv_mainDiv_rightDiv_decrease.style.transform = "scale(1.2)"
                                setTimeout(() => {
                                    homePage_rightSide_lowerDiv_mainDiv_rightDiv_decrease.style.transform = "scale(1)"
                                }, 400);
                                dataUpdater(db, "ProgressTracker", unitLessons[DALS], -10, 0, true, () => {
                                    dataAccessor(db, "ProgressTracker", null, newMainData => {
                                        homePage_rightSide_lowerDiv_mainDiv_rightDiv_mainContent_lessonsImprovementIndex.textContent = "Improvement Index: " + JSON.parse(newMainData)[DALS][0];
                                    })

                                })
                            })
                            homePage_rightSide_lowerDiv_mainDiv_rightDiv_mainContent_lessons.appendChild(homePage_rightSide_lowerDiv_mainDiv_rightDiv_mainContent_lessonsImprovementIndex);
                            homePage_rightSide_lowerDiv_mainDiv_rightDiv_mainContent_lessons.appendChild(contextOfTextDiv);
                            homePage_rightSide_lowerDiv_mainDiv_rightDiv_mainContent_lessons.appendChild(homePage_rightSide_lowerDiv_mainDiv_rightDiv_increase);
                            homePage_rightSide_lowerDiv_mainDiv_rightDiv_mainContent_lessons.appendChild(homePage_rightSide_lowerDiv_mainDiv_rightDiv_decrease);
                            homePage_rightSide_lowerDiv_mainDiv_rightDiv_mainContent.appendChild(homePage_rightSide_lowerDiv_mainDiv_rightDiv_mainContent_lessons);
                        }
                    })
                    console.log(unitLessons)
                    const improvementIndexArray = [];
                    const mainData = JSON.parse(DARLC);
                    for (let DAII=0; DAII<mainData.length; DAII++) {
                        improvementIndexArray.push(mainData[DAII][0]);
                    }
                    const unchangeableImproveIndexArray = improvementIndexArray.slice();
                    const sortedImprovementIndexArray = improvementIndexArray.sort((a,b) => b - a);
                    for (let sortedImprovementIndexArrayCounter=0; sortedImprovementIndexArrayCounter<sortedImprovementIndexArray.length; sortedImprovementIndexArrayCounter++) {
                        if (sortedImprovementIndexArray[sortedImprovementIndexArrayCounter] > 0) {
                            let contentOfText = "Unit " + unitLessons[unchangeableImproveIndexArray.indexOf(sortedImprovementIndexArray[sortedImprovementIndexArrayCounter])][0] + ": " + dataMap[unitLessons[unchangeableImproveIndexArray.indexOf(sortedImprovementIndexArray[sortedImprovementIndexArrayCounter])][0]][1] + ", Lesson " + unitLessons[unchangeableImproveIndexArray.indexOf(sortedImprovementIndexArray[sortedImprovementIndexArrayCounter])][1] + ": " + dataMap[unitLessons[unchangeableImproveIndexArray.indexOf(sortedImprovementIndexArray[sortedImprovementIndexArrayCounter])][0]][2][unitLessons[unchangeableImproveIndexArray.indexOf(sortedImprovementIndexArray[sortedImprovementIndexArrayCounter])][1]];
                            const contextOfTextDiv = document.createElement("div");
                            contextOfTextDiv.classList.add("contextOfTextDiv");
                            contextOfTextDiv.textContent = contentOfText;
                            const homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessons = document.createElement("div");
                            homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessons.classList.add("homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessons");
                            const homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessonsImprovementIndex = document.createElement("div");
                            homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessonsImprovementIndex.classList.add("homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessonsImprovementIndex");
                            homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessonsImprovementIndex.textContent = "Improvement Index: " + sortedImprovementIndexArray[sortedImprovementIndexArrayCounter];
                            const homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessons_start = document.createElement("div");
                            homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessons_start.textContent = "Start Lesson";
                            homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessons_start.classList.add("homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessons_start");
                            homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessons_start.addEventListener("click", HPLS => {
                                continueDataUpdater(db, "RecentLessons", 1, "L" + unitLessons[unchangeableImproveIndexArray.indexOf(sortedImprovementIndexArray[sortedImprovementIndexArrayCounter])], () =>{})
                                console.log(unitLessons[unchangeableImproveIndexArray.indexOf(sortedImprovementIndexArray[sortedImprovementIndexArrayCounter])][1])
                                pageRedirect("lessonFiles/" + dataLinkMap[unitLessons[unchangeableImproveIndexArray.indexOf(sortedImprovementIndexArray[sortedImprovementIndexArrayCounter])][0]][unitLessons[unchangeableImproveIndexArray.indexOf(sortedImprovementIndexArray[sortedImprovementIndexArrayCounter])][1]]);
                                dataUpdater(db, "ProgressTracker", unitLessons[unchangeableImproveIndexArray.indexOf(sortedImprovementIndexArray[sortedImprovementIndexArrayCounter])], -5, 0, true, DULS => {
                                })
                            })
                            homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessons_start.addEventListener("mouseenter", () => {
                                homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessons_start.style.backgroundColor = "#64cbfb";
                                homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessons_start.style.boxShadow = "0px 0px 4px grey";
                            })
                            homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessons_start.addEventListener("mouseleave", () => {
                                homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessons_start.style.backgroundColor = "#04afff";
                                homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessons_start.style.boxShadow = "0px 0px 0px grey";
                            })
                            homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessons.appendChild(homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessonsImprovementIndex);
                            homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessons.appendChild(contextOfTextDiv);
                            homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessons.appendChild(homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessons_start);
                            homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent.appendChild(homePage_rightSide_lowerDiv_mainDiv_leftDiv_mainContent_lessons);
                        }
                    }
                })
            }
        }
    )}
    if (window.location.pathname.split("/").pop() == "vocabulary.html" || window.location.pathname.split("/").pop() == "vocabulary") {   
        const homePage_rightSide_vocabularyDivHolder_unitDivSeparator_array = document.getElementsByClassName("homePage_rightSide_vocabularyDivHolder_unitDivSeparator");
        const homePage_rightSide_vocabularySearch = document.getElementById("homePage_rightSide_vocabularySearch");
        /* Fix this soon */
        const mainPage_backgroundBlocker = document.getElementById("mainPage_backgroundBlocker");
        mainPage_backgroundBlocker.style.display = "none";
        let vocabularyHolder = [];
        for (let LUL=0; LUL<homePage_rightSide_vocabularyDivHolder_unitDivSeparator_array.length; LUL++) {
            let questionDict = unitVocabularyWordsReferenceArray[LUL];
            console.log(questionDict)
            for (let QRA=0; QRA<Object.keys(questionDict).length; QRA++) {
                const homePage_rightSide_vocabularyDetail = document.createElement("details");
                homePage_rightSide_vocabularyDetail.classList.add("homePage_rightSide_vocabularyDetail");
                homePage_rightSide_vocabularyDetail.id = Object.keys(questionDict)[QRA].substring(1);
                vocabularyHolder.push(homePage_rightSide_vocabularyDetail);

                const homePage_rightSide_vocabularySummary = document.createElement("summary");
                homePage_rightSide_vocabularySummary.classList.add("homePage_rightSide_vocabularySummary");

                const homePage_rightSide_vocabularyText = document.createElement("div");
                homePage_rightSide_vocabularyText.classList.add("homePage_rightSide_vocabularyText");
                homePage_rightSide_vocabularyText.textContent = Object.keys(questionDict)[QRA].substring(1);
                const homePage_rightSide_vocabularyUnit = document.createElement("div");
                homePage_rightSide_vocabularyUnit.classList.add("homePage_rightSide_vocabularyUnit");
                homePage_rightSide_vocabularyUnit.textContent = "Unit " + (LUL + 1) + ": " + dataMap[LUL + 1][1];
                const homePage_rightSide_vocabularyLesson = document.createElement("div");
                homePage_rightSide_vocabularyLesson.classList.add("homePage_rightSide_vocabularyLesson");
                homePage_rightSide_vocabularyLesson.textContent = "Lesson " + Object.keys(questionDict)[QRA].substring(0, 1) + ": " + dataMap[LUL + 1][2][Object.keys(questionDict)[QRA].substring(0, 1)]; 

                const homePage_rightSide_vocabularyDefintion = document.createElement("div");
                homePage_rightSide_vocabularyDefintion.classList.add("homePage_rightSide_vocabularyDefintion");
                homePage_rightSide_vocabularyDefintion.textContent = Object.values(questionDict)[QRA];

                homePage_rightSide_vocabularyDetail.appendChild(homePage_rightSide_vocabularySummary);
                homePage_rightSide_vocabularySummary.appendChild(homePage_rightSide_vocabularyText);
                homePage_rightSide_vocabularySummary.appendChild(homePage_rightSide_vocabularyUnit);
                homePage_rightSide_vocabularySummary.appendChild(homePage_rightSide_vocabularyLesson);
                homePage_rightSide_vocabularyDetail.appendChild(homePage_rightSide_vocabularyDefintion);
                homePage_rightSide_vocabularyDivHolder_unitDivSeparator_array[LUL].appendChild(homePage_rightSide_vocabularyDetail);

            }
        }
        homePage_rightSide_vocabularySearch.addEventListener("input", () => {
            for (let HRSVS=0; HRSVS<vocabularyHolder.length; HRSVS++) {
                if (vocabularyHolder[HRSVS].id.indexOf(homePage_rightSide_vocabularySearch.value) >= 0) {
                    vocabularyHolder[HRSVS].style.display = "flex";
                } else {
                    vocabularyHolder[HRSVS].style.display = "none";
                }
            }
        })
    }

    if (window.location.pathname.split("/").pop() == "lessons.html" || window.location.pathname.split("/").pop() == "lessons") {        
        const lessons_rightSide_lessonDiv_lessons = document.getElementsByClassName("lessons_rightSide_lessonDiv_lessons");        
        const lessons_rightSide_lessonDiv_lessons_sublesson = document.getElementsByClassName("lessons_rightSide_lessonDiv_lessons_sublesson");
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

        /* Temporary Code */
        const adaptiveQuestionAdderButton = document.getElementById("mainPage_contentDivHolder_rightDiv_unitLessonChooserDiv_addAdaptiveQuestions");
        adaptiveQuestionAdderButton.style.pointerEvents = "none";
        adaptiveQuestionAdderButton.style.backgroundColor = "#5abdea"

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

        const hiddenQuiz = document.getElementById("hiddenQuiz");
        const hiddenQuiz_mainScreen = document.getElementById("hiddenQuiz_mainScreen");
        const quizStartButton = document.getElementById("quizStartButton");
        const hiddenQuiz_mainScreen_gameScreen_startButton = document.getElementById("hiddenQuiz_mainScreen_gameScreen_startButton");
        const hiddenQuiz_mainScreen_gameScreen_description = document.getElementById("hiddenQuiz_mainScreen_gameScreen_description");
        const hiddenQuiz_mainScreen_gameScreen_title = document.getElementById("hiddenQuiz_mainScreen_gameScreen_title");
        const hiddenQuiz_mainScreen_gameScreen = document.getElementById("hiddenQuiz_mainScreen_gameScreen");
        const hiddenQuiz_title = document.getElementById("hiddenQuiz_title");
        const hiddenQuiz_restartButton = document.getElementById("hiddenQuiz_restartButton");
        const quizReturnButton = document.getElementById("hiddenQuiz_returnButton");
        let quizGameQuestionList = [];
        let quizChosenQuestion = null;
        let chosenQuestionData = null;

        quizReturnButton.addEventListener("click", () => {
            for (let QRB=0; QRB<quizGameDivTracker.length; QRB++) {
                quizGameDivTracker[QRB].remove();
            }    
            hiddenQuiz_mainScreen_gameScreen_description.style.display = "flex";
            hiddenQuiz_mainScreen_gameScreen_title.style.display = "flex";
            hiddenQuiz_mainScreen_gameScreen_startButton.style.display = "flex";
            hiddenQuiz_mainScreen_gameScreen.style.transform = "scaleY(115%)"
            hiddenQuiz_mainScreen_gameScreen.style.flexDirection = "column";
            hiddenQuiz_title.style.transform = "translateY(-100%)";
            mainPage.style.display = "flex";
            hiddenQuiz.style.display = "none";
            RQQInit = true;
        })

        hiddenQuiz_restartButton.addEventListener("click", () => {
            hiddenQuiz_mainScreen_gameScreen_description.style.display = "flex";
            hiddenQuiz_mainScreen_gameScreen_title.style.display = "flex";
            hiddenQuiz_mainScreen_gameScreen_startButton.style.display = "flex";
            hiddenQuiz_mainScreen_gameScreen.style.transform = "scaleY(115%)"
            hiddenQuiz_title.style.transform = "translateY(-100%)";
            for (let QRB=0; QRB<quizGameDivTracker.length; QRB++) {
                quizGameDivTracker[QRB].remove();
            }   
            hiddenQuiz_mainScreen_gameScreen.style.flexDirection = "column";
            RQQInit = true;
        })

        hiddenQuiz_mainScreen_gameScreen_startButton.addEventListener("click", () => {
            hiddenQuiz_mainScreen_gameScreen_description.style.display = "none";
            hiddenQuiz_mainScreen_gameScreen_title.style.display = "none";
            hiddenQuiz_mainScreen_gameScreen_startButton.style.display = "none";
            hiddenQuiz_mainScreen_gameScreen.style.transform = "scaleY(100%)"
            hiddenQuiz_title.style.transform = "translateY(0%)";
            dataAccessor(db, "TemporaryQuestionHolder", null, data => {
                quizGameQuestionList = JSON.parse(data).slice();
                chosenQuestionData = quizGameQuestionList[Math.floor(Math.random() * quizGameQuestionList.length)];
                quizChosenQuestion = keyMapParser(chosenQuestionData[0]).toString() + keyMapParser(chosenQuestionData[1]).toString();
                requestQuestionQuizFrame(quizChosenQuestion, "hiddenQuiz_mainScreen_gameScreen");
            })
        })
        quizStartButton.addEventListener("click", () => {
            mainPage.style.display = "none";
            hiddenQuiz.style.display = "flex";
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
                    dataAmender(db, "TemporaryQuestionHolder", [dropdownUnitSelector.value, dropdownLessonSelector.value], true, dropdownUnitSelector.value + dropdownLessonSelector.value);
                } else {
                    let temporaryAllUnits = Object.keys(dataMap[keyMapParser(dropdownUnitSelector.value)][2]);
                    console.log(temporaryAllUnits)
                    for (let DDUSAllUnits=0; DDUSAllUnits<temporaryAllUnits.length; DDUSAllUnits++) {
                        dataAmender(db, "TemporaryQuestionHolder", [dropdownUnitSelector.value, numberParser(temporaryAllUnits[DDUSAllUnits])], true, dropdownUnitSelector.value + numberParser(temporaryAllUnits[DDUSAllUnits]));
                    }
                }
                questionContainer = [];
                const dataOpener = db.transaction("TemporaryQuestionHolder", "readwrite").objectStore("TemporaryQuestionHolder");
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
                                    dataRemover(db, "TemporaryQuestionHolder", [childOfNewChild.parentElement.id]);
                                    
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
                                    if (questionContainer.length == 0) {
                                        const gameButton = document.getElementById("gameStartButton");
                                        const quizStartButton = document.getElementById("quizStartButton");
                                        gameButton.style.pointerEvents = "none";
                                        gameButton.style.opacity = ".7";
                                        quizStartButton.style.pointerEvents = "none";
                                        quizStartButton.style.opacity = ".7";
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
                if (questionContainer.length != 0) {
                    const gameButton = document.getElementById("gameStartButton");
                    const quizStartButton = document.getElementById("quizStartButton");
                    gameButton.style.pointerEvents = "auto";
                    gameButton.style.opacity = "1";
                    quizStartButton.style.pointerEvents = "auto";
                    quizStartButton.style.opacity = "1";
                    
                }
            }  
            
        })
    }
    if (window.location.pathname.split("/").pop() == "quiz_practice" || window.location.pathname.split("/").pop() == "quiz_practice.html" || window.location.pathname.split("/").pop() == "unit5_lesson2" || window.location.pathname.split("/").pop() == "unit5_lesson2.html" || window.location.pathname.split("/").pop() == "unit5_lesson1" || window.location.pathname.split("/").pop() == "unit5_lesson1.html" ||window.location.pathname.split("/").pop() == "unit4_lesson2" || window.location.pathname.split("/").pop() == "unit4_lesson2.html" ||window.location.pathname.split("/").pop() == "unit4_lesson1" || window.location.pathname.split("/").pop() == "unit4_lesson1.html" ||window.location.pathname.split("/").pop() == "unit3_lesson2" || window.location.pathname.split("/").pop() == "unit3_lesson2.html" ||window.location.pathname.split("/").pop() == "unit3_lesson1" || window.location.pathname.split("/").pop() == "unit3_lesson1.html" ||window.location.pathname.split("/").pop() == "unit2_lesson2" || window.location.pathname.split("/").pop() == "unit2_lesson2.html" ||window.location.pathname.split("/").pop() == "unit2_lesson1" || window.location.pathname.split("/").pop() == "unit2_lesson1.html" ||window.location.pathname.split("/").pop() == "unit1_lesson3" || window.location.pathname.split("/").pop() == "unit1_lesson3.html" ||window.location.pathname.split("/").pop() == "unit1_lesson2" || window.location.pathname.split("/").pop() == "unit1_lesson2.html" ||window.location.pathname.split("/").pop() == "unit1_lesson1" || window.location.pathname.split("/").pop() == "unit1_lesson1.html" ||window.location.pathname.split("/").pop() == "home" || window.location.pathname.split("/").pop() == "lessons" || window.location.pathname.split("/").pop() == "vocabulary" || window.location.pathname.split("/").pop() == "settings" || window.location.pathname.split("/").pop() == "practice" || window.location.pathname.split("/").pop() == "home.html" || window.location.pathname.split("/").pop() == "lessons.html" || window.location.pathname.split("/").pop() == "vocabulary.html" || window.location.pathname.split("/").pop() == "settings.html" || window.location.pathname.split("/").pop() == "practice.html") {
        if (window.location.pathname.split("/").pop() == "home.html" || window.location.pathname.split("/").pop() == "home") {
            const homePage_rightSide_lowerDiv_mainDiv_leftDiv_titleButton = document.getElementById("homePage_rightSide_lowerDiv_mainDiv_leftDiv_titleButton");
            const homePage_rightSide_lowerDiv_mainDiv_leftDiv_titleInformation = document.getElementById("homePage_rightSide_lowerDiv_mainDiv_leftDiv_titleInformation");
            const homePage_rightSide_lowerDiv_mainDiv_rightDiv_titleInformation = document.getElementById("homePage_rightSide_lowerDiv_mainDiv_rightDiv_titleInformation");
            const homePage_rightSide_lowerDiv_mainDiv_rightDiv_titleButton = document.getElementById("homePage_rightSide_lowerDiv_mainDiv_rightDiv_titleButton");
            homePage_rightSide_lowerDiv_mainDiv_rightDiv_titleButton.addEventListener("mouseenter", HPTBH => {
                homePage_rightSide_lowerDiv_mainDiv_rightDiv_titleInformation.style.display = "flex";
            });
            homePage_rightSide_lowerDiv_mainDiv_rightDiv_titleButton.addEventListener("mouseleave", HPTBH => {
                homePage_rightSide_lowerDiv_mainDiv_rightDiv_titleInformation.style.display = "none";
            });  
            homePage_rightSide_lowerDiv_mainDiv_leftDiv_titleButton.addEventListener("mouseenter", HPTBH => {
                homePage_rightSide_lowerDiv_mainDiv_leftDiv_titleInformation.style.display = "flex";
            });
            homePage_rightSide_lowerDiv_mainDiv_leftDiv_titleButton.addEventListener("mouseleave", HPTBH => {
                homePage_rightSide_lowerDiv_mainDiv_leftDiv_titleInformation.style.display = "none";
            });
            
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