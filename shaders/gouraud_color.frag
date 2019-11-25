#version 300 es

precision mediump float;
vec3 i;

in vec3 ambient; // Ia
in vec3 diffuse; // Ip * dot(N, L)
in vec3 specular; // Ip * dot(R, V)^n

uniform vec3 material_color;    // Ka and Kd
uniform vec3 material_specular; // Ks
uniform float time;

out vec4 FragColor;



void main() {
    i = ambient*material_color + diffuse*material_color + specular*material_specular;
    FragColor = vec4(i, 1.0);
}
