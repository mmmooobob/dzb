var UPLOAD_PREFIX="[upload]";function getUrl(a,b){if(!a){return""}if(a.indexOf("http://")==0||a.indexOf("https://")==0){return a}else{if(a.indexOf(UPLOAD_PREFIX)==0){a=a.replace(UPLOAD_PREFIX,"");if(b==PATH_TYPE_IMG){return window.app.uploadImgPath+a}else{if(b==PATH_TYPE_MUSIC){return window.app.uploadMusicPath+a}else{if(b==PATH_TYPE_VIDEO){return window.app.uploadVideoPath+a}}}return a}else{return window.app.basePath+a}}};