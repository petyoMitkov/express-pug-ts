const gulp = require("gulp");
const ts = require("gulp-typescript");

gulp.task("build", () => {
    gulp.src("./server.ts")
        .pipe(ts())
        .pipe(gulp.dest("/build"));
});