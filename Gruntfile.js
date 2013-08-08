module.exports = function(grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bg-shell');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');

  grunt.initConfig({
    pkg: grunt.file.readJSON('src/manifest.webapp'),
    jslint: {
      files: [
        'src/js/**/*.js',
        '*.js',
        'tests/**/*.js'
      ],
      exclude: [
        'src/js/lib/text.js'
      ],
      directives: {
        indent: 2,
        todo: true,
        nomen: true,
        predef: [
          '_',
          '$',
          'window',
          'require',
          'define',
          'Backbone',
          'module',
          '__dirname',
          'document',
          'test',
          'deepEqual',
          'QUnit',
          'ok',
          'asyncTest',
          'start',
          'notDeepEqual'
        ]
      }
    },
    requirejs: {
      compile: {
        options: {
          name:           "app",
          baseUrl:        "src/js",
          mainConfigFile: "src/js/app.js",
          out:            "dist/<%= pkg.version %>/js/app.js"
        }
      }
    },
    copy: {
      'default': {
        files: [
          {
            expand: true,
            src: [
              'index.html',
              'manifest.webapp',
              'css/**',
              'ico/**',
              'components/backbone/backbone-min.js',
              'components/underscore/underscore-min.js',
              'components/jquery/jquery.min.js',
              'components/pointer-events/pointerevents.js',
              'components/pointer-events/src/*.js',
              'components/pointer-gestures/pointergestures.js',
              'components/pointer-gestures/src/*.js',
              'components/polymer-tools/loader/loader.js',
              'components/requirejs/require.js',
              'components/gaia-bb/menus_dialogs/confirm.css',
              'components/gaia-bb/menus_dialogs/confirm/images/**',
              'components/gaia-bb/widgets/progress_activity/**',
              'components/gaia-bb/widgets/drawer/**',
              'components/gaia-bb/widgets/headers.css',
              'components/gaia-bb/widgets/headers/images/**',
              'components/gaia-bb/widgets/lists/**',
              'components/gaia-bb/widgets/toolbars.css',
              'components/gaia-bb/widgets/toolbars/images/**',
              'components/gaia-bb/widgets/buttons.css',
              'components/gaia-bb/widgets/buttons/images/**',
              'components/gaia-bb/widgets/input_areas.css',
              'components/gaia-bb/widgets/input_areas/images/**'
            ],
            cwd: 'src/',
            dest: 'dist/<%= pkg.version %>'
          }
        ]
      }
    },
    compress: {
      'default': {
        options: {
          archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
        },
        expand: true,
        cwd: 'dist/<%= pkg.version %>/',
        src: ['**'],
        dest: ''
      }
    },
    clean: {
      'default': {
        src: ['dist/<%= pkg.version %>/']
      }
    },
    bgShell: {
      bower: {
        cmd: 'bower install'
      }
    },
    qunit: {
      'default': [
        'tests/index.html'
      ]
    },
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: 'src/js',
          exclude: 'src/components',
          outdir: 'dist/docs'
        }
      }
    }
  });

  grunt.registerTask('default', 'Default build',
    [
      'jslint',
      'bgShell:bower',
      'qunit',
      'clean',
      'requirejs',
      'copy',
      'yuidoc',
      'compress'
    ]);

// grunt.registerTask('default', 'Default build', function(){
//   grunt.log.write(grunt.config.get('pkg.name')).ok();
// });
};
