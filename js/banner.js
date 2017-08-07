var bannerFn=function (option) {
    var size=option.size.split(",");
    var id=option.id;
    var tar=option.container;
    //up is option about
    var tarBox = document.querySelector(tar);
    var mainCellLi;
    var pageCellLi;
    var intervalTime = 2000;
    var fadeTime;
    var autoActTime;
    var data = [{
            "img_url": "http://ubmcmm.baidustatic.com/media/v1/0f000PiLlDS6d3KnOmCIAf.jpg",
            "link_url": "http://www.baidu.com"
        },
        {
            "img_url": "http://ubmcmm.baidustatic.com/media/v1/0f000AjMbHTgRXO7oX7DD6.png",
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


    function styleFn() { //轮播的样式
        var css = "#banner-box{}" +
            ".banner-content{position:relative;width:"+size[0]+"px;height:"+size[1]+"px;overflow:hidden;}" +
            ".mainCell,.pageCell{margin:0;padding:0;list-style:none;}" +
            ".mainCell{width:100%;height:100%}" +
            ".mainCell li{width:100%;height:100%;opacity:0;position:absolute;left:0;top:0;}" +
            ".mainCell li img{width:100%;height:100%;}" +
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
                var mainHtml = "<li style='opacity:1;'><img src=" + data[i].img_url + " /></li>";
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
        tarBox.innerHTML = "<div class='banner-content'>" + mainCell + pageCell + "</div>";
    }

    function reset() { //初始化轮播的内容，这样可以再继续下一个轮播，不影响下一个轮播的正常播放。
        pageCellLi.forEach(function (pli, pi) {
            pli.classList.remove('on');
        })
        mainCellLi.forEach(function (mli, mi) {
            if (fadeTime != undefined) clearInterval(fadeTime); //清除原来正在轮播中的元素的定时fadein的opacity
            mli.style.opacity = 0;
        })
    }

    function fadeInBanner(i) { //轮播item的渐入显示的功能
        if (fadeTime != undefined) clearInterval(fadeTime);
        var opacitys = 0;
        fadeTime = setInterval(function () {
            opacitys += 0.1;
            if (opacitys > 1) {
                clearInterval(fadeTime);
                return;
            }
            mainCellLi[i].style.opacity = opacitys;
        }, 50)
    }

    function bannerActionFn() { //page item 的mousever时候的功能
        mainCellLi = document.querySelectorAll('.mainCell li');
        pageCellLi = document.querySelectorAll('.pageCell li');
        pageCellLi.forEach(function (li, i) {
            li.onmouseover = function (e) {
                clearInterval(autoActTime); //清除轮播自动播放的计时器，轮播停止自动播放功能
                reset();
                e.target.classList.add('on');
                fadeInBanner(i);
            }
            li.onmouseout = function () { //mouseout要重新启动轮播的自动播放
                autoPlayFn();
            }
        })
    }

    function autoPlayFn() { //自动播放的功能，让轮播可以自动播放
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
            var leng = pageCellLi.length;
            if (i == leng) {
                i = 0;
            }
            reset();
            pageCellLi[i].classList.add('on');
            fadeInBanner(i);
        }
        autoActTime = setInterval(function () { //轮播自动播放的时间名字
            nextOn()
        }, intervalTime)
    }
    bannerHtmlFn();
    styleFn();
    bannerActionFn();
    autoPlayFn();
};