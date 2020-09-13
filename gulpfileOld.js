
import gulp from 'gulp';
import critical from 'critical'
import babelify from 'babelify';
import browserSync from 'browser-sync';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import env from 'gulp-env';
import uglify from 'gulp-uglify'

gulp.task('scripts', () => {
    return browserify({
        'entries': ['./app/js/main.js'],
        'debug': true,
        'transform': [
            babelify.configure({
                'presets': ['@babel/preset-env']
            })
        ]
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({'loadMaps': true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/js/'))
    .pipe(browserSync.stream());
});

gulp.task('styles', () => {
    return gulp.src('./app/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css/'))
        .pipe(browserSync.stream());
});


gulp.task('html', () => {
    return gulp.src('app/index.html')
        .pipe(critical.stream({
            'base': 'build/',
            'inline': true,
            'extract': true,
            'minify': true,
            'css': ['./build/css/style.css']
        }))
        .pipe(gulp.dest('build'));
});


gulp.task('cssmin', () => {
    return gulp.src('./app/scss/**/*.scss')
        .pipe(sass({
            'outputStyle': 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('jsmin', () => {
    var envs = env.set({
        'NODE_ENV': 'production'
    });

    return browserify({
        'entries': ['./app/js/main.js'],
        'debug': false,
        'transform': [
            babelify.configure({
                'presets': ['@babel/preset-env']
            })
        ]
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(envs)
    .pipe(buffer())
    .pipe(uglify())
    .pipe(envs.reset)
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('development', () => {
    browserSync({
        'server': './app'
    });

    gulp.watch('./app/scss/**/*.scss',gulp.series('styles'));
    gulp.watch('./app/js/**/*.js', gulp.series('scripts'));
    gulp.watch('./app/*.html', browserSync.reload);
});






gulp.task('default', gulp.series('development'));
gulp.task('deploy', gulp.series('html','cssmin' ,'jsmin'));