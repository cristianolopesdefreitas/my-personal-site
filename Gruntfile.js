module.exports = function( grunt ) {
    'use strict';

    grunt.initConfig({
        appConfig: {
            dev: {
                base: 'dev',
                css: 'dev/css',
                fonts: 'dev/fonts',
                images: 'dev/images',
                favicon: 'dev/favicon'
            },
            dist: {
                base: 'dist',
                css: 'dist/css',
                fonts: 'dist/fonts',
                images: 'dist/images',
                favicon: 'dist/favicon'
            },
            watchFiles: [ 'Gruntfile.js' ].concat(
                '<%= appConfig.dev.css %>/styles.css',
                '<%= appConfig.dev.base %>/index.html'
            )
        }, // appConfig

        clean: [ '<%= appConfig.dist.base %>/*/**' ], // clean

        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            dist: {
                files: {
                    '<%= appConfig.dist.css %>/styles.css': '<%= appConfig.dev.css %>/styles.css'
                }
            }
        }, // cssmin

        copy: {
            dist: {
                files:  [
                    {
                        expand: true,
                        cwd: '<%= appConfig.dev.fonts %>/',
                        src: '**',
                        dest: '<%= appConfig.dist.fonts %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= appConfig.dev.favicon %>/',
                        src: '**',
                        dest: '<%= appConfig.dist.favicon %>/'
                    }
                ]
            }
        }, // copy

        strip_code: {
            options: {
                blocks: [
                    {
                        start_block: '<!-- start-livereload-script -->',
                        end_block: '<!-- end-livereload-script -->'
                    }
                ]
            },
            strip: {
                src: '<%= appConfig.dev.base %>/index.html',
                dest: '<%= appConfig.dist.base %>/index.html'
            }
        }, // strip code

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    '<%= appConfig.dist.base %>/index.html': '<%= appConfig.dist.base %>/index.html'
                }
            }
        }, //htmlmin

        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= appConfig.dev.images %>/',
                        dest: '<%= appConfig.dist.images %>/',
                        src: [ '*.{png,jpg,gif,svg}' ]
                    }
                ]
            }
        }, // imagemin

        connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: '*',
                    open: 'http://localhost:9000/',
                    base: '<%= appConfig.dev.base %>'
                }
            }
        }, // connect

        watch: {
            dev: {
                files: '<%= appConfig.watchFiles %>',
                options: {
                    livereload: true
                }
            }
        } // watch
    });

    grunt.registerTask( 'default', function() {
        grunt.task.run([ 'dev' ]);
    });

    grunt.registerTask( 'dev', function() {
        grunt.task.run([
            'connect',
            'watch:dev'
        ]);
    });

    grunt.registerTask( 'dist', function() {
        grunt.task.run([
            'clean',
            'cssmin:dist',
            'strip_code',
            'htmlmin',
            'copy:dist',
            'imagemin:dist'
        ]);
    });

    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-strip-code' );
    grunt.loadNpmTasks( 'grunt-contrib-imagemin' );
    grunt.loadNpmTasks( 'grunt-contrib-htmlmin' );
    grunt.loadNpmTasks( 'grunt-contrib-connect' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
};
