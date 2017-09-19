function Pickup(){
	this.spr = svg(heart, {x:Pickup.radius, y:Pickup.radius});
	this.spr.rotation = (Math.random()*2 - 1) / 4;
	this.v = {
		x: Math.random()*2 - 1,
		y: Math.random()*2 - 1,
		r: (Math.random()*2 - 1) / 4
	};
	var l = magnitude(this.v);
	this.v.x /= l;
	this.v.y /= l;
	this.delay = 30;
}
Pickup.radius = 32;

Pickup.prototype.update = function(){
	this.spr.x += this.v.x;
	this.spr.y += this.v.y;
	this.spr.rotation += this.v.r;
	this.v.x *= 0.98;
	this.v.y *= 0.98;
	this.v.r *= 0.98;
	this.delay -= 1;
}