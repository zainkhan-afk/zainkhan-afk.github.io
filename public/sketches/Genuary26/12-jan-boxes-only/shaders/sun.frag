precision highp float;

// A custom uniform to control the color
uniform vec4 myColor;


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

void main() {
    vec2 uv = gl_FragCoord.xy; // u_resolution.xx;

    float val = FBM(uv, 0.01, 1.0, 1.0, 0.9);

    
    
    gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
}