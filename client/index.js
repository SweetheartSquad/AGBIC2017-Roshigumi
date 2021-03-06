var game;
var resizeTimeout=null;

var size={x:16 * 32,y:9 * 32};
var postProcessScale = 3;
var blurIt = 2;
var decay = 0.85;

var sounds=[];

var storage = window.localStorage;
var scaleMode;
if(winnitronMode){
	scaleMode = 1;
}else{
	scaleMode = parseInt(storage.getItem("scaleMode")) || 1;
}
var scaleModes = [
	"Largest Multiple",
	"Scale to Fit",
	"One-to-One"
];

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
function quit(){
	if (typeof nw !== 'undefined' && nw !== null) {
		nw.App.quit();
	} else {
		location.reload();
	}
}

ready(function(){
	if(!window.performance){
		window.performance = {};
	}
	if("now" in window.performance === false){
		var start = Date.now();
		window.performance.now = function(){
			return Date.now() - start;
		};
	}
	try{
		PIXI.ticker.shared.autoStart = false;
		game = new PIXI.Application({
			width: size.x*postProcessScale,
			height: size.y*postProcessScale,
			antialias:true,
			transparent:false,
			resolution:1,
			roundPixels:false,
			clearBeforeRender:false,
			autoResize:false,
			backgroundColor: 0x000000,
			autoStart: false
		});
		game.ticker.stop();
		game.main = {
			timestep: 1000/60, // target ms/frame
			curTime: 0,
			prevTime: 0,
			loop: function(timestamp){
				this.curTime = timestamp;
				var d = this.curTime - this.prevTime;
			    // call render if needed
			    if (d > this.timestep) {
			    	update();
			    	game.render();
				    this.prevTime = this.prevTime + this.timestep;
			    }
			    requestAnimationFrame(this.loop);
			},
			start: function(){
				this.loop = this.loop.bind(this);
				this.loop(this.curTime);
			}
		};
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

	display = document.getElementById('display');

	game.view.id = 'canvas';

	PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

	// add the canvas to the html document
	display.appendChild(game.view);

	CustomFilter.prototype = Object.create(PIXI.Filter.prototype);
	CustomFilter.prototype.constructor = CustomFilter;

	fontStyle={font: "8px font", align: "left"};

	sounds["menu"] = new Howl({
		src:["assets/audio/menu_option.ogg"],
		autoplay:false
	});
	sounds["menuback"] = new Howl({
		src:["assets/audio/menuback.ogg"],
		autoplay:false
	});
	sounds["death"] = new Howl({
		src:["assets/audio/death.ogg"],
		autoplay:false
	});
	sounds["hurt"] = new Howl({
		src:["assets/audio/hurt.ogg"],
		autoplay:false
	});
	sounds["heal"] = new Howl({
		src:["assets/audio/powerup.ogg"],
		autoplay:false
	});
	sounds["shoot"] = new Howl({
		src:["assets/audio/shoot.ogg"],
		autoplay:false
	});
	sounds["blocked"] = new Howl({
		src:["assets/audio/block.ogg"],
		autoplay:false
	});
	sounds["slash"] = new Howl({
		src:["assets/audio/slash.ogg"],
		autoplay:false
	});
	sounds["slash-hit"] = new Howl({
		src:["assets/audio/enemyhit.ogg"],
		autoplay:false
	});
	sounds["kill"] = new Howl({
		src:["assets/audio/enemykill.ogg"],
		autoplay:false
	});
	sounds["boss"] = new Howl({
		src:["assets/audio/boss spawn.ogg"],
		autoplay:false
	});
	sounds["thruster"] = new Howl({
		src:["assets/audio/thruster.ogg"],
		autoplay:false,
		loop:true,
		volume:0
	});
	sounds["music"] = new Howl({
		src:["assets/audio/roshigumi.ogg"],
		autoplay:false,
		loop:true,
		volume:0
	});
	sounds["music"].once("load", function(){
		sounds["music"].volume(0);
		sounds["music"].play();
		sounds["music"].fade(0, 1, 3000);
	});
	Howler.orientation(0,1,0, 0,0,1);

	init();
});

function howlPos(s,i,x,y,z){
	s.pos((x/size.x - 0.5),(y/size.y - 0.5),z, i);
}

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