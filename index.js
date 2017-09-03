function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomArrayElement(arr) {
    return arr[randomNumberBetween(0, arr.length - 1)];
}

function isRandomTrue() {
    return Math.random() >= 0.5;
}

var imageSelector = "data-background-image-random";
var videoSelector = "data-background-video";

function selectRandomBackground() {
    document
        .querySelectorAll("[" + imageSelector + "]")
        .forEach(function(element) {
            // Randomly use the video if one is available.
            if (isRandomTrue() && element.getAttribute(videoSelector)) {
                element.removeAttribute(imageSelector);
                return;                    
            }

            element.removeAttribute(videoSelector);

            element.setAttribute(
                "data-background-image",
                randomArrayElement(element.getAttribute(imageSelector).split(",")));
        });
}

selectRandomBackground();

Reveal.initialize({
    loop: true,
    mouseWheel: true,
    viewDistance: 2
});
