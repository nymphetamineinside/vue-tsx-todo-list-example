var gulp = require('gulp'),
    webpack = require('webpack-stream');

// Run webpack
gulp.task('webpack', function(){
    return gulp.src(['./src/*.ts'])
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest('./dist'));
});

// Copy index.html file
gulp.task('index', function(){
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'));
});

// Default task
gulp.task('default', ['webpack', 'index']);