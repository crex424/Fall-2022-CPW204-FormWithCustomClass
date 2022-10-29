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

function addVideoGame() {
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

    //TODO: return game
    return game;
}




function displayGame(myGame:VideoGame):void {
    //TODO: Display video game below form
}


function isAllDataValid():boolean {
    return true;
}