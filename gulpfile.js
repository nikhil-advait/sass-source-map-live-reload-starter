var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('browser-sync', ['nodemon'], function(){
	browserSync({
        proxy: 'localhost:' + 8000, // main server is running on port 8000.
        files: ['src/static_files/css/*.css', 'src/views/views2/**/*.ejs'], //'static_files/**/*.css',
        //port: 7000
    });
});

gulp.task('nodemon', function(cb){ //if server.js file is edited then nodemon will restart the server
	var started = false;

	return nodemon({
		script: 'src/server.js'
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

var input = ['./src/static_files/scss/*.scss', './src/static_files/input_css/*.css'];
var output = './src/static_files/css';
var sassOptions = { outputStyle: 'expanded', sourceMap: true, sourceComments: 'map'};

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
// Default task
// -----------------------------------------------------------------------------

gulp.task('default', ['sass', 'watch', 'browser-sync']);
