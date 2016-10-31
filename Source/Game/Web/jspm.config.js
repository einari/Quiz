SystemJS.config({
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
            "babel": "npm:babel-core@5.8.38"
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
        "assert": "github:jspm/nodelibs-assert@0.2.0-alpha",
        "buffer": "github:jspm/nodelibs-buffer@0.2.0-alpha",
        "child_process": "github:jspm/nodelibs-child_process@0.2.0-alpha",
        "constants": "github:jspm/nodelibs-constants@0.2.0-alpha",
        "crypto": "github:jspm/nodelibs-crypto@0.2.0-alpha",
        "events": "github:jspm/nodelibs-events@0.2.0-alpha",
        "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
        "http": "github:jspm/nodelibs-http@0.2.0-alpha",
        "https": "github:jspm/nodelibs-https@0.2.1",
        "os": "github:jspm/nodelibs-os@0.2.0-alpha",
        "path": "github:jspm/nodelibs-path@0.2.0-alpha",
        "process": "github:jspm/nodelibs-process@0.2.0-alpha",
        "querystring": "github:jspm/nodelibs-querystring@0.2.0-alpha",
        "jquery": "Scripts/jquery-2.2.4.min",
        "html": "github:Hypercubed/systemjs-plugin-html@0.0.8",
        "knockout": "github:knockout/knockout@3.4.0",
        "socket.io": "npm:socket.io@1.5.1",
        "socket.io-client": "github:socketio/socket.io-client@1.5.1/socket.io.js",
        "stream": "github:jspm/nodelibs-stream@0.2.0-alpha",
        "string_decoder": "github:jspm/nodelibs-string_decoder@0.2.0-alpha",
        "tls": "github:jspm/nodelibs-tls@0.2.0-alpha",
        "tty": "github:jspm/nodelibs-tty@0.2.0-alpha",
        "url": "github:jspm/nodelibs-url@0.2.0-alpha",
        "util": "github:jspm/nodelibs-util@0.2.1",
        "vm": "github:jspm/nodelibs-vm@0.2.0-alpha",
        "zlib": "github:jspm/nodelibs-zlib@0.2.0-alpha"
    },
    packages: {
        "github:Hypercubed/systemjs-plugin-html@0.0.8": {
            "map": {
                "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.7.22"
            }
        },
        "npm:socket.io-client@1.5.1": {
            "map": {
                "component-bind": "npm:component-bind@1.0.0",
                "object-component": "npm:object-component@0.0.3",
                "indexof": "npm:indexof@0.0.1",
                "has-binary": "npm:has-binary@0.1.7",
                "parseuri": "npm:parseuri@0.0.4",
                "to-array": "npm:to-array@0.1.4",
                "backo2": "npm:backo2@1.0.2",
                "socket.io-parser": "npm:socket.io-parser@2.3.1",
                "debug": "npm:debug@2.2.0",
                "engine.io-client": "npm:engine.io-client@1.7.2",
                "component-emitter": "npm:component-emitter@1.2.0"
            }
        },
        "npm:debug@2.2.0": {
            "map": {
                "ms": "npm:ms@0.7.1"
            }
        },
        "npm:socket.io-parser@2.3.1": {
            "map": {
                "component-emitter": "npm:component-emitter@1.1.2",
                "debug": "npm:debug@2.2.0",
                "isarray": "npm:isarray@0.0.1",
                "json3": "npm:json3@3.3.2"
            }
        },
        "npm:socket.io@1.5.1": {
            "map": {
                "has-binary": "npm:has-binary@0.1.7",
                "debug": "npm:debug@2.2.0",
                "socket.io-parser": "npm:socket.io-parser@2.3.1",
                "socket.io-client": "npm:socket.io-client@1.5.1",
                "socket.io-adapter": "npm:socket.io-adapter@0.4.0",
                "engine.io": "npm:engine.io@1.7.2"
            }
        },
        "npm:engine.io-client@1.7.2": {
            "map": {
                "component-emitter": "npm:component-emitter@1.1.2",
                "debug": "npm:debug@2.2.0",
                "indexof": "npm:indexof@0.0.1",
                "parseuri": "npm:parseuri@0.0.4",
                "has-cors": "npm:has-cors@1.1.0",
                "component-inherit": "npm:component-inherit@0.0.3",
                "parsejson": "npm:parsejson@0.0.1",
                "parseqs": "npm:parseqs@0.0.2",
                "xmlhttprequest-ssl": "npm:xmlhttprequest-ssl@1.5.1",
                "yeast": "npm:yeast@0.1.2",
                "engine.io-parser": "npm:engine.io-parser@1.3.1",
                "ws": "npm:ws@1.1.1",
                "node-ws": "npm:ws@1.1.1",
                "node-xmlhttprequest-ssl": "npm:xmlhttprequest-ssl@1.5.1"
            }
        },
        "npm:has-binary@0.1.7": {
            "map": {
                "isarray": "npm:isarray@0.0.1"
            }
        },
        "github:jspm/nodelibs-zlib@0.2.0-alpha": {
            "map": {
                "zlib-browserify": "npm:browserify-zlib@0.1.4"
            }
        },
        "npm:parseuri@0.0.4": {
            "map": {
                "better-assert": "npm:better-assert@1.0.2"
            }
        },
        "github:jspm/nodelibs-string_decoder@0.2.0-alpha": {
            "map": {
                "string_decoder-browserify": "npm:string_decoder@0.10.31"
            }
        },
        "github:jspm/nodelibs-os@0.2.0-alpha": {
            "map": {
                "os-browserify": "npm:os-browserify@0.2.1"
            }
        },
        "github:jspm/nodelibs-crypto@0.2.0-alpha": {
            "map": {
                "crypto-browserify": "npm:crypto-browserify@3.11.0"
            }
        },
        "github:jspm/nodelibs-buffer@0.2.0-alpha": {
            "map": {
                "buffer-browserify": "npm:buffer@4.9.1"
            }
        },
        "github:jspm/nodelibs-stream@0.2.0-alpha": {
            "map": {
                "stream-browserify": "npm:stream-browserify@2.0.1"
            }
        },
        "github:jspm/nodelibs-url@0.2.0-alpha": {
            "map": {
                "url-browserify": "npm:url@0.11.0"
            }
        },
        "npm:socket.io-adapter@0.4.0": {
            "map": {
                "socket.io-parser": "npm:socket.io-parser@2.2.2",
                "debug": "npm:debug@2.2.0"
            }
        },
        "npm:engine.io-parser@1.3.1": {
            "map": {
                "has-binary": "npm:has-binary@0.1.6",
                "arraybuffer.slice": "npm:arraybuffer.slice@0.0.6",
                "blob": "npm:blob@0.0.4",
                "base64-arraybuffer": "npm:base64-arraybuffer@0.1.5",
                "wtf-8": "npm:wtf-8@1.0.0",
                "after": "npm:after@0.8.1"
            }
        },
        "github:jspm/nodelibs-http@0.2.0-alpha": {
            "map": {
                "http-browserify": "npm:stream-http@2.4.0"
            }
        },
        "npm:socket.io-parser@2.2.2": {
            "map": {
                "debug": "npm:debug@0.7.4",
                "json3": "npm:json3@3.2.6",
                "component-emitter": "npm:component-emitter@1.1.2",
                "isarray": "npm:isarray@0.0.1",
                "benchmark": "npm:benchmark@1.0.0"
            }
        },
        "npm:engine.io@1.7.2": {
            "map": {
                "ws": "npm:ws@1.0.1",
                "engine.io-parser": "npm:engine.io-parser@1.2.4",
                "debug": "npm:debug@2.2.0",
                "accepts": "npm:accepts@1.3.1",
                "base64id": "npm:base64id@0.1.0"
            }
        },
        "npm:parsejson@0.0.1": {
            "map": {
                "better-assert": "npm:better-assert@1.0.2"
            }
        },
        "npm:parseqs@0.0.2": {
            "map": {
                "better-assert": "npm:better-assert@1.0.2"
            }
        },
        "npm:buffer@4.9.1": {
            "map": {
                "isarray": "npm:isarray@1.0.0",
                "ieee754": "npm:ieee754@1.1.8",
                "base64-js": "npm:base64-js@1.2.0"
            }
        },
        "npm:has-binary@0.1.6": {
            "map": {
                "isarray": "npm:isarray@0.0.1"
            }
        },
        "npm:browserify-zlib@0.1.4": {
            "map": {
                "readable-stream": "npm:readable-stream@2.1.5",
                "pako": "npm:pako@0.2.9"
            }
        },
        "npm:stream-browserify@2.0.1": {
            "map": {
                "readable-stream": "npm:readable-stream@2.1.5",
                "inherits": "npm:inherits@2.0.3"
            }
        },
        "npm:crypto-browserify@3.11.0": {
            "map": {
                "inherits": "npm:inherits@2.0.3",
                "browserify-cipher": "npm:browserify-cipher@1.0.0",
                "create-ecdh": "npm:create-ecdh@4.0.0",
                "create-hash": "npm:create-hash@1.1.2",
                "create-hmac": "npm:create-hmac@1.1.4",
                "randombytes": "npm:randombytes@2.0.3",
                "public-encrypt": "npm:public-encrypt@4.0.0",
                "pbkdf2": "npm:pbkdf2@3.0.9",
                "browserify-sign": "npm:browserify-sign@4.0.0",
                "diffie-hellman": "npm:diffie-hellman@5.0.2"
            }
        },
        "npm:better-assert@1.0.2": {
            "map": {
                "callsite": "npm:callsite@1.0.0"
            }
        },
        "npm:url@0.11.0": {
            "map": {
                "querystring": "npm:querystring@0.2.0",
                "punycode": "npm:punycode@1.3.2"
            }
        },
        "npm:engine.io-parser@1.2.4": {
            "map": {
                "base64-arraybuffer": "npm:base64-arraybuffer@0.1.2",
                "after": "npm:after@0.8.1",
                "arraybuffer.slice": "npm:arraybuffer.slice@0.0.6",
                "blob": "npm:blob@0.0.4",
                "has-binary": "npm:has-binary@0.1.6",
                "utf8": "npm:utf8@2.1.0"
            }
        },
        "npm:ws@1.1.1": {
            "map": {
                "ultron": "npm:ultron@1.0.2",
                "options": "npm:options@0.0.6",
                "utf-8-validate": "npm:utf-8-validate@1.2.1",
                "bufferutil": "npm:bufferutil@1.2.1"
            }
        },
        "npm:stream-http@2.4.0": {
            "map": {
                "inherits": "npm:inherits@2.0.3",
                "readable-stream": "npm:readable-stream@2.1.5",
                "xtend": "npm:xtend@4.0.1",
                "builtin-status-codes": "npm:builtin-status-codes@2.0.0",
                "to-arraybuffer": "npm:to-arraybuffer@1.0.1"
            }
        },
        "npm:ws@1.0.1": {
            "map": {
                "options": "npm:options@0.0.6",
                "ultron": "npm:ultron@1.0.2",
                "utf-8-validate": "npm:utf-8-validate@1.2.1",
                "bufferutil": "npm:bufferutil@1.2.1"
            }
        },
        "npm:accepts@1.3.1": {
            "map": {
                "negotiator": "npm:negotiator@0.6.0",
                "mime-types": "npm:mime-types@2.1.12"
            }
        },
        "npm:readable-stream@2.1.5": {
            "map": {
                "inherits": "npm:inherits@2.0.3",
                "isarray": "npm:isarray@1.0.0",
                "string_decoder": "npm:string_decoder@0.10.31",
                "buffer-shims": "npm:buffer-shims@1.0.0",
                "core-util-is": "npm:core-util-is@1.0.2",
                "process-nextick-args": "npm:process-nextick-args@1.0.7",
                "util-deprecate": "npm:util-deprecate@1.0.2"
            }
        },
        "npm:create-hmac@1.1.4": {
            "map": {
                "create-hash": "npm:create-hash@1.1.2",
                "inherits": "npm:inherits@2.0.3"
            }
        },
        "npm:create-hash@1.1.2": {
            "map": {
                "inherits": "npm:inherits@2.0.3",
                "sha.js": "npm:sha.js@2.4.5",
                "ripemd160": "npm:ripemd160@1.0.1",
                "cipher-base": "npm:cipher-base@1.0.3"
            }
        },
        "npm:public-encrypt@4.0.0": {
            "map": {
                "create-hash": "npm:create-hash@1.1.2",
                "randombytes": "npm:randombytes@2.0.3",
                "parse-asn1": "npm:parse-asn1@5.0.0",
                "browserify-rsa": "npm:browserify-rsa@4.0.1",
                "bn.js": "npm:bn.js@4.11.6"
            }
        },
        "npm:utf-8-validate@1.2.1": {
            "map": {
                "bindings": "npm:bindings@1.2.1",
                "nan": "npm:nan@2.4.0"
            }
        },
        "npm:browserify-sign@4.0.0": {
            "map": {
                "create-hash": "npm:create-hash@1.1.2",
                "create-hmac": "npm:create-hmac@1.1.4",
                "inherits": "npm:inherits@2.0.3",
                "parse-asn1": "npm:parse-asn1@5.0.0",
                "elliptic": "npm:elliptic@6.3.2",
                "browserify-rsa": "npm:browserify-rsa@4.0.1",
                "bn.js": "npm:bn.js@4.11.6"
            }
        },
        "npm:pbkdf2@3.0.9": {
            "map": {
                "create-hmac": "npm:create-hmac@1.1.4"
            }
        },
        "npm:diffie-hellman@5.0.2": {
            "map": {
                "randombytes": "npm:randombytes@2.0.3",
                "bn.js": "npm:bn.js@4.11.6",
                "miller-rabin": "npm:miller-rabin@4.0.0"
            }
        },
        "npm:browserify-cipher@1.0.0": {
            "map": {
                "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
                "browserify-aes": "npm:browserify-aes@1.0.6",
                "browserify-des": "npm:browserify-des@1.0.0"
            }
        },
        "npm:bufferutil@1.2.1": {
            "map": {
                "nan": "npm:nan@2.4.0",
                "bindings": "npm:bindings@1.2.1"
            }
        },
        "npm:mime-types@2.1.12": {
            "map": {
                "mime-db": "npm:mime-db@1.24.0"
            }
        },
        "npm:create-ecdh@4.0.0": {
            "map": {
                "elliptic": "npm:elliptic@6.3.2",
                "bn.js": "npm:bn.js@4.11.6"
            }
        },
        "npm:evp_bytestokey@1.0.0": {
            "map": {
                "create-hash": "npm:create-hash@1.1.2"
            }
        },
        "npm:browserify-aes@1.0.6": {
            "map": {
                "cipher-base": "npm:cipher-base@1.0.3",
                "create-hash": "npm:create-hash@1.1.2",
                "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
                "inherits": "npm:inherits@2.0.3",
                "buffer-xor": "npm:buffer-xor@1.0.3"
            }
        },
        "npm:cipher-base@1.0.3": {
            "map": {
                "inherits": "npm:inherits@2.0.3"
            }
        },
        "npm:sha.js@2.4.5": {
            "map": {
                "inherits": "npm:inherits@2.0.3"
            }
        },
        "npm:browserify-des@1.0.0": {
            "map": {
                "cipher-base": "npm:cipher-base@1.0.3",
                "inherits": "npm:inherits@2.0.3",
                "des.js": "npm:des.js@1.0.0"
            }
        },
        "npm:parse-asn1@5.0.0": {
            "map": {
                "browserify-aes": "npm:browserify-aes@1.0.6",
                "create-hash": "npm:create-hash@1.1.2",
                "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
                "pbkdf2": "npm:pbkdf2@3.0.9",
                "asn1.js": "npm:asn1.js@4.8.1"
            }
        },
        "npm:elliptic@6.3.2": {
            "map": {
                "bn.js": "npm:bn.js@4.11.6",
                "inherits": "npm:inherits@2.0.3",
                "brorand": "npm:brorand@1.0.6",
                "hash.js": "npm:hash.js@1.0.3"
            }
        },
        "npm:browserify-rsa@4.0.1": {
            "map": {
                "bn.js": "npm:bn.js@4.11.6",
                "randombytes": "npm:randombytes@2.0.3"
            }
        },
        "npm:miller-rabin@4.0.0": {
            "map": {
                "bn.js": "npm:bn.js@4.11.6",
                "brorand": "npm:brorand@1.0.6"
            }
        },
        "npm:des.js@1.0.0": {
            "map": {
                "inherits": "npm:inherits@2.0.3",
                "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
            }
        },
        "npm:asn1.js@4.8.1": {
            "map": {
                "bn.js": "npm:bn.js@4.11.6",
                "inherits": "npm:inherits@2.0.3",
                "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
            }
        },
        "npm:hash.js@1.0.3": {
            "map": {
                "inherits": "npm:inherits@2.0.3"
            }
        }
    }
});
