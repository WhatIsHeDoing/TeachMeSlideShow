const dataBase = "data-background"
const imgBase = "img/"
const defaultImageType = ".jpg"

const randomImageSelector = `${dataBase}-image-random`
const videoSelector = `${dataBase}-video`

/**
 * Creates a random whole number between a range of numbers.
 * @param {number} min Minimum value
 * @param {number} max Maximum value
 * @returns {number} Random number
 */
const randomNumberBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min)

/**
 * Selects a random array element.
 * @param {Array.<Object>} arr Array to traverse
 * @returns {Object} Element selected
 */
const randomArrayElement = arr =>
    arr[randomNumberBetween(0, arr.length - 1)]

/**
 * Returns a true or false to randomly switch functionality.
 * @returns {boolean}
 */
const isRandomTrue = () => Math.random() >= 0.5

/**
 * Ensures an image path is set with our default if none specified.
 * @param {string} img To test
 * @returns {string} Enforced image path
 */
const ensureImagePathSet = img => img.startsWith(imgBase) ? img : imgBase + img

/**
 * Ensures an image type is set with our default if none specified.
 * @param {string} img To test
 * @returns {string} Enforced image type
 */
const ensureImageTypeSet = img => img.split(".").length > 1 ? img : img + defaultImageType

const selectRandomBackground = () => document
    .querySelectorAll(`[${randomImageSelector}]`)
    .forEach(function(element) {
        // Randomly use the video if one is available.
        if (isRandomTrue() && element.getAttribute(videoSelector)) {
            element.removeAttribute(randomImageSelector)
            return
        }

        // No need for the video attribute.
        element.removeAttribute(videoSelector)

        // Select and apply a random image.
        const randomImage = ensureImagePathSet(
            ensureImageTypeSet(
                randomArrayElement(element.getAttribute(randomImageSelector).split(","))))

        element.setAttribute(`${dataBase}-image`, randomImage)
    })

selectRandomBackground()

Reveal.initialize({
    controls: true,
    help: true,
    hideAddressBar: true,
    history: true,
    loop: true,
    mouseWheel: true,
    overview: true,
    progress: true,
    touch: true,
    viewDistance: 2
})

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
}
