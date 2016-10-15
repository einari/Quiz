import gulp from "gulp";
import server from "gulp-express";
import config from "../config";

gulp.task("server", () => {
    server.run([config.paths.serverApplicationEntryPoint])
});