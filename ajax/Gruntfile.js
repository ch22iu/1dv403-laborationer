'use strict';

module.exports = function (grunt) {
  // Show elapsed time at the end
  require('time-grunt')(grunt);


  // Load all grunt tasks
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-jasmine-node-coverage');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-coveralls');


  // Project configuration.
    grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Adding the jshint task
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
        undef: false,
        unused: false
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      }
    },

    // Adding the jasmine-node task for test and coverage
    jasmine_node: {
      coverage: { //https://github.com/paazmaya/grunt-jasmine-node-coverage/tree/multi-grunting#optionsspecfolders
        excludes: ["spec"], // dont coverage on the test-files
        verbose: true
      },
      options: {
        specFolders:['spec/'],
        projectRoot:'',
        forceExit: true,
        match: '.',
        matchall: false,
        extensions: 'js',
        specNameMatcher: 'spec',
        verbose: true,
        noStack: false
      }
    },

    compress: {
        main: {
            options: {
                archive: 'archive/release-' +(new Date()).toISOString() +'.zip'
            },
            files: [
                {src: ['build/**'], dest: 'archive/'} // includes files in path and its subdirs
            ]
        }
    },

    copy: {
        main: {
            files: [
                // includes files within path and its sub-directories
                {expand: true, src: ['lib/**'], dest: 'build/'},
                {expand: true, src: ['lib/**'], dest: '../AjaxAssignment-vagrant-devserver/serverfiles/app'},

                {expand: true, src: ['data/**'], dest: 'build/'},
                {expand: true, src: ['data/**'], dest: '../AjaxAssignment-vagrant-devserver/serverfiles/app'},

                {expand: true, src: ['app.js', 'package.json'], dest: 'build/', filter: 'isFile'},
                {expand: true, src: ['app.js', 'package.json'], dest: '../AjaxAssignment-vagrant-devserver/serverfiles/app', filter: 'isFile'}
            ]
        }
    },
    coveralls: {
        options: {
            // LCOV coverage file relevant to every target
            src: 'coverage/lcov.info',

            // When true, grunt-coveralls will only print a warning rather than
            // an error, to prevent CI builds from failing unnecessarily (e.g. if
            // coveralls.io is down).
            force: false
        },
        grunt_coveralls_real_coverage: {
            src: 'coverage/lcov.info'
        }

    }

  });



  // Default task.
  grunt.registerTask('default', ['jshint', 'jasmine_node']);
  grunt.registerTask('build', ['jshint', 'copy', 'compress']);
  grunt.registerTask('server_up', ['copy', 'vagrant_commands']);
  grunt.registerTask('server_down', ['vagrant_commands']);
  grunt.registerTask('deploy', []);

};