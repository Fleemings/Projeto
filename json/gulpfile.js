// GULP configuration

/*

npm install gulp gulp-sass gulp-clean-css gulp-rename gulp-sourcemaps
npm install sass

*/

const gulp        = require('gulp'),
      sass        = require('gulp-sass')(require('sass')),
      cleanCSS    = require('gulp-clean-css'),
      rename      = require('gulp-rename'),
      sourcemaps  = require('gulp-sourcemaps');

/*
Ficheiro default e minimizado
*/

gulp.task("default", function () {
  return gulp
    .src("../scss/*.scss")
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("../css/"))
    .on("error", handleError);
});

gulp.task("minify", async function () {
  return gulp
    .src(["../css/*.css", "!../css/*.min.css"])
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("../css/"))
    .on('end', function(){
      console.log("** Compiled **");
    })
    .on("error", handleError);
});

gulp.task(
  "watch",
  gulp.series(function () {
    gulp.watch("../scss/*.scss", gulp.series(["default", "minify"]));
  })
);

function handleError(err) {
  console.log(err.toString());
  process.exit(-1);
}
