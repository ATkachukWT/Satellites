import{a as l}from"./chunk-VGAXEXH3.js";import{b as s}from"./chunk-HMNTGQTR.js";import{a}from"./chunk-GVSOJUIP.js";import{a as i}from"./chunk-HUUJBVXR.js";import{a as c}from"./chunk-A45BLB26.js";import{a as r}from"./chunk-47NSYSFY.js";import{a as e}from"./chunk-RWCIDBNQ.js";function f(v){let o=new c,{vertex:n,fragment:d}=o;s(n,v),n.uniforms.add(new i("width",t=>t.width)),o.attributes.add(e.POSITION,"vec3"),o.attributes.add(e.NORMAL,"vec3"),o.attributes.add(e.UV0,"vec2"),o.attributes.add(e.LENGTH,"float"),o.varyings.add("vtc","vec2"),o.varyings.add("vlength","float"),o.varyings.add("vradius","float"),n.main.add(r`vec3 bitangent = normal;
vtc = uv0;
vlength = length;
vradius = 0.5 * width;
vec4 pos = view * vec4(position + vradius * bitangent * uv0.y, 1.0);
gl_Position = proj * pos;`),d.uniforms.add(new i("outlineSize",t=>t.outlineSize),new a("outlineColor",t=>t.outlineColor),new i("stripeLength",t=>t.stripeLength),new a("stripeEvenColor",t=>t.stripeEvenColor),new a("stripeOddColor",t=>t.stripeOddColor));let u=1/Math.sqrt(2);return d.code.add(r`
    const float INV_SQRT2 = ${r.float(u)};

    vec4 arrowColor(vec2 tc, float len) {
      float d = INV_SQRT2 * (tc.x - abs(tc.y));
      d = min(d, INV_SQRT2 * (len - tc.x - abs(tc.y)));
      d = min(d, 1.0 - abs(tc.y));

      if (d < 0.0) {
        return vec4(0.0);
      }
      if (d < outlineSize) {
        return outlineColor;
      }
      return fract(0.5 / stripeLength * tc.x * vradius) >= 0.5 ? stripeOddColor : stripeEvenColor;
    }`),d.main.add(r`
    vec2 ntc = vec2(vtc.x / vradius, vtc.y);
    vec4 color = arrowColor(ntc, vlength / vradius);
    if (color.a < ${r.float(l)}) {
      discard;
    }
    fragColor = color;`),o}var y=Object.freeze(Object.defineProperty({__proto__:null,build:f},Symbol.toStringTag,{value:"Module"}));export{f as a,y as b};
