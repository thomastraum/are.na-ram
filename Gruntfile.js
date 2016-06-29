module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 9001
        }
      }
    },
    coffee: {
      compile: {
        files: {
          'lib/main.js': ['src/*.coffee'] //, 'path/to/more/*.coffee'] // compile and concat into single file 
        }
      }
    },
    watch: {
      scripts: {
        files: ['**/*.coffee', '**/*.html'],
        tasks: ['coffee'],
        options: {
          livereload: {
            host: 'localhost',
            port: 9000
          }
        },
      },
    }
  });

  // Start web server
  grunt.registerTask('serve', [
    'connect',
    'watch'
    ]);

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');

};