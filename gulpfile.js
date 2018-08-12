const gulp = require("gulp")
const browserSync = require("browser-sync").create()
const imageminMozjpeg = require("imagemin-mozjpeg")
const rimraf = require("rimraf")

const configs = {
    cssnano: require("./config/cssnano.json"),
    htmlmin: require("./config/htmlmin.json")
}

// Import all gulp plugins as a single object.
const plugins = require("gulp-load-plugins")()

const paths = {
    css: "*.css",
    dist: "dist/",
    fonts: "*.otf",
    html: "*.html",
    img: "img/",
    js: "index.js",
    videos: "video/"
}

const tasks = {
    css: "css",
    clean: "clean",
    default: "default",
    fonts: "fonts",
    help: "help",
    html: "html",
    images: "images",
    js: "js",
    serve: "serve",
    video: "video"
}

gulp.task(tasks.clean, () => rimraf(paths.dist, [], () => "Distribution cleaned!"))

gulp.task(tasks.serve, () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })

    gulp
        .watch([paths.css, paths.html, paths.img, paths.js])
        .on("change", browserSync.reload)
})

gulp.task(
    tasks.default,
    [
        tasks.css,
        tasks.fonts,
        tasks.html,
        tasks.images,
        tasks.js,
        tasks.video
    ])

gulp.task(tasks.images, () => {
    const dest = paths.dist + "img"

    gulp
        .src(["img/*.gif", "img/*.png"])
        .pipe(gulp.dest(dest))

    return gulp
        .src("img/*.jpg")
        .pipe(plugins.responsive({
            "*.*": [
                {
                    quality: 75,
                    width: 1200
                }
            ]
        }, {
            progressive: true,
            withMetadata: false,
            withoutEnlargement: false
        }))
        .pipe(plugins.imagemin({
            progressive: true,
            use: [
                imageminMozjpeg()
            ]
        }))
        .pipe(gulp.dest(dest))
});

gulp.task(tasks.fonts, () => gulp
    .src(paths.fonts)
    .pipe(gulp.dest(paths.dist)))

gulp.task(tasks.html, () => gulp
    .src(paths.html)
    .pipe(plugins.htmlmin(configs.htmlmin))
    .pipe(gulp.dest(paths.dist)))

gulp.task(tasks.css, () => gulp
    .src(paths.css)
    .pipe(plugins.cssnano(configs.cssnano))
    .pipe(gulp.dest(paths.dist)))

gulp.task(tasks.help, () => plugins.taskListing());

gulp.task(tasks.js, () => gulp
    .src(paths.js)
    .pipe(plugins.uglify())
    .pipe(gulp.dest(paths.dist)))

gulp.task(tasks.video, () => gulp
    .src(paths.videos)
    .pipe(gulp.dest(paths.dist)))
