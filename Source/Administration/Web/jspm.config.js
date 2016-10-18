SystemJS.config({
    defaultJSExtensions: true,
    map: {
        "signalr-jquery": "Scripts/jquery.signalr-2.2.0",
        "signalr": "signalr"
    },
    meta: {
        "signalr-jquery": {
            "format": "global",
            "deps": [
                "jquery"
            ]
        }
    },
    browserConfig: {
        "paths": {
            "npm:": "/jspm_packages/npm/",
            "github:": "/jspm_packages/github/",
            "web/": "/src/"
        }
    },
    nodeConfig: {
        "paths": {
            "npm:": "jspm_packages/npm/",
            "github:": "jspm_packages/github/",
            "web/": "src/"
        }
    },
    devConfig: {
        "map": {
            "plugin-babel": "npm:systemjs-plugin-babel@0.0.15",
            "babel-runtime": "npm:babel-runtime@5.8.38",
            "core-js": "npm:core-js@1.2.7",
            "babel": "npm:babel-core@5.8.38",
            "path": "github:jspm/nodelibs-path@0.2.0-alpha",
            "process": "github:jspm/nodelibs-process@0.2.0-alpha",
            "fs": "github:jspm/nodelibs-fs@0.2.0-alpha"
        }
    },
    transpiler: "plugin-babel",
    packages: {
        "web": {
            "main": "web.js",
            "meta": {
                "*.js": {
                    "loader": "plugin-babel"
                }
            }
        },
        "defaultExtension": "js",
        "signalr": {
            "format": "global",
            "defaultExtension": false,
            "meta": {
                "js": {
                    "format": "global",
                    "deps": [
                        "signalr-jquery"
                    ]
                }
            }
        }
    }
});

SystemJS.config({
    packageConfigPaths: [
        "npm:@*/*.json",
        "npm:*.json",
        "github:*/*.json"
    ],
    map: {
        "knockout.mapping": "npm:knockout.mapping@2.4.3",
        "jquery": "Scripts/jquery-2.2.4.min",
        "html": "github:Hypercubed/systemjs-plugin-html@0.0.8",
        "knockout": "github:knockout/knockout@3.4.0"
    },
    packages: {
        "github:Hypercubed/systemjs-plugin-html@0.0.8": {
            "map": {
                "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.7.22"
            }
        },
        "npm:knockout.mapping@2.4.3": {
            "map": {
                "knockout": "github:knockout/knockout@3.4.0"
            }
        }
    }
});
