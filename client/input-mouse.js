// setup inputs
var mouse={

	LEFT: 0,
	MIDDLE: 1,
	RIGHT: 2,
	BACK: 3,
	FORWARD: 5,

	element:null,

	down:[],
	justDown:[],
	justUp:[],

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
	capture: [],

	init: function(options){
		this.element = document.getElementById(options.element);
		this.element.on("mouseup", mouse.on_up.bind(mouse));
		this.element.on("mouseout", mouse.on_up.bind(mouse));
		this.element.on("mousedown", mouse.on_down.bind(mouse));
		this.element.on("mousemove", mouse.on_move.bind(mouse));
		this.element.on("wheel", mouse.on_wheel.bind(mouse));
		if(!options.allowContextMenu){
			this.element.on("contextmenu", mouse.on_contextmenu.bind(mouse));
		}
		if(options.lock){
			this.lock = true;
			this.lockMouse();
			this.element.on("pointerlockerror", mouse.on_lockerror.bind(mouse));
		}

		this.capture = options.capture;
	},

	lockMouse: function() {
		this.locked = true;
		this.element.requestPointerLock = this.element.requestPointerLock || this.element.mozRequestPointerLock;
		this.element.requestPointerLock();
	},

	update: function(){
		this.justDown=[];
		this.justUp=[];

		this.mouseWheel = 0;
		
		// save old position
		this.prev.x = this.pos.x;
		this.prev.y = this.pos.y;
		// calculate delta position
		this.delta.x = 0;
		this.delta.y = 0;
	},


	on_down: function(event){
		if(this.down[event.button]!==true){
			this.down[event.button]=true;
			this.justDown[event.button]=true;
		}
		if(this.lock){
			this.lockMouse();
		}
		if(this.capture.indexOf(event.button) != -1){
			event.preventDefault();
			return false;
		}
	},
	on_up: function(event){
		this.down[event.button]=false;
		this.justDown[event.button]=false;
		this.justUp[event.button]=true;
		if(this.capture.indexOf(event.button) != -1){
			event.preventDefault();
			return false;
		}
	},
	on_move: function(event){
		if(this.locked) {
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
	on_contextmenu: function(event){
		event.preventDefault();
		return false;
	},
	on_lockerror: function(event){
		this.locked = false;
		event.preventDefault();
		return false;
	},

	isDown:function(button){
		return this.down[button]===true;
	},
	isUp:function(button){
		return !this.isDown(button);
	},
	isJustDown:function(button){
		return this.justDown[button]===true;
	},
	isJustUp:function(button){
		return this.justUp[button]===true;
	},

	// returns -1 when moving down, 1 when moving up, 0 when not moving
	getWheelDir: function(button){
		return Math.sign(this.mouseWheel);
	}
};