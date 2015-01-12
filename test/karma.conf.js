module.exports = function (config) {

    const srcPath = '../app/';
    const testSrcPath = 'specs/';
    const libPath = '../app/lib/';
    const testLibPath = 'lib/';

    config.set({

        basePath: './',

        files: [
            libPath + 'angular.js',
            testLibPath + 'angular-mocks.js',
            srcPath + '*.js',
            testSrcPath + '*.js'
        ],

        singleRun: true,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
