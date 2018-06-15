const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const imageminMozjpeg = require("imagemin-mozjpeg");

const configs = {
    cssnano: require("./config/cssnano.json"),
    htmlmin: require("./config/htmlmin.json")
};

// Import all gulp plugins as a single object.
const plugins = require("gulp-load-plugins")();

const paths = {
    css: "*.css",
    dist: "dist/",
    html: "*.html",
    img: "img/",
    js: "index.js"
};

const tasks = {
    css: "css",
    default: "default",
    html: "html",
    images: "images",
    js: "js",
    serve: "serve"
};

gulp.task(tasks.serve, () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp
        .watch([paths.css, paths.html, paths.img, paths.js])
        .on("change", browserSync.reload);
});

gulp.task(
    tasks.default,
    [
        tasks.css,
        tasks.html,
        tasks.images,
        tasks.js
    ]);

gulp.task(tasks.images, () => {
    const dest = paths.dist + "img";

    gulp
        .src(["img/*.gif", "img/*.png"])
        .pipe(gulp.dest(dest));

    return gulp
        .src("img/*.jpg")
        .pipe(plugins.responsive({
            "*.*": [
                {
                    quality: 80,
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
        .pipe(gulp.dest(dest));
});

gulp.task(tasks.html, () => gulp
    .src(paths.html)
    .pipe(plugins.htmlmin(configs.htmlmin))
    .pipe(gulp.dest(paths.dist)));

gulp.task(tasks.css, () => gulp
    .src(paths.css)
    .pipe(plugins.cssnano(configs.cssnano))
    .pipe(gulp.dest(paths.dist)));

gulp.task(tasks.js, () => gulp
    .src(paths.js)
    .pipe(plugins.uglify())
    .pipe(gulp.dest(paths.dist)));
