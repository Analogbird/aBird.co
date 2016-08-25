'use strict';


module.exports = grunt => {

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: true
            },
            abird: [
                '.'
            ]
        },
        jscs: {
            src: '.',
            options: {
                config: '.jscs',
                fix: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('hint', 'Hinting...', ['jshint:abird', 'jscs']);
};
