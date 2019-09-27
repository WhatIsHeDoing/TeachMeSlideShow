/**
 * Rezizes images to a max width and compresses them.
 * These can then be copied to the `images` directory;
 * this script cannot do so, due to open files handles,
 * and there does not seem to be a good method using `create-react-app` 🤷‍
 */

const fs = require("fs")
const sharp = require("sharp")

const temp = "temp"
const path = "src/images"

fs.existsSync("temp") || fs.mkdirSync(temp)
console.log("Remember to copy these images to, err, `images` 😅")

fs
    .readdirSync(path)
    .filter(filename => filename.endsWith(".jpg") || filename.endsWith(".jpeg"))
    .forEach(filename => sharp(`${path}/${filename}`)
        .resize(1200)
        .jpeg({
            progressive: true,
            quality: 75
        })
        .toFile(`${temp}/${filename.replace(".jpeg", ".jpg")}`))
