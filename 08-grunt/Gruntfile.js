module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      development: {
        options: {
            compress: false
        },
        files: {
            "dist/main.css": "app/css/main.less"
        }
      }
    },
    // concat: {
    //   options: {
    //     // define a string to put between each file in the concatenated output
    //     separator: ';'
    //   },
    //   dist: {
    //     // the files to concatenate
    //     src: ['app/js/*.js'],
    //     // the location of the resulting JS file
    //     dest: 'dist/<%= pkg.name %>.js'
    //   }
    // },
    jshint: {
      // beforeconcat: ['app/js/*.js'],
      // afterconcat: ['dist/<%= pkg.name %>.js'],

      // configure JSHint (documented at http://www.jshint.com/docs/)
      files: ["Gruntfile.js", "app/js/*.js"],
      options: {
        reporter: require('jshint-stylish'),
        curly: true,
        eqnull: true,
        eqeqeq: true,
        undef: true,
        node: true,
        module: true,
        esversion: 6,
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true,
          require: true,
          define: true,
          node: true
        }
      }
    },
    // es6transpiler: {
    //     dist: {
    //         files: [{
    //             "expand": true,
    //             "cwd": "app/js",
    //             "src": ["**/*.js"],
    //             "dest": "app/js-compiled/",
    //             "ext": "-compiled.js"
    //         }]
    //     }
    // },
    // rollup: {
    //   options: {
    //     format: "iife",
    //     plugins: [
    //       require("rollup-plugin-babel")({
    //         presets: [["es2015", { "modules": false }]],
    //         plugins: ["external-helpers"]
    //       })
    //     ]
    //   },
    //   dist: {
    //     files: {
    //       "dist/all-min.js": ["app/js/add.js"]
    //     }
    //   }
    // },
    // babel: {
    //   options: {
    //       "sourceMap": true
    //   },
    //   dist: {
    //       files: [{
    //           "expand": true,
    //           "cwd": "app/js",
    //           "src": ["**/*.js"],
    //           "dest": "app/js-compiled/",
    //           "ext": "-compiled.js"
    //       }]
    //   }
    // },
    uglify: {
      options: {
        //should we minify (false) or just concat (true)
        beautify: false
      },
      all_src : {
          options : {
            sourceMap : true,
            sourceMapName : 'app/build/sourceMap.map'
          },
          src : ['app/js/*.js'],
          dest : 'dist/all.min.js'
      }
    },
    watch: {
      less: {
          files: ['app/css/*.less'],
          tasks: ['less', 'autoprefixer'],
          // options: {
          //   livereload: {
          //     host: 'localhost',
          //     port: 9000
          //   }
          // }
      },
      jshint: {
        files: ["Gruntfile.js", "app/js/*.js"],
        tasks: ['jshint'],
        // options: {
        //   livereload: {
        //     host: 'localhost',
        //     port: 9000
        //   }
        // }
      }
    },
    autoprefixer: {
      no_dest: {
          src: "dist/main.css"
      }
    },
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          // livereload: 35729,
          open: true,
          port: 9000
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks('grunt-es6-transpiler');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks("grunt-rollup");

  grunt.registerTask('test', ['jshint']);

  // the default task can be run just by typing "grunt" on the command line
  grunt.registerTask('default', ['less', 'jshint', 'uglify', 'connect:server', 'watch']);

};