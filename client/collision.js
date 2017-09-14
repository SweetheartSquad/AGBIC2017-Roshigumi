function circToCirc(x1,y1,r1, x2,y2,r2){
	var xd = x2-x1,
	yd = y2-y1,
	r = r1+r2;
	return xd*xd+yd*yd < r*r;
}

//https://stackoverflow.com/a/1968345
function lineToLine(x1,y1,x2,y2, x3,y3,x4,y4){
	var xs1 = x2-x1;
	var ys1 = y2-y1;
	var xs2 = x4-x3;
	var ys2 = y4-y3;

	var a = 1.0 / (-xs2 * ys1 + xs1 * ys2);

	var s = (-ys1 * (x1 - x3) + xs1 * (y1 - y3)) * a;
	var t = ( xs2 * (y1 - y3) - ys2 * (x1 - x3)) * a;

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1){
    	return {
    		x: x1 + t*xs1,
    		y: y1 + t*ys1
    	};
    }
    return false;
}