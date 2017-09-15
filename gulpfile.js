// 引入 gulp
var gulp = require('gulp');

var watch = require('gulp-watch'),
    fs = require('fs'),
    spriter = require('gulp-css-spriter'),
    spritesmith = require('gulp.spritesmith'),
    imagemin = require('gulp-imagemin'),
    pngquant = require("imagemin-pngquant"),
    base64 = require('gulp-base64'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require("gulp-rename"),
    cssmin = require('gulp-cssmin'),
    cssclean = require('gulp-clean-css'),
    cssimport = require("gulp-cssimport"),
    connect = require('gulp-connect'),
    envify = require('gulp-envify'),
    rev = require('gulp-rev'),
    concat = require('gulp-concat'),
    uglifyjs = require('gulp-uglify'),
    less = require('gulp-less'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    contentIncluder = require('gulp-content-includer'),
    sass = require('gulp-sass'),
    uncss = require('gulp-uncss-sp'),
    htmlreplace = require('gulp-html-replace'),
    del = require('del'),
    watchFile = (w_path, w_task) => {
        var chokidar = require('chokidar');
        chokidar.watch(w_path, {
            ignored: /[\/\\]\./
        }).on('all', (event, path) => {
            console.log(event, path, 'info');
            if (w_task == 'scss' && event == 'unlink') {
                del(['./css/*.css'])
            }
            if (w_task == 'copyimg') {}

            gulp.run(w_task);

        });
    };
var serverIng;
var noNeed = ['./build/css/_icon.css', './build/css/_base.css', './build/_comm.css'];

gulp.task('watch', function() {
    gulp.watch('./scss/*.scss', ['scss']);
});
gulp.task('watchIcon', function() {
    watchFile('./work/img/icon/**/*.png', 'icon2');
});
gulp.task('watchScss', function() {
    watchFile('./work/**/*.scss', 'scss');
});
gulp.task('watchJs', function() {
    watchFile('./work/**/*.js', 'toes5');
});

gulp.task('watchHtml', function() {
    watchFile('./work/**/*.html', 'htmlbuild');
});
gulp.task('watchImg', function() {
    watchFile('./work/img/*.*', 'imagemin');
});
gulp.task('copy', function() {
    watchFile('./work/**/*.js', 'copyjs');
    watchFile('./work/**/*.wxml', 'copyhtml');
    watchFile('./work/**/*.json', 'copyjson');
    watchFile('./work/**/*.png', 'copypic');
    gulp.task('copyjs', function() {
        del(['./build/**/*.js'])
        gulp.src('./work/**/*.js')
            .pipe(gulp.dest('./build/'));
    })
    gulp.task('copyhtml', function() {
        del(['./build/**/*.wxml'])
        gulp.src('./work/**/*.wxml')
            .pipe(gulp.dest('./build/'));
    })
    gulp.task('copyjson', function() {
        del(['./build/**/*.json'])
        gulp.src('./work/**/*.json')
            .pipe(gulp.dest('./build/'));
    })

    gulp.task('copypic', function() {
        gulp.src('./work/**/*.png')
            .pipe(gulp.dest('./build/'));
        gulp.src('./work/**/*.jpg')
            .pipe(gulp.dest('./build/'));
    })
})

gulp.task('default', ['watchScss', 'copy']);

gulp.task('server', function() {
    serverIng = connect.server({
        root: './',
        port: 8088,
        livereload: true
    });
});
gulp.task('reload', function() {
    gulp.src('./build/*.html').pipe(connect.reload());
});

gulp.task('replace', function() {
    var timestamp = Date.parse(new Date());
    gulp.src('./build/*.html')
        .pipe(htmlreplace({
            'js': 'js/bundle-' + timestamp + '.js',
        }))
        .pipe(gulp.dest('./build/'));
});

gulp.task('htmlbuild', function() {
    gulp.src("./work/*.html")
        .pipe(contentIncluder({
            includerReg: /<!\-\-include\s+"([^"]+)"\-\->/g
        }))
        .pipe(gulp.dest('./build/'))
        .on('end', () => {
            gulp.run('reload')
        });
});

