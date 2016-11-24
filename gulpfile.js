var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', function() {
  return gulp.src('./app/*.scss')
  	.pipe(sass({
  		includePaths : ['./node_modules']
  		}).on('error', sass.logError))
  	.pipe(gulp.dest('./dist'))
});

gulp.task('watch', function () {
  gulp.watch('./app/*.scss', ['default']);
});