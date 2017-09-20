function Menu(){
	this.init();
}
Menu.prototype.init = function(){
	this.container = new PIXI.Container();
	this.options = [
		{
			text: "Start",
			action: function(){
				menu.deinit();
				menu = null;
				battle = new Battle();
				screen_filter.uniforms.uScanDistort += 200;
				screen_filter.uniforms.uChrAbbSeparation += 100;
			}
		},
		{
			text: "options",
			action: function(){
				console.log('nah');
			}
		},
		{
			text: "about",
			action: function(){
				console.log('nah');
			}
		}
	];
	this.options.container = new PIXI.Container();
	this.options.container.x = size.x*0.915;
	this.options.container.y = size.y*0.625;
	this.container.addChild(this.options.container);
	var textScale = {
		x:10,
		y:10
	};
	for(var i = 0; i < this.options.length; ++i){
		var t = text(this.options[i].text, textScale, 0.5,{x:-0.5,y:0});
		t.y += i*textScale.y*1.75;
		this.options.container.addChild(t);
		var a = this.options[i].action;
		this.options[i] = t;
		this.options[i].action = a;
	}

	ayy = text("Rōshigumi", {x:5*4,y:16*4}, 0.25,{x:0,y:0});
	ayy.x = size.x*0.7;
	ayy.y = size.y*0.4;
	ayy.line = new PIXI.Graphics();
	ayy.line.lineStyle(4,0xFFFFFF,1);
	ayy.line.moveTo(-ayy.width/2,ayy.height/2 + 4);
	ayy.line.lineTo(ayy.width/2,ayy.height/2 + 4);
	ayy.line.endFill();
	ayy.addChild(ayy.line);
	this.container.addChild(ayy);

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

	this.selection = 0;
	this.select(this.selection);

	scene.addChild(this.container);
};
Menu.prototype.deinit = function(){
	scene.removeChild(this.container);
	this.container.destroy();
};
Menu.prototype.next = function(){
	this.move(1);
};
Menu.prototype.prev = function(){
	this.move(-1);
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
	var s=sounds["menu"].play();
	sounds["menu"].rate(1 + (Math.random()*2-1)*0.1,s);
}
Menu.prototype.update = function(){
	mouse.update(); /// hack: update mouse to avoid accepting clicks on menu

	// animation
	this.thing.rotation += 0.01;
	this.container.y = Math.sin(game.ticker.lastTime / 1200)*3;

	// interaction
	var input = getInput();
	if(input.down){
		this.next();
	}else if(input.up){
		this.prev();
	}else if(getJustAction1()){
		this.options[this.selection].action();
		var s =sounds["menu"].play();
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
	this.options[id].scale.x = this.options[id].scale.y = 1.5;
};