var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass');


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('reload', function (done) {
    browserSync.reload();
    done();
});

gulp.task('watch', function() {
  gulp.watch("js/*.js", ['reload']);
  gulp.watch('index.html', ['reload']);
  gulp.watch('css/*.*', ['css', 'reload']);
});

gulp.task('css', function() {
  //copy all files into the dist folder
  return gulp.src('css/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('css'));
});

gulp.task('build', function() {
  return gulp.src([
      'index.html',
      'js/meteorites.js',
      'css/styles.css',
      'meteorite-strike-data.json',
      'world-110m2.json'
    ])
    .pipe(gulp.dest('dist'));
})

gulp.task('default', ['browser-sync', 'watch']);
