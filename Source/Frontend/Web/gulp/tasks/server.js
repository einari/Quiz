import gulp from "gulp";
import server from "gulp-express";
import config from "../config";

gulp.task("server", () => {
    try {
        server.run([config.paths.serverApplicationEntryPoint])
    } catch(ex) {
        console.log(ex);
    }
});