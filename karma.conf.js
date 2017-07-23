module.exports = function (config) {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            "src/**/*.ts",
            "test/**/*.ts"
        ],
        preprocessors: {
            "src/**/*.ts": ['karma-typescript', 'coverage'],
            "test/**/*.ts": ["karma-typescript"]
        },
        reporters: ["progress", "karma-typescript"],
        browsers: ["Chrome"]
    });
};
