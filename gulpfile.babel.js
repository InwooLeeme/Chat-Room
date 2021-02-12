'use strict';
import gulp from "gulp";
import sass from "gulp-sass";
import del from "del";

sass.compiler = require('node-sass');

const routes = {
    style:{
        src:"assets/scss/styles.scss",
        dest:"src/static/styles"
    }
}

export function styles(){
    return gulp.src(routes.style.src).pipe(sass.sync().on('error', sass.logError)).pipe(gulp.dest(routes.style.dest))
}
