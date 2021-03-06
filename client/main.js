function svg(source, scale, circleScale){
	var svg = data[source];
	var g = new PIXI.Graphics();
	for(var s = 0; s < svg.length; ++s){
		var points = svg[s].svg;
		var p = [];
		for(var i = 0; i < points.length; ++i){
			p[i] = {
				x: points[i].x,
				y: points[i].y
			};
			p[i].x -= svg[s].x;
			p[i].y -= svg[s].y;

			p[i].x *= scale.x;
			p[i].y *= scale.y;

			p[i].x = Math.round(p[i].x);
			p[i].y = Math.round(p[i].y);
		}
		g.moveTo(p[0].x,p[0].y);
		for(var i = 1; i < p.length; ++i){
			g.beginFill(0x000000,0);
			g.lineStyle(1,0xFFFFFF,1);
			g.lineTo(p[i].x,p[i].y);
			g.endFill();
		}
		for(var i = 0; i < p.length; ++i){
			g.drawCircle(p[i].x,p[i].y,circleScale || 0.5);
		}
	}
	g.endFill();
	return g;
}

function text(text,scale,spacing,anchor){
	scale = scale || {
		x:30,
		y:40
	};
	var xadvance = scale.x*(1.0+spacing);
	text = text.toLowerCase();
	var t = new PIXI.Container();
	//for(var shadow = 0; shadow < 2; ++shadow){
		for(var letter = 0; letter < text.length; ++letter){
			var a = text[letter] || 'x';
			for(var line = 0; line < a.length; ++line){
				var s = svg(a[line], scale);
				s.x = letter*xadvance;
				//if(shadow===0){
				//	s.tint = 0;
				//	s.x +=1;
				//	s.y +=1;
				//}
				t.addChild(s);
			}
		}
	//}
	var w = t.width/2 - xadvance*0.5;
	var w2 = t.width;
	var h = t.height;
	for(var i = 0; i < t.children.length; ++i){
		t.children[i].x -= w;
		t.children[i].x += w2*anchor.x;
		t.children[i].y += h*anchor.y;
	}
	return t;
}

