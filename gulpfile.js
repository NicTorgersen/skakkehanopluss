const gulp = require('gulp')
const gulp_zip = require('gulp-zip')
const fs = require('fs')
const del = require('del')
const pconf = require('./package.json')

const conf = {
    firefox: {
        build: 'build/firefox/',
        debug: 'debug/firefox/',
    },
    chrome: {
        build: 'build/chrome/',
        debug: 'debug/chrome/',
    }
}

// snakk om quick'n'dirty shit

gulp.task('chrome:debug', () => {
    gulp.src(['src/chrome/**', 'src/common/**', 'src/manifest.json'])
        .pipe(gulp.dest(conf.chrome.debug))
})
gulp.task('chrome:build', () => {
    gulp.src(['src/chrome/**', 'src/common/**', 'src/manifest.json'])
        .pipe(gulp.dest(conf.chrome.build + 'tmp'))
        .pipe(gulp_zip('chrome-' + pconf.version + '.zip'))
        .pipe(gulp.dest(conf.chrome.build))

})

gulp.task('firefox:debug', () => {
    gulp.src(['src/firefox/**', 'src/common/**', 'src/manifest.json'])
        .pipe(gulp.dest(conf.firefox.debug))
})
gulp.task('firefox:build', () => {
    gulp.src(['src/firefox/**', 'src/common/**', 'src/manifest.json'])
        .pipe(gulp.dest(conf.firefox.build + 'tmp'))
        .pipe(gulp_zip('firefox-' + pconf.version + '.zip'))
        .pipe(gulp.dest(conf.firefox.build))
})

gulp.task('debug:watch', () => {
    gulp.watch('src/**', ['chrome:debug', 'firefox:debug'])
})
gulp.task('default', ['chrome:debug', 'firefox:debug', 'chrome:build', 'firefox:build'])
