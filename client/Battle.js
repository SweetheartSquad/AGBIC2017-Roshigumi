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
		b.destroy(true);
	}());
	bullets.replace = function(){
		bullets.radius = 16;
		var c = new PIXI.ParticleContainer(bullets.max, {
			scale:false,
			position:true,
			rotation:true
		}, bullets.max);
		bullets.container.parent.addChild(c);
		bullets.container.parent.swapChildren(c,bullets.container);
		bullets.container.parent.removeChild(bullets.container);
		bullets.container.destroy(true);
		bullets.container = c;
		bullets.tex.destroy(true);
		var b = svg("swordsvg",{x:bullets.radius*3,y:bullets.radius*3*0.1});
		bullets.tex = b.generateTexture();
		b.destroy(true);
		for(var i = 0; i < bullets.pool.objs.length; ++i){
			b = bullets.pool.objs[i];
			b.dead = true;
			b.spr.texture = bullets.tex;
		}
	};
	bullets.revert = function(){
		bullets.radius = 3;
		var c = new PIXI.ParticleContainer(bullets.max, {
			scale:false,
			position:true,
			rotation:true
		}, bullets.max);
		bullets.container.parent.addChild(c);
		bullets.container.parent.swapChildren(c,bullets.container);
		bullets.container.parent.removeChild(bullets.container);
		bullets.container.destroy(true);
		bullets.container = c;
		bullets.tex.destroy(true);
		var b = svg("bullet",{x:bullets.radius*3.5,y:bullets.radius*3.5});
		bullets.tex = b.generateTexture();
		b.destroy(true);
		for(var i = 0; i < bullets.pool.objs.length; ++i){
			b = bullets.pool.objs[i];
			b.dead = true;
			b.spr.texture = bullets.tex;
		}
	};
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
		s.destroy(true);
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
		s.destroy(true);
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
		width: 9,
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
				for(var j = 0; j < this.width; ++j){
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
				t.destroy(true);
			}
			score.add(1);
		},
		add: function(amount){
			this.current += amount;
		},
		update:function(){
			if(this.current > this.last){
				var l = this.getScoreString(this.last);
				for(var i = 0; i < l.length; ++i){
					var n = l[l.length-1-i];
					this.numbers[n][l.length-1-i].visible = false;
				}


				l = this.getScoreString(this.current);
				for(var i = 0; i < l.length; ++i){
					var n = l[l.length-1-i];
					this.numbers[n][l.length-1-i].visible = true;
				}
				this.last = this.current;
			}
		},
		getScoreString: function(s){
			if(arguments.length < 1){
				s = this.current;
			}
			s=Math.ceil(s*100).toString(10);
			while(s.length < this.width){
				s = "0"+s;
			}
			return s;
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
	}
	this.extra.clear();
	if(!player.dead){
		if(Math.abs(gamepads.getAxis(gamepads.RSTICK_H)) > 0 || Math.abs(gamepads.getAxis(gamepads.RSTICK_V)) > 0){
			mouse.correctedPos.x = player.spr.x + gamepads.getAxis(gamepads.RSTICK_H)*player.radius*10;
			mouse.correctedPos.y = player.spr.y + gamepads.getAxis(gamepads.RSTICK_V)*player.radius*10;
		}

		var closest = null;
		var closestDist = Math.pow(player.radius*20,2);
		for(var i = 0; i < enemies.length; ++i){
			var e = enemies[i];

			if(!player.dead){
				e.d = Math.pow(player.spr.x-e.spr.x,2) + Math.pow(player.spr.y-e.spr.y,2);
				if(e.d < closestDist){
					closest = e;
					closestDist = e.d;
				}
			}
		}
		if(winnitronMode && closest){
			mouse.correctedPos.x = closest.spr.x;
			mouse.correctedPos.y = closest.spr.y;
		}

		var input = getInput();
		// free move
		player.v.x += input.move.x/3;
		player.v.y += input.move.y/3;
		player.update();
	}

	if(keys.isJustDown(keys.ESCAPE)){
		if(!player.dead){
			while(health.current > 0){
				health.damage();
			}
		}else{
			this.deinit();
			menu = new Menu();
			return;
		}
	}

	if(!player.dead){
		if(!player.blocking && getAction2()){
			if(stamina.current > 0.3){
				if(getJustAction2()){
					sword.side *= -1;
				}
				player.block();
				stamina.drain(0.3);
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

	////////////
	// cursor //
	////////////
	if(!player.dead && !player.blocking){
		var l = player.getRotatedAttackLines()[2];
		this.extra.beginFill(0x0,0.0);
		this.extra.lineStyle(0.1,0xFFFFFF,1);
		this.extra.moveTo(mouse.correctedPos.x+(Math.random()*2-1)*3,mouse.correctedPos.y+(Math.random()*2-1)*3);
		this.extra.lineTo(player.spr.x + Math.cos(player.spr.rotation)*player.radius, player.spr.y + Math.sin(player.spr.rotation)*player.radius);
		this.extra.endFill();
		this.extra.beginFill(0x0,0.0);
		this.extra.lineStyle(0.2,0xFFFFFF,1);
		this.extra.moveTo(mouse.correctedPos.x+(Math.random()*2-1)*2,mouse.correctedPos.y+(Math.random()*2-1)*2);
		this.extra.lineTo(player.spr.x + Math.cos(player.spr.rotation)*player.radius, player.spr.y + Math.sin(player.spr.rotation)*player.radius);
		this.extra.endFill();
	}

	/////////////
	// enemies //
	/////////////
	
	// spawn
	if(!player.dead){
		// boss check
		if(this.boss){
			this.boss.name.alpha = lerp(this.boss.name.alpha, 1, 0.01);
			if(!this.boss.enemy){
				//spawn boss
				bullets.replace();
				this.boss.enemy = new Enemy(EnemyTypes.boss);
				this.boss.enemy.spr.x = size.x/2;
				this.boss.enemy.spr.y = -this.boss.enemy.radius*16;
				enemies.push(this.boss.enemy);
			}else{
				if(!this.boss.dead && this.boss.enemy && enemies.length === 0){
					// boss killed
					score.add(10000);
					blur_filter.uniforms.uBlurAdd += 0.1;
					screen_filter.uniforms.uChrAbbSeparation += 1000;
					screen_filter.uniforms.uInvert += 1;

					this.boss.dead = game.main.curTime;
					this.boss.name.parent.removeChild(this.boss.name);
					this.boss.name.destroy(true);

					bullets.revert();
				}else{
					this.boss.update();
				}
			}
		}
		if (!this.boss && score.current > 10000){
			if(enemies.length === 0 && bullets.pool.live.length === 0){
				// start boss
				this.boss = {
					start: game.main.curTime
				};
				this.boss.name = new PIXI.Container();
				this.boss.name.x = size.x/2 - 0.5;
				this.boss.name.y = size.y - 30- 0.5;
				this.boss.name.alpha = 0;

				var t = text("the shogun", {x:8,y:6}, 1, {x:0,y:0});
				t.cacheAsBitmap = true;
				this.boss.name.addChild(t);

				var b = new PIXI.Graphics();
				b.y = 10;
				b.beginFill(0,0);
				b.lineStyle(1,0xFFFFFF,1);
				b.drawRect(-size.x/3, 0, size.x/3*2, 10);
				b.drawCircle(-size.x/3, 0, 1);
				b.drawCircle(size.x/3, 0, 1);
				b.drawCircle(-size.x/3, 10, 1);
				b.drawCircle(size.x/3, 10, 1);
				b.endFill();
				b.cacheAsBitmap = true;
				this.boss.name.addChild(b);

				var h = new PIXI.Graphics();
				h.y = 10;
				h.beginFill(0xFFFFFF,0.2);
				h.drawRect(-size.x/3, 0, size.x/3*2, 10);
				h.endFill();
				h.cacheAsBitmap = true;
				this.boss.name.addChild(h);

				var hx1 = new PIXI.Graphics();
				hx1.y = 10;
				hx1.beginFill(0,0);
				hx1.lineStyle(1,0xFFFFFF,1);
				hx1.moveTo(0, 0);
				hx1.lineTo(0,10);
				hx1.drawCircle(0, 0, 1);
				hx1.drawCircle(0, 10, 1);
				hx1.endFill();
				hx1.cacheAsBitmap = true;
				this.boss.name.addChild(hx1);
				var hx2 = hx1.clone();
				hx2.y = 10;
				hx2.cacheAsBitmap = true;
				this.boss.name.addChild(hx2);

				this.boss.update = function(){
					var p = this.boss.enemy.health/EnemyTypes.boss.health;
					h.scale.x = p;
					hx1.x = -p*size.x/3;
					hx2.x = p*size.x/3;
					var pat = this.boss.enemy.bulletpattern;
					if(p < 0.33){
						this.boss.enemy.bulletpattern = BulletPatterns.boss3;
					}else if(p < 0.66){
						this.boss.enemy.bulletpattern = BulletPatterns.boss2;
					}else{
						this.boss.enemy.bulletpattern = BulletPatterns.boss1;
					}
					if(pat !== this.boss.enemy.bulletpattern){
						blur_filter.uniforms.uInvert += 0.1;
						screen_filter.uniforms.uChrAbbSeparation += 100;
						score.add(1000);
					}
				}.bind(this);

				this.container.addChild(this.boss.name);
			}
		}else if(
			enemies.length<50 && (
			(
				enemies.length === 0 && Math.random() < 0.1) // no enemies
				|| (this.boss && this.boss.dead && Math.random() < (game.main.curTime-this.boss.dead)/200000) // post-boss
				|| (!this.boss && (Math.max(0.01,3-enemies.length/Math.max(1,score.current/10000))*score.current) * Math.random() / 500 > 1) // standard spawn
			)
		){
			var k = Object.keys(EnemyTypes);
			for(var i = k.length-1; i >= 0; --i){
				if(score.current < EnemyTypes[k[i]].scoreThreshold){
					k.splice(i,1);
				}
			}
			k = EnemyTypes[k[Math.floor(Math.random()*k.length)]];
			enemies.push(new Enemy(k));
		}
	}
	for(var i = 0; i < enemies.length; ++i){
		var e = enemies[i];

		if(!player.dead){
			// bump
			if(e.d && e.d < Math.pow(player.radius+e.radius,2)){
				var dx = player.spr.x - e.spr.x;
				var dy = player.spr.y - e.spr.y;
				var l = 1/magnitude({x:dx,y:dy});
				dx*=l;
				dy*=l;

				dx *= 1;
				dy *= 1;

				player.v.x += dx * Math.max(1, e.radius - player.radius)/10;
				e.v.x -= dx * Math.max(1, player.radius - e.radius)/10;
				player.v.y += dy * Math.max(1, e.radius - player.radius)/10;
				e.v.y -= dy * Math.max(1, player.radius - e.radius)/10;
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
		player.spr.destroy(true);
		delete player.spr;
		sword.parent.removeChild(sword);
		sword.destroy(true);
		player.slashMark.parent.removeChild(player.slashMark);
		player.slashMark.destroy(true);
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
			t.x = size.x/2 + 5*1.5;
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
	bullets.revert();
	this.container.parent.removeChild(this.container);
	for(var i in EnemyTypes){
		if(EnemyTypes.hasOwnProperty(i)){
			var c = EnemyTypes[i].container;
			while(c.children.length > 0){
				c.removeChildAt(0).destroy();
			}
			c.parent.removeChild(c);
		}
	}
	this.container.destroy(true);
	if(debug.enabled){
		debug.drawList.length = 0;
	}
	delete battle;
}