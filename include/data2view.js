var PATH_TYPE_IMG="img";var PATH_TYPE_MUSIC="music";var PATH_TYPE_VIDEO="video";var PAGE_TYPE_BIGTXT="bigTxt";var PAGE_TYPE_VIDEO="video";var PAGE_TYPE_BOOK="book";var PAGE_TYPE_CONTACT="contact";var PAGE_TYPE_SHARE="share";var VIDEO_UPLOAD="upload";var VIDEO_LINK="link";var BIGTXT_BUTTON_IMG="img";var BIGTXT_BUTTON_FONT="font";var BIGTXT_BUTTON_LINK="link";var BIGTXT_BUTTON_TEL="tel";var BIGTXT_BUTTON_WEIXIN="weixin";var isOpenMusic=false;function createBitTxt(d,i,g,c,f,h,b,k){d=getUrl(d,PATH_TYPE_IMG);var e='<div class="m-page m-bigTxt f-hide" data-page-type="bigTxt" data-statics="info_list"> ';if(i&&g){e+='<div class="page-con j-txtWrap lazy-img" data-src="'+d+'"> <div class="bigTxt-bd j-txt"> <div class="bigTxt-title j-title"> <p>'+i+'</p> <span class="bigTxt-arrow txt-arrow css_sprite01 f-cur"></span> </div> <div class="bigTxt-detail j-detail"> <p>'+g+"</p> </div> </div> </div>"}else{e+='<div class="page-con j-txtWrap lazy-img" data-src="'+d+'"> </div>'}if(c){if(f==BIGTXT_BUTTON_IMG){h=getUrl(h,PATH_TYPE_IMG);e+='<div class="bigTxt-btn bigTxt-btn-wx lazy-img" data-src="'+h+'"> <a href="'+(b==BIGTXT_BUTTON_LINK?k:b==BIGTXT_BUTTON_TEL?"tel:"+k:"javascript:void(0)")+'"></a> </div>'}else{if(f==BIGTXT_BUTTON_FONT){var j=getUrl("/image/mobile/bigtxt_bg_02@2x.jpg",PATH_TYPE_IMG);e+='<div class="bigTxt-btn bigTxt-btn-wx lazy-img" data-src="'+j+'"> <a href="'+(b==BIGTXT_BUTTON_LINK?k:b==BIGTXT_BUTTON_TEL?"tel:"+k:"javascript:void(0)")+'">'+h+"</a> </div>"}}}if(b==BIGTXT_BUTTON_WEIXIN){var a=getUrl(k?k:"/image/mobile/weixin-share-guide.png",PATH_TYPE_IMG);e+='<div class="bigTxt-weixin"> <img src="'+a+'"> </div>'}e+="</div>";$("div.translate-back").append($(e))}function createVideo(b,f,a,e,c,g,j,i,h){b=getUrl(b,PATH_TYPE_IMG);j=getUrl(j,PATH_TYPE_IMG);i=getUrl(i,PATH_TYPE_VIDEO);var d;if(g==VIDEO_UPLOAD){d='<div class="m-page m-video f-hide" data-page-type="video" data-statics="video_list"> <div class="page-con lazy-img" data-src="'+b+'"> <div class="video-con j-video" data-width="640" data-height="480" 	data-src="'+i+'"> 	<div class="img lazy-img" 		data-src="'+j+'"> 		<span class="css_sprite01"></span> 	</div> </div> <div class="video-title"> 	<h4 class="f-tc" style="color: '+a+';">'+f+'</h4> 	<p style="color:'+c+';">'+e+"</p></div> </div> </div> "}else{if(g==VIDEO_LINK){d='<div class="m-page m-video f-hide" data-page-type="video" data-statics="video_list"> <div class="page-con lazy-img" data-src="'+b+'"> <div class="video-con j-video" data-width="640" data-height="480"> '+h.replace(/&quot;/g,'"')+'</div> <div class="video-title" style="padding: 15px 10px;"> 	<h4 class="f-tc" style="font-size: 26px;color: '+a+';  margin-bottom: 8px;text-align: left;font-weight: bold;">'+f+'</h4> 	<p style="color:'+c+';">'+e+"</p></div> </div> </div> "}}$("div.translate-back").append($(d))}function createBook(g,n,b,c,p,o,a){g=getUrl(g,PATH_TYPE_IMG);var l=[];for(var f=0;f<a.length;f++){if(a[f]&&a[f].isShow){l.push(a[f])}}a=l;var k='<div class="m-page m-bigTxt m-page7 f-hide" data-page-type="bigTxt" 	data-statics="info_list" data-translate="" style=""> <div class="page-con j-txtWrap lazy-img" 	data-src="'+g+'"> 	<div class="wct"> 		<h3 style="color:'+b+'">'+n+'</h3> 		<form class="wct_form"> 			<div class="tableWrap tableWrap-1"> 				<table> 					<colgroup> 						<col width="30%"> 						<col width="70%"> 					</colgroup> 					<tbody> ';for(var f=0;f<4;f++){var m=a[f];if(!m){break}if(m.name=="name"){k+='<tr class="base-info" isMust="'+m.isMust+'"> 	<th><span>'+m.text+'</span></th> 	<td><input class="base-info-input" type="text" maxlength="20" 			placeholder="'+m.placeholder+'" name="'+m.name+'" onblur="return false;"> 	</td> </tr> '}else{if(m.name=="sex"){k+='<tr class="base-info" isMust="'+m.isMust+'"> 	<th><span>'+m.text+'</span></th> 	<td> 		<p class="sex" data-sex="1"> 			<span class="select"><strong></strong></span><span 				class="value">女士</span> 		</p> 		<p class="sex" data-sex="2"> 			<span class="select"><strong></strong></span><span 				class="value">先生</span> 		</p> <input type="hidden" class="base-info-input" value="" 		name="sex"> 	</td> </tr> '}else{if(m.name=="tel"){k+='<tr class="base-info" isMust="'+m.isMust+'"> 	<th><span>'+m.text+'</span></th> 	<td><input class="base-info-input" type="tel"  maxlength="20" 		placeholder="'+m.placeholder+'" name="'+m.name+'" onblur="return false;"> 	</td> </tr> '}else{if(m.type=="date"){k+='<tr class="base-info" isMust="'+m.isMust+'"> 	<th><span>'+m.text+'</span></th> 	<td><input type="tel"  maxlength="20" 		 class="picker_input picker_data picker__input" placeholder="'+m.placeholder+'" name="'+m.name+'" onblur="return false;"> 	</td> </tr> '}else{if(m.type=="select"){k+='<tr class="base-info" isMust="'+m.isMust+'"> 	<th><span>'+m.text+'</span></th> 	<td><select style="width:88%" name="'+m.name+'">';k+='<option val="">请选择</option>';if(m.placeholder){var h=m.placeholder.split("|");for(var e=0;e<h.length;e++){k+='<option val="'+h[e]+'">'+h[e]+"</option>"}}k+="</select></td> </tr> "}else{if(m.type=="text"){k+='<tr class="base-info" isMust="'+m.isMust+'"> 	<th><span>'+m.text+'</span></th> 	<td><input class="base-info-input" type="tel"  maxlength="20" 		placeholder="'+m.placeholder+'" name="'+m.name+'" onblur="return false;"> 	</td> </tr> '}}}}}}}k+="</tbody></table> ";if(a.length>4){k+='<div class="edit-more-info"> 	<div class="txt">完善更多信息</div> </div> '}k+='<p class="submit submit-custom btn-boder-color" style="background:'+p+'"> 	<input type="button" class="submitBtn" value="'+c+'"> </p> ';if(o){k+='				<p class="share btn-boder-color" data-id="25676"> 					<a href="javascript:void(0);"><span 						class="share_icon css_sprite01 css_sprite01_n"></span>&nbsp;分享到朋友圈</a> 				</p> '}k+='			</div> 			<div class="tableWrap tableWrap-2" style="margin-left: 0px;"> 				<table> 					<colgroup> 						<col width="30%"> 						<col width="70%"> 					</colgroup> 					<tbody> ';for(var f=4;f<a.length;f++){var m=a[f];if(!m){break}if(m.type=="date"){k+='<tr class="more-info" isMust="'+m.isMust+'"> 	<th><span>'+m.text+'</span></th> 	<td><input type="text" class="picker_input picker_data picker__input" placeholder="'+m.placeholder+'"  maxlength="20" 			 name="'+m.name+'"></td> </tr> '}else{if(m.type=="select"){k+='<tr class="more-info" isMust="'+m.isMust+'"> 	<th><span>'+m.text+'</span></th> 	<td><select style="width:88%" name="'+m.name+'">';k+='<option val="">请选择</option>';if(m.placeholder){var h=m.placeholder.split("|");for(var e=0;e<h.length;e++){k+='<option val="'+h[e]+'">'+h[e]+"</option>"}}k+="</select></td> </tr> "}else{if(m.type=="text"){k+='<tr class="more-info" isMust="'+m.isMust+'"> 	<th><span>'+m.text+'</span></th> 	<td><input type="text" name="'+m.name+'" placeholder="'+m.placeholder+'" maxlength="20" ></td> </tr> '}}}}k+='	</tbody> 				</table> 				<p class="submit submit-2 submit-custom btn-boder-color"> 					<input type="button" class="submitBtn" value="'+c+'"> 				</p> 				<p class="submit submit-3 btn-boder-color return"> 					<input type="button" value="返回"> 				</p>				 			</div> 			<p class="popup popup_error"></p> 			<p class="popup popup_sucess">幸苦了！谢谢您的预约！</p> 		</form> 	</div>		 </div> </div>';$("div.translate-back").append($(k))}function createContact(d,b,l,j,a,m,k,h,g){if(!l){l="本元大厦"}if(!j||!a){j="22.541544";a="114.032837"}d=getUrl(d,PATH_TYPE_IMG);var f=g.split(",");var n="";for(var c=0;c<f.length;c++){if(c!=0){n+=","}n+=getUrl(f[c],PATH_TYPE_IMG)}var e='<div class="m-page m-page6 m-bigTxt f-hide" data-page-type="bigTxt" 	data-statics="info_list">  	<div class="page-con j-txtWrap lazy-img" 		data-src="'+d+'">					 		<div class="m-map" style="'+((!g||g.length==0)?"height:400px":"")+'"> 			<div id="ylMap" class="ylMap"></div> 			<div class="mapVal "> 				<input class="address" type="hidden" value=\'{"sign_name":"","contact_tel":"'+b+'","address":"'+l+'"}\'> 				<input class="latitude" type="hidden" value="'+j+'"> 				<input class="longitude" type="hidden" value="'+a+'"> 			</div> 			<div class="tit"> 				<p><a href="#"><span class="css_sprite01 css_sprite01_m"></span>'+l+'</a></p> 				<a class="close_map css_sprite01" href="javascript:void(0)"></a> 			</div> 		</div> ';if(g&&g.length>0){e+='		<div class="u-img"> 			<div class="imgSlider"> 				<input type="hidden" value="'+n+'" /> 			</div> 		</div> '}e+='		<div class="m-intro"> 			<h3>'+k+'</h3> 			<div class="m-txt m-txt02 txt" data-txt="1" style="height: 50px;max-height: 250px; width: 560px;z-index:9999;"> 				<div class="wtxt"> 					<p>'+h+'</p> 				</div><span class="expand css_sprite01 css_sprite01_j"></span>	 			</div> 			<div class="btn"> ';if(m){e+='<p class="time"><a href="#"><span class="css_sprite01 css_sprite01_c"></span>'+m+"</a></p> "}e+='				<p class="tel btn-boder-color"><a href="tel:'+b+'"><span class="css_sprite01 css_sprite01_t"></span>'+b+"</a></p> 			</div> 		</div> 	</div> </div>";$("div.translate-back").append($(e))}function initEl(b){for(var a=0;a<b.length;a++){var c=b[a];if(c.type==PAGE_TYPE_BIGTXT&&a==0){if(c.isMusic){isOpenMusic=true;$(".u-audio").attr("data-src",getUrl(c.musicUrl,PATH_TYPE_MUSIC))}createBitTxt(c.bg,c.summary,c.detail,c.openButton,c.buttonType,c.buttonContent,c.buttonLinkType,c.buttonLinkContent)}else{if(c.type==PAGE_TYPE_BIGTXT){createBitTxt(c.bg,c.summary,c.detail,c.openButton,c.buttonType,c.buttonContent,c.buttonLinkType,c.buttonLinkContent)}else{if(c.type==PAGE_TYPE_VIDEO){createVideo(c.bg,c.title,c.titleColor,c.detail,c.detailColor,c.vType,c.vCover,c.videoUrl,c.vLink)}else{if(c.type==PAGE_TYPE_BOOK){createBook(c.bg,c.title,c.titleColor,c.buttonTxt,c.buttonColor,c.isShare,c.bookData)}else{if(c.type==PAGE_TYPE_CONTACT){createContact(c.bg,c.tel,c.address,c.latitude,c.longitude,c.worktime,c.title,c.summary,c.imgs)}else{if(c.type==PAGE_TYPE_SHARE){var d=getUrl(c.logo,PATH_TYPE_IMG);window.initShareInfo(c.title,c.description,d)}}}}}}}};