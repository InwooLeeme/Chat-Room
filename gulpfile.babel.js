'use strict';
import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import miniCss from "gulp-csso";
import del from "del";

sass.compiler = require('node-sass');

const routes = {
    style:{
        watch:"assets/scss/*.scss",
        src:"assets/scss/styles.scss",
        dest:"src/static/styles"
    }
}

function styles(){
    return gulp.src(routes.style.src).pipe(sass.sync().on('error', sass.logError)).pipe(autoprefixer({
        cascade:false
    })).pipe(miniCss()).pipe(gulp.dest(routes.style.dest))
}

const clean = () => del(['src/static']);

function watchFiles(){
    gulp.watch(routes.style.watch, styles);
}


const dev = gulp.series([clean, styles, watchFiles]);

export default dev;