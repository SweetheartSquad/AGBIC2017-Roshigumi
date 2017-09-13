// setup inputs
var mouse={
	element:null,

	down:false,
	justDown:false,
	justUp:false,

	pos:{
		x:0,
		y:0
	},
	delta:{
		x:0,
		y:0
	},
	prev:{
		x:0,
		y:0
	},
	mouseWheel: 0,

	init: function(__elementId, __lock){
		this.element = document.getElementById(__elementId);
		this.element.on("mouseup", mouse.on_up.bind(mouse));
		this.element.on("mouseout", mouse.on_up.bind(mouse));
		this.element.on("mousedown", mouse.on_down.bind(mouse));
		this.element.on("mousemove", mouse.on_move.bind(mouse));
		this.element.on("wheel", mouse.on_wheel.bind(mouse));
		if(__lock){
			this.lock = true;
			this.lockMouse();
		}
	},

	lockMouse: function() {
		this.element.requestPointerLock = this.element.requestPointerLock || this.element.mozRequestPointerLock;
		this.element.requestPointerLock();
	},

	update: function(){
		this.justDown = false;
		this.justUp = false;

		this.mouseWheel = 0;
		
		// save old position
		this.prev.x = this.pos.x;
		this.prev.y = this.pos.y;
		// calculate delta position
		this.delta.x = 0;
		this.delta.y = 0;
	},


	on_down: function(event){
		if(this.down!==true){
			this.down=true;
			this.justDown=true;
		}
		if(this.lock){
			this.lockMouse();
		}
	},
	on_up: function(event){
		this.down=false;
		this.justDown=false;
		this.justUp=true;
	},
	on_move: function(event){
		if(this.lock) {
			this.delta.x = event.movementX;
			this.delta.y = event.movementY;
			this.pos.x += this.delta.x;
			this.pos.y += this.delta.y;
			return;
		}
		// get new position
		this.pos.x = event.clientX - this.element.offsetLeft;
		this.pos.y = event.clientY - this.element.offsetTop;
		// calculate delta position
		this.delta.x = this.pos.x - this.prev.x;
		this.delta.y = this.pos.y - this.prev.y;
	},
	on_wheel: function(event){
		this.mouseWheel = event.deltaY || event.originalEvent.wheelDelta;
	},

	isDown: function(_key){
		return this.down;
	},
	isUp: function(_key){
		return !this.isDown();
	},
	isJustDown: function(_key){
		return this.justDown;
	},
	isJustUp: function(_key){
		return this.justUp;
	},

	// returns -1 when moving down, 1 when moving up, 0 when not moving
	getWheelDir: function(_key){
		return Math.sign(this.mouseWheel);
	}
};