function init(){
	initEnemies();

	// initialize input managers
	gamepads.init();
	keys.init({
		capture: [keys.ESCAPE,keys.LEFT,keys.RIGHT,keys.UP,keys.DOWN,keys.SPACE,keys.ENTER,keys.BACKSPACE,keys.ESCAPE,keys.W,keys.A,keys.S,keys.D,keys.P,keys.M]
	});
	if(!winnitronMode){
		mouse.init({
			element: "canvas",
			lock: true,
			capture: [mouse.LEFT, mouse.RIGHT],
			allowContextMenu: false
		});
	}

	// setup screen filter
	screen_filter = new CustomFilter(screen_shader);
	screen_filter.padding = 0;
	blur_filter = new CustomFilter(blur_shader);
	blur_filter.padding = 0;
	blur_filter.padding = 0;
	screen_filter.uniforms.uBufferSize = [nextPowerOfTwo(size.x*postProcessScale),nextPowerOfTwo(size.y*postProcessScale)];
	screen_filter.uniforms.uSpriteSize = [size.x,size.y];
	screen_filter.uniforms.uPostProcessScale = postProcessScale;
	screen_filter.uniforms.uScanDistort = 200;
	screen_filter.uniforms.uLensDistort = 100;
	screen_filter.uniforms.uChrAbbSeparation = 1000;
	
	blur_filter.uniforms.uResolution = [size.x,size.y];
	blur_filter.uniforms.uBlurAdd = uBlurAddT = 0.36;

	// read local storage
	if(winnitronMode){
		setPalette(2);
	}else{
		setPalette(localStorage.getItem("palette"));
	}screen_filter.uniforms.uPalette[0] = palettes[currentPalette].colour[0];
	screen_filter.uniforms.uPalette[1] = palettes[currentPalette].colour[1];
	screen_filter.uniforms.uPalette[2] = palettes[currentPalette].colour[2];

	scene = new PIXI.Container();
	// screen background
	(function(){
		var g = new PIXI.Graphics();
		g.beginFill(0x0,1.0);
		g.drawRect(0,0,size.x,size.y);
		g.endFill();
		t = g.generateTexture();
		bg = new PIXI.Sprite(t);
		g.destroy(true);
		scene.addChild(bg);
	}());



	if(debug.enabled){
		debug = new PIXI.Graphics();
		debug.enabled = true;
		debug.drawList = [];
		debug.draw = function(){
			for(var i = 0; i < this.drawList.length; ++i){
				this.drawList[i].debug();
			}
		}
		debug.add=function(e){
			debug.drawList.push(e);
		}
		debug.alpha=0.5;
	}else{
		debug.add = function(){};
	}

	// create render texture
	renderTexture = PIXI.RenderTexture.create(size.x,size.y,PIXI.SCALE_MODES.NEAREST,1);
	renderTexture2 = PIXI.RenderTexture.create(size.x,size.y,PIXI.SCALE_MODES.NEAREST,1);
	renderTexture3 = PIXI.RenderTexture.create(size.x*postProcessScale,size.y*postProcessScale,PIXI.SCALE_MODES.NEAREST,1);
	// create a sprite that uses the render texture
	renderSprite = new PIXI.Sprite(renderTexture);
	renderSprite2 = new PIXI.Sprite(renderTexture2);
	renderSprite3 = new PIXI.Sprite(renderTexture3);
	renderSprite.filters = [blur_filter];
	renderSprite2.filters = [blur_filter];
	renderSprite.filterArea = new PIXI.Rectangle(0,0,renderSprite.width,renderSprite.height);
	renderSprite2.filterArea = new PIXI.Rectangle(0,0,renderSprite2.width,renderSprite2.height);

	game.stage.addChild(renderSprite3);
	game.stage.addChild(scene);
	game.stage.filters = [screen_filter];
	game.stage.filterArea = new PIXI.Rectangle(0,0,size.x*postProcessScale,size.y*postProcessScale);

	
	//border
	(function(){
		var g = new PIXI.Graphics();
		g.beginFill(0,0);
		g.lineStyle(0,0xFFFFFF,1);
		g.drawRect(0,0,size.x,size.y);
		g.lineStyle(2,0xFFFFFF,1);
		g.drawRect(1,1,size.x-2,size.y-2);
		g.endFill();
		t = g.generateTexture();
		scene.addChild(new PIXI.Sprite(t));
		g.destroy(true);
	}());

	cursor = new PIXI.Graphics();
	cursor.size = 3.5;
	if(!winnitronMode){
		cursor.beginFill(0x0,0.0);
		cursor.lineStyle(1,0xFFFFFF,1);
		cursor.moveTo(0,0-cursor.size);
		cursor.lineTo(0,0+cursor.size);
		cursor.moveTo(0-cursor.size,0);
		cursor.lineTo(0+cursor.size,0);
		cursor.endFill();
		cursor.cacheAsBitmap = true;
	}
	scene.addChild(cursor);

	menu = new Menu();
	
	// start the main loop
	window.onresize = onResize;
	onResize();
	mouse.pos.x = size.x/2*scaleMultiplier*postProcessScale;
	mouse.pos.y = size.y/2*scaleMultiplier*postProcessScale;
	game.main.start();
}

