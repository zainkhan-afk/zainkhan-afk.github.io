
precision highp float;

// A custom uniform to control the color
uniform vec4 myColor;

precision highp float;

varying vec3 vNormal;
uniform vec2 uResolution;
uniform float uTime;
varying vec3 vPos;


vec2 hash( vec2 p ) {
	p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float noise( in vec2 p ) {
    const float K1 = 0.366025404; // (sqrt(3)-1)/2;
    const float K2 = 0.211324865; // (3-sqrt(3))/6;
	vec2 i = floor(p + (p.x+p.y)*K1);	
    vec2 a = p - i + (i.x+i.y)*K2;
    vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0); //vec2 of = 0.5 + 0.5*vec2(sign(a.x-a.y), sign(a.y-a.x));
    vec2 b = a - o + K2;
	vec2 c = a - 1.0 + 2.0*K2;
    vec3 h = max(0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );
	vec3 n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));
    return dot(n, vec3(70.0));	
}

float FBM(vec2 p, float frequency, float amplitude, float freq_inc, float amplitude_mult)
{
    const int numOctaves = 5;

    float val = 0.0;

    vec2 pos = p; 
    
    for (int i = 0; i < numOctaves; i++)
    {
        pos *= frequency;
        val += amplitude*noise(pos);

        frequency += freq_inc;
        amplitude *= amplitude_mult;
    }

    return val;
}


// ---- COLOR RAMP ----
vec3 sunColor(float t) {
    vec3 deepRed   = vec3(0.9, 0.2, 0.0);
    vec3 orange    = vec3(1.0, 0.5, 0.0);
    vec3 yellow    = vec3(1.0, 0.9, 0.3);
    vec3 whiteHot  = vec3(1.0, 1.0, 1.0);

    t = clamp(t, 0.0, 1.0);

    if (t < 0.33)
        return mix(deepRed, orange, t / 0.33);
    else if (t < 0.66)
        return mix(orange, yellow, (t - 0.33) / 0.33);
    else
        return mix(yellow, whiteHot, (t - 0.66) / 0.34);
}

void main() {

    vec3 n = normalize(vNormal);

    // Use normal as UV
    // vec2 uv = n.xy * 3.0 + uTime * 0.005;
    vec2 uv = vPos.xy + vPos.z;
    
    // Turbulence
    float f = FBM(uv, 1.5, 0.6, 1.2, 0.5);

    vec3 color;
    if (f < 0.1){
        color = vec3(0.0, 0.3, 0.7);
    }
    else{
        color = vec3(0.6, 0.7, 0.1);
    }

    gl_FragColor = vec4(color, 1.0);
    // gl_FragColor = vec4(0.0, uv.y, uv.x, 1.0);
}
