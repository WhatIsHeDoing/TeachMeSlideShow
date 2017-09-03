function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomArrayElement(arr) {
    return arr[randomNumberBetween(0, arr.length - 1)];
}

function selectRandomBackground() {
    var selector = "data-background-image-random";

    document
        .querySelectorAll("[" + selector + "]")
        .forEach(function(element) {
            element.setAttribute(
                "data-background-image",
                randomArrayElement(element.getAttribute(selector).split(",")));
        });
}

selectRandomBackground();

Reveal.initialize({
    loop: true,
    mouseWheel: true,
    viewDistance: 2
});
