let gulp = require('gulp');
let sass = require('gulp-sass');
let uglifycss = require('gulp-uglifycss');

gulp.task('styles', function() {
    return gulp.src('src/styles/**/*.scss')
        .pipe(sass())
        .pipe(uglifycss())
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('default', gulp.series(['styles']));