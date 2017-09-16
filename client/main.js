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
	var sam={x:0.5,y:0.5,svg:'<polyline style="fill:none;stroke:#000000;stroke-miterlimit:10;" points="507.466217,50.5711594 502,50.5711594 502,91.3632736 507.466217,91.3632736 507.466217,92.818779 507.466217,49.1162796 529.4724731,49.1162796 529.4724731,52.770546 525.140625,56.7887115 525.140625,79.388176 525.140625,79.8785019 524.913147,80.2572479 522.8085938,83.7590408 529.3688965,90.2065582 529.4724731,92.818779 507.5629272,92.818779 529.5889893,92.818779 529.4724731,90.3082199 539.8748779,100.5321121 549.1776123,100.5321121 549.3623657,99.1739426 546.6564941,97.0259933 541.1989746,97.2851105 525.140625,80.1500092 525.2540894,56.8271332 542.5819702,40.1625366 561.3064575,40.1625366 578.6547852,56.7887115 564.1009521,52.6806679 563.0458984,46.8332024 540.8413086,46.8332024 539.6932373,52.6806679 525.5596924,56.7887115 540.6323853,46.9658699 563.4116211,46.8332024 578.9089355,56.7887115 578.6547852,79.8785019 563.0458984,97.2851105 556.9046021,97.2851105 564.3755493,91.3564453 554.5248413,66.2854691 549.3623657,66.2854691 539.5115967,91.3564453 549.4869385,99.2359161 546.0136719,113.8034134 549.4869385,119.8374634 554.4002075,119.8374634 557.8734741,113.8034134 554.4002075,99.2359161 549.5545044,99.2359161 554.4622192,99.2359161 556.9318848,97.3322296 554.5006714,99.3276672 554.8006592,100.5321121 564.0122681,100.5321121 574.3701172,90.3522186 574.5275269,92.818779 574.5275269,90.1972504 581.0786133,83.7590408 578.746582,79.5102844 578.746582,56.7887115 574.4667969,52.6031799 574.5275269,49.1162796 596.5337524,49.1677361 596.5337524,91.3632736 596.5951538,50.5711594 602,50.5711594 602,91.3632736 596.6019897,91.3632736 596.5337524,92.818779 574.6211548,92.818779 "/>'}
	var heart={x:0.5,y:0.5,svg:'<polyline id="XMLID_1_" style="fill:none;stroke:#231F20;stroke-miterlimit:10;" points="50,100 0,50 0,25 25,0 50,25 75,0 100,25 100,50 50,100 "/>'};
	var bullet={x:0,y:0,svg:'<polyline id="XMLID_1_" style="fill:none;stroke:#231F20;stroke-miterlimit:10;" points="25,25 40,10 60,10 100,50 78.5,50 50,80 50,20 20,50 0,50 40,90 60,90 75,75 "/>'};
	var enemy2={x:0.5,y:0.5,svg:'<polyline class="st0" points="-5,71.9 -5,30.5 -26.3,1.2 -31,1.3 -30.8,71.9 -5,71.9 -26.3,101.2 -56.5,101.2 -78,71.9 -78,30.5 -56.5,1.2 -31,1.3 -31,23.6 -36.6,18.9 -45.2,19 -51.1,24 -52.9,31 -72.7,23.2 -52.9,31 -52.8,71.9 -78,71.9 -30.8,71.9 "/>'}
	var enemy3={x:0.5,y:0.5,svg:'<polyline class="st0" points="-20,75.2 -20,67.3 13,67.3 -20,67.3 -20,39.1 -8.7,39.1 -53.9,39.1 -53.9,16.5 -53.9,67.3 -87,67.3 -53.9,67.3 -53.9,75.2 -87,75.2 -87,67.3 -65.3,39.1 -62.1,26.3 -53.9,16.5 -37,10.8 -21.9,15.1 -12.5,25 -8.7,39.1 13,67.3 13,75.2 -20,75.2 -22.9,82.9 -28.4,89.4 -37,91.6 -45.2,89.4 -51.9,82.5 -53.9,75.2 "/>'}
	var enemy4={x:0.5,y:0.5,svg:'<polyline class="st0" points="-52.6,6.6 -52.6,30.2 -66.4,30.1 -15.7,30.2 -22.8,9.8 -40.9,0.8 -59.2,9.9 -66.4,30.3 -80.6,50.6 -66.4,70.9 -59.7,91.2 -41.1,100.8 -22.9,91.7 -15.6,70.8 -75.5,43.4 -38.3,60.5 -48.4,60.5 -54.3,67.7 -51.9,76.3 -43.9,80.6 -32.7,80.6 -23.5,76.7 -15.6,70.8 -1.1,50.5 -15.7,30.2 "/>'}
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
	mouse.init("canvas", false);

	// setup screen filter
	screen_filter = new CustomFilter(PIXI.loader.resources.screen_shader.data);
	screen_filter.padding = 0;
	blur_filter = new CustomFilter(PIXI.loader.resources.blur_shader.data);
	blur_filter.padding = 0;
	blur_filter.padding = 0;
	screen_filter.uniforms["uBufferSize"] = [nextPowerOfTwo(size.x*postProcessScale),nextPowerOfTwo(size.y*postProcessScale)];
	screen_filter.uniforms["uSpriteSize"] = [size.x,size.y];
	screen_filter.uniforms["uPostProcessScale"] = postProcessScale;
	screen_filter.uniforms.uScanDistort = 0;
	blur_filter.uniforms["uResolution"] = [size.x,size.y];
	blur_filter.uniforms["uBlurAdd"] = 0.36;

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



	if(debug){
		debug = new PIXI.Graphics();
		debug.drawList = [];
		debug.draw = function(){
			for(var i = 0; i < this.drawList.length; ++i){
				this.drawList[i].debug();
			}
		}
		debug.alpha=0.5;
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

	player = svg(ship,{x:32*0.95,y:32});
	player.radius = 10;
	player.x = size.x/3;
	player.y = size.y/3;
	player.v = {};
	player.v.x = 0;
	player.v.y = 0;
	player.invincible = 0;
	player.blockLine = [{
		x: 25,
		y: -32
	},{
		x: 25,
		y: 32
	}];
	player.attackLines = [
		[{
			x: 15,
			y: -48
		},{
			x: 15,
			y: 48
		}],
		[{
			x: 15,
			y: -48
		},{
			x: 50,
			y: 0
		}],
		[{
			x: 15,
			y: 48
		},{
			x: 50,
			y: 0
		}],
		[{
			x: 15,
			y: 0
		},{
			x: 50,
			y: 0
		}]
	];
	player.attack = function(){
		screen_filter.uniforms.uScanDistort += 3;
		sword.side *= -1;
		sword.x = lerp(sword.x, player.x, 0.9);
		sword.y = lerp(sword.y, player.y, 0.9);
		sword.rotation = slerp(sword.rotation,player.trotation + Math.PI*sword.side/2 * 0.9*(1.0+sword.overshoot), 0.99);
		sword.overshoot = 0.3;
		var g = new PIXI.Graphics();
		g.beginFill(0xFFFFFF,0.1); 
		//g.lineStyle(20,0xFFFFFF,0.5);
		var arc={
			wide:125,
			long:100
		};
		g.moveTo(arc.long*0.1,-arc.wide/2);
		g.quadraticCurveTo(arc.long,0, arc.long*0.1,arc.wide/2);
		//g.quadraticCurveTo(arc.long/2,0, arc.long*0.1,-arc.wide/2);

		for(var i = 0; i < 8; ++i){
			g.beginFill(0xFFFFFF,0); 
			g.lineStyle(i,0xFFFFFF,1.0);
			g.moveTo(arc.long*0.1,-arc.wide/2);
			g.quadraticCurveTo(arc.long*(i/8),0, arc.long*0.1,arc.wide/2);
		}

		g.endFill();
		scene.addChild(g);
		g.rotation = player.trotation;
		g.x = player.x;
		g.y = player.y;
		g.alpha = 1;
		setTimeout(function(){
			scene.removeChild(g);
			g.destroy();
		},0);
	};
	player.block = function(){
		sword.x = lerp(sword.x, player.x + Math.cos(player.rotation)*25 + Math.cos(player.rotation-Math.PI/2*sword.side)*38, 0.9);
		sword.y = lerp(sword.y, player.y + Math.sin(player.rotation)*25 + Math.sin(player.rotation-Math.PI/2*sword.side)*38, 0.9);
		sword.trotation = player.rotation + Math.PI/2*sword.side;
		sword.rotation = slerp(sword.rotation, sword.trotation, 0.5);
		screen_filter.uniforms.uScanDistort += 0.1;
		//sword.rotation += 0.05;
	};
	player.rotateLine = function(l){
		var l = l.slice();
		var p = player.toGlobal(new PIXI.Point(l[0].x,l[0].y));
		l[0] = {
			x: p.x,
			y: p.y
		};
		p = player.toGlobal(new PIXI.Point(l[1].x,l[1].y));
		l[1] = {
			x: p.x,
			y: p.y
		};
		return l
	};
	player.getRotatedBlockLine = function(){
		return this.rotateLine(this.blockLine);
	};
	player.getRotatedAttackLines = function(){
		var ls = this.attackLines.slice();
		for(var i = 0; i < ls.length; ++i){
			ls[i] = this.rotateLine(ls[i]);
		}
		return ls;
	};

	if(debug){
		debug.drawList.push(player);
		player.debug = function(){
			debug.beginFill(0xFF0000,1);
			debug.lineStyle(0);
			debug.drawCircle(player.x,player.y,player.radius);
			debug.lineStyle(1,0xFF0000,1);

			var l = player.getRotatedBlockLine();
			debug.moveTo(l[0].x,l[0].y);
			debug.lineTo(l[1].x,l[1].y);
			debug.endFill();

			l = player.getRotatedAttackLines();
			for(var i = 0; i < l.length; ++i){
				debug.moveTo(l[i][0].x,l[i][0].y);
				debug.lineTo(l[i][1].x,l[i][1].y);
				debug.endFill();
			}
		}
	}

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




	//enemy = svg(sam,{x:48,y:48*0.8});
	enemy = svg(enemy2,{x:48*0.8,y:48});
	enemy.x = size.x/3;
	enemy.y = size.y/3;
	enemy.v = {};
	enemy.v.x = 0;
	enemy.v.y = 0;
	scene.addChild(enemy);

	enemy = svg(enemy3,{x:48*0.8,y:48});
	enemy.x = size.x/2;
	enemy.y = size.y/2;
	enemy.v = {};
	enemy.v.x = 0;
	enemy.v.y = 0;
	scene.addChild(enemy);

	enemy = svg(enemy4,{x:48*0.8,y:48});
	enemy.x = size.x*0.75;
	enemy.y = size.y*0.75;
	enemy.v = {};
	enemy.v.x = 0;
	enemy.v.y = 0;
	scene.addChild(enemy);


	scene.addChild(player);
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

	if(debug){
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
	if(debug){
		debug.drawList.splice(debug.drawList.indexOf(this),1);
	}
}
Bullet.prototype.live = function(player){
	this.dead = false;
	this.spr.x = player.x;
	this.spr.y = player.y;
	this.v.x = Math.cos(player.rotation)/4;
	this.v.y = Math.sin(player.rotation)/4;
	this.spr.rotation = Math.atan2(this.v.y,this.v.x);
	bullets.container.addChild(this.spr);
	if(debug){
		debug.drawList.push(this);
	}
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
	if(debug){
		debug.clear();
	}

	//menu.update();
	stamina.update();
	mouse.correctedPos = {
		x: mouse.pos.x/scaleMultiplier/postProcessScale,
		y: mouse.pos.y/scaleMultiplier/postProcessScale
	};

	//ayy.rotation = Math.sin(game.ticker.lastTime/300)/20;
	//ayy.scale.x = Math.cos(game.ticker.lastTime/300)/2+1;
	//ayy.scale.y = Math.sin(game.ticker.lastTime/300)/2+1;
	//title.scale.x = title.scale.y = 3;
	//title.rotation = Math.sin(game.ticker.lastTime/400)/20;
	//title.scale.x = Math.cos(game.ticker.lastTime/300)/2+2;
	//title.scale.y = Math.sin(game.ticker.lastTime/200)/2+2;

	var input = getInput();

	switch(parseInt(window.location.hash.substr(6))){
		default:
		case 0:
			// free move
			player.v.x += input.move.x/3;
			player.v.y += input.move.y/3;
			player.x += player.v.x;
			player.y += player.v.y;
			player.v.x *= 0.95;
			player.v.y *= 0.95;
			player.trotation = Math.atan2(
			 	mouse.correctedPos.y - player.y,
			 	mouse.correctedPos.x - player.x
			);
			player.rotation = slerp(player.rotation,player.trotation, 0.2);
			break;
		case 1:
			// tank
			player.trotation = (player.trotation || 0) + input.move.x/10;
			player.rotation = slerp(player.rotation, player.trotation, 0.3);
			player.v.x -= input.move.y*Math.cos(player.trotation);
			player.v.y -= input.move.y*Math.sin(player.trotation);
			player.x += player.v.x/2;
			player.y += player.v.y/2;
			player.v.x *= 0.9;
			player.v.y *= 0.9;
			break;
		case 2:
			// polar
			player.trotation = Math.atan2(- player.y,size.x/2-player.x);
			player.rotation = slerp(player.rotation, player.trotation, 0.3);
			player.v.x -= input.move.y*Math.cos(player.trotation);
			player.v.y -= input.move.y*Math.sin(player.trotation);
			player.v.x += input.move.x*Math.cos(player.trotation+Math.PI/2);
			player.v.y += input.move.x*Math.sin(player.trotation+Math.PI/2);
			player.x += player.v.x/2;
			player.y += player.v.y/2;
			player.v.x *= 0.9;
			player.v.y *= 0.9;
			break;
	}

	

	
	//enemy.rotation += 0.02;

	//cursor.x = mouse.correctedPos.x;
	//cursor.y = mouse.correctedPos.y;
	cursor.clear();
	cursor.beginFill(0x0,0.0);
	cursor.lineStyle(1,0xFFFFFF,1);
	//cursor.moveTo(mouse.correctedPos.x,mouse.correctedPos.y-cursor.size);
	//cursor.lineTo(mouse.correctedPos.x,mouse.correctedPos.y+cursor.size);
	//cursor.moveTo(mouse.correctedPos.x-cursor.size,mouse.correctedPos.y);
	//cursor.lineTo(mouse.correctedPos.x+cursor.size,mouse.correctedPos.y);
	cursor.lineStyle(0.2,0xFFFFFF,1);
	cursor.moveTo(mouse.correctedPos.x+Math.random()*15,mouse.correctedPos.y+Math.random()*15);
	cursor.lineTo(sword.x,sword.y);
	cursor.moveTo(mouse.correctedPos.x+Math.random()*15,mouse.correctedPos.y+Math.random()*15);
	cursor.lineTo(sword.x,sword.y);
	cursor.moveTo(mouse.correctedPos.x+Math.random()*15,mouse.correctedPos.y+Math.random()*15);
	cursor.lineTo(sword.x,sword.y);
	cursor.endFill();

	sword.x = lerp(sword.x, player.x + Math.cos(player.rotation+Math.PI/2*sword.side)*20, 0.05);
	sword.y = lerp(sword.y, player.y + Math.sin(player.rotation+Math.PI/2*sword.side)*20, 0.05);
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
		player.attack();
		stamina.drain(22);
		sword.scale.x = sword.scale.y = 1;
	}
	if(player.invincible){
		player.invincible -= 1;
		player.visible = player.invincible%6<3;
	}
	sword.scale.y = Math.abs(sword.scale.y)*sword.side;

	if(keys.isJustDown(keys.X) || keys.isDown(keys.C) && game.ticker.lastTime%100 < 10){
		var b = bullets.pool.add(enemy);
	}


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
		}
		if(debug){
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
		if(!player.invincible && circToCirc(b.spr.x,b.spr.y,bullets.radius, player.x,player.y,player.radius)){
			b.dead = true;
			health.damage();
			screen_filter.uniforms.uScanDistort += 80;
			player.invincible = 100;
		}
	}
	bullets.pool.update();

	if(player.x > size.x+player.width){
		player.x -= size.x+player.width;
	}
	if(player.x < -player.width){
		player.x += size.x+player.width;
	}
	if(player.y > size.y+player.height){
		player.y -= size.y+player.height;
	}
	if(player.y < -player.height){
		player.y += size.y+player.height;
	}

	//if(input.confirm){
	//	screen_filter.uniforms.uScanDistort = 20;
	//}else{
		screen_filter.uniforms.uScanDistort *= 0.9;
	//}

	if(debug){
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