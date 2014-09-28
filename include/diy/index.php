<?php
$time = "";
list($usec, $sec) = explode(" ",microtime());
$time = ((float)$usec + (float)$sec);
$time = str_replace(".", "", $time);


function utf8_strlen($str) {
	$count = 0;
	for($i = 0; $i < strlen($str); $i++){
	$value = ord($str[$i]);
	if($value > 127) {
	$count++;
	if($value >= 192 && $value <= 223) $i++;
	elseif($value >= 224 && $value <= 239) $i = $i + 2;
	elseif($value >= 240 && $value <= 247) $i = $i + 3;
	else die('Not a UTF-8 compatible string');
	}
	$count++;
	}
	return $count;
}
function str_insert($str, $i, $substr){
	for($j=0; $j<$i; $j++){
		$startstr .= $str[$j];
	}
	for ($j=$i; $j<strlen($str); $j++){
		$laststr .= $str[$j];
	}
	$str = ($startstr . $substr . $laststr);
	return $str;
} 
$text = $_GET["name"];
$length = utf8_strlen($text);
if($text&&$length>3){
	//要输出的字
	$cn_font = "MFLangSong_Noncommercial-Regular.otf";
	if(!eregi("[^\x80-\xff]",$text)){
		$font_size = 190;
		if($length<5){
			$text = str_insert($text, 3, "    ");
		}
	}
	else{
		$font_size = 165;
	}
	$bg_h = 300;
	$font_x = -6;
	$font_y = 250;
	if($length>8){
		$font_size = 160;
	}
	
	if($length>10){
		$font_size = 140;
		$font_x = 0;
	    $font_y = 220;
	}
	
	$string_array = imagettfbbox($font_size, 0, $cn_font, $text);
	$bg_w = $string_array[2]+12;
	$im = imagecreatetruecolor($bg_w, $bg_h);
	
	
	// 定义几个色彩
	$white = imagecolorallocate($im, 255, 255, 255);
	$black = imagecolorallocate($im, 210, 201, 202);
	$red = imagecolorallocate($im, 240, 21, 0);
	
	//填充背景为白色
	imagefill($im, 0, 0, $white);
	//imagettftext($im, $font_size, 0, $font_x+3, $font_y+3, $black, $cn_font, $text);
	imagettftext($im, $font_size, 0, $font_x, $font_y, $red, $cn_font, $text);
	$filename = $time.".jpg";
	imagejpeg($im, "./images/".$filename, 100);
	
	$p = 3;
	// Get new sizes
	$file = dirname(__FILE__)."/images/".$filename;
	list($width, $height) = getimagesize($file);
	if($width&&$height){
		$newwidth = floor($width / $p);
		$last = $newwidth % $p;
		// Load
		$image = imagecreatefromjpeg($file);
		for( $i=0 ; $i< $p; $i++ ){
			$_p = $newwidth*$i;
			$im = ImageCreateTrueColor($newwidth, $height);
			imagecopy ( $im, $image, 0, 0, $_p, 0, $width, $height );
			$new_im = ImageCreateTrueColor(300, 300);
			imagefill($new_im, 0, 0, $white);
			$dst_x = (300 - $newwidth)/2;
			imagecopyresized( $new_im, $im, $dst_x, 0, 0, 0, $newwidth, 300, $newwidth, $height );
	        $m = $i + 1;
			imagejpeg( $new_im, "./images/{$time}_{$m}.jpg", 100);
			$url["url_".$m] = "{$time}_{$m}.jpg";
		}
	}
}
exit(json_encode( $url ));
?>