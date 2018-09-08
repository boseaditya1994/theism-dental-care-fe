import config from '../config';
import gulp   from 'gulp';

gulp.task('customScripts', function() {
	gulp.src(config.extScripts.src)
        .pipe(gulp.dest(config.extScripts.dest));
});

