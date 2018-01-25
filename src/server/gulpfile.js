const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

const serverBuildPath = "../../built/server";

gulp.task("copy-env", () => {
    return gulp.src("**/.env").pipe(gulp.dest(serverBuildPath));
});

gulp.task("copy-api-config", () => {
    return gulp.src("**/*.json").pipe(gulp.dest(serverBuildPath));
});

gulp.task("build-server", () => {
    return tsProject
        .src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(serverBuildPath));
});

gulp.task("default", ["copy-env", "copy-api-config", "build-server"]);
