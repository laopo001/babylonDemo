precision highp float;

varying vec2 vUV;
varying vec3 vPosition;
// Refs
uniform sampler2D textureSampler;
uniform float time;

void main(void) {
    vec4 color = texture2D(textureSampler, vUV).rgba;
    if(color.a<0.6){
        discard;
    }
    if(vUV.x>time){
        discard;
    }
    gl_FragColor =  vec4(color.rgb*time,1);
}