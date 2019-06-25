const { src, dest, parallel, series, watch } = require('gulp'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    config = {
        src: 'src',
        dist: 'dist'
    };

watch([config.src + '/**/*.js'], function (cb) {
    js();
    cb();
});

watch([config.src + '/**/*.html'], function (cb) {
    html();
    cb();
});

watch([config.src + '/**/*.scss'], function (cb) {
    css();
    cb();
});

function html() {
    return src(config.src + '/**/*.html')
        .pipe(dest(config.dist))
        .pipe(connect.reload());
}

function css() {
    return src(config.src + '/**/*.scss')
        .pipe(concat('app.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(config.dist))
        .pipe(connect.reload());
}

function js() {
    return src([config.src + '/app.js', config.src + '/environments/*.js', config.src + '/**/*.js'], { sourcemaps: true })
        .pipe(concat('app.js'))
        .pipe(dest(config.dist, { sourcemaps: true }))
        .pipe(connect.reload());
}

function cleanAll() {
    return src(config.dist, { read: false, allowEmpty: true })
        .pipe(clean());
}

function serveConnect() {
    connect.server({
        root: [config.dist],
        port: 4200,
        livereload: true
    });
}

exports.js = js;
exports.css = css;
exports.html = html;
exports.clean = cleanAll;
exports.build = parallel(html, js, css);
exports.serve = series(exports.clean, exports.build, serveConnect);
exports.default = series(exports.clean, exports.build);