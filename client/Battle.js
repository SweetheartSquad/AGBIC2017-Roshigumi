function Battle(){
	this.init();
}

Battle.prototype.init = function(){
	this.entities = new PIXI.Container();

	player = new Player();
	this.entities.addChild(player.spr);

	sword = svg(swordsvg,{x:64,y:64*0.1});
	sword.side = 1;
	sword.overshoot=0;

	cursor = new PIXI.Graphics();
	cursor.size = 3;

	bullets = {};


	bullets.max = 10000;
	bullets.radius = 4;
	bullets.container = new PIXI.ParticleContainer(bullets.max, {
		scale:false,
		position:true,
		rotation:true
	}, bullets.max);
	(function(){
		var b = svg(bullet,{x:bullets.radius*3.5,y:bullets.radius*3.5});
		bullets.tex = b.generateTexture();
		b.destroy();
	}());
	bullets.pool = new Pool(bullets.max, Bullet);


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




	enemies = [];



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

		width:30*3,
		height:8,

		lastUse:0,

		init:function(){
			this.container.addChild(this.fill);
			this.container.addChild(this.border);
			this.container.x = 32-12;
			this.container.y = 48+8;
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

	score = {
		current: 0,
		last: -1,
		container: new PIXI.Container(),
		init:function(){
			this.container.x = size.x - 16;
			this.container.y = 18;
			this.container.addChild(new PIXI.Graphics());
			score.add(1);
		},
		add: function(amount){
			this.current += amount;
		},
		update:function(){
			if(this.current !== this.last){
				this.container.children[0].destroy();
				var l = Math.ceil(this.current).toString(10);
				while(l.length < 10){
					l = "0"+l;
				}
				this.container.addChild(text(l, {x:10,y:10}, 0.3, {x:-0.5,y:0.5}));
			}
			this.last = this.current;
		}
	};
	score.init();


	extra = new PIXI.Graphics();

	scene.addChild(this.entities);
	this.entities.addChild(sword);
	this.entities.addChild(cursor);
	this.entities.addChild(extra);
	scene.addChild(bullets.container);
	scene.addChild(stars.container);

	scene.addChild(health.container);
	scene.addChild(stamina.container);
	scene.addChild(score.container);

	if(debug.enabled){
		scene.addChild(debug);
	}
};

Battle.prototype.update = function(){
	score.add(1/60);
	extra.clear();
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

				score.add(10);

				e.health -= 1;
				if(e.health <= 0){
					// kill enemy
					extra.lineStyle(4,0xFFFFFF,1);
					extra.drawCircle(e.spr.x,e.spr.y,30);
					extra.lineStyle(0.5,0xFFFFFF,1);
					extra.drawCircle(e.spr.x,e.spr.y,40);
					extra.lineStyle(0.25,0xFFFFFF,1);
					extra.drawCircle(e.spr.x,e.spr.y,50);
					e.dead = true;

					e.spr.parent.removeChild(e.spr);
					e.spr.destroy();
					enemies.splice(enemies.indexOf(e),1);
					screen_filter.uniforms.uChrAbbSeparation += 128;
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
	
	//if(enemies.length < 4){
		if(Math.random() < 0.01){
			var k = Object.keys(EnemyTypes);
			k = EnemyTypes[k[Math.floor(Math.random()*k.length)]];
			e = new Enemy(k);
			enemies.push(e);
			this.entities.addChild(e.spr);
		}
	//}

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
		b.spr.rotation += 0.4;
		
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

			score.add(1);
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
			extra.lineStyle(0.8,0xFFFFFF,1);
			extra.drawCircle(x,y,40);
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
	//}

	score.update();
	if(debug.enabled){
		debug.draw();
	}
};
