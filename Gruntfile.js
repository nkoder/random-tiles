module.exports = function (grunt) {

    const libPath = 'app/lib';
    const testLibPath = 'test/lib';

    grunt.initConfig({
        bower: {
            dev: {
                dest: libPath,
                css_dest: libPath + '/css',
                options: {
                    stripAffix: true,
                    packageSpecific: {
                        'angular-mocks': {
                            dest: testLibPath,
                            files: ['angular-mocks.js']
                        }
                    }
                }
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma.conf.js'
            }
        },
        protractor: {
            e2e: {
                configFile: 'e2e-tests/protractor.conf.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-protractor-runner');

    grunt.registerTask('unitTests', ['karma:unit']);
    grunt.registerTask('e2eTests', ['protractor:e2e']);
    grunt.registerTask('default', ['bower', 'unitTests']);

};