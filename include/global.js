var __onAction = function(h) {
  if ($(h.currentTarget).attr("data-event") != "no") {
    h.preventDefault()
  }
  h.stopPropagation();
  var i = $(h.currentTarget);
  var g = i.attr("data-action") || "";
  var f = /^([a-zA-Z0-9_]+):\/\/([a-zA-Z0-9_]+)$/;
  var a = f.exec(g);
  var b = null;
  var c = null;
  var d = {
    node: i,
    e_node: h,
    _node: h.currentTarget
  };
  if (a) {
    b = a[1];
    c = a[2];
    if ((b in $) && (c in $[b])) {
      $[b][c].call(null, d)
    }
  }
};
var global = {
  _click: ("ontouchstart" in window) ? "tap": "click",
  _events: {},
  _windowHeight: $(window).height(),
  _windowWidth: $(window).width(),
  _rotateNode: $(".p-ct"),
  _isMotion: !!window.DeviceMotionEvent,
  _elementStyle: document.createElement("div").style,
  _UC: RegExp("Android").test(navigator.userAgent) && RegExp("UC").test(navigator.userAgent) ? true: false,
  _weixin: RegExp("MicroMessenger").test(navigator.userAgent) ? true: false,
  _iPhoen: RegExp("iPhone").test(navigator.userAgent) || RegExp("iPod").test(navigator.userAgent) || RegExp("iPad").test(navigator.userAgent) ? true: false,
  _Android: RegExp("Android").test(navigator.userAgent) ? true: false,
  _IsPC: function() {
    var a = navigator.userAgent;
    var d = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var b = true;
    for (var c = 0; c < d.length; c++) {
      if (a.indexOf(d[c]) > 0) {
        b = false;
        break
      }
    }
    return b
  },
  _isOwnEmpty: function(b) {
    for (var a in b) {
      if (b.hasOwnProperty(a)) {
        return false
      }
    }
    return true
  },
  _vendor: function() {
    var d = ["t", "webkitT", "MozT", "msT", "OT"],
    b,
    c = 0,
    a = d.length;
    for (; c < a; c++) {
      b = d[c] + "ransform";
      if (b in this._elementStyle) {
        return d[c].substr(0, d[c].length - 1)
      }
    }
    return false
  },
  _prefixStyle: function(a) {
    if (this._vendor() === false) {
      return false
    }
    if (this._vendor() === "") {
      return a
    }
    return this._vendor() + a.charAt(0).toUpperCase() + a.substr(1)
  },
  _hasPerspective: function() {
    var a = this._prefixStyle("perspective") in this._elementStyle;
    if (a && "webkitPerspective" in this._elementStyle) {
      this._injectStyles("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",
      function(b, c) {
        a = b.offsetLeft === 9 && b.offsetHeight === 3
      })
    }
    return !! a
  },
  _injectStyles: function(j, l, c, k) {
    var b, h, e, f, a = document.createElement("div"),
    g = document.body,
    d = g || document.createElement("body"),
    i = "modernizr";
    if (parseInt(c, 10)) {
      while (c--) {
        e = document.createElement("div");
        e.id = k ? k[c] : i + (c + 1);
        a.appendChild(e)
      }
    }
    b = ["&#173;", '<style id="s', i, '">', j, "</style>"].join("");
    a.id = i; (g ? a: d).innerHTML += b;
    d.appendChild(a);
    if (!g) {
      d.style.background = "";
      d.style.overflow = "hidden";
      f = docElement.style.overflow;
      docElement.style.overflow = "hidden";
      docElement.appendChild(d)
    }
    h = l(a, j);
    if (!g) {
      d.parentNode.removeChild(d);
      docElement.style.overflow = f
    } else {
      a.parentNode.removeChild(a)
    }
    return !! h
  },
  _translateZ: function() {
    if (this._hasPerspective) {
      return " translateZ(0)"
    } else {
      return ""
    }
  },
  _handleEvent: function(c) {
    if (!this._events[c]) {
      return
    }
    var b = 0,
    a = this._events[c].length;
    if (!a) {
      return
    }
    for (; b < a; b++) {
      this._events[c][b].apply(this, [].slice.call(arguments, 1))
    }
  },
  _on: function(b, a) {
    if (!this._events[b]) {
      this._events[b] = []
    }
    this._events[b].push(a)
  },
  execHandler: function(c) {
    if (c && c instanceof Object) {
      var e = c.callback || null;
      var d = c.opts || [];
      var b = c.context || null;
      var a = c.delay || -1;
      if (e && e instanceof Function) {
        if (typeof(a) == "number" && a >= 0) {
          setTimeout(function() {
            e.call(b, d)
          },
          a)
        } else {
          e.call(b, d)
        }
      }
    }
  },
  execAfterMergerHandler: function(b, a) {
    if (b && b instanceof Object) {
      var c = b.opts || [];
      b.opts = $.extend(b.opts, a)
    }
    this.execHandler(b)
  },
  _scrollStop: function() {
    $("body").addClass("f-ofh");
    $(window).on("touchmove.scroll", this._scrollControl);
    $(window).on("scroll.scroll", this._scrollControl)
  },
  _scrollStart: function() {
    $("body").removeClass("f-ofh");
    $(window).off("touchmove.scroll");
    $(window).off("scroll.scroll")
  },
  _scrollControl: function(a) {
    a.preventDefault();
    return false
  },
  setActionHook: function() {
    $("body").on(__global._click, "[data-action]", __onAction)
  },
  injectAction: function(a) {
    $.extend($.Action, a)
  },
  loadingPageShow: function(a) {
    if (a.length >= 1) {
      a.show()
    }
  },
  loadingPageHide: function(a) {
    if (a.length >= 1) {
      a.hide()
    }
  },
  refresh: function() {
    this._windowHeight = $(window).height();
    this._windowWidth = $(window).width()
  }
};