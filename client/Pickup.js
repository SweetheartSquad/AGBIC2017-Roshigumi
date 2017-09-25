function Pickup(type){
	this.type = type;
	this.spr = svg(type.svg, {x:Pickup.radius*2.5, y:Pickup.radius*2.5});
	this.spr.rotation = (Math.random()*2 - 1) / 4;
	this.v = {
		x: 0,
		y: 0,
		r: (Math.random()*2 - 1) / 4
	};
	this.delay = 30;
}
Pickup.radius = 10;

Pickup.prototype.update = function(){
	this.spr.x += this.v.x;
	this.spr.y += this.v.y;
	this.spr.rotation += this.v.r;
	this.v.x *= 0.98;
	this.v.y *= 0.98;
	this.v.r *= 0.98;
	this.delay -= 1;
}
Pickup.prototype.action = function(){
	this.type.action(this);
}

Pickup.types = {
	heart: {
		svg: "♥",
		action: function(p){
			score.add(100);

			blur_filter.uniforms.uBlurAdd += 0.1;
			screen_filter.uniforms.uChrAbbSeparation += 1000;
			screen_filter.uniforms.uInvert += 1;
			battle.extra.beginFill(0,0);
			battle.extra.lineStyle(5,0xFFFFFF,1);
			battle.extra.drawCircle(p.spr.x, p.spr.y, p.radius*2);
			battle.extra.endFill();
			battle.extra.lineStyle(3,0xFFFFFF,1);
			battle.extra.drawCircle(p.spr.x, p.spr.y, p.radius*3);
			battle.extra.endFill();

			health.heal();
		}
	},
	extend: {
		svg: "extend",
		action: function(p){
			score.add(100);

			var scaleBy = 1.5;
			blur_filter.uniforms.uBlurAdd += 0.1;
			screen_filter.uniforms.uChrAbbSeparation += 1000;
			screen_filter.uniforms.uInvert -= 10;
			for(var i = 0; i < player.attackLines.length; ++i){
				player.attackLines[i][0].x *= scaleBy;
				player.attackLines[i][0].y *= scaleBy;
				player.attackLines[i][1].x *= scaleBy;
				player.attackLines[i][1].y *= scaleBy;
			}
			player.slashMark.scale.x *= scaleBy;
			player.slashMark.scale.y *= scaleBy;
			
			player.effects.push({
				every: function(){
					sword.scale.x += Math.sign(sword.scale.x)*scaleBy*0.02;
					sword.scale.y += Math.sign(sword.scale.y)*scaleBy*0.02;
				},
				complete: function(){
					blur_filter.uniforms.uBlurAdd -= 0.1;
					screen_filter.uniforms.uScanDistort += 20;
					screen_filter.uniforms.uInvert -= 10;
					for(var i = 0; i < player.attackLines.length; ++i){
						player.attackLines[i][0].x /= scaleBy;
						player.attackLines[i][0].y /= scaleBy;
						player.attackLines[i][1].x /= scaleBy;
						player.attackLines[i][1].y /= scaleBy;
					}
					player.slashMark.scale.x /= scaleBy;
					player.slashMark.scale.y /= scaleBy;
				},
				time: 600
			});
		}
	},
	slowdown: {
		svg: 'clock',
		action: function(p){
			score.add(100);

			blur_filter.uniforms.uBlurAdd += 0.1;
			screen_filter.uniforms.uChrAbbSeparation += 1000;
			sounds["music"].rate(0.5);

			bullets.speed = 0.3;
			Enemy.speed = 0.5;

			player.effects.push({
				every: function(){
					screen_filter.uniforms.uInvert += 0.1;
				},
				complete: function(){
					blur_filter.uniforms.uBlurAdd -= 0.1;
					screen_filter.uniforms.uScanDistort += 20;
					sounds["music"].rate(1);
					
					bullets.speed = 1;
					Enemy.speed = 1;
				},
				time: 600
			});
		}
	},
	shield: {
		svg: 'shield',
		action: function(p){
			score.add(100);

			blur_filter.uniforms.uBlurAdd += 0.1;
			screen_filter.uniforms.uChrAbbSeparation += 1000;
			screen_filter.uniforms.uInvert += 1;

			player.effects.push({
				every: function(){
					screen_filter.uniforms.uChrAbbSeparation += 3;
					screen_filter.uniforms.uInvert += 0.01;
					var r = (this.time*0.9)%(Math.PI*2);
					player.spr.rotation += r;
					player.block();
					player.spr.rotation -= r;
				},
				complete: function(){
					blur_filter.uniforms.uBlurAdd -= 0.1;
					screen_filter.uniforms.uScanDistort += 20;
					screen_filter.uniforms.uInvert += 1;
					screen_filter.uniforms.uChrAbbSeparation -= 200;
				},
				time: 600
			});
		}
	}
};
Pickup.powerups = [
	Pickup.types.extend,
	Pickup.types.slowdown,
	Pickup.types.shield
];
Pickup.getRandomPowerup = function(){
	return Pickup.powerups[Math.floor(Math.random()*Pickup.powerups.length)];
};