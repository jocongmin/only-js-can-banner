var bannerFn = function (option) {
    var id = option.id;
    var url = option.url;
    var tar = option.container;
    var intervalTime = option.speed;

    //up is option about
    var tarBox = document.querySelector(tar);
    var ie8 = (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0");
    var ie = (window.navigator.userAgent.indexOf("MSIE") >= 1);
    var fadeActIs = true;
    var slideActIs = false;
    startBaner();
    function startBaner() {
        ajax({ //从后端请求数据
            type: "GET",
            url: url + id,
            dataType: "json",
            data: {},
            success: function (res) {
                var $data = eval('(' + res + ')');
                var mainData = $data.Data;
                if (!isEmptyObject(mainData)) {
                    tarBox.style.background = "none";
                    var showType = mainData.baseInfo.showType;
                    if (showType == 1) {
                        fadeActIs = true;
                        slideActIs = false;
                    } else if (showType == 2) {
                        fadeActIs = false;
                        slideActIs = true;
                    } else {
                        fadeActIs = true;
                        slideActIs = false;
                    }
                    actBannerFn(mainData)
                } else {
                    return;
                }
            },
            error: function () {
            }
        });
    }

    function actBannerFn(mainData) {
        var data = mainData.materiel;
        var size = mainData.codeArea;
        var mouseIs = false;
        var fadeTime;
        var fadeOutTime;
        var autoActTime;
        var mainCellLi;
        var pageCellLi;
        var mainCell;
        var pageCell;

        function init() {
            styleFn();
            bannerHtmlFn();
            baseBox();
            function styleFn() { //轮播的样式
                var css = "" + tar + "{width:" + size.width + "px;height:" + size.height + "px;background:url(./img/loading.gif) no-repeat;border:1px solid #ddd;overflow:hidden;}" +
                    ".banner-content{position:relative;overflow:hidden;width:100%;height:100%}" +
                    ".banner-content .mainCell,.banner-content .pageCell{margin:0;padding:0;list-style:none;}" +
                    ".banner-content .mainCell{width:100%;height:100%}" +
                    ".banner-content .mainCell li{width:" + size.width + "px;height:" + size.height + "px;margin:0;padding:0;opacity:0;position:absolute;left:0;top:0;}" +
                    ".banner-content .mainCell li img{width:100%;height:100%;border:0;}" +
                    ".banner-content .pageCell li{float:left;line-height:20px;width:20px;height:20px;background:#fff;color:red;margin-right:5px;text-align:center;}" +
                    ".banner-content .pageCell li:hover{cursor: pointer;}" +
                    ".banner-content .pageCell li.on{color:white;background:#ccc}" +
                    ".banner-content .pageCell{position:absolute;right:5px;bottom:6px;}";
                if (slideActIs) css += ".banner-content .mainCell li{position:relative;float:left;opacity:1;}"
                var x = document.createElement('div');
                x.innerHTML = 'x<style>' + css + '</style>';
                var head = document.getElementsByTagName('head')[0];
                head.appendChild(x.lastChild);
            }

            function bannerHtmlFn() {
                var mainCell = "";
                var pageCell = "";
                for (var i = 0; i < data.length; i++) {
                    if (i == 0) {
                        var mainHtml = "<li style='opacity:1;'><a target='" + ((data[i].isblank == 1) ? '_blank' : '') + "' href='" + data[i].link + "'><img alt='" + data[i].alt + "' src='" + data[i].resource + "' /></a></li>";
                        var pageHtml = "<li class='on' id='" + data[i].id + "'>" + (i + 1) + "</li>";
                    } else {
                        var mainHtml = "<li><a target='" + ((data[i].isblank == 1) ? '_blank' : '') + "' href='" + data[i].link + "'><img alt='" + data[i].alt + "' src='" + data[i].resource + "' /></a></li>";
                        var pageHtml = "<li id='" + data[i].id + "'>" + (i + 1) + "</li>";
                    }
                    mainCell += mainHtml;
                    pageCell += pageHtml;
                }
                mainCell = "<ul class='mainCell'>" + mainCell + "</ul>";
                pageCell = "<ul class='pageCell'>" + pageCell + "</ul>";
                if (data.length == 1) {
                    tarBox.innerHTML = "<div class='banner-content'>" + mainCell + "</div>";
                    return;
                }
                tarBox.innerHTML = "<div class='banner-content'>" + mainCell + pageCell + "</div>";
            }

            function baseBox() {
                mainCellLi = document.querySelectorAll("" + tar + " .mainCell li");
                pageCellLi = document.querySelectorAll("" + tar + " .pageCell li");
                mainCell = document.querySelector(".mainCell");
                pageCell = document.querySelector(".pageCell");
            }
        }

        function reset(t) { //初始化轮播的内容，这样可以再继续下一个轮播，不影响下一个轮播的正常播放。
            var pre = t - 1;
            var idx = pageCellLi[t].id;
            if (t == 0) pre = pageCellLi.length - 1;
            for (var i = 0; i < pageCellLi.length; i++) {
                pageCellLi[i].setAttribute("class", "");
            }
            pageCellLi[t].className = 'on';


            if (!slideActIs) {
                if (fadeTime != undefined) clearInterval(fadeTime); //清除原来正在轮播中的元素的定时fadein的opacity
                if (fadeOutTime != undefined) clearInterval(fadeOutTime); //清除原来正在轮播中的元素的定时fadeout的opacity
                if (mouseIs || ie8) {
                    for (var i = 0; i < mainCellLi.length; i++) {
                        mainCellLi[i].style.opacity = 0;
                        mainCellLi[i].style.display = "none";
                    }
                } else {
                    fadeOutBanner(pre);
                    mainCellLi[pre].style.display = 'none';
                }
            }
            ajax({ //从后端请求数据
                type: "GET",
                url: url + id + "/" + idx,
                success: function (res) { },
                error: function () {
                }
            });
        }

        function fadeOutBanner(i) { //轮播item的渐入显示的功能
            if (fadeOutTime != undefined) clearInterval(fadeOutTime);
            var opacitys = 1;
            fadeOutTime = setInterval(function () {
                opacitys -= 0.1;
                if (opacitys <= 0) {
                    clearInterval(fadeOutTime);
                    return;
                }
                if (opacitys < 0.2) opacitys = 0;
                mainCellLi[i].style.opacity = opacitys;
            }, 100)
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
            }, 100)
        }

        function mouseActionFn() { //page item 的mousever时候的功能

            var hoverTime;
            var which;
            for (var n = 0; n < pageCellLi.length; n++) {
                pageCellLi[n].onmouseover = function () {
                    clearInterval(autoActTime); //清除轮播自动播放的计时器，轮播停止自动播放功能
                    var that = this;
                    mouseIs = true;
                    var theOn = function () {
                        which = parseInt(that.innerHTML) - 1;
                        reset(which);
                        if (!slideActIs) {
                            mainCellLi[which].style.display = 'block';
                            mainCellLi[which].style.opacity = 1;
                        } else {
                            var t = "-" + (which * size.width) + "px";
                            mainCell.style.marginLeft = t;
                        }

                    }
                    hoverTime = setTimeout(function () {
                        theOn();
                    }, 200);
                }
                pageCellLi[n].onmouseout = function () { //mouseout要重新启动轮播的自动播放
                    clearTimeout(hoverTime);
                    mouseIs = false;
                    if (fadeActIs) fadePlayFn();
                    if (slideActIs) slidePlayFn(which + 1);
                }
            }
        }
        var appendOnce = false;
        function slidePlayFn(startWhich) {  //幻灯片播放效果功能函数
            var on = startWhich;
            if (!appendOnce) {
                var clone = mainCell.firstChild.cloneNode(true);
                mainCell.appendChild(clone);
                appendOnce = true;
            }

            var len = mainCellLi.length;
            var itemWidth = size.width;
            var allWidth = len * itemWidth;
            var endWidth = startWhich * itemWidth;
            mainCell.style.width = (len + 1) * 100 + "%";
            var nextOn = function (on) {
                if (leftTime != undefined) clearInterval(leftTime);
                reset(on);                                          //实现轮播的页数切换
                var leftIng = 0;
                var stop = false;
                var startWhich = endWidth - itemWidth;  //endwidth 是一个轮播过程的结束位置，startwidth是一个轮播过程的开始位置；lefting是轮播过程的渐增变量width
                var leftIng = 0;
                var leftTime = setInterval(function () {
                    leftIng += 20;
                    if (leftIng >= (itemWidth - 20)) {
                        leftIng = itemWidth;
                        stop = true;
                    }
                    var t = "-" + (leftIng + startWhich) + "px";
                    if ((leftIng + startWhich) >= (allWidth - 20)) {   //当轮播到最后一张的时候要回归第一张的位置
                        endWidth = itemWidth;
                        t = "0px";
                    }

                    mainCell.style.marginLeft = t;
                    if (stop) {
                        clearInterval(leftTime)
                    }
                }, 15)

                endWidth += itemWidth;
            }
            autoActTime = setInterval(function () { //轮播自动播放的时间名字
                if (on == len) on = 0;
                nextOn(on);
                on++;
            }, intervalTime)
        }


        function fadePlayFn() { //渐变幻灯片效果函数
            var which = function () {
                var which = 0;
                for (var i = 0; i < pageCellLi.length; i++) {
                    var is = (pageCellLi[i].className == 'on');
                    if (is) {
                        which = i;
                    }
                }
                return which;
            }
            var nextOn = function () {
                var i = which() + 1;
                var leng = pageCellLi.length;
                if (i == leng) {
                    i = 0;
                }
                reset(i);
                mainCellLi[i].style.display = 'block';
                fadeInBanner(i);
            }
            autoActTime = setInterval(function () { //轮播自动播放的时间名字
                nextOn()
            }, intervalTime)
        }

        if (data.length == 1) {
            init();
            return;
        }
        init();
        mouseActionFn();
        if (fadeActIs) {
            fadePlayFn();
        } else if (slideActIs) {
            slidePlayFn(1);
        }
    }

    function isEmptyObject(obj) {
        for (var key in obj) {
            return false
        };
        return true
    };



    function ajax(options) {
        options = options || {};
        options.type = (options.type || "GET").toUpperCase();
        options.dataType = options.dataType || "json";
        var params = formatParams(options.data);

        //创建 - 非IE6 - 第一步
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else { //IE6及其以下版本浏览器
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        //接收 - 第三步
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    options.success && options.success(xhr.responseText, xhr.responseXML);
                } else {
                    options.fail && options.fail(status);
                }
            }
        }

        //连接 和 发送 - 第二步
        if (options.type == "GET") {
            xhr.open("GET", options.url + "?" + params, true);
            xhr.send(null);
        } else if (options.type == "POST") {
            xhr.open("POST", options.url, true);
            //设置表单提交时的内容类型
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params);
        }
    }
    //格式化参数
    function formatParams(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace(".", ""));
        return arr.join("&");
    }
};