function Pool(count, type){
	this.count = count;
	this.objs = [];
	this.live = [];
	this.dead = [];

	for(var i = 0; i < count; ++i){
		this.dead.push(new type());
		this.objs.push(this.dead[i]);
	}
}
Pool.prototype.update=function(){
	for(var i = 0; i < this.live.length; ++i){
		if(this.live[i].dead){
			var d = this.live.splice(i,1)[0];
			this.dead.push(d);
			d.kill();
		}
	}
};
Pool.prototype.add = function(){
	if(this.live.length < this.count){
		var b = this.dead.pop();
		b.dead = false;
		this.live.push(b);
		b.live.apply(b,arguments);
		return b;
	}
	return;
	console.warn("Pool exceeded max length!");
};
function Bullet(){
	var s = this.spr = new PIXI.Sprite(bullets.tex);
	s.anchor.x = s.anchor.y = 0.5;
	this.v = {
		x:0,
		y:0
	};
}
Bullet.prototype.debug = function(){
	debug.beginFill(0xFF0000,0);
	debug.lineStyle(1,0xFF0000,1);
	debug.drawCircle(this.spr.x,this.spr.y,bullets.radius);
	debug.endFill();
};
Bullet.prototype.kill = function(){
	bullets.container.removeChild(this.spr);
	if(debug.enabled){
		debug.drawList.splice(debug.drawList.indexOf(this),1);
	}
}
Bullet.lastShot = 0;
Bullet.prototype.live = function(e){
	this.spr.x = e.spr.x;
	this.spr.y = e.spr.y;
	debug.add(this);
	if(
		this.spr.x < 0 
		|| this.spr.x > size.x
		|| this.spr.y < 0
		|| this.spr.y > size.y
	){
		this.dead = true;
		return;
	}
	this.spr.rotation = Math.random()*Math.PI*2;
	bullets.container.addChild(this.spr);

	if(game.main.curTime > Bullet.lastShot){
		howlPos(sounds["shoot"], this.spr.x, this.spr.y, 0);
		sounds["shoot"].rate(1+(Math.random()*2-1)*0.1);
		sounds["shoot"].play();
		Bullet.lastShot = game.main.curTime;
	}
}

function Star(){
	var s = this.spr = new PIXI.Sprite(stars.tex);
	stars.container.addChild(s);
	s.scale.x = s.scale.y = 0;
}
Star.prototype.kill = function(){
	this.spr.scale.x = this.spr.scale.y = 0;
	stars.pool.add();
};
Star.prototype.live = function(){
	var r = Math.random();
	this.spr.scale.x = this.spr.scale.y = r*2;
	this.speed = r*0.1+0.05;
	this.speed*=4;
	if(Math.random() > 0.5){
		this.spr.x = Math.round(Math.random())*size.x;
		this.spr.y = Math.random()*size.y;
	}else{
		this.spr.y = Math.round(Math.random())*size.y;
		this.spr.x = Math.random()*size.x;
	}
};

function Particle(){
	var s = this.spr = new PIXI.Sprite(particles.tex);
	s.scale.x = s.scale.y = 0;
	particles.container.addChild(s);
}
Particle.prototype.kill = function(){
	this.spr.scale.x = this.spr.scale.y = 0;
};

Particle.prototype.live = function(p){
	this.spr.x = p.spr.x + (Math.random()*2-1)*p.radius;
	this.spr.y = p.spr.y + (Math.random()*2-1)*p.radius;
	this.spr.rotation = Math.random()*Math.PI*2;
	this.v = {
		x: (Math.random()*2-1)*3,
		y: (Math.random()*2-1)*3,
		r: (Math.random()*2-1)/2
	};
	this.spr.scale.x = this.spr.scale.y = Math.random()/2 + 0.5;
};

