import{a as n}from"./chunk-4XEE5PE3.js";import{a as s}from"./chunk-ELCBU4NP.js";import{a}from"./chunk-L7NOU4T2.js";import{a as m}from"./chunk-4LDVFWME.js";import{a as i}from"./chunk-A45BLB26.js";import{a as o}from"./chunk-47NSYSFY.js";var t=class extends a{};function l(){let e=new i;return e.include(n),e.fragment.uniforms.add(new m("colorTexture",r=>r.color),new s("depthTexture",r=>r.mainDepth)),e.fragment.main.add(o`float depthSample = texture(depthTexture, uv).r;
if (depthSample != 1.0 ) {
fragColor = vec4(0);
return;
}
fragColor = texture(colorTexture, uv);`),e}var g=Object.freeze(Object.defineProperty({__proto__:null,AtmosphereCompositingPassParameters:t,build:l},Symbol.toStringTag,{value:"Module"}));export{t as a,l as b,g as c};
