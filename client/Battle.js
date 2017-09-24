function Battle(){
	this.init();
}

Battle.prototype.init = function(){
	this.kills = 0;
	this.powerupChance = 0.1;
	this.container = new PIXI.Container();
	player = new Player();
	player.spr.cacheAsBitmap = true;

	sword = svg("swordsvg",{x:64,y:64*0.1});
	sword.side = 1;
	sword.overshoot=0;
	sword.x = player.spr.x;
	sword.y = player.spr.y;
	sword.cacheAsBitmap = true;

	cursor = new PIXI.Graphics();
	cursor.size = 3;

	bullets = {};

	bullets.speed = 1;
	bullets.max = 10000;
	bullets.radius = 3;
	bullets.container = new PIXI.ParticleContainer(bullets.max, {
		scale:false,
		position:true,
		rotation:true
	}, bullets.max);
	(function(){
		var b = svg("bullet",{x:bullets.radius*3.5,y:bullets.radius*3.5});
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
	}, stars.max);
	(function(){
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

	particles = {};
	particles.max = 200;
	particles.container = new PIXI.ParticleContainer(particles.max, {
		scale:true,
		position:true,
		rotation:true
	}, particles.max);
	(function(){
		var s = new PIXI.Graphics();
		s.beginFill(0,0);
		s.lineStyle(1,0xFFFFFF,1);
		s.moveTo(0,0);
		s.lineTo(20,0);
		s.endFill();
		particles.tex = s.generateTexture();
		s.destroy();
	}());
	particles.pool = new Pool(particles.max, Particle);





	enemies = [];



	health = {
		container: new PIXI.Container(),
		hearts: [],
		current: 3,
		max: 3,
		init: function(){
			for(var i = 0; i < this.max; ++i){
				var h = svg("♥",{x:24,y:24});
				h.x = 32*i;
				this.hearts.push(h);
				this.container.addChild(h);
			}
			this.container.y = 32;
			this.container.x = 32;
			this.container.cacheAsBitmap = true;
		},
		damage: function(){
			this.current = Math.max(0, this.current-1);
			this.hearts[this.current].visible = false;
			this.container.cacheAsBitmap = false;
			this.container.cacheAsBitmap = true;
			if(this.current <= 0){
				//DEAD
				this.kill();
			}else{
				var s = sounds["hurt"].play();
				howlPos(sounds["hurt"],s, player.spr.x,player.spr.y,0);
			}
		},
		kill: function(){
			screen_filter.uniforms.uScanDistort += 1000;
			screen_filter.uniforms.uChrAbbSeparation += 1000;
			screen_filter.uniforms.uLensDistort += 1;
			for(var i = 0; i < 20+Math.random()*20; ++i){
				var p = particles.pool.add(player);
			}
			player.dead=true;

			// complete all effects
			for(var i = 0; i < player.effects.length; ++i){
				player.effects[i].complete();
			}

			if(debug.enabled){
				debug.drawList.splice(debug.drawList.indexOf(player),1);
			}
			var s = sounds["death"].play();
			howlPos(sounds["death"],s, player.spr.x,player.spr.y,0);
			
			sounds["music"].fade(1,0.1,100);
		},
		heal: function(){
			if(this.current < this.max){
				this.hearts[this.current].visible = true;
				this.container.cacheAsBitmap = false;
				this.container.cacheAsBitmap = true;
				this.current += 1;
			}
			var s = sounds["heal"].play();
			howlPos(sounds["heal"],s, player.spr.x,player.spr.y,0);
			sounds["heal"].rate(1 + (Math.random()*2-1)*0.1,s);
		}
	};
	health.init();

	stamina = {
		container: new PIXI.Container(),
		current: 100,
		max: 100,
		border: new PIXI.Graphics(),
		line: new PIXI.Graphics(),
		fill: new PIXI.Graphics(),

		width:30*3,
		height:8,

		lastUse:0,

		init:function(){
			this.container.addChild(this.fill);
			this.container.addChild(this.border);
			this.container.addChild(this.line);
			this.container.x = 32-12 + 0.5;
			this.container.y = 48+8 + 0.5;

			this.fill.beginFill(0xFFFFFF, 1);
			this.fill.drawRect(0,0,this.width,this.height);
			this.fill.endFill();
			this.fill.cacheAsBitmap = true;

			this.border.beginFill(0xFFFFFF,0);
			this.border.lineStyle(1,0xFFFFFF,1);
			this.border.drawRect(0,0,this.width,this.height);
			this.border.drawCircle(0,0,1);
			this.border.drawCircle(this.width,0,1);
			this.border.drawCircle(this.width,this.height,1);
			this.border.drawCircle(0,this.height,1);
			this.border.endFill();
			this.border.cacheAsBitmap = true;

			this.line.beginFill(0xFFFFFF,0);
			this.line.lineStyle(2,0xFFFFFF,1);
			this.line.moveTo(0,0);
			this.line.lineTo(this.height);
			this.line.drawCircle(0,0,0.5);
			this.line.drawCircle(0,this.height,1);
			this.line.endFill();
			this.line.cacheAsBitmap = true;
		},
		update:function(){
			var restoreTime = clamp(0, (game.main.prevTime - this.lastUse)/500, 1);
			if(restoreTime >= 1){
				this.restore();
			}
			this.fill.alpha = lerp(0.1, 0.2, restoreTime);
			this.fill.width = this.current/this.max*this.width;

			this.line.x = this.current/this.max*this.width;
		},
		drain:function(__amount){
			this.current -= __amount;
			if(this.current < 0){
				this.current = 0;
			}
			this.lastUse = game.main.prevTime;
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
		last: 0,
		container: new PIXI.Container(),
		numbers: [],
		init:function(){
			this.container.x = size.x - 16 - 0.5;
			this.container.y = 18;
			for(var i = 0; i < 10; ++i){
				var l="";
				this.numbers[i] = [];
				for(var j = 0; j < 10; ++j){
					l += i.toString();
				}
				var t = text(l, {x:10,y:10}, 0.3, {x:-0.5,y:0.5});
				for(var c = t.children.length-1; c >= 0; --c){
					var number = t.children[c];
					this.numbers[i][c] = number;
					number.cacheAsBitmap = true;
					number.visible = false;
					this.container.addChild(number);
				}
				t.destroy();
			}
			score.add(1);
		},
		add: function(amount){
			this.current += amount;
		},
		update:function(){
			if(this.current > this.last){
				var l = this.getScoreString(this.last);
				while(l.length < 10){
					l = "0"+l;
				}
				for(var i = 0; i < 10; ++i){
					var n = l[l.length-1-i];
					this.numbers[n][10-1-i].visible = false;
				}


				l = this.getScoreString(this.current);
				while(l.length < 10){
					l = "0"+l;
				}
				for(var i = 0; i < 10; ++i){
					var n = l[l.length-1-i];
					this.numbers[n][10-1-i].visible = true;
				}
				this.last = this.current;
			}
		},
		getScoreString: function(s){
			if(arguments.length < 1){
				s = this.current;
			}
			return Math.ceil(s*100).toString(10);
		}
	};
	score.init();

	this.pickups = [];

	this.extra = new PIXI.Graphics();

	for(var i in EnemyTypes){
		if(EnemyTypes.hasOwnProperty(i)){
			this.container.addChild(EnemyTypes[i].container);
		}
	}

	this.container.addChild(bullets.container);
	this.container.addChild(stars.container);
	this.container.addChild(particles.container);

	this.container.addChild(health.container);
	this.container.addChild(stamina.container);
	this.container.addChild(score.container);
	
	this.container.addChild(player.spr);
	this.container.addChild(player.slashMark);
	this.container.addChild(sword);
	this.container.addChild(cursor);
	this.container.addChild(this.extra);

	if(debug.enabled){
		this.container.addChild(debug);
	}

	scene.addChild(this.container);
};

Battle.prototype.update = function(){
	if(!player.dead){
		score.add(1/60);
		stamina.update();
		player.slashMark.visible = false;
	}
	this.extra.clear();
	mouse.correctedPos = {
		x: mouse.pos.x/scaleMultiplier/postProcessScale,
		y: mouse.pos.y/scaleMultiplier/postProcessScale
	};

	if(!player.dead){
		var input = getInput();
		// free move
		player.v.x += input.move.x/3;
		player.v.y += input.move.y/3;
		player.update();
	}

	

	////////////
	// cursor //
	////////////
	cursor.clear();
	if(!player.dead && !player.blocking){
		cursor.beginFill(0x0,0.0);
		cursor.lineStyle(1,0xFFFFFF,1);
		cursor.moveTo(mouse.correctedPos.x,mouse.correctedPos.y-cursor.size);
		cursor.lineTo(mouse.correctedPos.x,mouse.correctedPos.y+cursor.size);
		cursor.moveTo(mouse.correctedPos.x-cursor.size,mouse.correctedPos.y);
		cursor.lineTo(mouse.correctedPos.x+cursor.size,mouse.correctedPos.y);
		cursor.endFill();
		var l = player.getRotatedAttackLines()[2];
		cursor.beginFill(0x0,0.0);
		cursor.lineStyle(0.1,0xFFFFFF,1);
		cursor.moveTo(mouse.correctedPos.x+(Math.random()*2-1)*3,mouse.correctedPos.y+(Math.random()*2-1)*3);
		cursor.lineTo(player.spr.x + Math.cos(player.spr.rotation)*player.radius, player.spr.y + Math.sin(player.spr.rotation)*player.radius);
		cursor.endFill();
		cursor.beginFill(0x0,0.0);
		cursor.lineStyle(0.2,0xFFFFFF,1);
		cursor.moveTo(mouse.correctedPos.x+(Math.random()*2-1)*2,mouse.correctedPos.y+(Math.random()*2-1)*2);
		cursor.lineTo(player.spr.x + Math.cos(player.spr.rotation)*player.radius, player.spr.y + Math.sin(player.spr.rotation)*player.radius);
		cursor.endFill();
	}

	if(!player.dead){
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
			if(stamina.current > 0.3){
				if(getJustAction2()){
					sword.side *= -1;
				}
				player.block();
				player.blocking = true;
				stamina.drain(0.3);
				sword.scale.x = sword.scale.y = 1;
				sword.overshoot = 0;
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
					var l = 1/magnitude({x:dx,y:dy});

					dx*=l;
					dy*=l;

					dx*=5*(1-stamina.current/stamina.max/2);
					dy*=5*(1-stamina.current/stamina.max/2);

					e.v.x += dx;
					e.v.y += dy;
					scene.x += dx*2;
					scene.y += dy*2;
					e.hit = 5;

					// slash mark
					this.extra.beginFill(0,0);
					for(var s = 0; s < 3; ++s){
						this.extra.lineStyle(0.5,0xFFFFFF,1);
						this.extra.moveTo(p.intersection.x + (Math.random()*2-1)*10*s,p.intersection.y + (Math.random()*2-1)*10*s);
						this.extra.lineTo(e.spr.x + dx*20 + (Math.random()*2-1)*10*s,e.spr.y + dy*20 + (Math.random()*2-1)*10*s);
					}
					this.extra.endFill();
					if(blur_filter.uniforms.uBlurAdd < 0.43){
						blur_filter.uniforms.uBlurAdd += 0.03;
					}

					score.add(10);

					e.health -= 1;
					if(e.health <= 0){
						// kill enemy
						this.kills += 1;
						
						for(var p = 0; p < 5+Math.random()*5; ++p){
							particles.pool.add(e);
						}

						// health
						if(
							(this.kills === 1 && health.current < health.max)
							|| (Math.random()+Math.min(0.19,score.current/10000) < 0.2*(1+(health.max-health.current)/health.max))
						){
							var h = new Pickup(Pickup.types.heart);
							this.pickups.push(h);
							this.container.addChild(h.spr);
							h.spr.x = e.spr.x;
							h.spr.y = e.spr.y;
							h.v.x = e.v.x;
							h.v.y = e.v.y;
						}else if(this.kills > 3){
							// powerups
							var allowPowerup = true;
							if(player.effects.length > 0){
								allowPowerup = false;
							}else{
								for(var i = 0; i < this.pickups.length; ++i){
									if(this.pickups[i].type !== Pickup.types.heart){
										allowPowerup = false;
										break;
									}
								}
							}
							if(allowPowerup){
								if(Math.random() < this.powerupChance){
									this.powerupChance = 0;
									var t = Pickup.getRandomPowerup();
									var h = new Pickup(t);
									this.pickups.push(h);
									this.container.addChild(h.spr);
									h.spr.x = e.spr.x;
									h.spr.y = e.spr.y;
									h.v.x = e.v.x;
									h.v.y = e.v.y;
								}else{
									this.powerupChance += 0.05;
								}
							}
						}

						score.add(100);
						var s = sounds["kill"].play();
						howlPos(sounds["kill"],s, e.spr.x,e.spr.y,0);
						sounds["kill"].rate(1 + (Math.random()*2-1)*0.1,s);

						// effect
						this.extra.lineStyle(4,0xFFFFFF,1);
						this.extra.drawCircle(e.spr.x,e.spr.y,30);
						this.extra.lineStyle(0.5,0xFFFFFF,1);
						this.extra.drawCircle(e.spr.x,e.spr.y,40);
						this.extra.lineStyle(0.25,0xFFFFFF,1);
						this.extra.drawCircle(e.spr.x,e.spr.y,50);
						screen_filter.uniforms.uChrAbbSeparation += 128;
						screen_filter.uniforms.uInvert -= 0.1;

						// actually remove
						e.dead = true;
						e.spr.parent.removeChild(e.spr);
						e.spr.destroy();
						enemies.splice(enemies.indexOf(e),1);
						if(debug.enabled){
							debug.drawList.splice(debug.drawList.indexOf(e),1);
						}
					}else{
						var s = sounds["slash-hit"].play();
						howlPos(sounds["slash-hit"],s, e.spr.x,e.spr.y,0);
						sounds["slash-hit"].rate(1 + (Math.random()*2-1)*0.1,s);
					}
				}
			}

			player.attack();
			stamina.drain(22);
			sword.scale.x = sword.scale.y = 1;
		}

		// thruster
		this.extra.beginFill(0,0);
		this.extra.lineStyle(1,0xFFFFFF,1);
		var l = player.rotateLine([{x:-20+Math.random()*3,y:(Math.random()*2-1)*10},{x:0,y:0}]);
		this.extra.moveTo(l[0].x, l[0].y);
		this.extra.lineTo(l[0].x - player.v.x*2*(Math.random()*2-1), l[0].y - player.v.y*2*(Math.random()*2-1));
		this.extra.endFill();
	}


	if(debug.enabled && !player.dead){
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





	if(!player.dead){
		if(player.invincible > 0){
			player.invincible -= 1;
			player.spr.visible = player.invincible%6<3;
		}
	}

	/////////////
	// enemies //
	/////////////
	
	// spawn
	if(!player.dead){
		if(
			(enemies.length === 0 && Math.random() < 0.1)
			|| (enemies.length<50 && (Math.max(0.01,3-enemies.length/Math.max(1,score.current/10000))*score.current) * Math.random() / 500 > 1 || enemies.length===0 && Math.random()<0.01)
		){
			var k = Object.keys(EnemyTypes);
			for(var i = k.length-1; i >= 0; --i){
				if(score.current < EnemyTypes[k[i]].scoreThreshold){
					k.splice(i,1);
				}
			}
			k = EnemyTypes[k[Math.floor(Math.random()*k.length)]];
			e = new Enemy(k);
			enemies.push(e);
		}
	}

	for(var i = 0; i < enemies.length; ++i){
		var e = enemies[i];

		if(!player.dead){
			if(circToCirc(player.spr.x,player.spr.y,player.radius, e.spr.x,e.spr.y,e.radius)){
				var dx = player.spr.x - e.spr.x;
				var dy = player.spr.y - e.spr.y;
				var l = 1/magnitude({x:dx,y:dy});
				dx*=l;
				dy*=l;

				dx *= 1;
				dy *= 1;

				player.v.x += dx;
				e.v.x -= dx;
				player.v.y += dy;
				e.v.y -= dy;
				screen_filter.uniforms.uScanDistort += 2;
			}
		}
		e.update();
		if(e.hit){
			e.hit -= 1;
			if(e.hit){
				e.spr.scale.x = e.spr.scale.y = 0;
			}else{
				e.spr.scale.x = e.spr.scale.y = 1/Enemy.graphicsScale;
			}
		}
	}


	///////////////
	// starfield //
	///////////////
	for(var i = 0; i < stars.pool.live.length; ++i){
		var s = stars.pool.live[i];
		s.spr.x -= 0.05 * s.speed;
		s.spr.y -= 0.05 * s.speed;
		if(!player.dead){
			s.spr.x -= (player.v.x) * s.speed;
			s.spr.y -= (player.v.y) * s.speed;
		}
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


	///////////////
	// particles //
	///////////////
	for(var i = 0; i < particles.pool.live.length; ++i){
		var p = particles.pool.live[i];
		p.spr.x += p.v.x;
		p.spr.y += p.v.y;
		p.spr.rotation += p.v.r;
		p.v.x *= 0.98;
		p.v.y *= 0.98;
		p.v.r *= 0.98;
		p.spr.scale.x *= 0.99;
		p.spr.scale.y *= 0.99;
		if(p.spr.scale.x <= 0.01){
			p.dead = true;
		}
	}
	particles.pool.update();

	/////////////
	// pickups //
	/////////////
	for(var i = this.pickups.length-1; i >= 0; --i){
		var p = this.pickups[i];
		p.update();
		if(p.spr.x < Pickup.radius){
			p.v.x -= (p.spr.x-Pickup.radius);
		}if(p.spr.x > size.x-Pickup.radius){
			p.v.x += (size.x-Pickup.radius) - p.spr.x;
		}
		if(p.spr.y < Pickup.radius){
			p.v.y -= (p.spr.y-Pickup.radius);
		}if(p.spr.y > size.y-Pickup.radius){
			p.v.y += (size.y-Pickup.radius) - p.spr.y;
		}
		// pickup the pickup
		if(!player.dead && p.delay <= 0 && circToCirc(player.spr.x,player.spr.y,player.radius, p.spr.x,p.spr.y,Pickup.radius)){
			// effect
			p.action();

			// remove
			p.spr.parent.removeChild(p.spr);
			p.spr.destroy();
			this.pickups.splice(this.pickups.indexOf(p), 1);
		}
	}

	/////////////
	// bullets //
	/////////////
	var blockLine = !player.dead ? player.getRotatedBlockLine() : undefined;
	for(var i = 0; i < bullets.pool.live.length; ++i){
		var b = bullets.pool.live[i];
		b.spr.x += b.v.x * bullets.speed;
		b.spr.y += b.v.y * bullets.speed;
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

		if(!player.dead){
			var l = circToCirc(b.spr.x,b.spr.y,bullets.radius, player.spr.x,player.spr.y,player.radius*3);
			if(l && player.blocking){
				// blocked
				b.dead = true;
				var s = sounds["blocked"].play();
				howlPos(sounds["blocked"],s, b.spr.x, b.spr.y, 0);
				sounds["blocked"].rate(1+(Math.random()*2-1)*0.1,s);

				if(blur_filter.uniforms.uBlurAdd < 0.4){
					blur_filter.uniforms.uBlurAdd += 0.01;
					screen_filter.uniforms.uInvert -= 0.01;
				}
				this.extra.beginFill(0,0);
				this.extra.lineStyle(0.8,0xFFFFFF,1);
				this.extra.drawCircle(b.spr.x, b.spr.y, bullets.radius*3*(Math.random()/2+0.6));
				this.extra.endFill();

				score.add(1);
				scene.x += b.v.x*2;
				scene.y += b.v.y*2;
				sword.side *= -1;
				sword.x = b.spr.x;
				sword.y = b.spr.y;
				sword.rotation = Math.atan2(b.spr.y-player.spr.y, b.spr.x-player.spr.y);
				sword.rotation += Math.PI/2*sword.side;
				sword.x -= sword.width*Math.cos(sword.rotation)/2;
				sword.y -= sword.width*Math.sin(sword.rotation)/2;
				stamina.drain(1);
			}else if(!player.invincible && circToCirc(b.spr.x,b.spr.y,bullets.radius, player.spr.x,player.spr.y,player.radius)){
				// hit player
				b.dead = true;
				health.damage();
				screen_filter.uniforms.uScanDistort += 80;
				screen_filter.uniforms.uInvert -= 1.0;
				player.invincible = 100;
				this.extra.beginFill(0,0);
				this.extra.lineStyle(5,0xFFFFFF,1);
				var x = player.spr.x;
				var y = player.spr.y;
				var r = Math.random() * 50 + 25;
				this.extra.moveTo(x-b.v.x*r,y-b.v.y*r);
				this.extra.lineTo(x+b.v.x*r,y+b.v.y*r);
				this.extra.endFill();
				this.extra.beginFill(0,0);
				this.extra.lineStyle(0.8,0xFFFFFF,1);
				this.extra.drawCircle(x,y,40);
				this.extra.endFill();
				scene.x += b.v.x*5;
				scene.y += b.v.y*5;
			}

			if(debug.enabled){
				debug.beginFill(0,0);
				debug.lineStyle(1,0xFF0000,1);
				debug.drawCircle(b.spr.x,b.spr.y,bullets.radius);
				debug.endFill();
				if(l){
					debug.beginFill(0,0);
					debug.lineStyle(2,0x0000FF,1);
					debug.drawCircle(b.spr.x,b.spr.y,bullets.radius+3);
					debug.endFill();
				}
			}
		}
	}
	bullets.pool.update();


	// wrap player
	if(!player.dead){
		if(player.spr.x > size.x){
			player.v.x -= player.spr.x - size.x;
		}
		if(player.spr.x < 0){
			player.v.x -= player.spr.x;
		}
		if(player.spr.y > size.y){
			player.v.y -= player.spr.y - size.y;
		}
		if(player.spr.y < 0){
			player.v.y -= player.spr.y;
		}
	}

	if(!player.dead){
		sword.scale.y = Math.abs(sword.scale.y)*sword.side;
		sword.scale.y *= player.blocking ? -1 : 1;
	}

	scene.x = lerp(scene.x, 0, 0.1);
	scene.y = lerp(scene.y, 0, 0.1);

	score.update();
	if(debug.enabled){
		debug.draw();
	}

	if(player.dead && player.spr){
		this.deadTime = game.main.curTime;
		player.spr.parent.removeChild(player.spr);
		player.spr.destroy();
		delete player.spr;
		sword.parent.removeChild(sword);
		sword.destroy();
		player.slashMark.parent.removeChild(player.slashMark);
		player.slashMark.destroy();
		this.highScore = {};
	}
	if(this.deadTime){
		if(!this.highScore.gameOver && game.main.curTime-this.deadTime > 2000){
			var t=this.highScore.gameOver = text("GAME OVER", {x:20,y:20}, 0.25, {x:0,y:0});
			this.container.addChild(t);
			t.x = size.x/2;
			t.y = size.y/2-40;
		}
		if(!this.highScore.score && game.main.curTime-this.deadTime > 3000){
			var t=this.highScore.score = text("Score-"+score.getScoreString(), {x:10,y:10}, 0.5, {x:0,y:0});
			this.container.addChild(t);
			t.x = size.x/2;
			t.y = size.y/2+30-40;
		}
		if(!this.highScore.best && game.main.curTime-this.deadTime > 4000){
			var t=this.highScore.best = text("Best-"+score.getScoreString(storage.getItem("highscore") || 0), {x:10,y:10}, 0.5, {x:0,y:0});
			this.container.addChild(t);
			t.x = size.x/2;
			t.y = size.y/2+50-40;
		}
		if(storage.getItem("highscore") < score.current){
			if(!this.highScore.newBest && game.main.curTime-this.deadTime > 5000){
				var t=this.highScore.newBest = text("♥New best♥", {x:20,y:20}, 0.25, {x:0,y:0});
				this.container.addChild(t);
				t.x = size.x/2;
				t.y = size.y/2+80-40;
				storage.setItem("highscore", score.current);
			}
		}else if(!this.highScore.newBest){
			if(!this.highScore.restart && game.main.curTime-this.deadTime > 5000){
				var t=this.highScore.restart = text("attack-restart  block-menu", {x:10,y:10}, 0.5, {x:0,y:0});
				this.container.addChild(t);
				t.x = size.x/2;
				t.y = size.y/2+80-40;
			}
		}else{
			if(!this.highScore.restart && game.main.curTime-this.deadTime > 6000){
				var t=this.highScore.restart = text("attack-restart  block-menu", {x:10,y:10}, 0.5, {x:0,y:0});
				this.container.addChild(t);
				t.x = size.x/2;
				t.y = size.y/2+110-40;
			}
		}

		if(this.highScore.restart){
			if(getJustAction1()){
				screen_filter.uniforms.uScanDistort += 200;
				screen_filter.uniforms.uChrAbbSeparation += 100;
				sounds["music"].fade(sounds["music"].volume(), 1, 1000);

				this.deinit();
				battle = new Battle();
			}else if(getJustAction2()){
				screen_filter.uniforms.uScanDistort = 200;
				screen_filter.uniforms.uLensDistort = 100;
				screen_filter.uniforms.uChrAbbSeparation = 1000;
				sounds["music"].fade(sounds["music"].volume(), 1, 1000);

				this.deinit();
				menu = new Menu();
			}
		}
	}
};

Battle.prototype.deinit = function(){
	this.container.parent.removeChild(this.container);
	this.container.destroy();
	for(var i in EnemyTypes){
		if(EnemyTypes.hasOwnProperty(i)){
			var c = EnemyTypes[i].container;
			while(c.children.length > 0){
				c.removeChildAt(0).destroy();
			}
		}
	}
	if(debug.enabled){
		debug.drawList.length = 0;
	}
	delete battle;
}