// 编译Sass
gulp.task('scss', function() {
    var options = {
        matchPattern: "!_icon.{scss}" // all except less and sass
    };
    gulp.src(['./work/**/*.scss'])
        .pipe(cssimport(options))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 6 Chrome versions', 'last 4 Explorer versions', 'Firefox ESR', 'last 2 Explorer versions', 'iOS >= 5', 'Android >= 4.0', '> 5%'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(cssclean({
            compatibility: 'ie7'
        }))
        .pipe(rename(function(path) {
            path.extname = ".wxss"
        }))
        .pipe(gulp.dest('./build/'))
});

gulp.task('uncss', function() {
    return gulp.src('css/*.css')
        .pipe(uncss({
            html: ['*.html']
        }))
        .pipe(gulp.dest('./css'));
});

gulp.task('cssmin', function() {
    gulp.src(['./css/*.css'])
        .pipe(cssmin())
        .pipe(gulp.dest('./css'));
});

gulp.task('toes5', () => {
    var vendors = [];
    browserify({
            entries: ['./work/js/index.js'],
            extensions: ['.js', '.jsx'],
            debug: true
        })
        .external(vendors)
        .transform(["babelify", {
            babelrc: false,
            presets: ['es2015']
        }])
        .bundle()
        .pipe(fs.createWriteStream("./build/js/bundle.js"));
});

gulp.task('ugjs', () => {
    gulp.src('./js/act_banner.js')
        .pipe(uglifyjs())
        .pipe(rename('act_banner.min.js'))
        .pipe(gulp.dest('./js'))
})



gulp.task('sprite', function() {
    var timestamp = +new Date();
    return gulp.src('./scss/*.scss')
        .pipe(spriter({
            'spriteSheet': './img/' + timestamp + '.png',
            'pathToSpriteSheetFromCSS': '../img/' + timestamp + '.png'
        }))
        .pipe(gulp.dest('./test'));
});


gulp.task('icon2', function() {
    return gulp.src('./work/img/icon/*.png')
        .pipe(spritesmith({
            imgName: 'work/img/sprite.png',
            cssName: 'work/scss/_icon.scss',
            padding: 20,
            algorithm: 'binary-tree',
            cssTemplate: function(data) {
                var arr = [];
                data.sprites.forEach(function(sprite) {
                    var $width = parseInt(sprite.px.width);
                    var $height = parseInt(sprite.px.height);
                    var $ofx = parseInt(sprite.px.offset_x);
                    var $ofy = parseInt(sprite.px.offset_y);
                    var $tw = sprite.total_width;
                    var $th = sprite.total_height;
                    arr.push("@mixin icon-" + sprite.name +
                        "{" +
                        "background-image: url(" + sprite.escaped_image + ");" +
                        "background-position: " + $ofx + "px " + $ofy + "px;" +
                        "width:" + $width + "px;" +
                        "height:" + $height + "px;" +
                        "background-size:" + $tw + "px " + $th + "px;" +
                        "background-repeat:" + "no-repeat;" +
                        "display:" + "inline-block;" +
                        "}\n");
                });
                return arr.join("");
            }
        }))
        .pipe(gulp.dest('./'));
});
gulp.task('imagemin', function() {
    gulp.src('./work/img/*.{png,jpg,gif,ico,mp4}')
        .pipe(gulp.dest('./build/img/'));
});



gulp.task('base', ['sass'], function() {
    return gulp.src('./scss/_reset.scss')
        .pipe(base64({
            baseDir: 'xgou',
            extensions: ['png'],
            maxImageSize: 20 * 1024,
            debug: false
        }))
        .pipe(gulp.dest('./scss/'));
});
