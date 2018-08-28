import config       from '../config';
import gulp   from 'gulp';
import concat from 'gulp-concat';

gulp.task('cssbundle', function() {
  return gulp.src(config.cssbundle.src)
    .pipe(concat(config.cssbundle.file))
    .pipe(gulp.dest(config.cssbundle.dest));
});