import{a as m}from"./chunk-CSFAHB4Y.js";import{a as f}from"./chunk-2PJRHNJW.js";import{a as c}from"./chunk-B2RVSTL3.js";import{a as p}from"./chunk-A45BLB26.js";import{a as i}from"./chunk-47NSYSFY.js";import{a as s}from"./chunk-ALWV3RJ2.js";import{a as o}from"./chunk-RWCIDBNQ.js";import{a as n,g as r}from"./chunk-ZTOZWLEE.js";function d(){let a=new p;return a.attributes.add(o.POSITION,"vec3"),a.attributes.add(o.COLOR,"vec4"),a.attributes.add(o.SIZE,"float"),a.varyings.add("vcolor","vec4"),a.varyings.add("vsize","float"),a.vertex.uniforms.add(new m("transform",(t,l)=>v(t,l)),new f("viewport",t=>t.camera.fullViewport),new c("pixelRatio",t=>t.camera.pixelRatio)),a.vertex.main.add(i`gl_Position = transform * vec4(position, 0);
vcolor = color / 1.2;
vsize = size * 5.0 * pixelRatio;
gl_PointSize = vsize;`),a.fragment.main.add(i`float cap = 0.7;
float scale = 1.0 / cap;
float helper = clamp(length(abs(gl_PointCoord - vec2(0.5))), 0.0, cap);
float alpha = clamp((cap - helper) * scale, 0.0, 1.0);
float intensity = alpha * alpha * alpha;
if (vsize < 3.0) {
intensity *= 0.5;
}
fragColor = vec4(vcolor.xyz, intensity);`),a}function v(a,t){return n(e,t.camera.projectionMatrix),e[10]=24e-8-1,e[11]=-1,e[14]=(24e-8-2)*t.camera.near,r(e,e,t.camera.viewMatrix),r(e,e,a.modelMatrix)}var e=s(),S=Object.freeze(Object.defineProperty({__proto__:null,build:d},Symbol.toStringTag,{value:"Module"}));export{d as a,S as b};
