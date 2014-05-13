var gulp    = require('gulp')
  , rseq    = require('gulp-run-sequence')
  , spawn   = require('child_process').spawn,
    node

gulp.task('serve', function() {
  if (node) node.kill()
  node = spawn('node', ['./app.js'], { stdio: 'inherit' })
  node.on('close', function (code) {
    if (code === 8) gulp.log('Error detected, waiting for changes...')
  })
})

gulp.task('watch', function() {
  return gulp.watch(['./routes/**/*'], ['serve'])
})

gulp.task('default', function(cb) {
  return rseq('serve', 'watch', cb)
})

process.on('exit', function() {
  if (node) node.kill()
})
