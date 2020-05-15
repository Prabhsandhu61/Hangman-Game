"use strict";
console.log('javascript started');
var currentlife = 0; // current life
var q = 0; // current Question no;
var score = 0; // score. increases by one
var livesRemaining = 10;
var context;
var selectdQuestion; // array hold the current question + answer;   selectdQuestion[0] is question and  selectdQuestion[1] contains answer
var wordList = [
    ["One who is not sure about God's existence", "Agnostic"],
    ["A person who deliberately sets fire to a building", "Arsonist"],
    ["One who does a thing for pleasure and not as a profession", "Amateur"],
    ["One who can use either hand with ease", "Ambidextrous"],
    ["One who makes an official examination of accounts", "Auditor"],
    ["A person who believes in or tries to bring about a state of lawlessness", "Anarchist"],
    ["A person who has changed his faith", "Apostate"],
    ["One who does not believe in the existence of God", "Atheist"],
    ["A person appointed by two parties to solve a dispute", "Arbitrator"],
    ["One who leads an austere life", "Ascetic"],
    ["One who does a thing for pleasure and not as a profession", "Amateur"],
    ["One who can either hand with ease", "Ambidextrous"],
    ["An unconventional style of living", "Bohemian"],
    ["One who is bad in spellings", "Cacographer"],
    ["One who feeds on human flesh", "Cannibal"],
    ["A person who is blindly devoted to an idea/ A person displaying aggressive or exaggerated patriotism", "Chauvinist"],
    ["A critical judge of any art and craft", "Connoisseur"],
    ["Persons living at the same time", "Contemporaries"],
    ["One who is recovering health after illness", "Convalescent"],
    ["A girl/woman who flirts with man", "Coquette"],
    ["A person who regards the whole world as his country", "Cosmopolitan"],
    ["One who is a centre of attraction", "Cynosure"],
    ["One who sneers at the beliefs of others", "Cynic"],
    ["A leader or orator who espoused the cause of the common people", "Demagogue"],
    ["A person having a sophisticated charm", "Debonair"],
    ["A leader who sways his followers by his oratory", "Demagogue"],
    ["A dabbler (not serious) in art, science and literature", "Dilettante"],
    ["One who is for pleasure of eating and drinking", "Epicure"],
    ["One who often talks of his achievements", "Egotist"],
    ["Someone who leaves one country to settle in another", "Emigrant"],

];
console.log(wordList);
var pressedKeys = [];

function renderABCKeys() {
    var abcstring = 'abcdefghijklmnopqrstuvwxyz';
    var htm = '';
    for (var i = 0; i < abcstring.length; i++) {
        htm += "<input type='text' minlength='1' class='keys'  onclick='onclickbtn(this)' readonly value='" + abcstring[i].toUpperCase() + "' id='" + abcstring[i].toUpperCase() + "' >";
    }

    document.getElementById('inputkeys').innerHTML = htm;
}
// draw canvas
var canvas = function () {

    var myhungman = document.getElementById("hungman");
    var context = myhungman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#f00";
    context.lineWidth = 2;
};
// reset the canvas
function clearcanvas() {
    var myhungman = document.getElementById("hungman");
    var context = myhungman.getContext('2d');
    context.clearRect(0, 0, myhungman.width, myhungman.height);
    canvas();
};

// draw head in canvas
var head = function () {
    var myhungman = document.getElementById("hungman");
    var context = myhungman.getContext('2d');
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI * 2, true);
    context.stroke();
}
// draw lines in canvas
var draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {
    var myhungman = document.getElementById("hungman");
    var context = myhungman.getContext('2d');
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
}

var frame1 = function () {
    draw(0, 150, 150, 150);
};

var frame2 = function () {
    draw(10, 0, 10, 600);
};

var frame3 = function () {
    draw(0, 5, 70, 5);
};

var frame4 = function () {
    draw(60, 5, 60, 15);
};

var torso = function () {
    draw(60, 36, 60, 70);
};

var rightArm = function () {
    draw(60, 46, 100, 50);
};

var leftArm = function () {
    draw(60, 46, 20, 50);
};

var rightLeg = function () {
    draw(60, 70, 100, 100);
};

var leftLeg = function () {
    draw(60, 70, 20, 100);
};

