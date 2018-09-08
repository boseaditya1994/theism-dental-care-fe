import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('dev', ['clean'], function(cb) {

  global.isProd = false;

  runSequence(['styles','cssbundle', 'images', 'fonts', 'views','customScripts'], 'browserify', 'watch', cb);
});
