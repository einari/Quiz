let rootDir = process.cwd();
let outputDir = `${rootDir}/Distribution`;
let sourceDir = `${rootDir}/Source`;

const _rootDir = new WeakMap();
const _outputDir = new WeakMap();
const _sourceDir = new WeakMap();
const _dotnetProcessString = new WeakMap();

class config {
    constructor() {
        this.paths = new paths(this);
    }
}

class paths {
    constructor(config) {
        this.config = config;
    }


    get html() {
        return [
            `${this.applicationSourceDir}/**/*.html`,
        ]
    }

    get javascript() {
        return [
            `${this.applicationSourceDir}/**/*.js`
        ]
    }

    get less() {
        return [
            `${this.rootDir}/App/**/*.less`,
        ];
    }

    get content() {
        return [
            `${this.rootDir}/jspm_packages/**/*`,
            `${this.rootDir}/jspm_packages/system.js`,
            `${this.rootDir}/jspm_packages/system.js.map`,
            `${this.rootDir}/jspm_packages/system.src.js`,
            `${this.rootDir}/jspm_packages/system-polyfills.js`,
            `${this.rootDir}/jspm_packages/system-polyfills.js.map`,
            `${this.rootDir}/jspm_packages/system-polyfills.src.js`,
            `${this.rootDir}/Scripts/**/*`,
            `${this.sourceDir}/jspm.config.js`,
            `${this.sourceDir}/**/*.jpg`,
            `${this.sourceDir}/**/*.jpeg`,
            `${this.sourceDir}/**/*.gif`,
            `${this.sourceDir}/**/*.png`,
            `${this.sourceDir}/fonts/**/*`,
            `!${this.rootDir}/node_modules/**/*`,
            `!${this.outputDir}/**/*`
        ]
    }

    get applicationSourceDir() {
        return `${this.sourceDir}/App`;
    }

    get applicationServerSourceDir() {
        return `${this.sourceDir}/App/Server`;
    }

    get serverApplicationEntryPoint() {
        return `${this.sourceDir}/wwwroot/Server/app.js`;
    }

    get rootDir() {
        if (_rootDir.has(this)) {
            return _rootDir.get(this);
        }
        return _rootDir;
    }

    set rootDir(value) { _rootDir.set(this, value); }

    get outputDir() {
        if (_outputDir.has(this)) {
            return _outputDir.get(this);
        }
        return outputDir;
    }

    set outputDir(value) { _outputDir.set(this, value); }

    get sourceDir() {
        if (_sourceDir.has(this)) {
            return _sourceDir.get(this);
        }
        return sourceDir;
    }

    set sourceDir(value) { _sourceDir.set(this, value); }

    get dotnetProcessString() {
        if( _dotnetProcessString.has(this) ) {
            return _dotnetProcessString.get(this);
        }

        return "bin/Debug";
    }

    set dotnetProcessString(value) {
        _dotnetProcessString.set(this, value);
    }
}

export default new config();