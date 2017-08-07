var tarBox = document.getElementById('banner-box');
var mainCellLi;
var pageCellLi;
var intervalTime=1000;
var timer;
var data = [{
        "img_url": "http://ubmcmm.baidustatic.com/media/v1/0f000PiLlDS6d3KnOmCIAf.jpg",
        "link_url": "http://www.baidu.com"
    },
    {
        "img_url": "http://ubmcmm.baidustatic.com/media/v1/0f000KXcAEY50TO6L64F9f.jpg",
        "link_url": "http://www.baidu.com"
    },
    {
        "img_url": "http://ubmcmm.baidustatic.com/media/v1/0f000AjMbHTgRXO7oX7DD6.png",
        "link_url": "http://www.baidu.com"
    }
];

function reset() {
    pageCellLi.forEach(function (pli, pi) {
        pli.classList.remove('on');
    })
    mainCellLi.forEach(function (mli, mi) {
        mli.style.display = 'none';
    })
}

function styleFn() {
    var css = "#banner-box{position:relative;}" +
        ".mainCell,.pageCell{margin:0;padding:0;list-style:none;}" +
        ".mainCell{width:100%;height:100%}" +
        ".mainCell li{width:100%;height:100%}" +
        ".pageCell li{float:left;line-height:20px;width:20px;height:20px;background:#fff;color:red;margin-right:5px;text-align:center;}" +
        ".pageCell li:hover{cursor: pointer;}" +
        ".pageCell li.on{color:white;background:#ccc}" +
        ".pageCell{position:absolute;right:10px;bottom:10px;}";
    var style = document.createElement('style');
    style.innerHTML = css;
    tarBox.appendChild(style);
}

function bannerHtmlFn() {
    var mainCell = "";
    var pageCell = "";
    for (var i = 0; i < data.length; i++) {
        if (i == 0) {
            var mainHtml = "<li><img src=" + data[i].img_url + " /></li>";
            var pageHtml = "<li class='on'>" + (i + 1) + "</li>";
        } else {
            var mainHtml = "<li><img src=" + data[i].img_url + " /></li>";
            var pageHtml = "<li>" + (i + 1) + "</li>";
        }
        mainCell += mainHtml;
        pageCell += pageHtml;
    }
    mainCell = "<ul class='mainCell'>" + mainCell + "</ul>";
    pageCell = "<ul class='pageCell'>" + pageCell + "</ul>";
    tarBox.innerHTML = mainCell + pageCell;
}

function bannerActionFn() {
    mainCellLi = document.querySelectorAll('.mainCell li');
    pageCellLi = document.querySelectorAll('.pageCell li');
    pageCellLi.forEach(function (li, i) {
        li.onmouseover = function (e) {
            clearInterval(timer);
            reset();
            e.target.classList.add('on');
            mainCellLi[i].style.display = 'block';
        }
        li.onmouseout=function(){
            autoPlayFn();
        }
    })
}

function autoPlayFn() {
    var which = function () {
        var which = 0;
        pageCellLi.forEach(function (li, i) {
            var is = li.classList.contains('on');
            if (is) {
                which = i;
                console.log(which, 'which')
            }
        })
        return which;
    }
    var nextOn = function () {
        var i = which() + 1;
        var leng=pageCellLi.length;
        if(i==leng){
            i=0;
        }
        reset();
        pageCellLi[i].classList.add('on');
        mainCellLi[i].style.display = 'block';
    }
    timer=setInterval(function () {
        nextOn()
    }, intervalTime)
}
bannerHtmlFn();
styleFn();
bannerActionFn();
autoPlayFn();