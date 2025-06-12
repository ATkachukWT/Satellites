import{a as u}from"./chunk-ASTIHUEJ.js";import{a as h}from"./chunk-P5PR77YK.js";import{a as g}from"./chunk-5KY2RG7F.js";import{a as d}from"./chunk-XQ4DD6H6.js";import{a as p}from"./chunk-GWSX6PRO.js";import{a as f}from"./chunk-ELCBU4NP.js";import{a as s}from"./chunk-L7NOU4T2.js";import{a as c}from"./chunk-2CKJLDTO.js";import{a as o}from"./chunk-HUUJBVXR.js";import{a as l}from"./chunk-A45BLB26.js";import{a as i}from"./chunk-T7PUQGWM.js";import{a as t}from"./chunk-47NSYSFY.js";import{a as n}from"./chunk-BOVYXYHK.js";var m=class extends s{constructor(){super(...arguments),this.color=n(),this.strength=4e-6,this.atmosphereC=1,this.amount=0}};function S(){let a=new l;a.include(u,{needUVs:!0,needEyeDirection:!0});let r=a.fragment;return r.uniforms.add(new o("atmosphereC",e=>e.atmosphereC),new p("cameraPosition",e=>e.camera.eye),new f("depthTexture",e=>e.mainDepth),new o("fogStrength",e=>e.strength),new o("fogAmount",e=>e.amount),new i("fogColor",e=>e.color)),a.include(d),r.include(h),r.include(g),r.include(c),r.code.add(t`float getFogAmount(float dist, vec3 rayDir) {
if(dist == -1.0){
dist = 0.055 * sphereIntersect(cameraPosition, rayDir, atmosphereC).y;
}
return fogAmount * (1.0 - exp(-dist * fogStrength));
}`),r.main.add(t`vec3 rayDir = normalize(worldRay);
float terrainDepth = -1.0;
float depthSample = depthFromTexture(depthTexture, uv);
if(depthSample < 1.0 && depthSample > 0.0){
vec3 cameraSpaceRay = normalize(eyeDir);
cameraSpaceRay /= cameraSpaceRay.z;
cameraSpaceRay *= linearizeDepth(depthSample);;
terrainDepth = max(0.0, length(cameraSpaceRay));
}
float fogAmount = getFogAmount(terrainDepth, rayDir);
vec4 fog = vec4(fogColor, 1.0) * fogAmount;
fragColor = delinearizeGamma(vec4(tonemapACES(fog.rgb), fog.a));`),a}var U=Object.freeze(Object.defineProperty({__proto__:null,FogPassParameters:m,build:S},Symbol.toStringTag,{value:"Module"}));export{m as a,S as b,U as c};
