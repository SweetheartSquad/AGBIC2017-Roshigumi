function lerp(from,to,by){
	if(Math.abs(to-from) < 0.0001){
		return to;
	}
	return from+(to-from)*by;
}
function magnitude(v){
	return Math.sqrt(v.x*v.x+v.y*v.y);
}
function slerp(from,to,by){
	from/=Math.PI*2;
	to/=Math.PI*2;
	while(to-from > 0.5){
		from+=1
	}
	while(to-from < -0.5){
		from-=1
	}
	return (from+by*(to-from))%1 * Math.PI*2;
}
function clamp(min,v,max){
	return Math.max(min,Math.min(v,max));
}


// fullscreen toggle from https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API#Toggling_fullscreen_mode
function isFullscreen(){
	return !(!document.fullscreenElement&& !document.mozFullScreenElement&& !document.webkitFullscreenElement&& !document.msFullscreenElement);
}

function ease(t) {
	if ((t/=0.5) < 1) {
		return 0.5*t*t*t;
	}
	return 0.5*((t-=2)*t*t + 2);
};

function range(rng,range){
	return rng.real()*(range[1]-range[0])+range[0];
}


function nextPowerOfTwo(v){
	return Math.pow(2, Math.ceil(Math.log(v)/Math.log(2)));
}

function getFrames(_texture){
	var res=[];
	var i = 0;
	do{
		i+=1;
		var t=_texture+"_"+i+".png";
		
		if(!PIXI.loader.resources.spritesheet.textures[t]){
			break;
		}
		t=PIXI.loader.resources.spritesheet.textures[t];
		
		res.push(t);
	}while(i<32);

	if(res.length == 0){
		res.push(PIXI.Texture.fromFrame("error.png"));
	}

	return res;
}
// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function componentToHex(c) {
    var hex = clamp(0,Math.floor(c),255).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return parseInt("0x" + componentToHex(r) + componentToHex(g) + componentToHex(b));
}