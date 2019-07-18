var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

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
  gulp.watch('css/*.css', ['reload']);
});

gulp.task('build', function() {
  //copy all files into the dist folder
});

gulp.task('default', ['browser-sync', 'watch']);
