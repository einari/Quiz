import gulp from "gulp";
import config from "../config";
import util from "gulp-util";
import less from "gulp-less";

import filelog from "gulp-filelog";


export function lessPipeline(stream) {
    stream
        .pipe(filelog("less"))
        .pipe(less())
        .on("error", util.log)
        .pipe(gulp.dest(config.paths.outputDir));
    return stream;
}

gulp.task("less", () => {
    var stream = gulp.src(config.paths.less,{base:config.paths.applicationSourceDir});
    lessPipeline(stream);
    return stream;
});
