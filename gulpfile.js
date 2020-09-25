var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();;
const htmlmin = require('gulp-htmlmin');
var jsmin = require('gulp-jsmin');
var inject = require('gulp-inject');
var rename = require("gulp-rename");
var cssmin = require('gulp-cssmin');

gulp.task('watch', function(){
  browserSync.init({
    server: "./app"
});
  
  gulp.watch('app/scss/*.scss', gulp.series('sass')); 
  gulp.watch("app/*_.html", gulp.series('html'));
})

gulp.task('sass', function(){
  
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream())
});
gulp.task('html', function(){
  return gulp.src('app/*_.html')
    .pipe(rename("index.html"))
    .pipe(inject(gulp.src(['./app/**/*.js','./app/**/*.css'], {read: false}), {relative: true}))
    .pipe(gulp.dest('./app'))
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

gulp.task('default', gulp.series('html','watch'));
gulp.task('deploy', gulp.series('cssmin' ,'jsmin','htmlmin'));