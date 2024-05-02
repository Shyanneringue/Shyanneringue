
$("button").on("click", toggleSecret);

function toggleSecret() {
    if (Math.random() > 0.5) {
        $('#result').text('heads');
    }
    else {
        $('#result').text('tails');
    }
}
