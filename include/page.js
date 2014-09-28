var page = {
  page_translate_type: 0,
  _page: $(".m-page"),
  _pageNum: $(".m-page").size(),
  _pageNow: 0,
  _pageNext: null,
  _touchStartValY: 0,
  _touchDeltaY: 0,
  _moveStart: true,
  _movePosition: null,
  _movePosition_c: null,
  _mouseDown: false,
  _moveFirst: true,
  _moveInit: false,
  _hasInitMap: false,
  _firstChange: false,
  page_start: function() {
    page._page.on("touchstart mousedown", page.page_touch_start);
    page._page.on("touchmove mousemove", page.page_touch_move);
    page._page.on("touchend mouseup", page.page_touch_end);
  },
  page_stop: function() {
    page._page.off("touchstart mousedown");
    page._page.off("touchmove mousemove");
    page._page.off("touchend mouseup")
  },
  page_touch_start: function(a) {
    if (!page._moveStart) {
      return
    }
    if (a.type == "touchstart") {
      page._touchStartValY = window.event.touches[0].pageY
    } else {
      page._touchStartValY = a.pageY || a.y;
      page._mouseDown = true
    }
    page._moveInit = true;
    global._handleEvent("start")
  },
  page_touch_move: function(g) {
    g.preventDefault();
    if (!page._moveStart) {
      return
    }
    if (!page._moveInit) {
      return
    }
    var i = page._page.eq(page._pageNow),
    c = parseInt(i.height()),
    b,
    f,
    d = null,
    a = false;
    if (g.type == "touchmove") {
      b = window.event.touches[0].pageY;
      a = true
    } else {
      if (page._mouseDown) {
        b = g.pageY || g.y;
        a = true
      } else {
        return
      }
    }
    d = page.page_position(g, b, i);
    page.page_translate(d);
    global._handleEvent("move")
  },
  page_position: function(f, b, g) {
    var a, c;
    if (b != "undefined") {
      page._touchDeltaY = b - page._touchStartValY
    }
    page._movePosition = b - page._touchStartValY > -0 ? "down": "up";
    if (page._movePosition != page._movePosition_c) {
      page._moveFirst = true;
      page._movePosition_c = page._movePosition
    } else {
      page._moveFirst = false
    }
    if (page._touchDeltaY <= 0) {
      if (g.next(".m-page").length == 0) {
        page._pageNext = 0
      } else {
        page._pageNext = page._pageNow + 1
      }
      c = page._page.eq(page._pageNext)[0]
    } else {
      if (g.prev(".m-page").length == 0) {
        if (page._firstChange) {
          page._pageNext = page._pageNum - 1
        } else {
          return
        }
      } else {
        page._pageNext = page._pageNow - 1
      }
      c = page._page.eq(page._pageNext)[0]
    }
    a = page._page.eq(page._pageNow)[0];
    node = [c, a];
    if (page._moveFirst) {
      d(node)
    }
    function d(j) {
      var i, e, h = global._translateZ();
      page._page.removeClass("action");
      $(j[1]).addClass("action").removeClass("f-hide");
      page._page.not(".action").addClass("f-hide");
      page.height_auto(page._page.eq(page._pageNext), "false");
      $(j[0]).removeClass("f-hide").addClass("active");
      if (page._movePosition == "up") {
        i = parseInt($(window).scrollTop());
        if (i > 0) {
          e = $(window).height() + i
        } else {
          e = $(window).height()
        }
        j[0].style[global._prefixStyle("transform")] = "translate(0," + e + "px)" + h;
        $(j[0]).attr("data-translate", e);
        $(j[1]).attr("data-translate", 0)
      } else {
        j[0].style[global._prefixStyle("transform")] = "translate(0,-" + Math.max($(window).height(), $(j[0]).height()) + "px)" + h;
        $(j[0]).attr("data-translate", -Math.max($(window).height(), $(j[0]).height()));
        $(j[1]).attr("data-translate", 0)
      }
    }
    return node
  },
  page_translate: function(b) {
    if (!b) {
      return
    }
    var a = global._translateZ(),
    d,
    c,
    e,
    f = page._touchDeltaY;
    if (page.page_translate_type < 2) {
      if ($(b[0]).attr("data-translate")) {
        d = f + parseInt($(b[0]).attr("data-translate"))
      }
      b[0].style[global._prefixStyle("transform")] = "translate(0," + d + "px)" + a;
      if (page.page_translate_type == 0) {
        if ($(b[1]).attr("data-translate")) {
          c = f + parseInt($(b[1]).attr("data-translate"))
        }
        e = 1 - Math.abs(f * 0.2 / $(window).height());
        c = c / 5;
        b[1].style[global._prefixStyle("transform")] = "translate(0," + c + "px)" + a + " scale(" + e + ")"
      }
    }
  },
  page_touch_end: function(b) {
    page._moveInit = false;
    page._mouseDown = false;
    if (!page._moveStart) {
      return
    }
    if (!page._pageNext && page._pageNext != 0) {
      return
    }
    page._moveStart = false;
    if (Math.abs(page._touchDeltaY) > 10) {
      page._page.eq(page._pageNext)[0].style[global._prefixStyle("transition")] = "all .3s";
      page._page.eq(page._pageNow)[0].style[global._prefixStyle("transition")] = "all .3s"
    }
    if (Math.abs(page._touchDeltaY) >= 100) {
      var a = $(page._page[page._pageNext]);
      if (typeof(resetScale) != "undefined") {
        resetScale();
        if (a.find(".m-bg-zoom").length > 0) {
          beginScale(true)
        }
      }
      if (!page._hasInitMap && a.hasClass("m-page6") && typeof(window.map) != "undefined" && typeof(window.point) != "undefined") {
        page._hasInitMap = true;
        window.map.enableScrollWheelZoom();
        window.map.enableInertialDragging();
        window.map.centerAndZoom(point, 15);
        window.map.addOverlay(marker);
        window.mapOpenInfo()
      }
      page.page_success()
    } else {
      if (Math.abs(page._touchDeltaY) > 10 && Math.abs(page._touchDeltaY) < 100) {
        page.page_fial()
      } else {
        page.page_fial()
      }
    }
    global._handleEvent("end");
    page._movePosition = null;
    page._movePosition_c = null;
    page._touchStartValY = 0
  },
  page_success: function() {
    var b = global._translateZ();
    if (page.page_translate_type < 2) {
      page._page.eq(page._pageNext)[0].style[global._prefixStyle("transform")] = "translate(0,0)" + b;
      if (page.page_translate_type == 0) {
        var e = page._touchDeltaY > 0 ? $(window).height() / 5 : -$(window).height() / 5;
        var d = 0.8;
        page._page.eq(page._pageNow)[0].style[global._prefixStyle("transform")] = "translate(0," + e + "px)" + b + " scale(" + d + ")"
      }
    } else {
      var c = $(page._page.eq(page._pageNow)[0]);
      var a = $(page._page.eq(page._pageNext)[0]);
      c.animate({
        opacity: 0
      },
      200);
      setTimeout(function() {
        c.hide();
        c.css("opacity", "1")
      },
      195);
      a.show();
      a.css("opacity", "0");
      a.animate({
        opacity: 1
      },
      200)
    }
    global._handleEvent("success");
	if(page._pageNext==0){
		var xq = new Array("快乐", "开心", "陪家人", "不加班", "放长假", "睡懒觉", "去旅行", "平安", "晒自拍", "吃喝玩", "玩冰桶", "读圣经", "打篮球", "踢足球", "看电视", "玩iPhone6", "吃大餐", "看阅兵", "去购物", "去郊游", "宅在家", "不堵车", "写情书", "看直播", "LOL", "海贼王", "好声音", "买到票");
		var rand_num = Math.ceil(Math.random()*28);
		shareTitle = "我国庆节最紧要"+xq[rand_num]+"，你的国庆节最紧要什么？- 国庆大字报";
		document.title = "国庆祝福大字报"; 
		
		var h = $(window).height();
		var w = $(window).width();
		var phoneWidth = parseInt(window.screen.width);
		var new_h = h+50;
		var new_w = w+(new_h/h)*50;
		var left = (w - new_w)/2;
		var top = (h - new_h)/2;
		$("#page1").animate({width:new_w, height:new_h, left:left, top:top}, 2000, "ease");
		if(phoneWidth==320){
			$("#page1_content1").css("top", 462*phoneScale-top);
			$("#page1_content1").css("left", 0-left);
			$("#page1_content2").css("top", 814*phoneScale-top);
			$("#page1_content2").css("left", 65*phoneScale-left);
		}
		else{
			$("#page1_content1").css("top", 462-top);
			$("#page1_content1").css("left", 0-left);
			$("#page1_content2").css("top", 814-top);
			$("#page1_content2").css("left", 65-left);
		}
					
		$("#page1_content1").addClass("Animation1");
		$("#page1_content2").addClass("Animation2");
		
		$("#page6_content1").removeClass("Animation4_3");
		$("#page6_content2").removeClass("Animation4_3");
		$("#page6_content3").removeClass("Animation5_2");
		$("#page6_content4").removeClass("Animation5_3");
		$("#page6_content5").removeClass("Animation4_4");
		$("#page6_content6").removeClass("Animation5_3");
		$("#page6_content7").removeClass("Animation2_6");
		
		$("#page2_content1").removeClass("Animation1_1");
		$("#page2_content2").removeClass("Animation2_1");
		
	}
	
	if(page._pageNext==1){
		var phoneWidth = parseInt(window.screen.width);
		var h = $(window).height();
		var w = $(window).width();
		$("#page1").animate({width:w, height:h, left:"0px", top:"0px"});
		if(phoneWidth==320){
			$("#page1_content1").css("top", 462*phoneScale);
			$("#page1_content1").css("left", 0);
			$("#page1_content2").css("top", 814*phoneScale);
			$("#page1_content2").css("left", 65*phoneScale);
		}
		else{
			$("#page1_content1").css("top", 462);
			$("#page1_content1").css("left", 0);
			$("#page1_content2").css("top", 814);
			$("#page1_content2").css("left", 65);
		}
					
		$("#page2_content1").addClass("Animation1_1");
		$("#page2_content2").addClass("Animation2_1");
		
		$("#page1_content1").removeClass("Animation1");
		$("#page1_content2").removeClass("Animation2");
		
		$("#page3_content1").removeClass("Animation4_1");
		$("#page3_content2").removeClass("Animation3");
		$("#page3_content3").removeClass("Animation2_2");
		$("#page3_content4").removeClass("Animation4_5");
	}
	
	if(page._pageNext==2){
		$("#page3_content1").addClass("Animation4_1");
		$("#page3_content2").addClass("Animation3");
		$("#page3_content3").addClass("Animation2_2");
		$("#page3_content4").addClass("Animation4_5");
		
		$("#page2_content1").removeClass("Animation1_1");
		$("#page2_content2").removeClass("Animation2_1");
		
		$("#page4_content1").removeClass("Animation5");
		$("#page4_content2").removeClass("Animation2_3");
		$("#page4_content3").removeClass("Animation5_1");
		$("#page4_content4").removeClass("Animation4_2");
		$("#page4_content5").removeClass("Animation2_4");
	}
	
	if(page._pageNext==3){
		$("#page4_content1").addClass("Animation5");
		$("#page4_content2").addClass("Animation2_3");
		$("#page4_content3").addClass("Animation5_1");
		$("#page4_content4").addClass("Animation4_2");
		$("#page4_content5").addClass("Animation2_4");
		
		$("#page3_content1").removeClass("Animation4_1");
		$("#page3_content2").removeClass("Animation3");
		$("#page3_content3").removeClass("Animation2_2");
		$("#page3_content4").removeClass("Animation4_5");
		
		$("#page5_content1").removeClass("Animation1_2");
		$("#page5_content2").removeClass("Animation2_5");
		
	}
	
	if(page._pageNext==4){
		$("#page5_content1").addClass("Animation1_2");
		$("#page5_content2").addClass("Animation2_5");
		
		$("#page4_content1").removeClass("Animation5");
		$("#page4_content2").removeClass("Animation2_3");
		$("#page4_content3").removeClass("Animation5_1");
		$("#page4_content4").removeClass("Animation4_2");
		$("#page4_content5").removeClass("Animation2_4");
		
		$("#page6_content1").removeClass("Animation4_3");
		$("#page6_content2").removeClass("Animation4_3");
		$("#page6_content3").removeClass("Animation5_2");
		$("#page6_content4").removeClass("Animation5_3");
		$("#page6_content5").removeClass("Animation4_4");
		$("#page6_content6").removeClass("Animation5_3");
		$("#page6_content7").removeClass("Animation2_6");
		
	}
	
	if(page._pageNext==5){
		$("#page6_content1").addClass("Animation4_3");
		$("#page6_content2").addClass("Animation4_3");
		$("#page6_content3").addClass("Animation5_2");
		$("#page6_content4").addClass("Animation5_3");
		$("#page6_content5").addClass("Animation4_4");
		$("#page6_content6").addClass("Animation5_3");
		$("#page6_content7").addClass("Animation2_6");
		
		$("#page5_content1").removeClass("Animation1_2");
		$("#page5_content2").removeClass("Animation2_5");
		
		var h = $(window).height();
		var w = $(window).width();
		var phoneWidth = parseInt(window.screen.width);
		$("#page1").animate({width:w, height:h, left:"0px", top:"0px"});
		if(phoneWidth==320){
			$("#page1_content1").css("top", 462*phoneScale);
			$("#page1_content1").css("left", 0);
			$("#page1_content2").css("top", 814*phoneScale);
			$("#page1_content2").css("left", 65*phoneScale);
		}
		else{
			$("#page1_content1").css("top", 462);
			$("#page1_content1").css("left", 0);
			$("#page1_content2").css("top", 814);
			$("#page1_content2").css("left", 65);
		}
		$("#page1_content1").removeClass("Animation1");
		$("#page1_content2").removeClass("Animation2");
	}
  },
  page_fial: function() {
    var a = global._translateZ();
    if (!page._pageNext && page._pageNext != 0) {
      page._moveStart = true;
      page._moveFirst = true;
      return
    }
    if (page._movePosition == "up") {
      page._page.eq(page._pageNext)[0].style[global._prefixStyle("transform")] = "translate(0," + $(window).height() + "px)" + a
    } else {
      page._page.eq(page._pageNext)[0].style[global._prefixStyle("transform")] = "translate(0,-" + $(window).height() + "px)" + a
    }
    page._page.eq(page._pageNow)[0].style[global._prefixStyle("transform")] = "translate(0,0)" + a + " scale(1)";
    global._handleEvent("fial");
  },
  height_auto: function(c, d) {
    c.children(".page-con").css("height", "auto");
    var a = $(window).height();
    var b = true;
    if (!b) {
      if (c.height() <= a) {
        c.children(".page-con").height(a + 2);
        if ((!$(".p-ct").hasClass("fixed")) && d == "true") {
          $(".p-ct").addClass("fixed")
        }
      } else {
        global._scrollStart();
        if (d == "true") {
          $(".p-ct").removeClass("fixed")
        }
        c.children(".page-con").css("height", "100%");
        return
      }
    } else {
      c.children(".page-con").height(a + 2);
      if ((!$(".p-ct").hasClass("fixed")) && d == "true") {
        $(".p-ct").addClass("fixed")
      }
    }
  }
};