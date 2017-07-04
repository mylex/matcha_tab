var
    gulp = require("gulp"),
    concat = require("gulp-concat"),
    htmlmin = require("gulp-htmlmin"),
    uglify = require("gulp-uglify"),
    runSequence = require('run-sequence'),
    concatCss = require('gulp-concat-css'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css');

var scripts = [
    'js/jquery.min.js',
    'js/bootstrap.min.js',
    'js/moment.min.js',
    'js/jsoup_cl_mas.js',
    'js/settings.js',
    'js/get_rss_article.js',
    'js/history_data.js',
    'js/image_upload.js',
    'js/common.js',
    'js/analytics.js'
];

var styles = [
    'css/*'
];
// JS Minify
gulp.task('js.minify', function() {
    return gulp.src(scripts)
        .pipe(concat('index.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

//CSS Minify
gulp.task('uglyCSSFiles', function() {
    return gulp.src(styles)
        .pipe(concatCss("all.css"))
        .pipe(gulp.dest('./dist/'))
        .pipe(rename('all.min.css'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./dist/'));
});

// HTML Minify
gulp.task('html.minify', function() {
    return gulp.src('index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true,
            removeAttributeQuotes: true
        }))
        .pipe(gulp.dest('dist'));
});

// Default
gulp.task('default', function() {
    return runSequence(
        'js.minify',
        'html.minify',
        'uglyCSSFiles'
    );
});