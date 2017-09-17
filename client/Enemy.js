function Enemy(type){
	this.v = {};
	this.v.x = 0;
	this.v.y = 0;
	this.spr = svg(type.source.svg, type.source);
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
	this.bulletpattern = type.pattern;
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


function wait(frames, moveFunc, enemy){
	if(!enemy.waitOptions){
		enemy.waitOptions = frames;
	}
	enemy.waitOptions -= 1;
	moveFunc(enemy);
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
	enemy.shootCircleOptions += 0.2;
	b.v.x = Math.cos(enemy.shootCircleOptions)/2;
	b.v.y = Math.sin(enemy.shootCircleOptions)/2;
	b.spr.x += b.v.x * enemy.radius;
	b.spr.y += b.v.y * enemy.radius;
	return true;
}

function stop(){

}
function patrol(enemy){
	if(!enemy.target){
		if(Math.random() < 0.01){
			enemy.target = {
				x:Math.random()*size.x*0.75 + 0.125,
				y:Math.random()*size.y*0.75 + 0.125
			};
		}
	}else{
		var v = {
			x: enemy.target.x - enemy.spr.x,
			y: enemy.target.y - enemy.spr.y
		};
		var l = magnitude(v);
		if(l < 1){
			enemy.target = undefined;
		}
		v.x /= l;
		v.y /= l;
		v.x *= 0.1;
		v.y *= 0.1;

		enemy.v.x += v.x;
		enemy.v.y += v.y;
	}
}

function wander(enemy){
	if(!enemy.target){
		var ratio = (Math.random()*2-1)*30;
		enemy.target = {
			frame: 1,
			x: 150 + ratio,
			y: 150 - ratio
		};
	}else{
		enemy.target.frame+=1;
		var v = {
			x: ((Math.cos(enemy.target.frame/enemy.target.x)/2+0.5)*0.8+0.1)*size.x - enemy.spr.x,
			y: ((Math.sin(enemy.target.frame/enemy.target.y)/2+0.5)*0.9+0.05)*size.y - enemy.spr.y
		};
		var l = magnitude(v);
		if(l < 1){
			enemy.target = undefined;
		}
		v.x /= l;
		v.y /= l;
		v.x *= 0.1;
		v.y *= 0.1;

		enemy.v.x += v.x;
		enemy.v.y += v.y;
	}
}

function moveToCorner(enemy){
	if(!enemy.moveToCornerOptions){
		enemy.moveToCornerOptions = {
			x: (Math.round(Math.random())*0.8 + 0.1) * size.x,
			y: (Math.round(Math.random())*0.9 + 0.05) * size.y
		};
	}
	var v = {
		x: enemy.moveToCornerOptions.x - enemy.spr.x,
		y: enemy.moveToCornerOptions.y - enemy.spr.y
	};
	var l = magnitude(v);
	v.x /= l;
	v.y /= l;
	v.x *= 0.3;
	v.y *= 0.3;

	enemy.v.x += v.x;
	enemy.v.y += v.y;

	if(l < 1){
		enemy.v.x = -Math.sign(enemy.moveToCornerOptions.x-size.x/2);
		enemy.v.y = -Math.sign(enemy.moveToCornerOptions.y-size.y/2);
		enemy.moveToCornerOptions = undefined;
		return true;
	}
	return false;
}

function shootArc(frames, framesDelay, enemy){
	if(!enemy.shootArcOptions){
		enemy.shootArcOptions = {
			target: Math.atan2(size.y/2-enemy.spr.y,size.x/2-enemy.spr.x),
			frames: frames
		};
	}
	if(enemy.shootArcOptions.frames % framesDelay == 0){
		var b = bullets.pool.add(enemy);
		var a = enemy.shootArcOptions.frames/framesDelay/frames-0.5;
		a *= frames/4;
		a = Math.sin(a);
		a += enemy.shootArcOptions.target;
		b.v.x = Math.cos(a);
		b.v.y = Math.sin(a);
		b.spr.x += b.v.x * enemy.radius;
		b.spr.y += b.v.y * enemy.radius;
	}
	enemy.shootArcOptions.frames -= 1;
	if(enemy.shootArcOptions.frames <= 0){
		enemy.shootArcOptions = undefined;
		return true;
	}
	return false;
}

BulletPatterns = {
	shootPlayer: [
		wait.bind(undefined, 100, patrol),
		shootPlayer
	],
	shootRandom: [
		wait.bind(undefined, 200, patrol),
		wait.bind(undefined, 5, stop),
		shootRandom,
		wait.bind(undefined, 5, stop),
		shootRandom,
		wait.bind(undefined, 5, stop),
		shootRandom,
		wait.bind(undefined, 5, stop),
		shootRandom,
		wait.bind(undefined, 5, stop),
		shootRandom,
		wait.bind(undefined, 5, stop),
		shootRandom,
		wait.bind(undefined, 5, stop),
		shootRandom
	],
	shootCircle: [
		wait.bind(undefined, 12, wander),
		shootCircle
	],
	shootCorner: [
		moveToCorner,
		wait.bind(undefined, 10, stop),
		shootArc.bind(undefined, 200, 4),
		wait.bind(undefined, 60, stop)
	],
	none: [
		wait.bind(undefined, 1, stop)
	]
};


EnemyTypes = {
	cross: {
		source:{svg:enemy_cross,x:48,y:48*0.8},
		pattern:BulletPatterns.shootRandom
	},
	triangle: {
		source:{svg:enemy_triangle,x:48*0.8,y:48},
		pattern:BulletPatterns.shootCircle
	},
	circle: {
		source:{svg:enemy_circle,x:48,y:48*0.7},
		pattern:BulletPatterns.shootPlayer
	},
	sam: {
		source:{svg:enemy_sam,x:48*0.8,y:48},
		pattern:BulletPatterns.shootCorner
	}
};