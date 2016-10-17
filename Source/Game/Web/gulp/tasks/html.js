import gulp from "gulp";
import config from "../config";

import filelog from "gulp-filelog";


export function htmlPipeline(stream) {
    stream
        .pipe(filelog("html"))
        .pipe(gulp.dest(config.paths.outputDir));
    return stream;
}

gulp.task("html", () => {
    var stream = gulp.src(config.paths.html,{base:config.paths.applicationSourceDir});
    htmlPipeline(stream);
    return stream;
});