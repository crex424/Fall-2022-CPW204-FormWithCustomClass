class VideoGame{
    title:string;
    price:number;
    rating:string;
    isDigitalOnly:boolean;
}

window.onload = function() {
    let addBtn = 
        <HTMLElement>document.querySelector("input[type=button]");
    addBtn.onclick = addVideoGame;
}

function addVideoGame():void {
    if (isAllDataValid()) {
        let game = getVideoGame();
        displayGame(game);
    }
}

function getById(id:string) {
    return document.getElementById(id);
}

/**
 * This function will grab the game data out of the form
 * and connect it to their appropriate VideoGame object.
 * @returns game object
 */
function getVideoGame():VideoGame {
    let game = new VideoGame();
    // Populate with data from form
    let titleInput = <HTMLInputElement>getById("title");
    game.title = titleInput.value;

    let priceInput = <HTMLInputElement>getById("price");
    game.price = parseFloat(priceInput.value);

    let ratingInput = <HTMLSelectElement>getById("rating");
    game.rating = ratingInput.value;

    let digitalOnly = <HTMLInputElement>getById("online");
    game.isDigitalOnly = digitalOnly.checked; // if check is true then it will set isDigitalOnly to true

    return game;
}

/**
 * This function will display game data
 * @param myGame is the argument that contain the VideoGame object
 */
function displayGame(myGame:VideoGame):void {
    let displayDiv = getById("display");

    // create <h2> with game title
    let gameHeading = document.createElement("h2");
    gameHeading.innerText = myGame.title;

    // Create paragraph with game details
    let gameInfo = document.createElement("p");
    let gameMediumDisplay = "";
    if(myGame.isDigitalOnly) {
        gameMediumDisplay = "This is a digital only game.";
    }
    else {
        gameMediumDisplay = "You can come buy a physical copy!"
    }
    gameInfo.innerText =`${myGame.title} has a rating of ${myGame.rating}. 
        It costs $${myGame.price.toFixed(2)}. ${gameMediumDisplay}`;

    // Add <h2> in the <div id="display">
    displayDiv.appendChild(gameHeading);
    // add <p> game info
    displayDiv.appendChild(gameInfo);
}

/**
 * Will check data to see if it is valid.
 * if it is valid isValid will equal true, if not isValid will
 * equal false.
 * @returns isValid
 */
function isAllDataValid():boolean {
    let isValid = true;
    resetErrorMessages();
    if(!isTextPresent("title", "Title is required")  ) {
        isValid = false;
    }

    if(!isTextPresent("price", "Price is required") || !isNumber("price", "Please enter a integer")) {
        isValid = false;
    }

    if (!isOptionSelected("rating", "You must select a rating")) {
        isValid = false;
    }

    return isValid;
}

/**
 * Resets all the spans back to default text
 */
function resetErrorMessages():void {
    let allSpans = document.querySelectorAll("Form > span");
    for (let i = 0; i < allSpans.length; i++) {
        let currSpan = <HTMLElement>allSpans[i];
        if (currSpan.hasAttribute("data-required")) {
            currSpan.innerText = "*";
        }
        else {
            currSpan.innerText = "";
        }
    }
}

/**
 * @param id The id of the <input type = "text"> to validate
 * @param errMsg The message to display in the sibling span of the 
 * text box
 * @returns true if the text box with the given id
 * has some text inside it, false if there is no text
 */
function isTextPresent(id:string, errMsg:string):boolean {
    let textBox = 
        <HTMLInputElement>getById(id);
    let txtBoxValue = textBox.value;

    if (txtBoxValue == "") {
        let errSpan =
            <HTMLElement>textBox.nextElementSibling;
        errSpan.innerText = errMsg;
        return false;
    }
    return true;
}

/**
 * @param id The id of the <input type = "text"> to validate
 * @param errMsg The message to display in the sibling span of the 
 * text box
 * @returns true if optionSelect is not the default option, false if it is
 */
function isOptionSelected(id:string, errMsg:string):boolean {
    let optionSelect = 
        <HTMLOptionElement>getById(id);
    let rating = optionSelect.value;

    if (rating == "") {
        let errSpan =
            <HTMLElement>optionSelect.nextElementSibling;
        errSpan.innerText = errMsg;
        return false;
    }
    return true;
}

/**
 * This function will check if a textBoxValue is a integer
 * @param id The id of the <input type = "text"> to validate
 * @param errMsg The message to display in the sibling span of the 
 * text box
 * @returns true if textBox is a integer, false if it isn't an integer
 */
function isNumber(id:string, errMsg:string):boolean {
    let textBox = 
        <HTMLInputElement>getById(id);
    let txtBoxValue = (textBox.value);

    if (isNaN(parseFloat(txtBoxValue))) {
        let errSpan =
            <HTMLElement>textBox.nextElementSibling;
        errSpan.innerText = errMsg;
        return false;
    }
    return true;
}