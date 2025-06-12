import{a as c}from"./chunk-CUV3BSEW.js";import{a as d}from"./chunk-6FI5AY7X.js";import{a as v}from"./chunk-VGAXEXH3.js";import{a as u}from"./chunk-YEPHAEAY.js";import{c as n}from"./chunk-76X7RFM4.js";import{b as p}from"./chunk-HMNTGQTR.js";import{a as f}from"./chunk-GVSOJUIP.js";import{a as g}from"./chunk-HUUJBVXR.js";import{a as C}from"./chunk-A45BLB26.js";import{a as l,h as m}from"./chunk-YEXMIDOT.js";import{a as t}from"./chunk-47NSYSFY.js";import{a as s}from"./chunk-RWCIDBNQ.js";function O(o){let r=new C,{vertex:e,fragment:a}=r;return r.include(d,o),r.include(c,o),p(e,o),r.attributes.add(s.POSITION,"vec3"),r.varyings.add("vpos","vec3"),e.main.add(t`vpos = position;
forwardNormalizedVertexColor();
gl_Position = transformPosition(proj, view, vpos);`),r.include(u,o),r.fragment.include(n,o),a.uniforms.add(new g("alphaCoverage",(i,h)=>Math.min(1,i.width*h.camera.pixelRatio))),o.hasVertexColors||a.uniforms.add(new f("constantColor",i=>i.color)),a.main.add(t`
    discardBySlice(vpos);

    vec4 color = ${o.hasVertexColors?"vColor":"constantColor"};

    ${o.output===l.ObjectAndLayerIdColor?"color.a = 1.0;":""}

    if (color.a < ${t.float(v)}) {
      discard;
    }

    ${m(o.output)?t`fragColor = applySlice(color, vpos);`:""}
    calculateOcclusionAndOutputHighlight();
  `),r}var N=Object.freeze(Object.defineProperty({__proto__:null,build:O},Symbol.toStringTag,{value:"Module"}));export{O as a,N as b};
