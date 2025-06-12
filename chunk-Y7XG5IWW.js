import{a as v,b as f}from"./chunk-X5NPIY3C.js";import{a as h}from"./chunk-ELCBU4NP.js";import{a as l}from"./chunk-GMZFCQJQ.js";import{a as m}from"./chunk-L7NOU4T2.js";import{a as x}from"./chunk-2PJRHNJW.js";import{a as n}from"./chunk-44A27HB7.js";import{a as d}from"./chunk-47NSYSFY.js";import{a as c}from"./chunk-QXNVQZT7.js";import{d as p}from"./chunk-ALWV3RJ2.js";import{a as i}from"./chunk-BOVYXYHK.js";var o=class extends n{constructor(s,a,t){super(s,"mat4",c.Draw,(M,S,g,D)=>M.setUniformMatrix4fv(s,a(S,g,D)),t)}};var r=class extends m{constructor(){super(...arguments),this.modelTransformation=p}},u=class extends r{constructor(){super(...arguments),this.origin=i()}};function N(e,s){s.receiveShadows&&(e.fragment.uniforms.add(new f("shadowMapMatrix",(a,t)=>t.shadowMap.getShadowMapMatrices(a.origin),4)),w(e))}function Y(e,s){s.receiveShadows&&(e.fragment.uniforms.add(new o("shadowMapMatrix",(a,t)=>t.shadowMap.getShadowMapMatrices(a.origin),4)),w(e))}function w(e){let s=e.fragment;s.include(v),s.uniforms.add(new h("shadowMap",a=>a.shadowMap.depthTexture),new l("numCascades",a=>a.shadowMap.numCascades),new x("cascadeDistances",a=>a.shadowMap.cascadeDistances)).code.add(d`int chooseCascade(float depth, out mat4 mat) {
vec4 distance = cascadeDistances;
int i = depth < distance[1] ? 0 : depth < distance[2] ? 1 : depth < distance[3] ? 2 : 3;
mat = i == 0 ? shadowMapMatrix[0] : i == 1 ? shadowMapMatrix[1] : i == 2 ? shadowMapMatrix[2] : shadowMapMatrix[3];
return i;
}
vec3 lightSpacePosition(vec3 _vpos, mat4 mat) {
vec4 lv = mat * vec4(_vpos, 1.0);
lv.xy /= lv.w;
return 0.5 * lv.xyz + vec3(0.5);
}
vec2 cascadeCoordinates(int i, ivec2 textureSize, vec3 lvpos) {
float xScale = float(textureSize.y) / float(textureSize.x);
return vec2((float(i) + lvpos.x) * xScale, lvpos.y);
}
float readShadowMapDepth(ivec2 uv, sampler2D _depthTex) {
return rgba4ToFloat(texelFetch(_depthTex, uv, 0));
}
float posIsInShadow(ivec2 uv, vec3 lvpos, sampler2D _depthTex) {
return readShadowMapDepth(uv, _depthTex) < lvpos.z ? 1.0 : 0.0;
}
float filterShadow(vec2 uv, vec3 lvpos, ivec2 texSize, sampler2D _depthTex) {
vec2 st = fract(uv * vec2(texSize) + vec2(0.5));
ivec2 base = ivec2(uv * vec2(texSize) - vec2(0.5));
float s00 = posIsInShadow(ivec2(base.x, base.y), lvpos, _depthTex);
float s10 = posIsInShadow(ivec2(base.x + 1, base.y), lvpos, _depthTex);
float s11 = posIsInShadow(ivec2(base.x + 1, base.y + 1), lvpos, _depthTex);
float s01 = posIsInShadow(ivec2(base.x, base.y + 1), lvpos, _depthTex);
return mix(mix(s00, s10, st.x), mix(s01, s11, st.x), st.y);
}
float readShadowMap(const in vec3 _vpos, float _linearDepth) {
mat4 mat;
int i = chooseCascade(_linearDepth, mat);
if (i >= numCascades) { return 0.0; }
vec3 lvpos = lightSpacePosition(_vpos, mat);
if (lvpos.z >= 1.0 || lvpos.x < 0.0 || lvpos.x > 1.0 || lvpos.y < 0.0 || lvpos.y > 1.0) { return 0.0; }
ivec2 size = textureSize(shadowMap, 0);
vec2 uv = cascadeCoordinates(i, size, lvpos);
return filterShadow(uv, lvpos, size, shadowMap);
}`)}export{u as a,N as b,Y as c};
