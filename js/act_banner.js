
var bannerFn = function (option) {
    var id = option.id;
    var url = option.url;
    var tar = option.container;
    var intervalTime = option.speed;
    if(intervalTime<=3000) intervalTime=3000;

    //up is option about
    var tarBox = document.querySelector(tar);
    var ie8 = (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0");
    var ie = (window.navigator.userAgent.indexOf("MSIE") >= 1);
    var fadeActIs = true;
    var slideActIs = false;
    tarBox.style.backgroundImage="url(data:image/gif;base64,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)";
    tarBox.style.backgroundRepeat="no-repeat"; 
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
        var watchOver = {};        
        function init() {  //初始化轮播的基本结构
            styleFn();
            bannerHtmlFn();
            baseBox();
            function styleFn() { //轮播的样式
                var css = "" + tar + "{width:" + size.Width + "px;height:" + size.Height + "px;border:1px solid #ddd;overflow:hidden;}" +
                    ".banner-content{position:relative;overflow:hidden;width:100%;height:100%}" +
                    ".banner-content .mainCell,.banner-content .pageCell{margin:0;padding:0;list-style:none;}" +
                    ".banner-content .mainCell{width:100%;height:100%}" +
                    ".banner-content .mainCell li{width:" + size.Width + "px;height:" + size.Height + "px;margin:0;padding:0;opacity:0;position:absolute;left:0;top:0;}" +
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
                        var mainHtml = "<li style='opacity:1;'><a target='" + ((data[i].IsBlank == 1) ? '_blank' : '') + "' href='" + data[i].Link + "'><img alt='" + data[i].Alt + "' src='" + data[i].Resource + "' /></a></li>";
                        var pageHtml = "<li class='on' id='" + data[i].Id + "'>" + (i + 1) + "</li>";
                    } else {
                        var mainHtml = "<li><a target='" + ((data[i].IsBlank == 1) ? '_blank' : '') + "' href='" + data[i].Link + "'><img alt='" + data[i].Alt + "' src='" + data[i].Resource + "' /></a></li>";
                        var pageHtml = "<li id='" + data[i].Id + "'>" + (i + 1) + "</li>";
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
            if(!watchOver[idx]){
                watchOver[idx]=true;
                ajax({ //从后端请求数据
                    type: "GET",
                    url: url + id + "/" + idx,
                    success: function (res) { },
                    error: function () {
                    }
                });
            }
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
