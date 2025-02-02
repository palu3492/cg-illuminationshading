#version 300 es

precision mediump float;

in vec3 ambient;
in vec3 diffuse[10];
in vec3 specular[10];
in vec2 frag_texcoord;

uniform vec3 material_color;    // Ka and Kd
uniform vec3 material_specular; // Ks
uniform sampler2D image;        // use in conjunction with Ka and Kd
uniform int light_count_frag;

out vec4 FragColor;

void main() {

    vec3 illumination;

    vec3 ambientNew = ambient*material_color*texture(image, frag_texcoord).rgb;
    vec3 ambientClamped = clamp(ambientNew, vec3 (0.0,0.0,0.0), vec3 (1.0,1.0,1.0));

    for(int i=0;i<light_count_frag;i++){
        vec3 diffuseNew = diffuse[i]*material_color*texture(image, frag_texcoord).rgb ;
        vec3 diffuseClamped = clamp(diffuseNew, vec3 (0.0,0.0,0.0), vec3 (1.0,1.0,1.0));

        vec3 specularNew = specular[i]*material_specular;
        vec3 specularClamped = clamp(specularNew, vec3 (0.0,0.0,0.0), vec3 (1.0,1.0,1.0));

        illumination += diffuseClamped + specularClamped;
    }
    illumination += ambientClamped;

    vec3 clamped = clamp(illumination, vec3 (0.0,0.0,0.0), vec3 (1.0,1.0,1.0));

    FragColor = vec4(clamped, 1.0);
}
