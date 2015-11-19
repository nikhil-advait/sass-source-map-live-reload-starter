var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
//var autoprefixer = require('gulp-autoprefixer');
//var sassdoc = require('sassdoc');


gulp.task('browser-sync', ['nodemon'], function(){
	browserSync({
        proxy: 'localhost:' + 8000, // main server is running on port 8000.
        files: ['static_files/css/*.css', 'server/views2/**/*.ejs'], //'static_files/**/*.css', 
        //port: 7000,
    });
});

gulp.task('nodemon', function(cb){ //if server.js file is edited then nodemon will restart the server
	var started = false;
	
	return nodemon({
		script: 'server.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});



// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

var input = './static_files/scss/*.scss';
var output = './static_files/css';
var sassOptions = { outputStyle: 'expanded', sourceMap: true, sourceComments: 'map'};
//var autoprefixerOptions = { browsers: ['last 2 versions', '> 5%', 'Firefox ESR'] };
//var sassdocOptions = { dest: './public/sassdoc' };


// -----------------------------------------------------------------------------
// Sass compilation
// -----------------------------------------------------------------------------

gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    //.pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output));
});


// -----------------------------------------------------------------------------
// Sass documentation generation
// -----------------------------------------------------------------------------

/*gulp.task('sassdoc', function () {
  return gulp
    .src(input)
    .pipe(sassdoc(sassdocOptions))
    .resume();
});
*/

// -----------------------------------------------------------------------------
// Watchers
// -----------------------------------------------------------------------------

gulp.task('watch', function() {
  return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    .watch(input, ['sass'])
    // When there is a change,
    // log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});


// -----------------------------------------------------------------------------
// Production build
// -----------------------------------------------------------------------------

/*gulp.task('prod', ['sassdoc'], function () {
  return gulp
    .src(input)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output));
});*/


// -----------------------------------------------------------------------------
// Default task
// -----------------------------------------------------------------------------

gulp.task('default', ['sass', 'watch', 'browser-sync']);