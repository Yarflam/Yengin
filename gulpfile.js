const path = require('path');
const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const fs = require('fs');

var npmPublishFolder = path.resolve(__dirname, 'npm-publish');

gulp.task('compile', () => {
    /* Get the last version */
    var scriptName;
    fs.readdirSync(__dirname).map((item, key) => {
        if(item.match(new RegExp('^yengin-([0-9]\.){3}js$')) !== null) {
            scriptName = item;
        }
    });
    /* Copy, uglify and paste */
    if(scriptName||false) {
        gulp.src(path.resolve(__dirname, scriptName))
            .pipe(rename('yengin.js'))
            .pipe(gulp.dest(npmPublishFolder))
            .pipe(rename('yengin.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(npmPublishFolder))
    }
});
