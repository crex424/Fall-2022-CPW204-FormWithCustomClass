var VideoGame = (function () {
    function VideoGame() {
    }
    return VideoGame;
}());
window.onload = function () {
    var addBtn = document.querySelector("input[type=button]");
    addBtn.onclick = addVideoGame;
};
function addVideoGame() {
    if (isAllDataValid()) {
        var game = getVideoGame();
        displayGame(game);
    }
}
function getById(id) {
    return document.getElementById(id);
}
function getVideoGame() {
    var game = new VideoGame();
    var titleInput = getById("title");
    game.title = titleInput.value;
    var priceInput = getById("price");
    game.price = parseFloat(priceInput.value);
    var ratingInput = getById("rating");
    game.rating = ratingInput.value;
    var digitalOnly = getById("online");
    game.isDigitalOnly = digitalOnly.checked;
    return game;
}
function displayGame(myGame) {
    var displayDiv = getById("display");
    var gameHeading = document.createElement("h2");
    gameHeading.innerText = myGame.title;
    var gameInfo = document.createElement("p");
    var gameMediumDisplay = "";
    if (myGame.isDigitalOnly) {
        gameMediumDisplay = "This is a digital only game.";
    }
    else {
        gameMediumDisplay = "You can come buy a physical copy!";
    }
    gameInfo.innerText = "".concat(myGame.title, " has a rating of ").concat(myGame.rating, ". \n        It costs $").concat(myGame.price.toFixed(2), ". ").concat(gameMediumDisplay);
    displayDiv.appendChild(gameHeading);
    displayDiv.appendChild(gameInfo);
}
function isAllDataValid() {
    var isValid = true;
    resetErrorMessages();
    if (!isTextPresent("title", "Title is required")) {
        isValid = false;
    }
    if (!isTextPresent("price", "Price is required") || !isNumber("price", "Please enter a integer")) {
        isValid = false;
    }
    if (!isOptionSelected("rating", "You must select a rating")) {
        isValid = false;
    }
    return isValid;
}
function resetErrorMessages() {
    var allSpans = document.querySelectorAll("Form > span");
    for (var i = 0; i < allSpans.length; i++) {
        var currSpan = allSpans[i];
        if (currSpan.hasAttribute("data-required")) {
            currSpan.innerText = "*";
        }
        else {
            currSpan.innerText = "";
        }
    }
}
function isTextPresent(id, errMsg) {
    var textBox = getById(id);
    var txtBoxValue = textBox.value;
    if (txtBoxValue == "") {
        var errSpan = textBox.nextElementSibling;
        errSpan.innerText = errMsg;
        return false;
    }
    return true;
}
function isOptionSelected(id, errMsg) {
    var optionSelect = getById(id);
    var rating = optionSelect.value;
    if (rating == "") {
        var errSpan = optionSelect.nextElementSibling;
        errSpan.innerText = errMsg;
        return false;
    }
    return true;
}
function isNumber(id, errMsg) {
    var textBox = getById(id);
    var txtBoxValue = (textBox.value);
    if (isNaN(parseFloat(txtBoxValue))) {
        var errSpan = textBox.nextElementSibling;
        errSpan.innerText = errMsg;
        return false;
    }
    return true;
}
