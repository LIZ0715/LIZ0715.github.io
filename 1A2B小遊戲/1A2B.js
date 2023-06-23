//取DOM元素
let guessInput = document.querySelector("input");
let submitButton = document.querySelector(".submit");
let startButton = document.querySelector(".start");
let resetButton = document.querySelector(".reset");
let answerButton = document.querySelector(".answer");
let historyRecord = document.querySelector(".record-board");

window.onload = function () {
    alert("請按遊戲開始按鈕")
    resetButton.disabled=true;
    answerButton.disabled=true;
    submitButton.disabled=true;
}

//產生4個不重複的亂數
let ans = "";//宣告一個空字串拿來放ans
function generateAnswer() {
    while (ans.length < 4) {
        let ran = Math.floor(Math.random() * (9 - 0) + 0);
        if (!ans.includes(ran)) {
            ans += ran;
        }
    } return ans;
}

//reset button
resetButton.addEventListener("click", initial);
function initial() {
    startButton.disabled = false;
    resetButton.disabled = true;
    historyRecord.innerHTML = "";
    let guessResult = [];
    let inputList = [];
    alert(`記得按下遊戲開始按鈕歐`)
}

//start-game button
startButton.addEventListener("click", startGame);
function startGame() {
    generateAnswer();
    alert(`遊戲開始成功`)
    startButton.disabled = true;
    
    resetButton.disabled=false;
    answerButton.disabled=false;
    submitButton.disabled=false;
}

//submit button
submitButton.addEventListener("click", result);
let guessResult = [];
let inputList = [];

function result() {
    let userInput = guessInput.value;

    //防呆機制
    if (userInput.length === 4 && !isNaN(userInput)&& !hasDuplicate(userInput)) {
        inputList.push(userInput);
    }
    else{
        alert(`請輸入正確數字`);
        guessInput.value = "";
        return;
    }

    let A = 0;
    let B = 0;
    for (let index = 0; index < userInput.length; index++) {
        if (userInput[index] === ans[index]) {
            A++;
        } else if (ans.includes(userInput[index])) {
            B++;
        }
    }
    guessResult.push(`${A}A${B}B`);

    //顯示在history-record上
    for (let i = guessResult.length - 1; i < guessResult.length; i++) {
        for (let j = inputList.length - 1; j < inputList.length; j++) {
            historyRecord.innerHTML += "<br>" + inputList[j] + " " + guessResult[i] + "<br>";
        }
    }

    if (A === 4) {
        alert(`猜對拉!`);
    }

    guessInput.value = "";



}

//判斷使用者輸入的4個數字是否有重複
function hasDuplicate(input) {
    for (let k = 0; k < input.length; k++) {
        for(let m=k+1;m<input.length;m++){
            if(input[k]===input[m]){
                return true;
            }
        }
    }
    return false;

}


//看答案的button
answerButton.addEventListener("click", lookAnswer);
function lookAnswer() {
    alert(`答案是${generateAnswer()}`);
}

