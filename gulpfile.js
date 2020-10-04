var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();;
const htmlmin = require('gulp-htmlmin');
var jsmin = require('gulp-jsmin');
var inject = require('gulp-inject');
var rename = require("gulp-rename");
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
// var concatCss = require('gulp-concat-css');
const imagemin = require('gulp-imagemin');

// check changes in files
gulp.task('watch', function(){
  browserSync.init({
    server: "./app"
});
  gulp.watch('app/scss/*.scss', gulp.series('sass')); 
  gulp.watch('app/js/*.js').on('change',browserSync.stream); 
  gulp.watch("app/*_.html", gulp.series('html'));
})

// sass to css
gulp.task('sass', function(){  
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream())
});

//html inject scripts and styles and reload page
gulp.task('html', function(){
  return gulp.src('app/*_.html')
    .pipe(rename("index.html"))
    .pipe(inject(gulp.src(['./app/**/*.js','./app/**/*.css'], {read: false}), {relative: true}))
    .pipe(gulp.dest('./app'))
    .pipe(browserSync.stream())
});
//css min
gulp.task('cssmin', function () {
    return  gulp.src('app/scss/*.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(concat('style.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('./build/css'));
});

//js min
gulp.task('jsmin', function () {
  return gulp.src('app/js/**/*.js')
    .pipe(concat('bundle.js'))
      .pipe(jsmin())
      .pipe(gulp.dest('./build/js'));
});

//html min
gulp.task('htmlmin', function() {
  return gulp.src('app/index_.html')
    .pipe(inject(gulp.src(['./build/js/bundle.js','./build/css/style.css'], {read: false}), {relative: false,ignorePath:'build',addRootSlash:false}))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('build/'));
});

gulp.task('imgmin',function (){
  return gulp.src('app/imgs/*')
  .pipe(imagemin())
  .pipe(gulp.dest('build/imgs'))
})

gulp.task('default', gulp.series('sass','html','watch'));
gulp.task('deploy', gulp.series('cssmin' ,'jsmin','htmlmin', 'imgmin'));