var drawArray = [frame1, frame2, frame3, frame4, head, torso, leftArm, rightArm, rightLeg, leftLeg];
// enter value through keypad
function keypressed(e, ele) {

    e.preventDefault();

    if (e.keyCode >= 65 && e.keyCode <= 90 && livesRemaining > 0 && pressedKeys.indexOf(e.key.toUpperCase()) < 0) {
        var keyval = e.key.toUpperCase();
        pressedKeys.push(keyval);
        var gInputs = document.getElementsByName('ganswer');
        var isFound = false;
        var currentValue = ''
        for (var i = 0; i < selectdQuestion[1].length; i++) {
            if (selectdQuestion[1][i].toUpperCase() == keyval) {
                isFound = true;
                gInputs[i].value = keyval;
            }
            currentValue += gInputs[i].value;
        }
        if (!isFound) {
            // wrong key pressed 
            gameOverMsg();  // render the msg according to Lives remaing;
            livesRemaining--;
            drawArray[currentlife]();  // Drawing the body parts;  
            currentlife++;
            document.getElementById(keyval).style.background = "red";
        } else {
            document.getElementById(keyval).style.background = "green";
        }

        /// if answer match the actual one;
        if (currentValue.toUpperCase() == selectdQuestion[1].toUpperCase()) {
            q++;
            renderQuestion();
            score++;
        }
        renderVals();
    }

}
// enter value by click on alphabet
function onclickbtn(ele) {

    if (livesRemaining > 0 && pressedKeys.indexOf(ele.value.toUpperCase()) < 0) {
        var keyval = ele.value.toUpperCase();
        pressedKeys.push(keyval);
        var gInputs = document.getElementsByName('ganswer');
        console.log(gInputs);

        var isFound = false;
        var currentValue = ''
        for (var i = 0; i < selectdQuestion[1].length; i++) {

            if (selectdQuestion[1][i].toUpperCase() == keyval) {
                isFound = true;
                gInputs[i].value = keyval;
                console.log(gInputs[i].value, 'is matched');
            }
            currentValue += gInputs[i].value;
        }

        if (!isFound) {
            // wrong key pressed 
            gameOverMsg();  // render the msg according to Lives remaing;
            livesRemaining--;
            drawArray[currentlife]();  // Drawing the body parts;  
            currentlife++;
            document.getElementById(keyval).style.background = "red";

        } else {
            document.getElementById(keyval).style.background = "green";
        }
        /// if answer match the actual one;
        if (currentValue.toUpperCase() == selectdQuestion[1].toUpperCase()) {
            q++;
            renderQuestion();
            score++;
        }
        renderVals();
    }
}

function renderVals() {
    document.getElementById('score').innerHTML = score;
    document.getElementById('liveremaning').innerHTML = livesRemaining;
}

function gameOverMsg() {
    switch (livesRemaining) {
        case 1:
            document.getElementById('msg').innerHTML = "Game Over. To Restart Click on restart Button.";
            break;
        case 2:
            document.getElementById('msg').innerHTML = "Oh man, you will kill me";
            break;
        case 3:
            document.getElementById('msg').innerHTML = "Mind the keys bro.";
            break;
        case 4:
            document.getElementById('msg').innerHTML = "Are you okay? i am gonna die.";
            break;
        case 5:
            document.getElementById('msg').innerHTML = "Save me man!";
            break;
        case 6:
            document.getElementById('msg').innerHTML = "You can save me";
            break;
        case 7:
            document.getElementById('msg').innerHTML = "hey hey hey";
            break;
        case 8:
            document.getElementById('msg').innerHTML = "bro.. don't do it";
            break;
        case 9:
            document.getElementById('msg').innerHTML = "you can do it";
            break;
        case 10:
            document.getElementById('msg').innerHTML = "its all right.";
            break;
    }
}

// render question
function renderQuestion() {
    selectdQuestion = wordList[q];
    pressedKeys = [];
    document.getElementById('hintId').innerHTML = selectdQuestion[0];
    var iHtml = '';
    for (var i = 0; i < selectdQuestion[1].length; i++) {
        iHtml += '<input type="text" minlength="1" name="ganswer"  >';
    }
    document.getElementById('ginput').innerHTML = iHtml;
    var keyButtonsArray = document.getElementsByClassName('keys');
    for (i = 0; i < keyButtonsArray.length; i++) {
        keyButtonsArray[i].style.background = "white";
    }
}

// reset game
function resetGame() {
    console.log('resetGame function called');
    q = 0;
    score = 0;
    currentlife = 0;
    livesRemaining = 10;
    renderQuestion();
    renderVals();
    document.getElementById('msg').innerHTML = "";
    clearcanvas();
    pressedKeys = [];
}

canvas();
renderABCKeys();
renderQuestion();
