#ifdef GL_ES
precision mediump float;
#endif
uniform float time;
uniform vec2 resolution;

void main (void) {
  vec2 p = ( gl_FragCoord.xy / resolution.xy );
  gl_FragColor = vec4(p.x, p.y, (1.+cos(time/1000.))/2., 1.0);
}
/*

// https://www.shadertoy.com/view/XdfGzH

precision highp float;

uniform vec2 resolution;
uniform vec4 mouse;
uniform sampler2D video;

// ====
//note: period of 2, [-1;1]=/\ 
float sawtooth( float t ) {
	return abs(mod(abs(t), 2.0)-1.0);
}

void main(void)
{
	vec2 uv = gl_FragCoord.xy / resolution.xy;
	
	//note: domain distortion
	// Position der Verzerrung (0-1)
	// Könnt Ihr über ne Variable auch setzen
	const vec2 ctr = vec2(0.8,0.5);
	vec2 ctrvec = ctr - uv;
	float ctrdist = length( ctrvec );
	ctrvec /= ctrdist;
	//uv += ctrvec * max(0.0, pow(ctrdist,7.0)-0.0025);
	
	// Stärke der Verzerrung
	// Mit diesen Variablen spielen oder sie aus JS beeinflussen
	uv += ctrvec * max(0.0, pow(ctrdist,7.0)-0.0025);
	
	vec3 t = texture2D( video, vec2(0,1)+vec2(1,-1)*uv ).rgb;
	
	//gl_FragColor = vec4(outcol,1.0);
	gl_FragColor = vec4(t,1.0);
}

*/