var palettes = [
	{
		name: "classic",
		colour: [0.0,0.0,0.0]
	},
	{
		name: "inverted",
		colour: [1.0,1.0,1.0]
	},
	{
		name: "winnitron",
		colour: [-3, 0, 0.25]
	},
	{
		name: "witch",
		colour: [0.25,-0.3,0.75]
	},
	{
		name: "pulp",
		colour: [0.8722403032681343, -0.5808644803447445, 0.36715786076264445]
	},
	{
		name: "dark forest",
		colour: [0.03, -1, -0.25]
	},
	{
		name: "lavabo",
		colour: [0.37252937411651565, 0.23381866646199567, 0.544828629682768]
	},
	{
		name: "40-love",
		colour: [-0.9345150057299234, 0.5154926129946191, 0.36140050426619696]
	},
	{
		name: "eggg",
		colour: [0.7146197750215877, 0.9135517354397447, 0.4075349085517894]
	},
	{
		name: "vacuum",
		colour: [0.1894904492215712, 0.40649907600077917, -0.35009832345733694]
	},
	{
		name: "cream",
		colour: [2.665576975835908, 0.6133051169929784, 0.6470838473841618]
	},
	{
		name: "shimmer",
		colour: [-100, -100, -100]
	},
	{
		name: "random",
		colour: [0, 0, 0]
	}
];
var currentPalette = 0;

var mainMenu = [
	{
		text: "Start",
		action: function(){
			menu.deinit();
			menu = null;
			battle = new Battle();
			screen_filter.uniforms.uScanDistort += 200;
			screen_filter.uniforms.uChrAbbSeparation += 100;
			sounds["menu"].play();
		}
	},
	{
		text: "options",
		action: function(){
			menu.setOptions(optionsMenu);
			sounds["menu"].play();
		}
	},
	{
		text: "about",
		action: function(){
			menu.setOptions(aboutMenu);
			menu.deselect(menu.selection);
			menu.selection = menu.options.length-1;
			menu.select(menu.selection);
			sounds["menu"].play();
		}
	}
];

var optionsMenu = [
	{
		text: "Palette",
		action: function(){
			setPalette(currentPalette+1);
			menu.setOptions(optionsMenu);
			sounds["menu"].play();
		},
		actionDir: function(dir){
			setPalette(currentPalette+dir);
			menu.setOptions(optionsMenu);
			sounds["menu"].play();
		}
	},
	{
		text: "palette name",
		action: undefined
	},
	{
		text: "Scaling",
		action: function(){
			if(scaleMode === 1){
				scaleMode = 2;
			}else{
				scaleMode = 1;
			}
			storage.setItem("scaleMode", scaleMode)
			optionsMenu[3].text = scaleModes[scaleMode];
			menu.setOptions(optionsMenu, 2);
			onResize();
			sounds["menu"].play();
		},
		actionDir: function(dir){
			if(scaleMode === 1){
				scaleMode = 2;
			}else{
				scaleMode = 1;
			}
			storage.setItem("scaleMode", scaleMode)
			optionsMenu[3].text = scaleModes[scaleMode];
			menu.setOptions(optionsMenu, 2);
			onResize();
			sounds["menu"].play();
		}
	},
	{
		text: "Scale to Fit",
		action: undefined
	},
	{
		text: "Back",
		action: function(){
			menu.setOptions(mainMenu, 1);
			sounds["menuback"].play();
		}
	}
];

var aboutMenu = [
	{
		text: "Made for AGBIC2017",
		action: undefined
	},
	{
		text: "by SweetHeart♥Squad",
		action: undefined
	},
	{
		text: "based on famicase cart",
		action: undefined
	},
	{
		text: "by Rogue■Cache",
		action: undefined
	},
	{
		text: "Back",
		action: function(){
			menu.setOptions(mainMenu, 2);
			sounds["menuback"].play();
		}
	}
];

