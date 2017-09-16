var startTime = 0;
var lastTime = 0;
var curTime = 0;
var game;
var resizeTimeout=null;

var size={x:16 * 32,y:9 * 32};
var postProcessScale = 3;
var blurIt = 2;
var decay = 0.85;

var sounds=[];

var scaleMode = 1;

var debug = {
	enabled:false
};

toggleFullscreen = function(){
	if (game.view.toggleFullscreen) {
		if(getFullscreenElement()) {
			exitFullscreen();
		}else{
			requestFullscreen(display);
		}
		game.view.toggleFullscreen = false;
	}
};

ready(function(){
	try{
		game = new PIXI.Application({
			width: size.x*postProcessScale,
			height: size.y*postProcessScale,
			antialias:true,
			transparent:false,
			resolution:1,
			roundPixels:false,
			clearBeforeRender:false,
			autoResize:false,
			backgroundColor: 0x000000
		});
		if(!game.renderer.gl){
			throw "WebGL not supported";
		}
	}catch(e){
		document.body.innerHTML='<p>Unsupported Browser. Sorry :(</p>';
		throw 'Unsupported Browser: '+e;
	}

	// try to auto-focus and make sure the game can be focused with a click if run from an iframe
	window.focus();
	document.body.on('mousedown',function(){
		window.focus();
	});
	document.body.on('mouseup',toggleFullscreen);
	document.body.on('keyup',toggleFullscreen);

	document.exitFullscreen =
		document.exitFullscreen ||
		document.oExitFullScreen ||
		document.msExitFullScreen ||
		document.mozCancelFullScreen ||
		document.webkitExitFullscreen;

	// setup game
	startTime=Date.now();

	display = document.getElementById('display');

	game.view.id = 'canvas';

	PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

	// add the canvas to the html document
	display.appendChild(game.view);

	CustomFilter.prototype = Object.create(PIXI.Filter.prototype);
	CustomFilter.prototype.constructor = CustomFilter;

	fontStyle={font: "8px font", align: "left"};

	/*sounds["sfx_lose"] = new Howl({
		urls:["assets/audio/sfx_7.wav"],
		autoplay:false,
		loop:false,
		volume:1
	});*/

	PIXI.loader
		.add("screen_shader","assets/screen_shader.frag")
		.add("blur_shader","assets/blur_shader.frag");

	PIXI.loader
		.on("progress", loadProgressHandler)
		.load(init);
});


function CustomFilter(fragmentSource){
	PIXI.Filter.call(this,
		// vertex shader
		null,
		// fragment shader
		fragmentSource
	);
}


function loadProgressHandler(loader, resource){
	// called during loading
	console.log("loading: " + resource.url);
	console.log("progress: " + loader.progress+"%");
}


function onResize() {
	_resize();
}



function _resize(){
	var w=display.offsetWidth;
	var h=display.offsetHeight;
	var ratio=size.x/size.y;

	
	if(w/h < ratio){
		h = Math.round(w/ratio);
	}else{
		w = Math.round(h*ratio);
	}
	
	var aw,ah;

	if(scaleMode==0){
		// largest multiple
		scaleMultiplier = 1;
		aw=size.x*postProcessScale;
		ah=size.y*postProcessScale;

		do{
			aw+=size.x*postProcessScale;
			ah+=size.y*postProcessScale;
			scaleMultiplier += 1;
		}while(aw <= w || ah <= h);

		scaleMultiplier -= 1;
		aw-=size.x*postProcessScale;
		ah-=size.y*postProcessScale;
	}else if(scaleMode==1){
		// stretch to fit
		aw=w;
		ah=h;
		scaleMultiplier = w/(size.x*postProcessScale);
	}else{
		// 1:1
		scaleMultiplier = 1;
		aw=size.x*postProcessScale;
		ah=size.y*postProcessScale;
	}

	game.view.style.width=aw+'px';
	game.view.style.height=ah+'px';
}

PIXI.zero=new PIXI.Point(0,0);