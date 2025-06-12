import{a as f}from"./chunk-CUV3BSEW.js";import{a as p}from"./chunk-6FI5AY7X.js";import{b as O}from"./chunk-7GUYYJRR.js";import{a as c}from"./chunk-422PSKZ7.js";import{a as C}from"./chunk-SFANISLX.js";import{a as g}from"./chunk-GSXOR3JU.js";import{a as w}from"./chunk-55OTJIMU.js";import{c as m}from"./chunk-76X7RFM4.js";import{b as u}from"./chunk-HMNTGQTR.js";import{a as v}from"./chunk-GVSOJUIP.js";import{a as b}from"./chunk-A45BLB26.js";import{a}from"./chunk-47NSYSFY.js";import{a as t}from"./chunk-RWCIDBNQ.js";function V(o){let r=new b,{vertex:e,fragment:i,attributes:l,varyings:s}=r,{vvColor:d,hasVertexColors:n}=o;return u(e,o),r.include(p,o),r.include(f,o),r.include(c,o),r.include(C,o),i.include(m,o),r.include(O,o),r.include(g,o),l.add(t.POSITION,"vec3"),d&&l.add(t.COLORFEATUREATTRIBUTE,"float"),n||s.add("vColor","vec4"),s.add("vpos","vec3"),e.uniforms.add(new v("uColor",h=>h.color)),e.main.add(a`
      vpos = position;
      forwardNormalizedVertexColor();
      forwardObjectAndLayerIdColor();

      ${n?"vColor *= uColor;":d?"vColor = uColor * interpolateVVColor(colorFeatureAttribute);":"vColor = uColor;"}
      forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
      gl_Position = transformPosition(proj, view, vpos);`),i.include(w),i.main.add(a`discardBySlice(vpos);
discardByTerrainDepth();
outputColorHighlightOID(vColor, vpos);`),r}var E=Object.freeze(Object.defineProperty({__proto__:null,build:V},Symbol.toStringTag,{value:"Module"}));export{V as a,E as b};
