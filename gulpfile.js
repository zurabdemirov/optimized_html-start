var gulp = require("gulp");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();


function css_style(done){
    gulp.src("./scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({
        errLogToConsole:true,
        outputStyle:"compressed"
    }))
    .on("error", console.error.bind(console))
    .pipe(autoprefixer({
        cascade:false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./css/"))
    .pipe(browserSync.stream());

    done();

}

function browerReload(done){
    browserSync.reload();
    done();
}


function sync(done){
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port:3000
    });
done();
}

function watchFiles(){
    gulp.watch("./scss/**/*", css_style);
    gulp.watch("./**/*.html", browerReload);
    gulp.watch("./**/*.php", browerReload);
    gulp.watch("./**/*.js", browerReload);
}

gulp.task("default", gulp.parallel(watchFiles,sync));
gulp.task(sync);