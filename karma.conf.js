//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './',

    files: [
      'public/bower_components/angular/angular.js',
      'public/bower_components/angular-route/angular-route.js',
      'public/bower_components/angular-mocks/angular-mocks.js',
      'public/app.js',
      'view*/**/*.js',
      'public/*[!lib]*/*.js',
      'public/*[!lib]*/*[!tests]*/*.js',
      'public/*[!lib]*/tests/unit/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
