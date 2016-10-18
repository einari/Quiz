import gulp from "gulp";
import path from "path";
import util from "gulp-util";
import config from "../config";
import server from "gulp-express";

import {javaScriptPipeline} from "./javascript";
import {htmlPipeline} from "./html";
import {lessPipeline} from "./less";
import {staticContentPipeline} from "./staticContent";

import chokidar from "chokidar";

import multimatch from "multimatch";

import gulpExpress from "gulp-express";

function handleFile(file, globs, pipeline, cb, postAction) {
    var result = multimatch(file, globs);
    if (result.length == 0) return;

    util.log(
        util.colors.green('File ' + file + ': ') +
        util.colors.magenta(path.basename(file))
    );

    try {
        var stream = gulp.src(file, {base:config.paths.applicationSourceDir});
        pipeline(stream, cb);

        postAction();
    } catch (ex) {
        util.log(ex);
    }
}

let watchTask = (cb) => {
    console.log(`Start Watching folder ´${config.paths.applicationSourceDir}´`);

    let watcher = chokidar.watch(`${config.paths.applicationSourceDir}/.`, {
        persistent: true,
        ignored: `${config.paths.outputDir}/**/*`,
        ignoreInitial: true,
        awaitWriteFinish: {
            stabilityThreshold: 200,
            pollInterval: 100
        }
    });

    let fileHandling = (file) => {
        handleFile(file, config.paths.html, htmlPipeline, cb, gulpExpress.notify);
        handleFile(file, config.paths.less, lessPipeline, cb, gulpExpress.notify);
        handleFile(file, config.paths.content, staticContentPipeline, cb, () => gulpExpress.notify);
        handleFile(file, config.paths.javascript, javaScriptPipeline, cb, () => {
            var result = multimatch(file, [`${config.paths.applicationServerSourceDir}/**/*`]);
            if (result.length == 0) return;
            gulpExpress.run();
        });
    };

    watcher
        .on("change", fileHandling)
        .on("add", fileHandling)
        .on("unlink", (file) => {
            // delete
        });
};

gulp.task("watch-noserve", cb => {
    serve = false;
    watchTask(cb);
});

gulp.task("watch", watchTask);