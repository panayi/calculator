import connect from 'gulp-connect'
import ghPages from 'gulp-gh-pages'
import gulp from 'gulp'

gulp.task('deploy', () =>
  gulp.src('./dist/**/*')
    .pipe(ghPages())
)

gulp.task('serve-dist', () =>
  connect.server({
    root: 'dist',
    port: 8001,
    livereload: false
  })
)
