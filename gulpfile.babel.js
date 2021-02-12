'use strict';
import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import miniCss from "gulp-csso";
import del from "del";
import bro from "gulp-bro";
import babelify from "babelify";

sass.compiler = require('node-sass');

const routes = {
    style:{
        watch:"assets/scss/*.scss",
        src:"assets/scss/styles.scss",
        dest:"src/static/styles"
    },
    js:{
        watch:"assets/js/*.js",
        src:"assets/js/main.js",
        dest:"src/static/js"
    }
}

const styles = () => gulp.src(routes.style.src).pipe(sass.sync().on('error', sass.logError)).pipe(autoprefixer({
        cascade:false
    })).pipe(miniCss()).pipe(gulp.dest(routes.style.dest));

const js = () => gulp.src(routes.js.src).pipe(bro({
    transform: [
      babelify.configure({ presets: ["@babel/preset-env"] }),
      [ 'uglifyify', { global: true } ]
    ]
  })).pipe(gulp.dest(routes.js.dest));

const clean = () => del(['src/static']);

function watchFiles(){
    gulp.watch(routes.style.watch, styles);
    gulp.watch(routes.js.watch, js);
}


const dev = gulp.series([clean, js, styles, watchFiles]);

export default dev;