/*
* Dependencias
*/
var gulp = require('gulp'),
  del = require('del'),
  runSequence = require('run-sequence'),
  gulpIf = require('gulp-if'),
  repoWatch = require('gulp-repository-watch');

var exec = require('child_process').exec;

/*
* Ubicacion de archivos
*/
var sourceRoot = "dist/";
var destinationPath = 'build';
var deletePath = [destinationPath + '/**']
var repoPath = 'git@github.com:FedeMadoery/pruebaConfigGulp.git#master'

/*
* Build para produccion
*/
gulp.task('buildProd', function(){
  devMode = false;
  gulp.start('cleanBuild')
});

/*
* Limpia y buildea
*/
gulp.task('cleanBuild', function () {
  runSequence('clean', 'ngBuild','repo-watch');
});

/*
* Ejecuta ng build en en consola
 */
gulp.task('ngBuild', function (cb) {
  exec('ng build', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

/*
* Borra el contenido del path destino
*/
gulp.task('clean', function () {
  return del(deletePath);
});


gulp.task('repo-watch', function() {
  repoWatch({
    repository: 'repoPath'
  })
    .on('check', function() {
      console.log('ping');
    })
    .on('change', function(newHash, oldHash) {
      console.log('Changed from ', oldHash, ' to ', newHash);
    });
});
