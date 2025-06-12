import{b as u}from"./chunk-2IWALBQY.js";import{a as T,c as x}from"./chunk-WS4AMEGN.js";import{a as g}from"./chunk-WOZSH7YY.js";import{a as c}from"./chunk-4LDVFWME.js";import{a as l}from"./chunk-MVDZB4AK.js";import{a as i}from"./chunk-FGEB67EG.js";import{a as r}from"./chunk-47NSYSFY.js";import{a as d}from"./chunk-QXNVQZT7.js";import{d as s}from"./chunk-DEH76MSI.js";import{a as m}from"./chunk-RWCIDBNQ.js";import{g as o}from"./chunk-EM35R6FY.js";function C(n,a){let e=n.fragment;a.hasVertexTangents?(n.attributes.add(m.TANGENT,"vec4"),n.varyings.add("vTangent","vec4"),a.doubleSidedMode===u.WindingOrder?e.code.add(r`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`):e.code.add(r`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = vTangent.w;
vec3 tangent = normalize(vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`)):e.code.add(r`mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {
vec3 Q1 = dFdx(pos);
vec3 Q2 = dFdy(pos);
vec2 stx = dFdx(st);
vec2 sty = dFdy(st);
float det = stx.t * sty.s - sty.t * stx.s;
vec3 T = stx.t * Q2 - sty.t * Q1;
T = T - normal * dot(normal, T);
T *= inversesqrt(max(dot(T,T), 1.e-10));
vec3 B = sign(det) * cross(normal, T);
return mat3(T, B, normal);
}`),a.textureCoordinateType!==T.None&&(n.include(x,a),e.uniforms.add(a.bindType===d.Pass?new c("normalTexture",t=>t.textureNormal):new l("normalTexture",t=>t.textureNormal)),a.hasNormalTextureTransform&&(e.uniforms.add(new g("scale",t=>t.scale??o)),e.uniforms.add(new i("normalTextureTransformMatrix",t=>t.normalTextureTransformMatrix??s))),e.code.add(r`vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
vec3 rawNormal = textureLookup(normalTexture, uv).rgb * 2.0 - 1.0;`),a.hasNormalTextureTransform&&e.code.add(r`mat3 normalTextureRotation = mat3(normalTextureTransformMatrix[0][0]/scale[0], normalTextureTransformMatrix[0][1]/scale[1], 0.0,
normalTextureTransformMatrix[1][0]/scale[0], normalTextureTransformMatrix[1][1]/scale[1], 0.0,
0.0, 0.0, 0.0 );
rawNormal.xy = (normalTextureRotation * vec3(rawNormal.x, rawNormal.y, 1.0)).xy;`),e.code.add(r`return tangentSpace * rawNormal;
}`))}export{C as a};
