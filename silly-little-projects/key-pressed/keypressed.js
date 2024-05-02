const KEY = {
    "ENTER": 13,
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40,
}

$(document).on('keydown', handleKeyDown);
$(document).on('keyup', handleKeyUp);

function handleKeyDown(event) {
    if (event.which === KEY.ENTER) {
        $("p").text("enter pressed");
    }
    else if (event.which === KEY.LEFT) {
        $("p").text("left pressed");
    }
    else if (event.which === KEY.UP) {
        $("p").text("up pressed");
    }
    else if (event.which === KEY.RIGHT) {
        $("p").text("right pressed");
    }
    else if (event.which === KEY.DOWN) {
        $("p").text("down pressed");
    }
}

function handleKeyUp(event) {
    if (event.which === KEY.ENTER) {
        $("p").text("enter released");
    }
    else if (event.which === KEY.LEFT) {
        $("p").text("left released");
    }
    else if (event.which === KEY.UP) {
        $("p").text("up released");
    }
    else if (event.which === KEY.RIGHT) {
        $("p").text("right released");
    }
    else if (event.which === KEY.DOWN) {
        $("p").text("down released");
    }
}