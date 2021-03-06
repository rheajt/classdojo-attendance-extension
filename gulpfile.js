var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify');

var paths = {
  js: 'src/js/**/*.js',
  sass: 'src/sass/**/*.sass',
  html: 'src/**/*.html',
  manifest: 'src/manifest.json'
};

gulp.task('default', ['js', 'css', 'html', 'manifest', 'watch']);

gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.sass, ['css']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.manifest, ['manifest']);
});

gulp.task('js', function() {
  return gulp.src(paths.js)
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function() {
  return gulp.src(paths.sass)
    .pipe(sass())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest('dist'));
});

gulp.task('manifest', function() {
  return gulp.src(paths.manifest)
    .pipe(gulp.dest('dist/'));
});