function update(){
	if(debug.enabled){
		debug.clear();
	}
	if(winnitronMode){
		mouse.correctedPos = {
			x: size.x/2,
			y: size.y/2
		};
	}else{
		mouse.correctedPos = {
			x: mouse.pos.x/scaleMultiplier/postProcessScale,
			y: mouse.pos.y/scaleMultiplier/postProcessScale
		};
	}

	if(menu){
		menu.update();
	}else if(battle){
		battle.update();
	}

	cursor.x = mouse.correctedPos.x;
	cursor.y = mouse.correctedPos.y;
	
	screen_filter.uniforms.uScanDistort *= 0.9;
	screen_filter.uniforms.uLensDistort = lerp(screen_filter.uniforms.uLensDistort, 0.3, 0.1);
	screen_filter.uniforms.uChrAbbSeparation = lerp(screen_filter.uniforms.uChrAbbSeparation, 30.0, 0.05);
	screen_filter.uniforms.uChrAbbRotation += 0.11;
	screen_filter.uniforms.uInvert = lerp(screen_filter.uniforms.uInvert, 0.0, 0.1);
	screen_filter.uniforms.uPalette[0] = lerp(screen_filter.uniforms.uPalette[0], palettes[currentPalette].colour[0], 0.3);
	screen_filter.uniforms.uPalette[1] = lerp(screen_filter.uniforms.uPalette[1], palettes[currentPalette].colour[1], 0.3);
	screen_filter.uniforms.uPalette[2] = lerp(screen_filter.uniforms.uPalette[2], palettes[currentPalette].colour[2], 0.3);

	/////////////////////
	// post-processing //
	/////////////////////
		var target = renderSprite;
		var source = renderSprite2;
		blur_filter.uniforms.uBlurDir = [0,0];
		bg.alpha = 1.0-decay;
		game.renderer.render(scene,source.texture);
		bg.alpha = 1.0;
		blur_filter.uniforms.uBlurDir = [0,1];
		blur_filter.uniforms.uBlurAdd = lerp(blur_filter.uniforms.uBlurAdd, uBlurAddT, 0.1);
		blur_filter.uniforms.uTime = screen_filter.uniforms.uTime = game.main.prevTime/1000%10000;
		for(var i = 0; i < blurIt; ++i){
			//blur_filter.uniforms.uBlurAdd = i/blurIt;
			source = i % 2 ? renderSprite : renderSprite2;
			target = i % 2 ? renderSprite2 : renderSprite;
			blur_filter.uniforms.uBlurDir[0] = i % 2 * (i/blurIt+0.5);
			blur_filter.uniforms.uBlurDir[1] = !(i % 2) * (i/blurIt+0.5);
			game.renderer.render(source,target.texture);
		}
		game.renderer.render(target,renderTexture3);
		bg.alpha = 0.0;

	///////////////////////////
	// update input managers //
	///////////////////////////
		gamepads.update();
		keys.update();
		if(!winnitronMode){
			mouse.update();
		}

		// keep mouse within screen
		mouse.pos.x = clamp(0, mouse.pos.x, size.x * scaleMultiplier*postProcessScale);
		mouse.pos.y = clamp(0, mouse.pos.y, size.y * scaleMultiplier*postProcessScale);
}
function toggleMute(){
	if(Howler._muted){
		Howler.unmute();
	}else{
		Howler.mute();
	}
}

function getAction1(){
	if(winnitronMode){
		return keys.isDown(keys.PERIOD);
	}
	return keys.isDown(keys.Z) 
	|| keys.isDown(keys.C)
	|| keys.isDown(keys.SPACE)
	|| keys.isDown(keys.CTRL)
	|| keys.isDown(keys.BACKTICK)
	|| gamepads.isDown(gamepads.A)
	|| gamepads.isDown(gamepads.Y)
	|| gamepads.isDown(gamepads.RB)
	|| gamepads.isDown(gamepads.RT)
	|| mouse.isDown(mouse.LEFT);
}

function getJustAction1(){
	if(winnitronMode){
		return keys.isJustDown(keys.PERIOD);
	}
	return keys.isJustDown(keys.Z) 
	|| keys.isJustDown(keys.C)
	|| keys.isJustDown(keys.SPACE)
	|| keys.isJustDown(keys.CTRL)
	|| keys.isJustDown(keys.BACKTICK)
	|| gamepads.isJustDown(gamepads.A)
	|| gamepads.isJustDown(gamepads.Y)
	|| gamepads.isJustDown(gamepads.RB)
	|| gamepads.isJustDown(gamepads.RT)
	|| mouse.isJustDown(mouse.LEFT);
}

function getAction2(){
	if(winnitronMode){
		return keys.isDown(keys.SLASH);
	}
	return keys.isDown(keys.X) 
	|| keys.isDown(keys.V)
	|| keys.isDown(keys.SHIFT)
	|| keys.isDown(keys.ONE)
	|| gamepads.isDown(gamepads.X)
	|| gamepads.isDown(gamepads.B)
	|| gamepads.isDown(gamepads.LB)
	|| gamepads.isDown(gamepads.LT)
	|| mouse.isDown(mouse.RIGHT);
}

