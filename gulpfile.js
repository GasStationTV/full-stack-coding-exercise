const gulp = require('gulp');
const htmlMinify = require('gulp-htmlmin');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const stylus = require('gulp-stylus');
const cleanMinify = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');

const customOpts = {
  entries: ['./app/app.jsx'],
  debug: false
};
const opts = Object.assign({}, watchify.args, customOpts);
const b = watchify(browserify(opts));
b.transform(["babelify",{
    presets: ["env","react"]
}]);

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    .pipe(uglify())
    // optional, remove if you dont want sourcemaps
    //.pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    //.pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist/js/'));
}

gulp.task('scripts', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

gulp.task('styles', () =>
    gulp.src('app/styles/styles.styl')
        .pipe( stylus() )
        .pipe( cleanMinify() )
        .pipe( gulp.dest('dist/css') )
);

gulp.task('watch', () => {
    gulp.watch('app/styles/*.styl',['styles']);
    //gulp.watch('app/scripts/*.js',['scripts']);
});

gulp.task('default',['styles','scripts','compressImagess','watch']);
