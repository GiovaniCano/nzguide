const { src, dest, watch, parallel } = require('gulp')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const rename = require('gulp-rename')

const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const terser = require('gulp-terser-js')
const sourcemaps = require('gulp-sourcemaps')

function images(){
    return src('src/img/**/*')
    .pipe( imagemin() )
    .pipe( dest('./build/img') )
    .pipe( src('build/img/**/*') )
    .pipe( webp() )
    .pipe( dest('./build/img') )
}
function css() {
    return src('src/sass/**/*.scss')
    .pipe( sass({ outputStyle:'expanded', indentWidth:4 }) )
    .pipe( dest('./build/css') )
}
function js() {
    return src('src/js/**/*.js')
    .pipe( concat('bundle.js') )
    .pipe( dest('./build/js') )
}

function cssFinal() {
    return src('src/sass/**/*.scss')
    .pipe( sourcemaps.init() )
    .pipe( sass() )
    .pipe( postcss([ autoprefixer(), cssnano() ]) )
    .pipe( sourcemaps.write('.') )
    .pipe( dest('./build/css') )
}
function jsFinal() {
    return src('src/js/**/*.js')
    .pipe( sourcemaps.init() )
    .pipe( concat('bundle.js') )
    .pipe( terser() )
    .pipe( sourcemaps.write('.') )
    .pipe( dest('./build/js') )
}

function watchFiles() {
    watch('src/sass/**/*.scss',css)
    watch('src/js/**/*.js',js)
}



exports.images = images

exports.css = css
exports.js = js
exports.start = parallel( css, js )

exports.cssFinal = cssFinal
exports.jsFinal = jsFinal
exports.final = parallel( cssFinal, jsFinal )

exports.default = watchFiles