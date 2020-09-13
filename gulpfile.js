var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();;
const htmlmin = require('gulp-htmlmin');
var jsmin = require('gulp-jsmin');

var cssmin = require('gulp-cssmin');

gulp.task('watch', function(){
  browserSync.init({
    server: "./app"
});
  gulp.watch('app/scss/*.scss', gulp.series('sass')); 
  // gulp.watch('app/*.html', browserSync.reload()); 
  gulp.watch("app/*.html").on('change', browserSync.reload);
})

gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream())
});

gulp.task('cssmin', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({
          'outputStyle': 'compressed'
        }).on('error', sass.logError))
        .pipe(cssmin())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('jsmin', function () {
  return gulp.src('app/js/**/*.js')
      .pipe(jsmin())
      .pipe(gulp.dest('./build/js'));
});
gulp.task('htmlmin', function() {
  return gulp.src('app/index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build/'));
});

gulp.task('default', gulp.series('watch'));
gulp.task('deploy', gulp.series('htmlmin','cssmin' ,'jsmin'));