// PLEASE NOTE THIS FILE NOW REQUIRES GULP V4
// https://www.liquidlight.co.uk/blog/how-do-i-update-to-gulp-4/

// to stop npm EACCESS errors install npm this way:
// https://github.com/nvm-sh/nvm



var gulp        = require('gulp');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var gp_rename   = require("gulp-rename");
var gutil       = require('gulp-util');
var sass        = require("gulp-sass")(require("sass"));
var sourcemaps  = require('gulp-sourcemaps');
var minifyCss   = require("gulp-clean-css");
var hasher      = require('gulp-hasher');
var buster      = require('gulp-cache-buster');




gulp.task('cache',  function() {
    return gulp.src('layouts/main.twig')
    .pipe(buster({
        tokenRegExp: /\/(concat\.min\.css)\?v=[0-9a-z]+/,
        assetRoot: __dirname + '/static/deploy/',
        hashes: hasher.hashes,
    }))
    .pipe(gulp.dest('layouts/'));
});


gulp.task('minify-css', function () {
    return gulp.src([
        './static/deploy/concat.css',
    ]) 
    .pipe(gp_rename({suffix: '.min'}))
    .pipe(minifyCss())
    .pipe(gulp.dest('./static/deploy'))
    .pipe(hasher());
});

gulp.task("cache-amp", function () {
    return gulp
      .src("amp/layouts/main.twig")
      .pipe(
        buster({
          tokenRegExp: /\/(amp\.min\.css)\?v=[0-9a-z]+/,
          assetRoot: __dirname + "/static/deploy/",
          hashes: hasher.hashes,
        })
      )
      .pipe(gulp.dest("amp/layouts/"));
  });
  
  gulp.task("minify-amp", function () {
    return gulp
      .src(["./static/css/amp.css"])
      .pipe(gp_rename({ suffix: ".min" }))
      .pipe(minifyCss())
      .pipe(gulp.dest("./static/deploy"))
      .pipe(hasher());
  });




gulp.task('concat', function () {
    return gulp.src([
        './static/css/main.css',
        './static/js/plugins/jquery.noty-2.3.8/demo/animate.css',
        './static/js/sdk/media-player/mediaelementplayer.css',
        './static/js/plugins/owl.carousel.min.css',
        './static/js/plugins/owl.theme.default.css',

    ]) // path to your file
    .pipe(concat('concat.css'))

    .pipe(gulp.dest('./static/deploy'));
});


gulp.task('sass', function() {
    return gulp.src([
            './static/sass/main.scss',
        ])
        .pipe(sourcemaps.init())
        .pipe(sass({includePaths: [
            './static/sass/components', 
            './static/sass/cards', 
            './static/sass/vendors', 
        ]}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./static/css'));
});

gulp.task("amp_sass", function () {
    return (
      gulp
        .src(["./static/ampsass/amp.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest("./static/css"))
    );
  });

gulp.task('jscache',  function() {
    return gulp.src('layouts/partials/_javascript.twig')
      .pipe(buster({
        tokenRegExp: /\/(deploy\/scripts\.js)\?v=[0-9a-z]+/,
        assetRoot: __dirname + '/static/',
        hashes: hasher.hashes,
      }))
      .pipe(gulp.dest('layouts/partials/'));
  });
  


gulp.task('scripts-concat', function(){
	return gulp.src([
        './static/js/plugins/jquery3.3.1.js',
        './static/js/plugins/jquery-ui/jquery-ui-1.10.1.custom.min.js',

        // only used for social pop ups
        './static/js/plugins/bootstrap/popper.min.js',
        './static/js/plugins/bootstrap/bootstrap.min.js',
        './static/js/plugins/bootstrap/bootstrap-modalmanager.js',
        './static/js/plugins/bootstrap/bootstrap-modal.js',

        './static/js/plugins/jquery.noty-2.3.8/js/noty/packaged/jquery.noty.packaged.min.js',
        './static/js/plugins/fancybox/jquery.fancybox.js',

        // validate used when signing in on login.twig
        './static/js/plugins/jquery.validate/jquery.validate.min.js',

        // waypint used for infinite scroll on section pages
        './static/js/plugins/waypoint/lib/jquery.waypoints.min.js',
        
        './static/js/plugins/handlebars-v4.0.5.js',
        './static/js/plugins/jquery.lazyload.min.js',
        './static/js/plugins/jquery.dotdotdot.min.js',
        './static/js/plugins/owl.carousel.min.js',
        './static/js/plugins/moment.js',
        // './static/js/plugins/bootstrap-datetimepicker.js',
        './static/js/plugins/bootstrap4-datetime/src/js/bootstrap-datetimepicker.js',
        './static/js/plugins/ticker.js',

        './static/js/sdk/blog.js',
        './static/js/sdk/image.js',
        './static/js/sdk/disqus.js',
        './static/js/sdk/yii/yii.js',
        './static/js/sdk/article.js',
        './static/js/sdk/uploadfile.js',
        './static/js/sdk/video-player.js',
        './static/js/sdk/notification.js',
        './static/js/sdk/user-articles.js',

        './static/js/sdk/yii/yii.captcha.js',
        './static/js/sdk/cloudinary/jquery.cloudinary.js',
        './static/js/sdk/media-player/mediaelement-and-player.min.js',

        './static/js/framework.js',
        './static/js/!(framework)*.js', // all files that end in .js EXCEPT framework*.js
		])
		.pipe(concat('concat.js'))
		.pipe(gulp.dest('./static/deploy'))
		.pipe(gp_rename('scripts.js'))
		.pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest('./static/deploy'))
        .pipe(hasher())
        ;

});



gulp.task('watch', function (){
	gulp.watch('./static/sass/**/*.scss', gulp.series(['styles']));
	gulp.watch('./static/js/**/*.js', gulp.series(['scripts']));
});


gulp.task('styles', gulp.series('sass', 'concat', 'minify-css', 'cache', function(done) {
    done();
}));

gulp.task(
    "amp",
    gulp.series("amp_sass", "minify-amp", "cache", function (done) {
      done();
    })
  );

gulp.task('scripts', gulp.series('scripts-concat', 'jscache', function (done) {
    done();
}));



gulp.task('default', gulp.parallel('scripts', 'styles'));