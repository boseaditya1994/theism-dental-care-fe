import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('prod', ['clean'], function(cb) {

  cb = cb || function() {};

  global.isProd = true;

  runSequence(['styles','cssbundle', 'images', 'fonts', 'views'], 'browserify', 'gzip', cb);

});
