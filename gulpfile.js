var gulp = require('gulp')
var sass = require('gulp-sass')

gulp.task('styles', () => {
  return gulp.src('src/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('dist'))
})
