function popErr(b){var a=$(".m-page7 .wct .popup.popup_error");a.html(b).addClass("on");setTimeout(function(){a.html(b).removeClass("on")},2000)}function popSuccess(b){var a=$(".m-page7 .wct .popup.popup_sucess");a.html(b).addClass("on");setTimeout(function(){a.html(b).removeClass("on")},2000)}$(".edit-more-info").click(function(){var b=$(".m-page7 .wct .tableWrap-1");var a=$(".m-page7 .wct .tableWrap-2");b.animate({opacity:0},200);setTimeout(function(){b.hide();a.css("opacity",0);a.animate({opacity:1},200)},200)});$(".m-page7 .wct .submit.return input").click(function(){var a=$(".m-page7 .wct .tableWrap-1");a.show();a.css("opacity",0);a.animate({opacity:1},400)});$(".m-page7 .wct table tbody td p.sex").click(function(){$(".m-page7 .wct table tbody td p.sex strong").removeClass("on");$(this).find("strong").addClass("on")});$(".m-page7 .wct .share").click(function(){$("#shareMask").show();$("#shareImg").show()});$("#shareImg").click(function(){$("#shareMask").hide();$("#shareImg").hide()});$(".submit .submitBtn").click(function(){var h=$("form.wct_form");var u=$(".tableWrap table tr");var c=$('input[name="name"]');var w=c.val();if($.trim(w).length==0){popErr("请输入姓名");return}var o=2;if($('p.sex[data-sex="1"] strong').length>0){var d=$('p.sex[data-sex="1"] strong').hasClass("on");var v=$('p.sex[data-sex="2"] strong').hasClass("on");if(!d&&!v){popErr("请选择性别");return}var o=d?1:2}var q=$('input[name="tel"]');var f=q.val();if($.trim(f).length==0){popErr("请输入手机");return}if(isNaN(f)||f.length<8||f.length>18){popErr("请输入正确的手机");return}var s="";var n=h.find('input[name="time1"]');if(n.length>0&&n.parents("tr").attr("isMust")){s=n.val();if($.trim(s).length==0){popErr("请输入"+n.parents("tr").find("th").html());return}}var p="";var b=h.find('input[name="text1"]');if(b.length>0&&b.parents("tr").attr("isMust")){p=b.val();if($.trim(p).length==0){popErr("请输入"+b.parents("tr").find("th").html());return}}var m="";var a=h.find('input[name="text2"]');if(a.length>0&&a.parents("tr").attr("isMust")){m=a.val();if($.trim(m).length==0){popErr("请输入"+a.parents("tr").find("th").html());return}}var l="";var x=h.find('input[name="text3"]');if(x.length>0&&x.parents("tr").attr("isMust")){l=x.val();if($.trim(l).length==0){popErr("请输入"+x.parents("tr").find("th").html());return}}var k="";var t=h.find('input[name="text4"]');if(t.length>0&&t.parents("tr").attr("isMust")){k=t.val();if($.trim(k).length==0){popErr("请输入"+t.parents("tr").find("th").html());return}}var j="";var g=h.find('select[name="select1"]');if(g.length>0&&g.parents("tr").attr("isMust")){j=g.val();if($.trim(j).length==0||$.trim(j)=="请选择"){popErr("请输入"+g.parents("tr").find("th").html());return}}var i="";var e=h.find('select[name="select2"]');if(e.length>0&&e.parents("tr").attr("isMust")){i=e.val();if($.trim(i).length==0||$.trim(j)=="请选择"){popErr("请输入"+e.parents("tr").find("th").html());return}}var r=$(this);r.prop("disabled",true);r.val("正在提交...");$.ajax({url:"/mobile/action",dataType:"json",type:"post",data:{action:"addBook",activityId:window.app.activityId,name:w,tel:f,sex:o,time1:s,select1:j,select2:i,text1:p,text2:m,text3:l,text4:k},success:function(y){if(y.success==true){popSuccess("提交成功，感谢您的参与！");r.prop("disabled",false);r.val("正在提交...");$("form.wct_form")[0].reset()}else{if(y.msg){popErr(y.msg)}else{popErr("提交失败")}r.prop("disabled",false);r.val("正在提交...")}}})});