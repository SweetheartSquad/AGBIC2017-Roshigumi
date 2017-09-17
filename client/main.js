// main loop
// DATA:
	var alphabet = {
		'0': [{x:0.5,y:0.5,svg:'<polyline id="o" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="0.1590909,160.2954559 0.1590909,0.2045455 120.227272,0.2045455 120.227272,160.2954559 0.1590909,160.2954559 "/>'}],
		'1': [{x:0.5,y:0.5,svg:'<polyline id="n1" style="fill:none;stroke:#000000;stroke-miterlimit:10;" points="-279.9659119,618 -219.9659119,538 -219.9659119,698 -159.9659119,698 -279.9659119,698 "/>'}],
		'2': [{x:0.5,y:0.5,svg:'<polyline id="n2" style="fill:none;stroke:#000000;stroke-miterlimit:10;" points="-139.8863678,538 -19.8863678,538 -19.8863678,618 -139.8863678,618 -139.8863678,698 -19.8863678,698 "/>'}],
		'3': [{x:0.5,y:0.5,svg:'<polyline id="n3" style="fill:none;stroke:#000000;stroke-miterlimit:10;" points="0.1931763,538 120.1931763,538 120.1931763,618 0.1931763,618 120.1931763,618 120.1931763,698 0.1931763,698 "/>'}],
		'4': [{x:0.5,y:0.5,svg:'<polyline id="n4" style="fill:none;stroke:#000000;stroke-miterlimit:10;" points="140.2727203,538 140.2727203,618 260.2727051,618 260.2727051,538 260.2727051,698 "/>'}],
		'5': [{x:0.5,y:0.5,svg:'<polyline id="n5" style="fill:none;stroke:#000000;stroke-miterlimit:10;" points="280,698 400,698 400,618 280,618 280,538 400,538 "/>'}],
		'6': [{x:0.5,y:0.5,svg:'<polyline id="n6" style="fill:none;stroke:#000000;stroke-miterlimit:10;" points="-159.9658813,710.5 -279.9658813,710.5 -279.9658813,870.5 -159.9658966,870.5 -159.9658813,790.5 -279.9658813,790.5 "/>'}],
		'7': [{x:0.5,y:0.5,svg:'<polyline id="n7" style="fill:none;stroke:#000000;stroke-miterlimit:10;" points="-139.8863678,710.5 -19.8863678,710.5 -19.8863678,870.5 "/>'}],
		'8': [{x:0.5,y:0.5,svg:'<polyline id="n8" style="fill:none;stroke:#000000;stroke-miterlimit:10;" points="0.1931763,870.5 0.1931763,790.5 120.1931763,790.5 0.1931763,790.5 0.1931763,710.5 120.1931763,710.5 120.1931763,870.5 0.1931763,870.5 "/>'}],
		'9': [{x:0.5,y:0.5,svg:'<polyline id="n9" style="fill:none;stroke:#000000;stroke-miterlimit:10;" points="260.2727051,790.5 140.2727203,790.5 140.2727203,710.5 260.2727051,710.5 260.2727051,870.5 "/>'}],
		a: [{x:0.5,y:0.5,svg:'<polyline id="a" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="-280,-199.9090881 -280,-279.9545593 -219.9659119,-360 -159.9318237,-279.9545593 -159.9318237,-199.9090881 -159.9318237,-279.9545593 -280,-279.9545593 "/>'}],
		b: [{x:0.5,y:0.5,svg:'<polyline id="b" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="-139.9204559,-199.9090881 -139.9204559,-360 -79.8863602,-360 -19.852272,-319.9772644 -79.8863602,-279.9545593 -19.852272,-239.9318237 -79.8863602,-199.9090881 -139.9204559,-199.9090881 "/>'}],
		c: [{x:0.5,y:0.5,svg:'<polyline id="c" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="120.227272,-360 0.1590909,-360 0.1590909,-199.9090881 120.227272,-199.9090881 "/>'}],
		d: [{x:0.5,y:0.5,svg:'<polyline id="d" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="140.2386322,-199.9090881 200.2727203,-199.9090881 260.3068237,-279.9545593 200.2727203,-360 140.2386322,-360 140.2386322,-199.9090881 "/>'}],
		e: [{x:0.5,y:0.5,svg:'<polyline id="e" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="400.3863525,-360 280.3181763,-360 280.3181763,-279.9545593 340.3522644,-279.9545593 280.3181763,-279.9545593 280.3181763,-199.9090881 400.3863525,-199.9090881 "/>'}],
		f: [{x:0.5,y:0.5,svg:'<polyline id="f" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="540.4658813,-360 420.3977356,-360 420.3977356,-279.9545593 480.4318237,-279.9545593 420.3977356,-279.9545593 420.3977356,-199.9090881 "/>'}],
		g: [{x:0.5,y:0.5,svg:'<polyline id="g" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="-159.9318237,-179.8977203 -280,-179.8977203 -280,-19.806818 -159.9318237,-19.806818 -159.9318237,-99.852272 -219.9659119,-99.852272 "/>'}],
		h: [{x:0.5,y:0.5,svg:'<polyline id="h" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="-139.9204559,-179.8977203 -139.9204559,-19.806818 -139.9204559,-99.852272 -19.852272,-99.852272 -19.852272,-179.8977203 -19.852272,-19.806818 "/>'}],
		i: [{x:0.5,y:0.5,svg:'<polyline id="i" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="0.1590909,-19.806818 120.227272,-19.806818 60.1931801,-19.806818 60.1931801,-179.8977203 120.227272,-179.8977203 0.1590909,-179.8977203 "/>'}],
		j: [{x:0.5,y:0.5,svg:'<polyline id="j" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="140.2386322,-179.8977203 260.3068237,-179.8977203 260.3068237,-19.806818 140.2386322,-19.806818 140.2386322,-99.852272 "/>'}],
		k: [{x:0.5,y:0.5,svg:'<polyline id="k" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="280.3181763,-179.8977203 280.3181763,-19.806818 280.3181763,-99.852272 400.3863525,-179.8977203 280.3181763,-99.852272 400.3863525,-19.806818 "/>'}],
		l: [{x:0.5,y:0.5,svg:'<polyline id="l" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="420.3977356,-179.8977203 420.3977356,-19.806818 540.4658813,-19.806818 "/>'}],
		m: [{x:0.5,y:0.5,svg:'<polyline id="m" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="-280,160.2954559 -280,0.2045455 -219.9659119,80.25 -159.9318237,0.2045455 -159.9318237,160.2954559 "/>'}],
		n: [{x:0.5,y:0.5,svg:'<polyline id="n" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="-139.9204559,160.2954559 -139.9204559,0.2045455 -19.852272,160.2954559 -19.852272,0.2045455 "/>'}],
		o: [{x:0.5,y:0.5,svg:'<polyline id="o" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="0.1590909,160.2954559 0.1590909,0.2045455 120.227272,0.2045455 120.227272,160.2954559 0.1590909,160.2954559 "/>'}],
		p: [{x:0.5,y:0.5,svg:'<polyline id="p" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="140.2386322,160.2954559 140.2386322,0.2045455 260.3068237,0.2045455 260.3068237,80.25 140.2386322,80.25 "/>'}],
		q: [{x:0.5,y:0.5,svg:'<polyline id="q" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="400.3863525,160.2954559 280.3181763,160.2954559 280.3181763,0.2045455 400.3863525,0.2045455 400.3863525,160.2954559 340.3522644,80.25 "/>'}],
		r: [{x:0.5,y:0.5,svg:'<polyline id="r" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="420.3977356,160.2954559 420.3977356,0.2045455 540.4658813,0.2045455 540.4658813,80.25 420.3977356,80.25 540.4658813,160.2954559 "/>'}],
		s: [{x:0.5,y:0.5,svg:'<polyline id="s" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="-159.9318237,180.3068237 -280,180.3068237 -280,260.3522644 -159.9318237,260.3522644 -159.9318237,340.3977356 -280,340.3977356 "/>'}],
		t: [{x:0.5,y:0.5,svg:'<polyline id="t" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="-79.8863602,340.3977356 -79.8863602,180.3068237 -139.9204559,180.3068237 -19.852272,180.3068237 "/>'}],
		u: [{x:0.5,y:0.5,svg:'<polyline id="u" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="0.1590909,180.3068237 0.1590909,340.3977356 120.227272,340.3977356 120.227272,180.3068237 "/>'}],
		v: [{x:0.5,y:0.5,svg:'<polyline id="v" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="140.2386322,180.3068237 200.2727203,340.3977356 260.3068237,180.3068237 "/>'}],
		w: [{x:0.5,y:0.5,svg:'<polyline id="w" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="280.3181763,180.3068237 280.3181763,340.3977356 340.3522644,260.3522644 400.3863525,340.3977356 400.3863525,180.3068237 "/>'}],
		x: [{x:0.5,y:0.5,svg:'<polyline id="x" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="420.3977356,180.3068237 480.4318237,260.3522644 420.3977356,340.3977356 540.4658813,180.3068237 480.4318237,260.3522644 540.4658813,340.3977356 "/>'}],
		y: [{x:0.5,y:0.5,svg:'<polyline id="y" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="-159.9318237,360.4090881 -219.9659119,440.4545593 -219.9659119,520.5 -219.9659119,440.4545593 -280,360.4090881 "/>'}],
		z: [{x:0.5,y:0.5,svg:'<polyline id="z" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="-139.9204559,360.4090881 -19.852272,360.4090881 -139.9204559,520.5 -19.852272,520.5 "/>'}],
		' ': [{x:0.5,y:0.5,svg:'<polyline id="z" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points=" "/>'}],
		ō: [
			{x:0.5,y:0.5,svg:'<polyline id="o" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="0.1590909,160.2954559 0.1590909,0.2045455 120.227272,0.2045455 120.227272,160.2954559 0.1590909,160.2954559 "/>'},
			{x:0.5,y:0.75,svg:'<polyline id="-" style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="279.9659119,480.000061 400.0340881,480.000061 "/>'}
		]
	};
	var ship = {x:0.5,y:0.5,svg:'<polyline style="fill:none;stroke:#000000;stroke-miterlimit:1;" points="-1.7217677,77.8081665 -1.7217677,85.6124802 -26.4742451,94.2904053 -36.4334755,107.9188232 -60.6035385,102.0518188 -60.6035385,109.899025 -86.2296295,124.7425537 -86.2296295,95.862915 -86.2296295,124.7425537 -92.5779114,128.4197083 -92.5779114,34.8844643 -86.2296295,38.8670845 -86.2296295,66.8005981 -86.2296295,38.8670845 -60.6035385,53.5216217 -60.6035385,61.2324562 -36.2587509,55.6183014 -26.4742451,68.6060715 -92.5779114,68.6060715 -36.2587509,55.6183014 6.8979177,72.8576736 6.8979177,90.562973 -36.4334755,107.9188232 -92.5779114,94.2904053 -26.4742451,94.2904053 -26.4742451,68.6060715 6.8396764,81.0114288 "/>'};
	var sword ={x:-0.1,y:0.5,svg:'<polyline style="fill:none;stroke:#000000;stroke-miterlimit:10;" points="-77.109581,77.4318237 -77.109581,87.4044571 -79.5419312,87.4044571 -79.5419388,77.8270798 -79.5419388,85.1241302 -104.9599991,85.1241302 -104.9599991,77.8270798 -101.1493149,77.8270798 -101.1493149,85.1241302 -101.1493149,77.8270798 -79.5419312,77.8270798 -79.5419312,75.4555435 -77.109581,75.4555435 -77.109581,77.4318237 -4.9599991,77.3710175 -14.6285906,82.296524 -4.9599991,77.3710175 -12.5610933,85.3977737 -14.6285906,82.296524 -73.2786331,82.296524 -73.2786331,77.4318237 -73.2786331,85.45858 -77.109581,85.4535446 -12.5610933,85.3977737 "/>'};
	var heart={x:0.5,y:0.5,svg:'<polyline id="XMLID_1_" style="fill:none;stroke:#231F20;stroke-miterlimit:10;" points="50,100 0,50 0,25 25,0 50,25 75,0 100,25 100,50 50,100 "/>'};
	var bullet={x:0,y:0,svg:'<polyline id="XMLID_1_" style="fill:none;stroke:#231F20;stroke-miterlimit:10;" points="25,25 40,10 60,10 100,50 78.5,50 50,80 50,20 20,50 0,50 40,90 60,90 75,75 "/>'};
	var enemy_sam={x:0.5,y:0.5,svg:'<polyline style="fill:none;stroke:#000000;stroke-miterlimit:10;" points="79.4,5.5 79.4,0 38.6,0 38.6,5.5 37.2,5.5 80.9,5.5 80.9,27.5 77.2,27.5 73.2,23.1 50.6,23.1 50.1,23.1 49.7,22.9 46.2,20.8 39.8,27.4 37.2,27.5 37.2,5.6 37.2,27.6 39.7,27.5 29.5,37.9 29.5,47.2 30.8,47.4 33,44.7 32.7,39.2 49.8,23.1 73.2,23.3 89.8,40.6 89.8,59.3 73.2,76.7 77.3,62.1 83.2,61 83.2,38.8 77.3,37.7 73.2,23.6 83,38.6 83.2,61.4 73.2,76.9 50.1,76.7 32.7,61 32.7,54.9 38.6,62.4 63.7,52.5 63.7,47.4 38.6,37.5 30.8,47.5 16.2,44 10.2,47.5 10.2,52.4 16.2,55.9 30.8,52.4 30.8,47.6 30.8,52.5 32.7,54.9 30.7,52.5 29.5,52.8 29.5,62 39.6,72.4 37.2,72.5 39.8,72.5 46.2,79.1 50.5,76.7 73.2,76.7 77.4,72.5 80.9,72.5 80.8,94.5 38.6,94.5 79.4,94.6 79.4,100 38.6,100 38.6,94.6 37.2,94.5 37.2,72.6 "/>'}
	var enemy_circle={x:0.5,y:0.5,svg:'<polyline class="st0" points="29.3,86.5 70.7,86.5 100,65.2 99.9,60.5 29.3,60.7 29.3,86.5 0,65.2 0,35 29.3,13.5 70.7,13.5 100,35 99.9,60.5 77.6,60.5 82.3,54.9 82.2,46.3 77.2,40.4 70.2,38.6 78,18.8 70.2,38.6 29.3,38.7 29.3,13.5 29.3,60.7 "/>'}
	var enemy_triangle={x:0.5,y:0.5,svg:'<polyline class="st0" points="26,67 33.9,67 33.9,100 33.9,67 62.1,67 62.1,78.3 62.1,33.1 84.7,33.1 33.9,33.1 33.9,0 33.9,33.1 26,33.1 26,0 33.9,0 62.1,21.7 74.9,24.9 84.7,33.1 90.4,50 86.1,65.1 76.2,74.5 62.1,78.3 33.9,100 26,100 26,67 18.3,64.1 11.8,58.6 9.6,50 11.8,41.8 18.7,35.1 26,33.1 "/>'}
	var enemy_cross={x:0.5,y:0.5,svg:'<polyline class="st0" points="94.2,38.3 70.6,38.3 70.7,24.4 70.6,75.2 91,68.1 100,49.9 90.9,31.6 70.5,24.4 50.2,10.3 29.9,24.4 9.6,31.1 0,49.8 9.1,67.9 30,75.3 57.4,15.3 40.3,52.5 40.3,42.4 33.1,36.5 24.5,38.9 20.2,46.9 20.2,58.1 24.1,67.3 30,75.3 50.3,89.8 70.6,75.2 "/>'}
