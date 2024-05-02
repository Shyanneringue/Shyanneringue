$(document).on("mousemove", handleEvent);

function handleEvent() {
    $("p").text(event.pageX + ", " + event.pageY);
    $("p").css("left", event.pageX);
    $("p").css("top", event.pageY);
};