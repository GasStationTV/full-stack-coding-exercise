const gulp = require('gulp');
const htmlMinify = require('gulp-htmlmin');
//const gbabel = require('gulp-babel');
const uglify = require('gulp-uglify');
const stylus = require('gulp-stylus');
const cleanMinify = require('gulp-clean-css');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');
const mocha = require('gulp-mocha');
const babel = require('babel-register');
const concat = require('gulp-concat');
var modcss = require('modcss');
const customOpts = {
  entries: ['./app/index.jsx'],
  debug: false,
  extensions: ['.jsx','.js']
};
const opts = Object.assign({}, watchify.args, customOpts);
const b = watchify(browserify(opts));
b.transform(["babelify",{
    presets: ["env","react"]
}]);
b.transform(modcss, { paths: [ './dist/css' ] });
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

gulp.task('compressHTML', () =>
    gulp.src(['app/index.html'])
        .pipe( htmlMinify() )
        .pipe( gulp.dest('dist') )
);

gulp.task('frontendTest', () =>
  gulp.src(['app/**/*spec.jsx'], { read: false })
    .pipe(mocha({
      reporter: 'nyan',
      require: ['stylus', 'modcss', './setupTest.js', 'jsdom-global/register'],
      compilers: 'js:babel-core/register'
  }))
    .on('error', gutil.log)
);

gulp.task('styles', () =>
    gulp.src('app/**/*.styl')
        .pipe( stylus() )
        .pipe(concat('styles.css'))
        .pipe( cleanMinify() )
        .pipe( gulp.dest('dist/css') )
);

gulp.task('watch', () => {
  gulp.watch('app/index.html',['compressHTML']);
  gulp.watch('app/**/*.jsx',['frontendTest']);
  gulp.watch('app/**/*.styl',['styles']);
});

gulp.task('default',['frontendTest', 'styles','compressHTML','scripts','watch']);
