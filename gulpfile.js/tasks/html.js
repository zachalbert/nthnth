var config       = require('../config')
if(!config.tasks.html) return

var cdata        = require('contentful-data')
var entries      = null
var util         = require('util')
var browserSync  = require('browser-sync')
var data         = require('gulp-data')
var fs           = require('fs')
var gulp         = require('gulp')
var gulpif       = require('gulp-if')
var handleErrors = require('../lib/handleErrors')
var htmlmin      = require('gulp-htmlmin')
var path         = require('path')
var render       = require('gulp-nunjucks-render')
var exclude      = path.normalize('!**/{' + config.tasks.html.excludeFolders.join(',') + '}/**')

var paths = {
  src: [path.join(config.root.src, config.tasks.html.src, '/**/*.{' + config.tasks.html.extensions + '}'), exclude],
  dest: path.join(config.root.dest, config.tasks.html.dest),
}

var getData = function(file) {
  var dataPath = path.resolve(config.root.src, config.tasks.html.src, config.tasks.html.dataFile)
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
}

gulp.task('cdata', function(cb){
  // Only get entries once per build. Prevents numerous API calls if build run often after a gulp watch, for example.
  if (!entries) {

    var params = {
      apiKey: '11074babe73772987909a59f76eb49bd6c847599d04181087892d6c1049ed1d7',
      spaceId: 'g4u24h1d3en6',
      opts: {
        level: 2
      }
    };

    return cdata(params, function(err, data){
      if(!err) {
        entries = data;
        for( var x in entries ) {
          console.log(util.inspect(x, {showHidden: true, depth: 3}));
        }
        cb();
      } else {
        console.error('error:' + err);
      }
    });
  } else {
    cb();
  }
})
//
// gulp.task('html', ['data'], function(cb){
//   for (var pageId in entries.page){
//
//     // Assign nav and page data to template
//     var locals = {
//       navs: entries.navList,
//       page: entries.page[pageId]
//     }
//
//     // Get pug template to use.
//     var template = entries.page[pageId].fields.template;
//
//     // Compile pug template
//     var compiled = pug.compileFile('./src/templates/' + template + '.pug')(locals);
//
//     // Define path to output template
//     var path = 'path/to/output/compiled/template';
//     path = path + '/' + locals.page.fields.slug;
//     mkpath.sync(path);
//
//     // Write compiled pug template
//     var filename = path + '/index.html';
//     fs.writeFileSync(filename,  compiled);
//   }
//
//   cb();
// });

var htmlTask = function( entries ) {

  return gulp.src(paths.src)
    .pipe(data(getData))
    .on('error', handleErrors)
    .pipe(render({
      path: [path.join(config.root.src, config.tasks.html.src)],
      envOptions: {
        watch: false,
        autoescape: false
      }
    }))
    .on('error', handleErrors)
    .pipe(gulpif(global.production, htmlmin(config.tasks.html.htmlmin)))
    .pipe(gulp.dest(paths.dest))
    .on('end', browserSync.reload)

}



gulp.task('html', ['cdata'], htmlTask)
module.exports = htmlTask
