// setup inputs
var keys={
	down:[],
	justDown:[],
	justUp:[],

	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,

	ZERO: 48,
	ONE: 49,
	TWO: 50,
	THREE: 51,
	FOUR: 52,
	FIVE: 53,
	SIX: 54,
	SEVEN: 55,
	EIGHT: 56,
	NINE: 57,

	Q: 81,
	W: 87,
	E: 69,
	R: 82,
	T: 84,
	Y: 89,
	U: 85,
	I: 73,
	O: 79,
	P: 80,

	A: 65,
	S: 83,
	D: 68,
	F: 70,
	G: 71,
	H: 72,
	J: 74,
	K: 75,
	L: 76,

	Z: 90,
	X: 88,
	C: 67,
	V: 86,
	B: 66,
	N: 78,
	M: 77,

	SHIFT: 16,
	CTRL: 17,
	SPACE: 32,
	ENTER: 13,
	BACKSPACE: 8,
	ESCAPE: 27,
	SEMI_COLON: 186,
	SQUARE_BRACKET_OPEN: 219,
	SQUARE_BRACKET_CLOSE: 221,
	SINGLE_QUOTE: 222,

	capture:[],

	init:function(__options){
		document.addEventListener('keyup', keys.on_up.bind(this), {
			useCapture: true
		});
		document.addEventListener('keydown', keys.on_down.bind(this), {
			useCapture: true
		});

		this.capture = __options.capture;
	},

	update:function(){
		this.justDown=[];
		this.justUp=[];
	},


	on_down:function(event){
		if(this.down[event.keyCode]!==true){
			this.down[event.keyCode]=true;
			this.justDown[event.keyCode]=true;
		}
		if(this.capture.indexOf(event.keyCode) != -1){
			event.preventDefault();
			return false;
		}
	},
	on_up:function(event){
		this.down[event.keyCode]=false;
		this.justDown[event.keyCode]=false;
		this.justUp[event.keyCode]=true;
		if(this.capture.indexOf(event.keyCode) != -1){
			event.preventDefault();
			return false;
		}
	},

	isDown:function(_key){
		return this.down[_key]===true;
	},
	isUp:function(_key){
		return !this.isDown(_key);
	},
	isJustDown:function(_key){
		return this.justDown[_key]===true;
	},
	isJustUp:function(_key){
		return this.justUp[_key]===true;
	}
};