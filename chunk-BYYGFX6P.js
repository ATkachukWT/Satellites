import{a as f}from"./chunk-B7E6TWPE.js";import{b as u}from"./chunk-Y7XG5IWW.js";import{a as h}from"./chunk-YVCKQBWT.js";import{a as l}from"./chunk-4XEE5PE3.js";import{a as o}from"./chunk-ELCBU4NP.js";import{a as c}from"./chunk-2CKJLDTO.js";import{a as m}from"./chunk-A45BLB26.js";import{a as d}from"./chunk-WVKBXQWE.js";import{a as n}from"./chunk-SOEEM7Z7.js";import{a as p}from"./chunk-47NSYSFY.js";import{a as s}from"./chunk-ALWV3RJ2.js";import{f as r,h as i}from"./chunk-ZTOZWLEE.js";var v=255,x=1/v;function S(){let e=new m,t=e.fragment;return t.include(d),t.include(c),e.include(h),e.include(l),e.include(u,M),t.uniforms.add(new o("shadowMap",a=>a.shadowMap.depthTexture),new o("depthMap",a=>a.depth?.attachment),new n("inverseViewMatrix",a=>r(w,i(w,a.camera.viewMatrix,a.camera.center)))),t.constants.add("sampleValue","float",x),e.outputs.add("sampleCount","float"),t.main.add(p`sampleCount = 0.0;
float depth = depthFromTexture(depthMap, uv);
if (depth >= 1.0 || depth <= 0.0) {
return;
}
float currentPixelDepth = linearizeDepth(depth);
vec4 currentPixelPos = vec4(reconstructPosition(gl_FragCoord.xy, currentPixelDepth), 1.0);
vec4 worldSpacePos = inverseViewMatrix * currentPixelPos;
mat4 shadowMatrix;
float linearDepth = -currentPixelDepth;
int i = chooseCascade(linearDepth, shadowMatrix);
if (i >= numCascades) {
return;
}
vec3 lvpos = lightSpacePosition(worldSpacePos.xyz, shadowMatrix);
if (lvpos.z >= 1.0 || lvpos.x < 0.0 || lvpos.x > 1.0 || lvpos.y < 0.0 || lvpos.y > 1.0) {
return;
}
ivec2 texSize = textureSize(shadowMap, 0);
ivec2 uvShadow = ivec2(cascadeCoordinates(i, texSize, lvpos) * vec2(texSize));
float depthShadow = readShadowMapDepth(uvShadow, shadowMap);
bool shadow = depthShadow < lvpos.z;
if (shadow) {
sampleCount = sampleValue;
}`),e}var w=s(),M=new f,F=Object.freeze(Object.defineProperty({__proto__:null,ShadowCastMaxSamples:v,build:S},Symbol.toStringTag,{value:"Module"}));export{v as a,S as b,F as c};
