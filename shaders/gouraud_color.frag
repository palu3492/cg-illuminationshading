#version 300 es

precision mediump float;

in vec3 ambient; // Ia
in vec3 diffuse; // Ip * dot(N, L)
in vec3 specular; // Ip * dot(R, V)^n

uniform vec3 material_color;    // Ka and Kd
uniform vec3 material_specular; // Ks

out vec4 FragColor;

void main() {

    vec3 ambientNew = ambient*material_color;
    vec3 ambientClamped = clamp(ambientNew, vec3 (0.0,0.0,0.0), vec3 (1.0,1.0,1.0));

    vec3 diffuseNew = diffuse*material_color;
    vec3 diffuseClamped = clamp(diffuseNew, vec3 (0.0,0.0,0.0), vec3 (1.0,1.0,1.0));

    // is specular supposed to be multipled by material_specular?
    vec3 specularNew = specular*material_specular;
    vec3 specularClamped = clamp(specularNew, vec3 (0.0,0.0,0.0), vec3 (1.0,1.0,1.0));

    vec3 illumination = ambientClamped + diffuseClamped + specularClamped;
    vec3 clamped = clamp(illumination, vec3 (0.0,0.0,0.0), vec3 (1.0,1.0,1.0));
    FragColor = vec4(illumination, 1.0);
}
