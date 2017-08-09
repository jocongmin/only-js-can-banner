var bannerFn = function(option) {
    var id = option.id;
    var url = option.url;
    var tar = option.container;
    //up is option about
    var tarBox = document.querySelector(tar);
    var ie8 = (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0");
    var ie = (window.navigator.userAgent.indexOf("MSIE") >= 1);
    var mainCellLi;
    var pageCellLi;
    var intervalTime = 2000;
    var fadeTime;
    var autoActTime;
    ajax({
        type: "GET",
        url: url + id,
        dataType: "json",
        data: {},
        success: function(res) {
            var $data = eval('(' + res + ')');
            var mainData = $data.Data;
            actBannerFn(mainData)
        },
        error: function() {
            console.log("error")
        }
    });

    function actBannerFn(mainData) {
        console.log(mainData, 'data')
        var data = mainData.materiel;
        var size = mainData.codeArea;
        console.log(data, 'base data')
        console.log(size, 'size data')

        function styleFn() { //轮播的样式
            var css = "#banner-box{width:" + size.width + "px;height:" + size.height + "px;border:1px solid #ddd;overflow:hidden;}" +
                ".banner-content{position:relative;overflow:hidden;width:100%;height:100%}" +
                ".banner-content .mainCell,.banner-content .pageCell{margin:0;padding:0;list-style:none;}" +
                ".banner-content .mainCell{width:100%;height:100%}" +
                ".banner-content .mainCell li{width:100%;height:100%;margin:0;padding:0;opacity:0;position:absolute;left:0;top:0;}" +
                ".banner-content .mainCell li img{width:100%;height:100%;}" +
                ".banner-content .pageCell li{float:left;line-height:20px;width:20px;height:20px;background:#fff;color:red;margin-right:5px;text-align:center;}" +
                ".banner-content .pageCell li:hover{cursor: pointer;}" +
                ".banner-content .pageCell li.on{color:white;background:#ccc}" +
                ".banner-content .pageCell{position:absolute;right:5px;bottom:6px;}";
            if (ie) css += ".banner-content .mainCell li img{position:relative;top:-2px;left:-2px;}";
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
                    var mainHtml = "<li style='opacity:1;'><a target='_blank' href='http://" + data[i].link + "'><img alt='" + data[i].alt + "' src='http://" + data[i].resource + "' /></a></li>";
                    var pageHtml = "<li class='on'>" + (i + 1) + "</li>";
                } else {
                    var mainHtml = "<li><a target='_blank' href='http://" + data[i].link + "'><img alt='" + data[i].alt + "' src='http://" + data[i].resource + "' /></a></li>";
                    var pageHtml = "<li>" + (i + 1) + "</li>";
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

        function reset() { //初始化轮播的内容，这样可以再继续下一个轮播，不影响下一个轮播的正常播放。
            for (var i = 0; i < pageCellLi.length; i++) {
                pageCellLi[i].setAttribute("class", "");
            }
            for (var i = 0; i < mainCellLi.length; i++) {
                if (fadeTime != undefined) clearInterval(fadeTime); //清除原来正在轮播中的元素的定时fadein的opacity
                if (ie8) {
                    mainCellLi[i].style.display = 'none';
                    return;
                }
                mainCellLi[i].style.opacity = 0;
            }
        }

        function fadeInBanner(i) { //轮播item的渐入显示的功能
            if (fadeTime != undefined) clearInterval(fadeTime);
            var opacitys = 0;
            fadeTime = setInterval(function() {
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
            for (var n = 0; n < pageCellLi.length; n++) {
                pageCellLi[n].onmouseover = function() {
                    clearInterval(autoActTime); //清除轮播自动播放的计时器，轮播停止自动播放功能
                    reset();
                    this.setAttribute("class", "on");
                    var which = parseInt(this.innerHTML) - 1;
                    if (ie8) {
                        mainCellLi[which].style.display = 'block';
                        return;
                    }
                    mainCellLi[which].style.opacity = 1;
                }
                pageCellLi[n].onmouseout = function() { //mouseout要重新启动轮播的自动播放
                    autoPlayFn();
                }
            }
        }

        function autoPlayFn() { //自动播放的功能，让轮播可以自动播放
            var which = function() {
                var which = 0;
                for (var i = 0; i < pageCellLi.length; i++) {
                    var is = (pageCellLi[i].className == 'on');
                    if (is) {
                        which = i;
                    }
                }
                return which;
            }
            var nextOn = function() {
                var i = which() + 1;
                var leng = pageCellLi.length;
                if (i == leng) {
                    i = 0;
                }
                reset();
                pageCellLi[i].className = 'on';
                if (ie8) {
                    mainCellLi[i].style.display = 'block';
                    return;
                }
                fadeInBanner(i);
            }
            autoActTime = setInterval(function() { //轮播自动播放的时间名字
                nextOn()
            }, intervalTime)
        }
        if (data.length == 1) {
            bannerHtmlFn();
            styleFn();
            return;
        }
        bannerHtmlFn();
        styleFn();
        bannerActionFn();

        autoPlayFn();

    }



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
        xhr.onreadystatechange = function() {
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