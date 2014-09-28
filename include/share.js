var imgUrl = "http://megaemoji.com/cn/dzb/include/web_img.png";
var lineLink = "http://megaemoji.com/cn/dzb";
var descContent = '特殊字符专家最新研发微信朋友圈专用刷屏利器，大字祝福九宫格图片生成器，人人能发大字报，成为朋友圈刷屏高手，就在国庆祝福大字报！微博大字报，微博国庆大字报。微信微应用，场景应用。益生菌';
var shareTitle = '国庆节，大字，祝福，九宫格，微应用';
var appid = '';
 
function shareFriend() {
	WeixinJSBridge.invoke('sendAppMessage',{
		"appid": appid,
		"img_url": imgUrl,
		"img_width": "200",
		"img_height": "200",
		"link": lineLink,
		"desc": descContent,
		"title": shareTitle
	}, function(res) {
		//_report('send_msg', res.err_msg);
	})
}
function shareTimeline() {
	WeixinJSBridge.invoke('shareTimeline',{
		"img_url": imgUrl,
		"img_width": "200",
		"img_height": "200",
		"link": lineLink,
		"desc": descContent,
		"title": shareTitle
	}, function(res) {
		   //_report('timeline', res.err_msg);
	});
}
function shareWeibo() {
	WeixinJSBridge.invoke('shareWeibo',{
		"content": descContent,
		"url": lineLink,
	}, function(res) {
		//_report('weibo', res.err_msg);
	});
}
// 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
	// 发送给好友
	WeixinJSBridge.on('menu:share:appmessage', function(argv){
		shareFriend();
	});
	// 分享到朋友圈
	WeixinJSBridge.on('menu:share:timeline', function(argv){
		shareTimeline();
	});
	// 分享到微博
	WeixinJSBridge.on('menu:share:weibo', function(argv){
		shareWeibo();
	});
}, false);