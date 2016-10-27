var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gutil = require('gulp-util'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify');

gulp.task('images', function() {
  return gulp.src('imgs/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/imgs'));
});

gulp.task('js', function() {
  return gulp.src([
      'node_modules/jquery/dist/jquery.js',
      'js/dojo.js',
      'js/settings.js',
      'js/getData.js'
    ])
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function() {
  return gulp.src('sass/**/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('css'));
});

gulp.task('css', ['sass'], function() {
  return gulp.src('css/**/*.css')
    .pipe(gulp.dest('dist/css'))
})

gulp.task('html', function() {
  return gulp.src(['dojo.html', 'settings.html'])
    .pipe(gulp.dest('dist'));
});

gulp.task('manifest', function() {
  return gulp.src('manifest.json')
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['images', 'js', 'css', 'html', 'manifest']);

gulp.task('watch', function() {
  gulp.watch('sass/**/*.sass', ['sass']);
});
