import{a as t}from"./chunk-SOEEM7Z7.js";import{a as v,b as i}from"./chunk-47NSYSFY.js";import{a as c}from"./chunk-ALWV3RJ2.js";import{a as s}from"./chunk-RWCIDBNQ.js";import{e as n}from"./chunk-ZTOZWLEE.js";function V(e,d={needUVs:!0,needEyeDirection:!0}){e.attributes.add(s.POSITION,"vec2"),e.varyings.add("worldRay","vec3");let{needUVs:o,needEyeDirection:a}=d;o&&e.varyings.add("uv","vec2"),a&&e.varyings.add("eyeDir","vec3"),e.vertex.uniforms.add(new t("inverseProjectionMatrix",r=>r.camera.inverseProjectionMatrix),new t("inverseViewMatrix",r=>n(m,r.camera.viewMatrix))),e.vertex.main.add(v`
    vec3 posViewNear = (inverseProjectionMatrix * vec4(position, -1.0, 1.0)).xyz;
    ${i(a,"eyeDir = posViewNear;")}
    worldRay = (inverseViewMatrix * vec4(posViewNear, 0)).xyz;
    ${i(o,"uv = position * 0.5 + vec2(0.5);")}
    gl_Position = vec4(position, 1, 1);
  `)}var m=c();export{V as a};
