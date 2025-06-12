import{a as u}from"./chunk-6FI5AY7X.js";import{b as I}from"./chunk-7GUYYJRR.js";import{a as c}from"./chunk-SFANISLX.js";import{a as x}from"./chunk-GSXOR3JU.js";import{a as C}from"./chunk-55OTJIMU.js";import{c as f}from"./chunk-76X7RFM4.js";import{b as v}from"./chunk-HMNTGQTR.js";import{a as l}from"./chunk-L7NOU4T2.js";import{a as g}from"./chunk-HUUJBVXR.js";import{a as P}from"./chunk-4LDVFWME.js";import{a as b}from"./chunk-A45BLB26.js";import{a as p}from"./chunk-YEXMIDOT.js";import{a,b as i}from"./chunk-47NSYSFY.js";import{a as e}from"./chunk-RWCIDBNQ.js";var s=class extends l{};function w(r){let o=new b,{vertex:n,fragment:d}=o,{output:y,perspectiveInterpolation:m}=r;return v(n,r),o.include(u,r),o.include(x,r),o.fragment.include(f,r),o.include(c,r),o.include(I,r),o.attributes.add(e.POSITION,"vec3"),o.attributes.add(e.UV0,"vec2"),m&&o.attributes.add(e.PERSPECTIVEDIVIDE,"float"),n.main.add(a`
    vpos = position;
    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    vTexCoord = uv0;
    gl_Position = transformPosition(proj, view, vpos);
    ${i(m,"gl_Position *= perspectiveDivide;")}`),o.varyings.add("vpos","vec3"),o.varyings.add("vTexCoord","vec2"),d.include(C),d.uniforms.add(new g("opacity",t=>t.opacity),new P("tex",t=>t.texture)).main.add(a`
    discardBySlice(vpos);
    discardByTerrainDepth();
    ${i(y===p.ObjectAndLayerIdColor,"fragColor = vec4(0, 0, 0, 1); return;")}
    vec4 finalColor = texture(tex, vTexCoord) * opacity;
    outputColorHighlightOID(finalColor, vpos);`),o}var H=Object.freeze(Object.defineProperty({__proto__:null,ImageMaterialPassParameters:s,build:w},Symbol.toStringTag,{value:"Module"}));export{s as a,w as b,H as c};
