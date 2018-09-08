export default {

  browserPort: 3000,
  UIPort: 3001,
  testPort: 3002,
  isHttps: true,

  sourceDir: './app/',
  buildDir: './build/',

  styles: {
    src: 'app/styles/**/*',
    dest: 'build/css',
    prodSourcemap: false
  },

  scripts: {
    src: 'app/js/**/*.js',
    dest: 'build/js',
    test: 'test/**/*.js',
    gulp: 'gulp/**/*.js'
  },

  cssbundle: {
    src: './node_modules/angular-material/angular-material.css',
    dest: 'build/css/',
    file: 'bundle.css'
  },

  images: {
    src: 'app/images/**/*',
    dest: 'build/images'
  },

  fonts: {
    src: ['app/fonts/**/*'],
    dest: 'build/fonts'
  },

  assetExtensions: [
    'js',
    'css',
    'png',
    'jpeg',
    'gif',
    'svg',
    'eot',
    'otf',
    'ttc',
    'ttf',
    'woff2?',
    'jpg'
  ],

  views: {
    index: 'app/index.html',
    src: 'app/views/**/*.html',
    dest: 'app/js'
  },

  gzip: {
    src: 'build/**/*.{html,xml,json,css,js,js.map,css.map}',
    dest: 'build/',
    options: {}
  },

  browserify: {
    bundleName: 'main.js',
    prodSourcemap: false
  },

  test: {
    karma: 'test/karma.conf.js',
    protractor: 'test/protractor.conf.js'
  },

  extScripts: {
    src: 'app/scripts/**/*',
    dest: 'build/js/ext'
  },

  init: function() {
    this.views.watch = [
      this.views.index,
      this.views.src
    ];

    return this;
  }

}.init();
