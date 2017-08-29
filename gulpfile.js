const gulp = require("gulp");
const browserSync = require("browser-sync").create();

gulp.task("default", () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp
        .watch(["*.css", "*.html", "*.js"])
        .on("change", browserSync.reload);
});
