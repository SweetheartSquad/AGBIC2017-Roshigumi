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
		svg: "heart",
		action: function(p){
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
			score.add(100);
		}
	}
};