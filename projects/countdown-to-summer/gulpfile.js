var gulp = require('gulp'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    sass = require('gulp-sass');

gulp.task('default', ['sass', 'js', 'html', 'connect', 'watch']);

gulp.task('watch', function() {
  gulp.watch('./**/*.html', ['html']);
  gulp.watch('./dist/js/**/*.js', ['js', 'rl']);
  gulp.watch('./src/sass/**/*.sass', ['sass']);
});

gulp.task('html', function() {
  return gulp.src('./**/*.html')
    .pipe(connect.reload());
})

gulp.task('js', function(cb) {
    pump([
      gulp.src('src/js/*.js'),
      uglify(),
      gulp.dest('./dist/js')
    ], cb);
});

gulp.task('rl', function() {
  connect.reload();
});

//sass task
gulp.task('sass', function() {
  return gulp.src('src/sass/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});
