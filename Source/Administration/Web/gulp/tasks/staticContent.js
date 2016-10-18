import gulp from "gulp";
import config from "../config";

import filelog from "gulp-filelog";

export function staticContentPipeline(stream) {
    stream
        .pipe(filelog("staticContent"))
        .pipe(gulp.dest(config.paths.outputDir));
    return stream;
}

gulp.task("staticContent", () => {
    var stream = gulp.src(config.paths.content,{base:config.paths.applicationSourceDir});
    staticContentPipeline(stream);
    return stream;
});