function svg(source, scale){
	var points = source.svg.split("points=\"")[1].split(" \"")[0].split(' ');
	var max = {
		x:-99999,
		y:-99999
	};
	var min = {
		x:99999,
		y:99999
	};
	for(var i = 0; i < points.length; ++i){
		points[i] = points[i].split(',');
		var x = parseFloat(points[i][0]);
		var y = parseFloat(points[i][1]);
		points[i] = {
			x:x,
			y:y
		};

		max.x = Math.max(max.x, x);
		min.x = Math.min(min.x, x);
		max.y = Math.max(max.y, y);
		min.y = Math.min(min.y, y);
	}
	for(var i = 0; i < points.length; ++i){
		points[i].x -= min.x;
		points[i].y -= min.y;
		points[i].x /= (max.x-min.x) || 1;
		points[i].y /= (max.y-min.y) || 1;

		points[i].x -= source.x;
		points[i].y -= source.y;


		points[i].x *= scale.x;
		points[i].y *= scale.y;

		points[i].x = Math.round(points[i].x);
		points[i].y = Math.round(points[i].y);
	}
	var g = new PIXI.Graphics();
	g.beginFill(0x000000,0);
	g.moveTo(points[0].x,points[0].y);
	for(var i = 1; i < points.length; ++i){
		g.lineStyle(1,0xFFFFFF,1);
		g.lineTo(points[i].x,points[i].y);
	}
	for(var i = 0; i < points.length; ++i){
		g.drawCircle(points[i].x,points[i].y,0.5);
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
			var a = alphabet[text[letter]] || alphabet['x'];
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
	for(var i = 0; i < t.children.length; ++i){
		t.children[i].x -= w;
	}
	return t;
}

function init(){
	// initialize input managers
	gamepads.init();
	keys.init({
		capture: [keys.LEFT,keys.RIGHT,keys.UP,keys.DOWN,keys.SPACE,keys.ENTER,keys.BACKSPACE,keys.ESCAPE,keys.W,keys.A,keys.S,keys.D,keys.P,keys.M]
	});
	mouse.init("canvas", true);

	// setup screen filter
	screen_filter = new CustomFilter(PIXI.loader.resources.screen_shader.data);
	screen_filter.padding = 0;
	blur_filter = new CustomFilter(PIXI.loader.resources.blur_shader.data);
	blur_filter.padding = 0;
	blur_filter.padding = 0;
	screen_filter.uniforms.uBufferSize = [nextPowerOfTwo(size.x*postProcessScale),nextPowerOfTwo(size.y*postProcessScale)];
	screen_filter.uniforms.uSpriteSize = [size.x,size.y];
	screen_filter.uniforms.uPostProcessScale = postProcessScale;
	screen_filter.uniforms.uScanDistort = 0;
	blur_filter.uniforms.uResolution = [size.x,size.y];
	blur_filter.uniforms.uBlurAdd = uBlurAddT = 0.36;

	// setup main loop
	var main = function(){
	    // update time
	    this.accumulator += game.ticker.elapsedMS;

	    // call render if needed
	    if (this.accumulator > this.timestep) {
	    	update();
	        this.accumulator -= this.timestep;
	    }
		blur_filter.uniforms.uTime = screen_filter.uniforms.uTime = game.ticker.lastTime/1000%10000;
	}
	main.accumulator = 0;
	main.timestep = 1000/60; // target ms/frame
	game.ticker.add(main.bind(main));

	scene = new PIXI.Container();
	// screen background
	(function(){
		var g = new PIXI.Graphics();
		g.beginFill(0x0,1.0);
		g.drawRect(0,0,size.x,size.y);
		g.endFill();
		t = g.generateTexture();
		bg = new PIXI.Sprite(t);
		g.destroy();
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
	renderSprite3.filters = [screen_filter];
	renderSprite.filterArea = new PIXI.Rectangle(0,0,renderSprite.width,renderSprite.height);
	renderSprite2.filterArea = new PIXI.Rectangle(0,0,renderSprite2.width,renderSprite2.height);
	renderSprite3.filterArea = new PIXI.Rectangle(0,0,renderSprite3.width,renderSprite3.height);

	game.stage.addChild(renderSprite3);
	renderSprite3.addChild(scene);

	player = new Player();

	debug.add(player);

	sword = svg(sword,{x:64,y:64*0.1});
	sword.side = 1;
	sword.overshoot=0;

	cursor = new PIXI.Graphics();
	cursor.size = 3;

	bullets = {};


	bullets.max = 10000;
	bullets.radius = 6;
	bullets.container = new PIXI.ParticleContainer(bullets.max, {
		scale:false,
		position:true,
		rotation:true
	}, bullets.max);
	(function(){
		var b = svg(bullet,{x:bullets.radius*2.5,y:bullets.radius*2.5});
		bullets.tex = b.generateTexture();
		b.destroy();
	}());
	bullets.pool = new Pool(bullets.max, Bullet);

	scene.addChild(bullets.container);

	stars = {};
	stars.max = 100;
	stars.radius = 1;
	stars.container = new PIXI.ParticleContainer(stars.max, {
		scale:true,
		position:true,
		rotation:true
	}, bullets.max);
	(function(){
		// var b = svg(bullet,{x:bullets.radius*2.5,y:bullets.radius*2.5});
		// stars.tex = b.generateTexture();
		// b.destroy();
		var s = new PIXI.Graphics();
		s.beginFill(0xFFFFFF,1);
		s.drawRect(0,0,1,1);
		s.endFill();
		stars.tex = s.generateTexture();
		s.destroy();
	}());
	stars.pool = new Pool(stars.max, Star);
	for(var i = 0; i < stars.max/2; ++i){
		var s = stars.pool.add();
		s.spr.x = Math.random()*size.x;
		s.spr.y = Math.random()*size.y;
	}

	scene.addChild(stars.container);



	enemies = [];

	//enemy = svg(enemy_sam,{x:48,y:48*0.8});
	e = new Enemy({svg:enemy_triangle,x:48*0.8,y:48});
	e.spr.x = size.x*0.75;
	e.spr.y = size.y/3;
	debug.add(e);
	enemies.push(e);

	e = new Enemy({svg:enemy_cross,x:48,y:48*0.8});
	e.spr.x = size.x/2;
	e.spr.y = size.y/2;
	debug.add(e);
	enemies.push(e);

	e = new Enemy({svg:enemy_circle,x:48,y:48*0.7});
	e.spr.x = size.x*0.75;
	e.spr.y = size.y*0.75;
	debug.add(e);
	enemies.push(e);

	e = new Enemy({svg:enemy_sam,x:48*0.8,y:48});
	e.spr.x = size.x*0.25;
	e.spr.y = size.y*0.75;
	debug.add(e);
	enemies.push(e);


	scene.addChild(player.spr);
	scene.addChild(sword);
	scene.addChild(cursor);

	//border
	var g = new PIXI.Graphics();
	g.beginFill(0x0,0);
	g.lineStyle(1,0xFFFFFF,1);
	g.drawRect(2,2,size.x-3,size.y-3);
	g.endFill();
	scene.addChild(g);

	menu = {};
		menu.init = function(){
			this.container = new PIXI.Container();
			this.options = [
				"1p",
				"2p",
				"options",
				"about"
			];
			this.selection = 2;
			this.options.container = new PIXI.Container();
			this.options.container.x = size.x*2/3;
			this.options.container.y = size.y*2/3;
			this.container.addChild(this.options.container);
			var textScale = {
				x:10,
				y:10
			};
			for(var i = 0; i < this.options.length; ++i){
				var t = text(this.options[i], textScale, 0.25,{x:0.5,y:0.5});
				t.y += i*textScale.y*1.75;
				this.options.container.addChild(t);
				this.options[i] = t;
			}

			ayy = text("Rōshigumi", {x:6*4,y:14*4}, 0.25,{x:0.5,y:0.5});
			ayy.x = size.x/2;
			ayy.y = size.y/2;
			this.container.addChild(ayy);

			scene.addChild(this.container);
			this.next();
		};
		menu.next = function(){
			this.move(1);
		};
		menu.prev = function(){
			this.move(-1);
		};
		menu.move = function(by){
			this.deselect(this.selection);
			this.selection += by;
			while(this.selection >= this.options.length){
				this.selection -= this.options.length;
			}while(this.selection < 0){
				this.selection += this.options.length;
			}
			this.select(this.selection);			
		}
		menu.update = function(){
			var input = getInput();
			if(input.down){
				this.next();
			}if(input.up){
				this.prev();
			}
		};
		menu.deselect = function(id){
			this.options[id].scale.x = this.options[id].scale.y = 1.0;
		};
		menu.select = function(id){
			this.options[id].scale.x = this.options[id].scale.y = 1.5;
		};

	//menu.init();

	health = {
		container: new PIXI.Container(),
		hearts: [],
		current: 3,
		max: 3,
		init: function(){
			for(var i = 0; i < this.max; ++i){
				var h = svg(heart,{x:24,y:24});
				h.x = 32*i;
				this.hearts.push(h);
				this.container.addChild(h);
			}
			this.container.y = 32;
			this.container.x = 32;

			scene.addChild(this.container);
		},
		damage: function(){
			if(this.current > 0){
				this.current -= 1;
				this.hearts[this.current].visible = false;
				if(this.current <= 0){
					//DEAD
				}
			}
		},
		heal: function(){
			if(this.current < this.max){
				this.hearts[this.current].visible = true;
				this.current += 1;
			}
		}
	};
	health.init();

	stamina = {
		container: new PIXI.Container(),
		current: 100,
		max: 100,
		border: new PIXI.Graphics(),
		fill: new PIXI.Graphics(),

		width:32*3,
		height:8,

		lastUse:0,

		init:function(){
			this.container.addChild(this.fill);
			this.container.addChild(this.border);
			this.container.x = 32-12;
			this.container.y = 48+8;
			scene.addChild(this.container);
		},
		update:function(){
			var restoreTime = clamp(0, (game.ticker.lastTime - this.lastUse)/500, 1);
			if(restoreTime >= 1){
				this.restore();
			}

			this.fill.clear();
			this.fill.beginFill(0xFFFFFF, lerp(0.1, 0.2, restoreTime));
			this.fill.drawRect(0,0,this.current/this.max*this.width,this.height);
			this.fill.endFill();

			this.border.clear();
			this.border.beginFill(0xFFFFFF,0);
			this.border.lineStyle(1,0xFFFFFF,1);
			this.border.drawRect(0,0,this.current/this.max*this.width,this.height);
			this.border.drawRect(0,0,this.width,this.height);
			this.border.drawCircle(0,0,1);
			this.border.drawCircle(this.current/this.max*this.width,0,1);
			this.border.drawCircle(this.current/this.max*this.width,this.height,1);
			this.border.drawCircle(this.width,0,1);
			this.border.drawCircle(this.width,this.height,1);
			this.border.drawCircle(0,this.height,1);
			this.border.endFill();
		},
		drain:function(__amount){
			this.current -= __amount;
			if(this.current < 0){
				this.current = 0;
			}
			this.lastUse = game.ticker.lastTime;
		},
		restore:function(){
			this.current += 1;
			if(this.current > this.max){
				this.current = this.max;
			}
		}
	};
	stamina.init();


	extra = new PIXI.Graphics();
	scene.addChild(extra);

	if(debug.enabled){
		scene.addChild(debug);
	}
	
	// start the main loop
	window.onresize = onResize;
	onResize();
	game.ticker.update();
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
		this.live.push(b);
		b.live.apply(b,arguments);
		return b;
	}
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
Bullet.prototype.live = function(player){
	this.dead = false;
	this.spr.x = player.spr.x;
	this.spr.y = player.spr.y;
	this.v.x = Math.cos(player.spr.rotation)/4;
	this.v.y = Math.sin(player.spr.rotation)/4;
	this.spr.rotation = Math.atan2(this.v.y,this.v.x);
	bullets.container.addChild(this.spr);
	debug.add(this);
}

function Star(){
	var s = this.spr = new PIXI.Sprite(stars.tex);
}
Star.prototype.kill = function(){
	stars.container.removeChild(this.spr);
	stars.pool.add();
};
Star.prototype.live = function(){
	this.dead = false;
	var r = Math.random();
	this.spr.scale.x = this.spr.scale.y = r*2;
	this.speed = r*0.1+0.05;
	if(Math.random() > 0.5){
		this.spr.x = Math.round(Math.random())*size.x;
		this.spr.y = Math.random()*size.y;
	}else{
		this.spr.y = Math.round(Math.random())*size.y;
		this.spr.x = Math.random()*size.x;
	}
	stars.container.addChild(this.spr);
};

function update(){
	if(debug.enabled){
		debug.clear();
	}
	extra.clear();

	//menu.update();
	stamina.update();
	mouse.correctedPos = {
		x: mouse.pos.x/scaleMultiplier/postProcessScale,
		y: mouse.pos.y/scaleMultiplier/postProcessScale
	};

	var input = getInput();

	switch(parseInt(window.location.hash.substr(6))){
		default:
		case 0:
			// free move
			player.v.x += input.move.x/3;
			player.v.y += input.move.y/3;
			player.spr.x += player.v.x;
			player.spr.y += player.v.y;
			player.v.x *= 0.95;
			player.v.y *= 0.95;
			player.trotation = Math.atan2(
			 	mouse.correctedPos.y - player.spr.y,
			 	mouse.correctedPos.x - player.spr.x
			);
			player.spr.rotation = slerp(player.spr.rotation,player.trotation, 0.2);
			break;
		case 1:
			// tank
			player.trotation = (player.trotation || 0) + input.move.x/10;
			player.spr.rotation = slerp(player.spr.rotation, player.trotation, 0.3);
			player.v.x -= input.move.y*Math.cos(player.trotation);
			player.v.y -= input.move.y*Math.sin(player.trotation);
			player.spr.x += player.v.x/2;
			player.spr.y += player.v.y/2;
			player.v.x *= 0.9;
			player.v.y *= 0.9;
			break;
		case 2:
			// polar
			player.trotation = Math.atan2(- player.spr.y,size.x/2-player.spr.x);
			player.spr.rotation = slerp(player.spr.rotation, player.trotation, 0.3);
			player.v.x -= input.move.y*Math.cos(player.trotation);
			player.v.y -= input.move.y*Math.sin(player.trotation);
			player.v.x += input.move.x*Math.cos(player.trotation+Math.PI/2);
			player.v.y += input.move.x*Math.sin(player.trotation+Math.PI/2);
			player.spr.x += player.v.x/2;
			player.spr.y += player.v.y/2;
			player.v.x *= 0.9;
			player.v.y *= 0.9;
			break;
	}

	

	////////////
	// cursor //
	////////////
	cursor.clear();
	if(!player.blocking){
		cursor.beginFill(0x0,0.0);
		cursor.lineStyle(1,0xFFFFFF,1);
		cursor.moveTo(mouse.correctedPos.x,mouse.correctedPos.y-cursor.size);
		cursor.lineTo(mouse.correctedPos.x,mouse.correctedPos.y+cursor.size);
		cursor.moveTo(mouse.correctedPos.x-cursor.size,mouse.correctedPos.y);
		cursor.lineTo(mouse.correctedPos.x+cursor.size,mouse.correctedPos.y);
		var l = player.getRotatedAttackLines()[2];
		cursor.lineStyle(0.1,0xFFFFFF,1);
		cursor.moveTo(l[1].x+(Math.random()*2-1)*20,l[1].y+(Math.random()*2-1)*20);
		cursor.lineTo(sword.x,sword.y);
		cursor.lineStyle(0.2,0xFFFFFF,1);
		cursor.moveTo(l[1].x+(Math.random()*2-1)*3,l[1].y+(Math.random()*2-1)*3);
		cursor.lineTo(sword.x,sword.y);
		cursor.endFill();
	}


	sword.x = lerp(sword.x, player.spr.x + Math.cos(player.spr.rotation+Math.PI/2*sword.side)*20, 0.05);
	sword.y = lerp(sword.y, player.spr.y + Math.sin(player.spr.rotation+Math.PI/2*sword.side)*20, 0.05);
	sword.trotation = Math.atan2(
		mouse.correctedPos.y - sword.y,
		mouse.correctedPos.x - sword.x
	);
	sword.rotation = slerp(sword.rotation,sword.trotation + Math.PI*sword.side/2 * 0.9*(1.0+sword.overshoot), 0.1);
	sword.overshoot = lerp(sword.overshoot,0,0.1);
	sword.scale.x = lerp(sword.scale.x, 0.7, 0.05);
	sword.scale.y = lerp(sword.scale.y, 0.7*sword.side, 0.05);
	player.blocking = false;
	if(getAction2()){
		if(stamina.current > 0.5){
			if(getJustAction2()){
				sword.side *= -1;
			}
			player.block();
			player.blocking = true;
			stamina.drain(0.5);
			sword.scale.x = sword.scale.y = 1;
		}else{
			stamina.drain(0); // prevent turtling regen
		}
	}else if(getJustAction1() && stamina.current > 22){
		// hit enemies
		for(var i = 0; i < enemies.length; ++i){
			var e = enemies[i];
			var p = player.slash(e);
			if(p){
				var dx = p.attackLine[1].x - p.attackLine[0].x;
				var dy = p.attackLine[1].y - p.attackLine[0].y;
				var l = magnitude({x:dx,y:dy});

				dx/=l;
				dy/=l;

				dx*=5*(1-stamina.current/stamina.max/2);
				dy*=5*(1-stamina.current/stamina.max/2);

				e.v.x += dx;
				e.v.y += dy;
				e.hit = 4;

				// slash mark
				extra.beginFill(0,0);
				for(var s = 0; s < 3; ++s){
					extra.lineStyle(0.5,0xFFFFFF,1);
					extra.moveTo(p.intersection.x + (Math.random()*2-1)*10*s,p.intersection.y + (Math.random()*2-1)*10*s);
					extra.lineTo(e.spr.x + dx*20 + (Math.random()*2-1)*10*s,e.spr.y + dy*20 + (Math.random()*2-1)*10*s);
				}
				extra.endFill();
				if(blur_filter.uniforms.uBlurAdd < 0.43){
					blur_filter.uniforms.uBlurAdd += 0.03;
				}
			}
		}

		player.attack();
		stamina.drain(22);
		sword.scale.x = sword.scale.y = 1;
	}

	// thruster
	extra.beginFill(0,0);
	extra.lineStyle(1,0xFFFFFF,1);
	var l = player.rotateLine([{x:-20+Math.random()*3,y:(Math.random()*2-1)*10},{x:0,y:0}]);
	extra.moveTo(l[0].x, l[0].y);
	extra.lineTo(l[0].x - player.v.x*2*(Math.random()*2-1), l[0].y - player.v.y*2*(Math.random()*2-1));
	extra.endFill();


	if(debug.enabled){
		for(var i = 0; i < enemies.length; ++i){
			var e = enemies[i];
			var p = player.slash(e);
			if(p){
				debug.lineStyle(2,0xFFFF00,1);
				debug.moveTo(p.attackLine[0].x,p.attackLine[0].y);
				debug.lineTo(p.attackLine[1].x,p.attackLine[1].y);
				debug.drawCircle(p.attackLine[1].x,p.attackLine[1].y,2);
				debug.drawCircle(p.intersection.x,p.intersection.y,5);
				debug.endFill();
			}
		}
	}





	if(player.invincible > 0){
		player.invincible -= 1;
		player.spr.visible = player.invincible%6<3;
	}
	sword.scale.y = Math.abs(sword.scale.y)*sword.side;

	if(keys.isJustDown(keys.X) || keys.isDown(keys.C) && game.ticker.lastTime%100 < 10){
		var b = bullets.pool.add(enemies[0]);
	}


	/////////////
	// enemies //
	/////////////
	for(var i = 0; i < enemies.length; ++i){
		var e = enemies[i];
		if(circToCirc(player.spr.x,player.spr.y,player.radius, e.spr.x,e.spr.y,e.radius)){
			var dx = player.spr.x - e.spr.x;
			var dy = player.spr.y - e.spr.y;
			var l = magnitude({x:dx,y:dy});
			dx/=l;
			dy/=l;

			dx *= 1;
			dy *= 1;

			player.v.x += dx;
			e.v.x -= dx;
			player.v.y += dy;
			e.v.y -= dy;
			screen_filter.uniforms.uScanDistort += 2;
		}
		e.update();
		if(e.hit){
			e.spr.visible = false;
			e.hit -= 1;
		}else{
			e.spr.visible = true;
		}
	}


	///////////////
	// starfield //
	///////////////
	for(var i = 0; i < stars.pool.live.length; ++i){
		var s = stars.pool.live[i];
		s.spr.x -= (player.v.x+0.05) * s.speed;
		s.spr.y -= (player.v.y+0.05) * s.speed;
		if(
			s.spr.x < -stars.radius*2 ||
			s.spr.y < -stars.radius*2 ||
			s.spr.x > size.x+stars.radius*2 ||
			s.spr.y > size.y+stars.radius*2
		){
			s.dead = true;
		}
	}
	stars.pool.update();

	/////////////
	// bullets //
	/////////////
	var blockLine = player.getRotatedBlockLine();
	for(var i = 0; i < bullets.pool.live.length; ++i){
		var b = bullets.pool.live[i];
		b.spr.x += b.v.x;
		b.spr.y += b.v.y;
		b.spr.rotation += 0.3;
		
		// out of range
		if(
			b.spr.x < -bullets.radius*2 ||
			b.spr.y < -bullets.radius*2 ||
			b.spr.x > size.x+bullets.radius*2 ||
			b.spr.y > size.y+bullets.radius*2
		){
			b.dead = true;
		}

		// blocked
		var l = lineToLine(
			blockLine[0].x,
			blockLine[0].y,
			blockLine[1].x,
			blockLine[1].y,
			b.spr.x - bullets.radius*Math.cos(Math.atan2(b.v.y,b.v.x)),
			b.spr.y - bullets.radius*Math.sin(Math.atan2(b.v.y,b.v.x)),
			b.spr.x + b.v.x + bullets.radius*Math.cos(Math.atan2(b.v.y,b.v.x)),
			b.spr.y + b.v.y + bullets.radius*Math.sin(Math.atan2(b.v.y,b.v.x))
		);
		if(l && player.blocking){
			b.dead = true;

			if(blur_filter.uniforms.uBlurAdd < 0.4){
				blur_filter.uniforms.uBlurAdd += 0.01;
			}
			extra.beginFill(0,0);
			extra.lineStyle(0.8,0xFFFFFF,1);
			extra.drawCircle(b.spr.x, b.spr.y, bullets.radius*3*(Math.random()/2+0.6));
			extra.endFill();
		}
		if(debug.enabled){
			debug.beginFill(0,0);
			debug.lineStyle(2,0x0000FF,1);
			debug.moveTo(
				blockLine[0].x,
				blockLine[0].y
			);
			debug.lineTo(
				blockLine[1].x,
				blockLine[1].y
			);
			debug.moveTo(
				b.spr.x - bullets.radius*Math.cos(Math.atan2(b.v.y,b.v.x)) + Math.cos(Math.atan2(player.v.y,player.v.x))*magnitude(player.v),
				b.spr.y - bullets.radius*Math.sin(Math.atan2(b.v.y,b.v.x)) + Math.sin(Math.atan2(player.v.y,player.v.x))*magnitude(player.v)
			);
			debug.lineTo(
				b.spr.x + b.v.x + bullets.radius*Math.cos(Math.atan2(b.v.y,b.v.x)) + Math.cos(Math.atan2(player.v.y,player.v.x))*magnitude(player.v),
				b.spr.y + b.v.y + bullets.radius*Math.sin(Math.atan2(b.v.y,b.v.x)) + Math.sin(Math.atan2(player.v.y,player.v.x))*magnitude(player.v)
			);
			if(l){
				debug.drawCircle(l.x,l.y,4);
			}
			debug.endFill();
		}

		// hit
		if(!player.invincible && circToCirc(b.spr.x,b.spr.y,bullets.radius, player.spr.x,player.spr.y,player.radius)){
			b.dead = true;
			health.damage();
			screen_filter.uniforms.uScanDistort += 80;
			player.invincible = 100;
			extra.beginFill(0,0);
			extra.lineStyle(5,0xFFFFFF,1);
			var x = player.spr.x;
			var y = player.spr.y;
			var r = Math.random() * 50 + 25;
			extra.moveTo(x-b.v.x*r,y-b.v.y*r);
			extra.lineTo(x+b.v.x*r,y+b.v.y*r);
			extra.endFill();
		}
	}
	bullets.pool.update();


	// wrap player
	if(player.spr.x > size.x+player.spr.width){
		player.spr.x -= size.x+player.spr.width;
		sword.x = player.spr.x;
		sword.y = player.spr.y;
	}
	if(player.spr.x < -player.spr.width){
		player.spr.x += size.x+player.spr.width;
		sword.x = player.spr.x;
		sword.y = player.spr.y;
	}
	if(player.spr.y > size.y+player.spr.height){
		player.spr.y -= size.y+player.spr.height;
		sword.x = player.spr.x;
		sword.y = player.spr.y;
	}
	if(player.spr.y < -player.spr.height){
		player.spr.y += size.y+player.spr.height;
		sword.x = player.spr.x;
		sword.y = player.spr.y;
	}

	//if(input.confirm){
	//	screen_filter.uniforms.uScanDistort = 20;
	//}else{
		screen_filter.uniforms.uScanDistort *= 0.9;
	//}

	if(debug.enabled){
		debug.draw();
	}

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
		mouse.update();

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
	return keys.isDown(keys.Z) 
	|| keys.isDown(keys.C)
	|| keys.isDown(keys.SPACE)
	|| keys.isDown(keys.CTRL)
	|| gamepads.isDown(gamepads.A)
	|| gamepads.isDown(gamepads.Y)
	|| mouse.isDown();
}

function getJustAction1(){
	return keys.isJustDown(keys.Z) 
	|| keys.isJustDown(keys.C)
	|| keys.isJustDown(keys.SPACE)
	|| keys.isJustDown(keys.CTRL)
	|| gamepads.isJustDown(gamepads.A)
	|| gamepads.isJustDown(gamepads.Y)
	|| mouse.isJustDown();
}

function getAction2(){
	return keys.isDown(keys.X) 
	|| keys.isDown(keys.V)
	|| keys.isDown(keys.SHIFT)
	|| keys.isDown(keys.CTRL)
	|| gamepads.isDown(gamepads.X)
	|| gamepads.isDown(gamepads.B);
}

function getJustAction2(){
	return keys.isJustDown(keys.X) 
	|| keys.isJustDown(keys.V)
	|| keys.isJustDown(keys.SHIFT)
	|| keys.isJustDown(keys.CTRL)
	|| gamepads.isJustDown(gamepads.X)
	|| gamepads.isJustDown(gamepads.B);
}

function getInput(){
	gamepads.deadZone = 0.25;
	gamepads.snapZone = 0.1;
	var res = {
		up: false,
		down: false,
		left: false,
		right: false,
		move: {
			x:0,
			y:0
		},
		confirm: false,
		cancel: false
	};

	res.confirm |= keys.isDown(keys.SPACE);
	res.confirm |= keys.isJustDown(keys.Z);

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

	res.move.x = clamp(-1,res.move.x,1);
	res.move.y = clamp(-1,res.move.y,1);

	return res;
}