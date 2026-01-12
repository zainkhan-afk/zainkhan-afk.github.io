attribute vec3 aPosition;
attribute vec3 aNormal;

uniform mat4 uModelViewProjectionMatrix;
uniform mat3 uNormalMatrix;

varying vec3 vNormal;
varying vec3 vPos;

void main() {
    vNormal = normalize(uNormalMatrix * aNormal);
    vPos = aPosition;
    gl_Position = uModelViewProjectionMatrix * vec4(aPosition, 1.0);
}
