function Player(){
	this.spr = svg("ship",{x:32*0.95,y:32});
	this.radius = 8;
	this.spr.x = size.x/2;
	this.spr.y = size.y/2;
	this.v = {};
	this.v.x = 0;
	this.v.y = 0;
	this.invincible = 0;
	this.blockLine = [{
		x: 25,
		y: -32
	},{
		x: 25,
		y: 32
	}];
	this.attackLines = [
		[{
			x: 15,
			y: -48
		},{
			x: 50,
			y: 0
		}],
		[{
			x: 15,
			y: -48
		},{
			x: 15,
			y: 48
		}],
		[{
			x: 15,
			y: 0
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
		}]
	];
	debug.add(this);

	this.slashMark = new PIXI.Graphics();
	this.slashMark.beginFill(0xFFFFFF,0.1); 
	var arc={
		wide:125,
		long:100
	};
	this.slashMark.moveTo(arc.long*0.1,-arc.wide/2);
	this.slashMark.quadraticCurveTo(arc.long,0, arc.long*0.1,arc.wide/2);

	for(var i = 0; i < 8; ++i){
		this.slashMark.beginFill(0xFFFFFF,0); 
		this.slashMark.lineStyle(i,0xFFFFFF,1.0);
		this.slashMark.moveTo(arc.long*0.1,-arc.wide/2);
		this.slashMark.quadraticCurveTo(arc.long*(i/8),0, arc.long*0.1,arc.wide/2);
	}
	this.slashMark.endFill();
	this.slashMark.cacheAsBitmap = true;
	this.effects = [];
}
Player.prototype.attack = function(){
	var s = sounds["slash"].play();
	howlPos(sounds["slash"],s, player.spr.x,player.spr.y,0);
	sounds["slash"].rate(1 + (Math.random()*2-1)*0.1, s);
	screen_filter.uniforms.uScanDistort += 3;
	sword.side *= -1;
	sword.x = lerp(sword.x, this.spr.x, 0.9);
	sword.y = lerp(sword.y, this.spr.y, 0.9);
	sword.rotation = slerp(sword.rotation,this.trotation + Math.PI*sword.side/2 * 0.9*(1.0+sword.overshoot), 0.99);
	sword.overshoot = 0.3;
	this.slashMark.visible = true;
	this.slashMark.rotation = this.trotation;
	this.slashMark.x = this.spr.x;
	this.slashMark.y = this.spr.y;
};
Player.prototype.block = function(){
	sword.x = lerp(sword.x, this.spr.x + Math.cos(this.spr.rotation)*25 + Math.cos(this.spr.rotation-Math.PI/2*sword.side)*38, 0.9);
	sword.y = lerp(sword.y, this.spr.y + Math.sin(this.spr.rotation)*25 + Math.sin(this.spr.rotation-Math.PI/2*sword.side)*38, 0.9);
	sword.trotation = this.spr.rotation + Math.PI/2*sword.side;
	sword.rotation = slerp(sword.rotation, sword.trotation, 1.0);
	screen_filter.uniforms.uScanDistort += 0.1;
};
Player.prototype.rotateLine = function(l){
	var l = l.slice();
	var p = this.spr.toGlobal(new PIXI.Point(l[0].x,l[0].y));
	l[0] = {
		x: p.x,
		y: p.y
	};
	p = this.spr.toGlobal(new PIXI.Point(l[1].x,l[1].y));
	l[1] = {
		x: p.x,
		y: p.y
	};
	return l;
};
Player.prototype.getRotatedBlockLine = function(){
	return this.rotateLine(this.blockLine);
};
Player.prototype.getRotatedAttackLines = function(){
	var ls = this.attackLines.slice();
	for(var i = 0; i < ls.length; ++i){
		ls[i] = this.rotateLine(ls[i]);
	}
	return ls;
};
Player.prototype.slash = function(enemy){
	var pls = this.getRotatedAttackLines();
	var els = enemy.getRotatedLines();
	for(
		var pl = (sword.side < 0) ? 0 : (pls.length-1);
		(sword.side < 0) ? (pl < pls.length) : (pl >= 0);
		(sword.side < 0) ? (++pl) : (--pl)
	){
	for(var el = 0; el < els.length; ++el){
		var pll = pls[pl];
		var ell = els[el];
		var intersection = lineToLine(pll[0].x,pll[0].y,pll[1].x,pll[1].y, ell[0].x,ell[0].y,ell[1].x,ell[1].y);
		if(intersection){
			return {
				attackLine: pll,
				enemyLine: ell,
				intersection: intersection
			};
		}
	}
	}
	return false;
}
Player.prototype.debug = function(){
	debug.beginFill(0xFF0000,1);
	debug.lineStyle(0);
	debug.drawCircle(this.spr.x,this.spr.y,this.radius);

	var l = this.getRotatedBlockLine();
	debug.beginFill(0,0);
	debug.lineStyle(1,0x0000FF,1);
	debug.moveTo(l[0].x,l[0].y);
	debug.lineTo(l[1].x,l[1].y);
	debug.drawCircle(this.spr.x, this.spr.y, this.radius*3);
	debug.endFill();

	l = this.getRotatedAttackLines();
	debug.lineStyle(1,0xFF0000,1);
	for(var i = 0; i < l.length; ++i){
		debug.moveTo(l[i][0].x,l[i][0].y);
		debug.lineTo(l[i][1].x,l[i][1].y);
		debug.endFill();
	}
};
Player.prototype.update = function(){
	this.spr.x += this.v.x;
	this.spr.y += this.v.y;
	this.v.x *= 0.95;
	this.v.y *= 0.95;
	this.trotation = Math.atan2(
	 	mouse.correctedPos.y - this.spr.y,
	 	mouse.correctedPos.x - this.spr.x
	);
	this.spr.rotation = slerp(this.spr.rotation,this.trotation, 0.2);
	this.slashMark.visible = false;

	if(this.invincible > 0){
		this.invincible -= 1;
		this.spr.visible = this.invincible%6<3;
	}

	for(var i = this.effects.length-1; i >= 0; --i){
		var e = this.effects[i];
		e.every();
		e.time -= 1;
		if(e.time <= 0){
			e.complete();
			this.effects.splice(i,1);
		}
	}
};