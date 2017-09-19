function Pickup(){
	this.spr = svg("heart", {x:Pickup.radius*2.5, y:Pickup.radius*2.5});
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