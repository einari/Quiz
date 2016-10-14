import gulp from "gulp";
import config from "../config";
import runSequence from "run-sequence";
import "./html";
import "./javascript";
import "./less";
import "./staticContent";
import "./watch";
import "./server";

gulp.task("initialize", ["html", "javascript", "less", "staticContent"]);

gulp.task("printConfig", () => {
    console.log("**** Configuration ****")
    console.log(`Root folder : ${config.paths.rootDir}`)
    console.log(`Source folder : ${config.paths.sourceDir}`)
    console.log(`Outputting all files to : ${config.paths.outputDir}`)
    console.log("**** Configuration ****\n")
});

gulp.task("build", () => {
    runSequence("printConfig", "initialize");
});

gulp.task("default", () => {
    runSequence("build", ["server", "watch"]);
});



export default {
    get config() {
        return config;
    }
}