function Menu(){
	this.init();
}
Menu.prototype.init = function(){
	this.container = new PIXI.Container();
	this.optionsContainer = new PIXI.Container();
	this.optionsContainer.x = size.x*0.915;
	this.optionsContainer.y = size.y*0.6125;
	this.container.addChild(this.optionsContainer);

	title = text("Rōshigumi", {x:5*4,y:16*4}, 0.25,{x:0,y:0});
	title.x = size.x*0.7;
	title.y = size.y*0.4;
	title.line = new PIXI.Graphics();
	title.line.lineStyle(4,0xFFFFFF,1);
	title.line.moveTo(-title.width/2,title.height/2 + 4);
	title.line.lineTo(title.width/2,title.height/2 + 4);
	title.line.endFill();
	title.addChild(title.line);
	this.container.addChild(title);

	var s = svg("swordsvg",{x:64*2,y:64*2*0.1});
	s.drawCircle(38*2,0,40*2);
	s.drawCircle(38*2,0,44*2);
	s.rotation = Math.PI/2;
	s.y -= 38*2;
	this.thing = new PIXI.Container();
	this.thing.addChild(s);
	this.thing.x = size.x/4;
	this.thing.y = size.y/2;
	this.container.addChild(this.thing);

	optionsMenu[3].text = scaleModes[scaleMode];
	this.setOptions(mainMenu);

	scene.addChild(this.container);
};
Menu.prototype.setOptions = function(options, defaultSelection){
	screen_filter.uniforms.uScanDistort += 20;
	screen_filter.uniforms.uChrAbbSeparation += 10;

	defaultSelection = defaultSelection || 0;
	if(this.options){
		for(var i = 0; i < this.options.length; ++i){
			var o = this.options[i];
			o.parent.removeChild(o);
			o.destroy(true);
		}
	}
	var textScale = {
		x:8,
		y:10
	};
	this.options = options.slice();
	for(var i = 0; i < this.options.length; ++i){
		var t = text(this.options[i].text, textScale, 0.5,{x:-0.5,y:0});
		t.y += i*textScale.y*1.8;
		this.optionsContainer.addChild(t);
		var o = this.options[i];
		this.options[i] = t;
		this.options[i].action = o.action;
		this.options[i].actionDir = o.actionDir;
		if(!o.action){
			this.options[i].alpha = 0.4;
		}
	}

	this.selection = defaultSelection;
	this.select(defaultSelection);
}
Menu.prototype.deinit = function(){
	scene.removeChild(this.container);
	this.container.destroy(true);
};
Menu.prototype.next = function(){
	var s = this.selection;
	do{
		this.move(1);
	}while(!this.options[this.selection].action);
	if(s === this.selection){
		var s =sounds["menuback"].play();
	}else{
		var s=sounds["menu"].play();
		sounds["menu"].rate(0.85 + (Math.random()*2-1)*0.05,s);
	}
};
Menu.prototype.prev = function(){
	var s = this.selection;
	do{
		this.move(-1);
	}while(!this.options[this.selection].action);
	if(s === this.selection){
		var s =sounds["menuback"].play();
	}else{
		var s=sounds["menu"].play();
		sounds["menu"].rate(1.15 + (Math.random()*2-1)*0.05,s);
	}
};
Menu.prototype.move = function(by){
	this.deselect(this.selection);
	this.selection += by;
	while(this.selection >= this.options.length){
		this.selection -= this.options.length;
	}while(this.selection < 0){
		this.selection += this.options.length;
	}
	this.select(this.selection);
}
Menu.prototype.update = function(){
	var m = mouse.isJustDown(mouse.LEFT);
	var mouseActive = Math.abs(mouse.delta.x)+Math.abs(mouse.delta.y) > 0 || m;
	mouse.update(); /// hack: update mouse to avoid accepting clicks on menu

	// animation
	this.thing.rotation += 0.01;
	this.container.y = Math.sin(game.main.prevTime / 1200)*3;

	// interaction
	var input = getInput();
	if(mouseActive){
		for(var i = 0; i < this.options.length; ++i){
			this.deselect(i);
		}
		for(var i = 0; i < this.options.length; ++i){
			var o = this.options[i];
			var c = o.getBounds().contains(mouse.correctedPos.x, mouse.correctedPos.y);
			if(c){
				if(this.options[i].action){
					this.select(i);
					if(m){
						this.options[i].action();
						break;
					}
				}
			}
		}
	}else{
		if(input.down){
			this.next();
		}else if(input.up){
			this.prev();
		}else if(getJustAction1()){
			this.options[this.selection].action();
		}else if(this.options[this.selection].actionDir){
			if(input.left){
				this.options[this.selection].actionDir(-1);
			}else if(input.right){
				this.options[this.selection].actionDir(1);
			}
		}
	}

	if(keys.isJustDown(keys.ESCAPE)){
		if(this.options[0].action === mainMenu[0].action){
			quit();
		}else{
			this.setOptions(mainMenu, 0);
			var s =sounds["menuback"].play();
		}
	}

	if(Math.random() < 0.005){
		screen_filter.uniforms.uScanDistort += 10*Math.random();
		screen_filter.uniforms.uChrAbbSeparation += 100*Math.random();
	}
};
Menu.prototype.deselect = function(id){
	this.options[id].scale.x = this.options[id].scale.y = 1.0;
};
Menu.prototype.select = function(id){
	this.options[id].scale.x = this.options[id].scale.y = 1.3;
};


function setPalette(palette){
	currentPalette = palette;
	if(currentPalette < 0){
		currentPalette += palettes.length;
	}
	currentPalette %= palettes.length;
	if(currentPalette === palettes.length - 1){
		palettes[currentPalette].colour = [(Math.random()*2-1)*(Math.random()*3), (Math.random()*2-1)*(Math.random()*3), (Math.random()*2-1)*(Math.random()*3)];
	}
	optionsMenu[1].text = palettes[currentPalette].name;
	localStorage.setItem("palette", currentPalette);
}