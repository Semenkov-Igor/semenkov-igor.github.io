const { dest, src, parallel, watch, series } = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const browsersync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');

function copyHtml() {
    return src('./src/index.html').pipe(dest('./dist/'));
}

function copyJs() {
    return src('./src/js/*js')
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(babel())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest('./dist/'));
}

function copyVendors() {
    return src(['./node_modules/jquery/dist/jquery.min.js'])
        .pipe(concat('vendors.js'))
        .pipe(dest('./dist/'));
}

function copyCss() {
    return src('./src/*css')
        .pipe(concat('all.css'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(dest('./dist/'));
}

// function watchJs(cb) {
//     watch('./src/js/*js', copyJs)
//     watch('./src/*css', copyCss);
//     cb();
// }

function server(cb) {
    browsersync.init({
        server: {
            baseDir: './dist',
        },
    });

    watch('./src/js/*.js', series(copyJs, reloadBrowser));
    watch('./src/*.css', series(copyCss, reloadBrowser));
    cb();
}

function reloadBrowser(cb) {
    browsersync.reload();
    cb();
}

module.exports.build = parallel(copyHtml, copyVendors, copyJs, copyCss);
// module.exports.watch = series([copyHtml, copyVendors, copyJs, copyCss, watchJs]);
module.exports.serve = series(copyHtml, copyCss, copyVendors, copyJs, server);