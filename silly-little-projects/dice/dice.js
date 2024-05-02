function makeDot(top, left) {
    $('<div>')
        .css("height", 15)
        .css("width", 15)
        .css("background-color", "rgb(8,8,8)")
        .css("position", "absolute")
        .css("border-radius", "8px")
        .css('top', top - 7.5)
        .css('left', left - 7.5)
        .appendTo("#die");
}


function rollDie(dieID) {
    $('#die').empty();

    var randomNum = Math.ceil(Math.random() * 6);

    if (randomNum === 1) {
        makeDot(50, 50, dieID); // middle middle
    }
    else if (randomNum === 2) {
        makeDot(25, 25, dieID); // top left
        makeDot(75, 75, dieID); // bottom right
    }
    else if (randomNum === 3) {
        makeDot(25, 25, dieID); // top left
        makeDot(75, 75, dieID); // bottom right
        makeDot(50, 50, dieID); // middle middle
    }
    else if (randomNum === 4) {
        makeDot(75, 75, dieID); // bottom right
        makeDot(25, 25, dieID); // top left
        makeDot(25, 75, dieID); // bottom left
        makeDot(75, 25, dieID); // top right
    }
    else if (randomNum === 5) {
        makeDot(50, 50, dieID); // middle middle
        makeDot(75, 75, dieID); // bottom right
        makeDot(25, 25, dieID); // top left
        makeDot(25, 75, dieID); // bottom left
        makeDot(75, 25, dieID); // top right
    }
    else if (randomNum === 6) {
        makeDot(25, 25, dieID); // top left
        makeDot(50, 25, dieID); // middle left
        makeDot(25, 75, dieID); // bottom left
        makeDot(75, 25, dieID); // top right
        makeDot(50, 75, dieID); // middle right
        makeDot(75, 75, dieID); // bottom right
    }
}

$("#die").on("click", rollDie);