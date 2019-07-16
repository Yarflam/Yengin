const path = require('path');
const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
// const run = require('gulp-run-command').default;
const fs = require('fs');

var npmSourceFolder = path.resolve(__dirname, 'source');
npmPublishFolder = path.resolve(__dirname);

/* Get the last version of Yengin */
function getLastVersion() {
    var scriptName;
    fs.readdirSync(npmSourceFolder).map((item, key) => {
        if (item.match(new RegExp('^yengin-([0-9].){3}js$')) !== null) {
            scriptName = item;
        }
    });
    return scriptName;
}

/* Copy, uglify and paste */
gulp.task('build', () => {
    console.log('@Build');
    const scriptName = getLastVersion();
    if (scriptName || false) {
        gulp.src(path.resolve(npmSourceFolder, scriptName))
            .pipe(rename('yengin.js'))
            .pipe(gulp.dest(npmPublishFolder))
            .pipe(rename('yengin.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(npmPublishFolder));
    }
});
