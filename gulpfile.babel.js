'use strict';
import gulp from "gulp";
import sass from "gulp-sass";

sass.compiler = require('node-sass');

const routes = {
    style:{
        watch:"assets/scss/*.scss",
        src:"assets/scss/styles.scss",
        dest:"src/static/styles"
    }
}

export function styles(){
    return gulp.src(routes.style.src).pipe(sass.sync().on('error', sass.logError)).pipe(gulp.dest(routes.style.dest))
}

function watchFiles(){
    gulp.watch(routes.style.watch, styles);
}


const dev = gulp.series([styles, watchFiles]);

export default dev;