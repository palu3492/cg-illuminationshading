#version 300 es

precision highp float;

precision vec3 l;
precision vec3 r;
precision vec3 v;
precision vec3 vertNormal;


in vec3 vertex_position;
in vec3 vertex_normal;

uniform vec3 light_ambient;
uniform vec3 light_position;
uniform vec3 light_color;
uniform vec3 camera_position;
uniform float material_shininess; // n
uniform mat4 model_matrix;
uniform mat4 view_matrix;
uniform mat4 projection_matrix;

out vec3 ambient;
out vec3 diffuse;
out vec3 specular;

void main() {
    l = normalize(light_position - vertex_position);
    vertNormal = normalize(vertex_normal)


    v = normalize(camera_position - vertex_position);
    r = normalize(reflect(l,vertNormal))
    ambient = light_ambient;
    diffuse = light_color * (dot(vertNormal,l));
    specular = light_color * pow(dot(r, v), material_shininess)
    gl_Position = projection_matrix * view_matrix * model_matrix * vec4(vertex_position, 1.0);
}
