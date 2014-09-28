var lazyImg = {
    lazy_count: globalData.length < 3 ? globalData.length: 3,
    lazy_load_count: 0,
    lazy_callback: null,
    lazy_img: function() {
        var a = $(".lazy-img");
        a.each(function() {
            var c = $(this);
            if (c.is("img")) {
                c.attr("src", window.app.basePath + "include/loading.gif")
            } else {
                var b = c.css("background-position"),
                d = c.css("background-size");
                c.attr({
                    "data-position": b,
                    "data-size": d
                });
                if (c.attr("data-bg") == "no") {
                    c.css({
                        "background-repeat": "no-repeat"
                    })
                }
                c.css({
                    "background-image": "url(" + window.app.basePath + "include/loading.gif)",
                    "background-size": "120px 120px",
                    "background-position": "center"
                });
                if (c.attr("data-image") == "no") {
                    c.css({
                        "background-image": "none"
                    })
                }
            }
        })
    },
    lazy_start: function() {
        var a = this;
        setTimeout(function() {
            for (var b = 0; b < lazyImg.lazy_count; b++) {
                var c = $(".m-page").eq(b);
                if (c.length == 0) {
                    break
                }
                if (c.find(".lazy-img").length != 0) {
                    a.lazy_change(c, false, true);
                    if (c.attr("data-page-type") == "flyCon") {
                        a.lazy_change($(".m-flypop"), false)
                    }
                } else {
                    continue
                }
            }
        },
        200)
    },
    lazy_bigP: function() {
        if ($(".lazy-img").length == 0) {
            return
        }
        for (var a = lazyImg.lazy_count; a <= 5; a++) {
            var b = $(".m-page").eq(page._pageNow + a);
            if (b.length == 0) {
                break
            }
            if (b.find(".lazy-img").length != 0) {
                lazyImg.lazy_change(b, true);
                if (b.attr("data-page-type") == "flyCon") {
                    lazyImg.lazy_change($(".m-flypop"), false)
                }
            } else {
                continue
            }
        }
    },
    lazy_change: function(c, e, d) {
        if (c.attr("data-page-type") == "3d") {
            this.lazy_3d(c)
        }
        if (c.attr("data-page-type") == "flyCon") {
            var a = $(".m-flypop").find(".lazy-img");
            a.each(function() {
                var f = $(this),
                g = f.attr("data-src");
                $("<img />").on("load",
                function() {
                    if (f.is("img")) {
                        f.attr("src", g)
                    }
                }).attr("src", g)
            })
        }
        var b = c.find(".lazy-img");
        b.each(function() {
            var g = $(this),
            i = g.attr("data-src"),
            f = g.attr("data-position"),
            h = g.attr("data-size");
            if (g.attr("data-bg") != "no") {
                $("<img />").on("load",
                function() {
                    if (d && g.hasClass("page-con")) {
                        lazyImg.lazy_load_count++;
                        if (lazyImg.lazy_load_count == lazyImg.lazy_count && lazyImg.lazy_callback && typeof lazyImg.lazy_callback == "function") {
                            lazyImg.lazy_callback()
                        }
                    }
                    if (g.is("img")) {
                        g.attr("src", i)
                    } else {
                        g.css({
                            "background-image": "url(" + i + ")",
                            "background-position": f,
                            "background-size": (navigator.userAgent.match(/iPhone/i) && document.body.clientHeight < 1000) ? "100% 100%": h
                        })
                    }
                    if (e) {
                        for (var j = 0; j < $(".m-page").size(); j++) {
                            var k = $(".m-page").eq(j);
                            if ($(".m-page").find(".lazy-img").length == 0) {
                                continue
                            } else {
                                lazyImg.lazy_change(k, true)
                            }
                        }
                    }
                }).attr("src", i);
                g.removeClass("lazy-img").addClass("lazy-finish")
            } else {
                if (g.attr("data-auto") == "yes") {
                    g.css("background", "none")
                }
            }
        })
    },
    lazy_load: function() {
        var a = $(".lazy-img.load");
        a.each(function() {
            var c = $(this),
            e = c.attr("data-src"),
            b = c.attr("data-position"),
            d = c.attr("data-size");
            if (c.attr("data-bg") != "no") {
                $("<img />").on("load",
                function() {
                    if (c.is("img")) {
                        c.attr("src", e)
                    } else {
                        c.css({
                            "background-image": "url(" + e + ")",
                            "background-position": b,
                            "background-size": d
                        })
                    }
                }).attr("src", e);
                c.removeClass("lazy-img").addClass("lazy-finish")
            } else {
                if (c.attr("data-auto") == "yes") {
                    c.css("background", "none")
                }
            }
        })
    }
};
$(function() {
    lazyImg.lazy_img()
});
$(window).on("load",
function() {
    lazyImg.lazy_start()
});