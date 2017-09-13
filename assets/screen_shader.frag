precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec2 uSpriteSize;
uniform vec2 uBufferSize;
uniform float uPostProcessScale;
uniform float uTime;

uniform float uScanDistort;

float weight[5];
float pxSize;
const float PI = 3.14159;
const float PI2 = PI*2.0;

//https://stackoverflow.com/questions/12964279/whats-the-origin-of-this-glsl-rand-one-liner
float rand(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float easeInOutSine(float t, float b, float c, float d) {
	return -c/2.0 * (cos(PI*t/d) - 1.0) + b;
}
vec2 lensDistort(vec2 uv, float by){
    uv = uv * uBufferSize / uSpriteSize/uPostProcessScale;

    uv *= 2.0;
    uv -= 1.0;

    uv *= 1.0 + uv.yx*uv.yx * by*by;
    uv = clamp(uv, vec2(-1.0), vec2(1.0));

    uv += 1.0;
    uv /= 2.0;

    uv = uv/uBufferSize*uSpriteSize*uPostProcessScale;
    return uv;
}
vec2 scanDistort(vec2 uv){
    float amt=uScanDistort
    *((sin(uTime*10.0+uv.y*uBufferSize.y/13.0)/2.0+1.0)
    +(sin(uTime*12.0+uv.y*uBufferSize.y/33.0)/2.0+1.0));
    vec2 o = uv;
    uv = uv * uBufferSize / uSpriteSize / uPostProcessScale;
    uv.x += sqrt(0.5-distance(uv.x,0.5))*(rand(vec2(o.y-mod(o.y,uPostProcessScale/uBufferSize.y),uTime))-0.5)/(uPostProcessScale*uSpriteSize.x)*amt*uBufferSize.x/1600.0;
    uv.y += sqrt(0.5-distance(uv.y,0.5))*0.1*(rand(vec2(o.x-mod(o.x,uPostProcessScale/uBufferSize.x),uTime))-0.5)/(uPostProcessScale*uSpriteSize.y)*amt*uBufferSize.y/900.0;

    uv = uv / uBufferSize * uSpriteSize * uPostProcessScale;

    return uv;
}
vec3 tex(vec2 uv){
    return texture2D(uSampler, uv/uPostProcessScale).rgb;
}
//
//
float vignette(vec2 uv, float amount){
    uv = uv * uBufferSize / uSpriteSize/uPostProcessScale;
	uv*=2.0;
    uv -= 1.0;
	return clamp((1.0-uv.y*uv.y)*(1.0-uv.x*uv.x)/amount, 0.0, 1.0);
}

float grille(vec2 uv, vec2 amount){
    vec2 g = mod(uv*uBufferSize/uPostProcessScale,vec2(1.0));
    g *= 2.0;
    g -= 1.0;
    g = abs(g);
    g.x = 1.0 - g.x*amount.y;
    g.y = 1.0 - g.y*amount.x;
	return 1.0-pow(1.0-g.y*g.x,2.0);
}

// chromatic abberation
vec3 chrAbb(vec2 uv, float separation, float rotation){
	vec2 o = 1.0/uBufferSize/uPostProcessScale * pxSize * separation;
    return vec3(
    	tex(uv + vec2(o.x*sin(PI2*1.0/3.0+rotation),o.y*cos(PI2*1.0/3.0+rotation))).r,
    	tex(uv + vec2(o.x*sin(PI2*2.0/3.0+rotation),o.y*cos(PI2*2.0/3.0+rotation))).g,
    	tex(uv + vec2(o.x*sin(PI2*3.0/3.0+rotation),o.y*cos(PI2*3.0/3.0+rotation))).b
    );
}

void main(void){
	uTime;uScanDistort;
	pxSize = 1.0/uPostProcessScale;
	vec2 uv = vTextureCoord.xy;
    uv = scanDistort(uv);
	uv = lensDistort(uv, 0.3);
	vec3 fg = tex(uv);
    fg += chrAbb(uv, 4.0, PI2*(uv.x+uv.y))/4.0;
    fg *= vignette(uv,0.1);
    uv = (vTextureCoord.xy);
	fg *= grille(uv, vec2(0.6,0.3));

	gl_FragColor = vec4(fg, 1.0);
}