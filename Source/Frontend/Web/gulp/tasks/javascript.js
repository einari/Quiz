import gulp from "gulp";
import gulp_jspm from "gulp-jspm";
import util from "gulp-util";
import sourcemaps from "gulp-sourcemaps";
import rename from "gulp-rename";
import concat from "gulp-concat";
import config from "../config";
import path from "path";

import rjs from "gulp-requirejs";

import babel from "gulp-babel";

import pkg from "../../package.json";

import filelog from "gulp-filelog";

export function javaScriptPipeline(stream)
{
    let root = path.resolve("./");

    stream
        .pipe(filelog("javascript"))
        .pipe(sourcemaps.init())

        .pipe(babel({
            presets: ["es2015"],
            //sourceMaps: true,
            //sourceRoot: "../"
            //sourceMaps: "inline"
        }))
        .on("error", (error) => {
            console.error("**** Babel compile error ****");
            console.log(error.fileName);
            console.log(error.message);
            console.log(error.codeFrame);
        })
        
        .pipe(sourcemaps.write(".", {
            sourceRoot: "../"
        }))
        .pipe(gulp.dest(config.paths.outputDir));
    
    return stream;
}

gulp.task("javascript", () => 
{
    var stream = gulp.src(config.paths.javascript,{base:config.paths.applicationSourceDir});
    javaScriptPipeline(stream);
    return stream;
});