function getJustAction2(){
	if(winnitronMode){
		return keys.isJustDown(keys.SLASH);
	}
	return keys.isJustDown(keys.X) 
	|| keys.isJustDown(keys.V)
	|| keys.isJustDown(keys.SHIFT)
	|| keys.isJustDown(keys.ONE)
	|| gamepads.isJustDown(gamepads.X)
	|| gamepads.isJustDown(gamepads.B)
	|| gamepads.isJustDown(gamepads.LB)
	|| gamepads.isJustDown(gamepads.LT)
	|| mouse.isJustDown(mouse.RIGHT);
}

function getInput(){
	var res = {
		up: false,
		down: false,
		left: false,
		right: false,
		move: {
			x:0,
			y:0
		}
	};
	if(winnitronMode){
		res.up |= keys.isJustDown(keys.UP);
		res.down |= keys.isJustDown(keys.DOWN);
		res.left |= keys.isJustDown(keys.LEFT);
		res.right |= keys.isJustDown(keys.RIGHT);
		if(keys.isDown(keys.DOWN)){
			res.move.y += 1;
		}
		if(keys.isDown(keys.UP)){
			res.move.y -= 1;
		}if(keys.isDown(keys.LEFT)){
			res.move.x -= 1;
		}
		if(keys.isDown(keys.RIGHT)){
			res.move.x += 1;
		}
	} else {
		gamepads.deadZone = 0.25;
		gamepads.snapZone = 0.1;
		
		res.up |= keys.isJustDown(keys.UP);
		res.up |= keys.isJustDown(keys.W);
		res.up |= gamepads.isJustDown(gamepads.DPAD_UP);
		res.up |= gamepads.axisJustPast(gamepads.LSTICK_V, gamepads.deadZone);

		if(
			keys.isDown(keys.UP) ||
			keys.isDown(keys.W) ||
			gamepads.isDown(gamepads.DPAD_UP)
		){
			res.move.y -= 1;
		}if(gamepads.axisPast(gamepads.LSTICK_V, gamepads.deadZone)){
			res.move.y += gamepads.getAxis(gamepads.LSTICK_V);
		}

		res.down |= keys.isJustDown(keys.DOWN);
		res.down |= keys.isJustDown(keys.S);
		res.down |= gamepads.isJustDown(gamepads.DPAD_DOWN);
		res.down |= gamepads.axisJustPast(gamepads.LSTICK_V, -gamepads.deadZone);

		if(
			keys.isDown(keys.DOWN) ||
			keys.isDown(keys.S) ||
			gamepads.isDown(gamepads.DPAD_DOWN)
		){
			res.move.y += 1;
		}if(gamepads.axisPast(gamepads.LSTICK_V, -gamepads.deadZone)){
			res.move.y += gamepads.getAxis(gamepads.LSTICK_V);
		}

		res.left |= keys.isJustDown(keys.LEFT);
		res.left |= keys.isJustDown(keys.A);
		res.left |= gamepads.isJustDown(gamepads.DPAD_LEFT);
		res.left |= gamepads.axisJustPast(gamepads.LSTICK_H, -gamepads.deadZone);

		if(
			keys.isDown(keys.LEFT) ||
			keys.isDown(keys.A) ||
			gamepads.isDown(gamepads.DPAD_LEFT)
		){
			res.move.x -= 1;
		}if(gamepads.axisPast(gamepads.LSTICK_H, -gamepads.deadZone)){
			res.move.x += gamepads.getAxis(gamepads.LSTICK_H);
		}

		res.right |= keys.isJustDown(keys.RIGHT);
		res.right |= keys.isJustDown(keys.D);
		res.right |= gamepads.isJustDown(gamepads.DPAD_RIGHT);
		res.right |= gamepads.axisJustPast(gamepads.LSTICK_H, gamepads.deadZone);

		if(
			keys.isDown(keys.RIGHT) ||
			keys.isDown(keys.D) ||
			gamepads.isDown(gamepads.DPAD_RIGHT)
		){
			res.move.x += 1;
		}if(gamepads.axisPast(gamepads.LSTICK_H, gamepads.deadZone)){
			res.move.x += gamepads.getAxis(gamepads.LSTICK_H);
		}
	}

	res.move.x = clamp(-1,res.move.x,1);
	res.move.y = clamp(-1,res.move.y,1);

	return res;
}