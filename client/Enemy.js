function Enemy(source){
	this.v = {};
	this.v.x = 0;
	this.v.y = 0;
	this.spr = svg(source.svg, source);
	this.radius = Math.min(this.spr.width,this.spr.height)/2;
	this.lines = [
		[{
			x:-this.spr.width/2,
			y:-this.spr.height/2
		},{
			x: this.spr.width/2,
			y:-this.spr.height/2
		}],[{
			x: this.spr.width/2,
			y:-this.spr.height/2
		},{
			x: this.spr.width/2,
			y: this.spr.height/2
		}],[{
			x: this.spr.width/2,
			y: this.spr.height/2
		},{
			x:-this.spr.width/2,
			y: this.spr.height/2
		}],[{
			x:-this.spr.width/2,
			y: this.spr.height/2
		},{
			x:-this.spr.width/2,
			y:-this.spr.height/2
		}]
	];
	scene.addChild(this.spr);
	this.frame = 0;
	var k = Object.keys(BulletPatterns);
	this.bulletpattern = BulletPatterns[k[Math.floor(Math.random()*k.length)]];
}
Enemy.prototype.rotateLine = Player.prototype.rotateLine;
Enemy.prototype.getRotatedLines = function(){
	var ls = [];
	for(var i = 0; i < this.lines.length; ++i){
		ls.push(this.rotateLine(this.lines[i]));
	}
	return ls;
};
Enemy.prototype.debug = function(){
	debug.beginFill(0xFF0000,1);
	debug.lineStyle(0,0,0);
	debug.drawCircle(this.spr.x, this.spr.y, this.radius);
	var ls = this.getRotatedLines();
	for(var i = 0; i < ls.length; ++i){
		var l = ls[i];
		debug.lineStyle(1,0xFF0000,1);
		debug.moveTo(l[0].x,l[0].y);
		debug.lineTo(l[1].x,l[1].y);
	}
	debug.endFill();
};
Enemy.prototype.update = function(){
	if(!this.target){
		if(Math.random() < 0.01){
			this.target = {
				x:Math.random()*size.x*0.75 + 0.125,
				y:Math.random()*size.y*0.75 + 0.125
			};
		}
	}else{
		var v = {
			x: this.target.x - this.spr.x,
			y: this.target.y - this.spr.y
		};
		var l = magnitude(v);
		if(l < 1){
			this.target = undefined;
		}
		v.x /= l;
		v.y /= l;
		v.x *= 0.1;
		v.y *= 0.1;

		this.v.x += v.x;
		this.v.y += v.y;
	}
	this.spr.x += this.v.x;
	this.spr.y += this.v.y;
	this.v.x *= 0.9;
	this.v.y *= 0.9;
	this.trotation = Math.atan2(this.v.y,this.v.x);
	this.spr.rotation = slerp(this.spr.rotation,this.trotation,0.1);

	if(this.bulletpattern[this.frame](this)){
		this.frame += 1;
		this.frame %= this.bulletpattern.length;
	}
};


function wait(frames, enemy){
	if(!enemy.waitOptions){
		enemy.waitOptions = frames;
	}
	enemy.waitOptions -= 1;
	if(enemy.waitOptions <= 0){
		enemy.waitOptions = undefined;
		return true;
	}
	return false;
}
function shootPlayer(enemy){
	var b = bullets.pool.add(enemy);
	b.v.x = player.spr.x - enemy.spr.x;
	b.v.y = player.spr.y - enemy.spr.y;
	var l = magnitude(b.v);
	b.v.x/=l;
	b.v.y/=l;
	b.spr.x += b.v.x * enemy.radius;
	b.spr.y += b.v.y * enemy.radius;
	return true;
}
function shootRandom(enemy){
	var b = bullets.pool.add(enemy);
	b.v.x = Math.random()*2-1;
	b.v.y = Math.random()*2-1;
	var l = magnitude(b.v);
	b.v.x/=l;
	b.v.y/=l;
	b.spr.x += b.v.x * enemy.radius;
	b.spr.y += b.v.y * enemy.radius;
	return true;
}
function shootCircle(enemy){
	if(!enemy.shootCircleOptions){
		enemy.shootCircleOptions = 0;
	}
	var b = bullets.pool.add(enemy);
	enemy.shootCircleOptions += 0.1;
	b.v.x = Math.cos(enemy.shootCircleOptions)/2;
	b.v.y = Math.sin(enemy.shootCircleOptions)/2;
	b.spr.x += b.v.x * enemy.radius;
	b.spr.y += b.v.y * enemy.radius;
	return true;
}


BulletPatterns = {
	shootPlayer: [
		wait.bind(undefined, 100),
		shootPlayer
	],
	shootRandom: [
		wait.bind(undefined, 30),
		shootRandom
	],
	shootCircle: [
		wait.bind(undefined, 10),
		shootCircle
	]
};