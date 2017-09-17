function Player(){
	this.spr = svg(ship,{x:32*0.95,y:32});
	this.radius = 10;
	this.spr.x = size.x/3;
	this.spr.y = size.y/3;
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
}
Player.prototype.attack = function(){
	screen_filter.uniforms.uScanDistort += 3;
	sword.side *= -1;
	sword.x = lerp(sword.x, this.spr.x, 0.9);
	sword.y = lerp(sword.y, this.spr.y, 0.9);
	sword.rotation = slerp(sword.rotation,this.trotation + Math.PI*sword.side/2 * 0.9*(1.0+sword.overshoot), 0.99);
	sword.overshoot = 0.3;
	var g = new PIXI.Graphics();
	g.beginFill(0xFFFFFF,0.1); 
	//g.lineStyle(20,0xFFFFFF,0.5);
	var arc={
		wide:125,
		long:100
	};
	g.moveTo(arc.long*0.1,-arc.wide/2);
	g.quadraticCurveTo(arc.long,0, arc.long*0.1,arc.wide/2);
	//g.quadraticCurveTo(arc.long/2,0, arc.long*0.1,-arc.wide/2);

	for(var i = 0; i < 8; ++i){
		g.beginFill(0xFFFFFF,0); 
		g.lineStyle(i,0xFFFFFF,1.0);
		g.moveTo(arc.long*0.1,-arc.wide/2);
		g.quadraticCurveTo(arc.long*(i/8),0, arc.long*0.1,arc.wide/2);
	}

	g.endFill();
	scene.addChild(g);
	g.rotation = this.trotation;
	g.x = this.spr.x;
	g.y = this.spr.y;
	g.alpha = 1;
	setTimeout(function(){
		scene.removeChild(g);
		g.destroy();
	},0);
};
Player.prototype.block = function(){
	sword.x = lerp(sword.x, this.spr.x + Math.cos(this.spr.rotation)*25 + Math.cos(this.spr.rotation-Math.PI/2*sword.side)*38, 0.9);
	sword.y = lerp(sword.y, this.spr.y + Math.sin(this.spr.rotation)*25 + Math.sin(this.spr.rotation-Math.PI/2*sword.side)*38, 0.9);
	sword.trotation = this.spr.rotation + Math.PI/2*sword.side;
	sword.rotation = slerp(sword.rotation, sword.trotation, 0.5);
	screen_filter.uniforms.uScanDistort += 0.1;
	//sword.rotation += 0.05;
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
	debug.lineStyle(1,0x0000FF,1);
	debug.moveTo(l[0].x,l[0].y);
	debug.lineTo(l[1].x,l[1].y);
	debug.endFill();

	l = this.getRotatedAttackLines();
	debug.lineStyle(1,0xFF0000,1);
	for(var i = 0; i < l.length; ++i){
		debug.moveTo(l[i][0].x,l[i][0].y);
		debug.lineTo(l[i][1].x,l[i][1].y);
		debug.endFill();
	}
};