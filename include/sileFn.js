var sigeFn={mapCreate:function(){if(".j-map".length<=0){return}var b=$(".j-map");var a={fnOpen:global._scrollStop,fnClose:map.mapSave};map.mapAddEventHandler(b,"click",map.mapShow,a)},Txt_init:function(a){if(a.find(".j-txt").length<=0){return}if(a.find(".j-txt").find(".j-detail p").length<=0){return}a.find(".j-txt").each(function(){var c=$(this).find(".j-detail"),h=$(this).find(".j-title"),f=h.find(".txt-arrow"),g=c.find("p"),d=parseInt(h.outerHeight()),e=parseInt(g.outerHeight()),b=e+d;if($(this).parents(".m-page").hasClass("m-smallTxt")){if($(this).parents(".smallTxt-bd").index()==0){c.css("top",d)}else{c.css("bottom",d)}}c.attr("data-height",e);$(this).attr("data-height-init",d);$(this).attr("data-height-extand",b);g[0].style[global._prefixStyle("transform")]="translate(0,-"+e+"px)";if($(this.parentNode).hasClass("z-left")){g[0].style[global._prefixStyle("transform")]="translate(0,"+e+"px)"}c.css("height","0");f.removeClass("z-toggle");$(this).css("height",d)})},bigTxt_extand:function(){$("body").on("click",".j-title",function(){if($(".j-detail").length<=0){return}var a=$(this.parentNode).find(".j-detail");$(".j-detail").removeClass("action");a.addClass("action");if($(this).hasClass("smallTxt-arrow")){$(".smallTxt-bd").removeClass("action");a.parent().addClass("action")}if(a.hasClass("z-show")){a.removeClass("z-show");a.css("height",0);$(this.parentNode).css("height",parseInt($(this.parentNode).attr("data-height-init")))}else{a.addClass("z-show");a.css("height",parseInt(a.attr("data-height")));$(this.parentNode).css("height",parseInt($(this.parentNode).attr("data-height-extand")))}$(".j-detail").not(".action").removeClass("z-show");$(".txt-arrow").removeClass("z-toggle");a.hasClass("z-show")?($(this).find(".txt-arrow").addClass("z-toggle")):($(this).find(".txt-arrow").removeClass("z-toggle"))})},Txt_back:function(){$("body").on("click",".m-page",function(f){f.stopPropagation();var c=$(f.target);var d=c.parents(".m-page");var b=c.parents(".j-txtWrap").length==0?c:c.parents(".j-txtWrap");if(d.find(".j-txt").find(".j-detail p").length<=0){return}if(d.find(".j-txt").length<=0||c.parents(".j-txt").length>=1||c.hasClass("bigTxt-btn")||c.parents(".bigTxt-btn").length>=1){return}var a=b.find(".j-detail");$(".j-detail").removeClass("action");a.addClass("action");$(".j-detail").not(".action").removeClass("z-show");b.each(function(){var g=$(this).find(".j-detail");var h=$(this).find(".txt-arrow");var e=$(this).find(".j-txt");if(g.hasClass("z-show")){g.removeClass("z-show");g.css("height",0);e.css("height",parseInt(e.attr("data-height-init")))}else{g.addClass("z-show");g.css("height",parseInt(g.attr("data-height")));e.css("height",parseInt(e.attr("data-height-extand")))}g.hasClass("z-show")?(h.addClass("z-toggle")):(h.removeClass("z-toggle"))})})},input_form:function(){$("body").on("click",".book-bd .bd-form .btn",function(){var b=$(this).attr("data-submit");if(b=="true"){return}var a=$(window).height();$(document.body).css("height",a);page.page_stop();global._scrollStart();page._page.eq(page._pageNow).css("z-index",15);$(".book-bg").removeClass("f-hide");$(".book-form").removeClass("f-hide");setTimeout(function(){$(".book-form").addClass("z-show");$(".book-bg").addClass("z-show")},50);$(".book-bg").off("click");$(".book-bg").on("click",function(d){d.stopPropagation();var c=$(d.target);if(c.parents(".book-form").length>=1&&!c.hasClass("j-close-img")&&c.parents(".j-close").length<=0){return}$(".book-form").removeClass("z-show");$(".book-bg").removeClass("z-show");setTimeout(function(){$(document.body).css("height","100%");page.page_start();global._scrollStop();page._page.eq(page._pageNow).css("z-index",9);$(".book-bg").addClass("f-hide");$(".book-form").addClass("f-hide")},500)})})},sex_select:function(){var c=$("#j-signUp").find(".sex p");var b=$("#j-signUp").find(".sex strong");var a=$("#j-signUp").find(".sex input");c.on("click",function(){var d=$(this).find("strong");b.removeClass("open");d.addClass("open");var e=$(this).attr("data-sex");a.val(e)})},lightapp_intro_show:function(){$(".market-notice").removeClass("f-hide");setTimeout(function(){$(".market-notice").addClass("show")},100)},lightapp_intro_hide:function(a){if(a){$(".market-notice").addClass("f-hide").removeClass("show");return}$(".market-notice").removeClass("show");setTimeout(function(){$(".market-notice").addClass("f-hide")},500)},lightapp_intro:function(){$(".market-notice").off("click");$(".market-notice").on("click",function(){$(".market-page").removeClass("f-hide");setTimeout(function(){$(".market-page").addClass("show");setTimeout(function(){$(".market-img").addClass("show")},100);sigeFn.lightapp_intro_hide()},100);page.page_stop();global._scrollStop()});$(".market-page").off("click");$(".market-page").on("click",function(a){if($(a.target).hasClass("market-page")){$(".market-img").removeClass("show");setTimeout(function(){$(".market-page").removeClass("show");setTimeout(function(){$(".market-page").addClass("f-hide")},200)},500);sigeFn.lightapp_intro_show();page.page_start();global._scrollStart()}})},ajaxTongji:function(d){var a=location.search.substr(location.search.indexOf("channel=")+8);a=a.match(/^\d+/);if(!a||isNaN(a)||a<0){a=1}var c=$("#activity_id").val();var b="/analyseplugin/plugin?activity_id="+c+"&plugtype="+d},wxShare:function(){$("body").on("click",".bigTxt-btn-wx",function(){var a=$(this).parents(".m-page").find(".bigTxt-weixin");a.addClass("z-show");page.page_stop();a.on("click",function(){$(this).removeClass("z-show");page.page_start();$(this).off("click")})})},toggleVideo:function(){$(".j-video").find(".img").on("click",function(){var a=$(this).next()[0];if(a.length<=0){return}if(a.paused){$(a).removeClass("f-hide");a.play();$(this).hide()}})},signUp_submit:function(){$("#j-signUp-submit").on("click",function(c){c.preventDefault();var a=$(this).parents("#j-signUp");var b=form.signUpCheck_input(a,$(".u-note"));if(b){form.signUpCheck_submit(a,$(".u-note"))}else{return}})},loadingPageShow:function(){$(".u-pageLoading").show()},loadingPageHide:function(){$(".u-pageLoading").hide()}};$(function(){sigeFn.bigTxt_extand();sigeFn.Txt_back();sigeFn.input_form();sigeFn.sex_select();sigeFn.lightapp_intro();sigeFn.wxShare();sigeFn.mapCreate();sigeFn.toggleVideo();sigeFn.signUp_submit();sigeFn.Txt_init(page._page.eq(page._pageNow))});