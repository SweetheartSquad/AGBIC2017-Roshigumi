var blur_shader = ""
+"precision mediump float;"

+"varying vec2 vTextureCoord;"

+"uniform sampler2D uSampler;"
+"uniform vec2 uResolution;"
+"uniform vec2 uBlurDir;"
+"uniform float uBlurAdd;"
+"uniform float uTime;"

+"float weight[5];"

+"vec3 tex(vec2 uv){"
+"	return texture2D(uSampler, uv).rgb;"
+"}"

//https://stackoverflow.com/questions/12964279/whats-the-origin-of-this-glsl-rand-one-liner
+"float rand(vec2 co){"
+"  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);"
+"}"
+"vec3 blur(vec2 uv) {"
+"	vec3 color = vec3(0.0);"
+"	vec2 off1 = uBlurDir;"
+"	color += tex(uv) * 0.25;"
+"	color += tex(uv + (off1 / uResolution)) * uBlurAdd;"
+"	color += tex(uv - (off1 / uResolution)) * uBlurAdd;"
+"	return color; "
+"}"

+"vec3 dither(vec2 uv){"
+"	return vec3("
+"		1.0/128.0*(rand(uv.xy+vec2(uTime/2.0,0.0))-0.5),"
+"		1.0/128.0*(rand(uv.yx+vec2(uTime,uTime/3.0))-0.5),"
+"		1.0/128.0*(rand(1.0-uv.xy+vec2(0.0,uTime/4.0))-0.5)"
+"	);"
+"}"

+"void main(void){"
+"	vec2 uv = vTextureCoord.xy;"
+"	vec3 fg = blur(uv);"
+"	fg += dither(uv);"
+"	gl_FragColor = vec4(fg, 1.0);"
+"}";