import{a as x}from"./chunk-OX3SXBYL.js";import{a as m}from"./chunk-L7NOU4T2.js";import{a as y}from"./chunk-WOZSH7YY.js";import{a as n}from"./chunk-HUUJBVXR.js";import{a as h}from"./chunk-4LDVFWME.js";import{a as C}from"./chunk-T7PUQGWM.js";import{a as c}from"./chunk-47NSYSFY.js";import{a as v}from"./chunk-RWCIDBNQ.js";import{f as L}from"./chunk-EM35R6FY.js";var O=class extends m{constructor(){super(...arguments),this.scale=1,this.offset=L}};function I(o){o.attributes.add(v.POSITION,"vec2"),o.attributes.add(v.UV0,"vec2"),o.varyings.add("uv","vec2"),o.varyings.add("vuv","vec2"),o.vertex.uniforms.add(new n("scale",l=>l.scale),new y("offset",l=>l.offset)),o.vertex.main.add(c`gl_Position = vec4(position, 0.0, 1.0);
uv = uv0 * scale + offset;
vuv = uv0;`)}var t;(function(o){o[o.Composite=0]="Composite",o[o.ColorComposite=1]="ColorComposite",o[o.GridComposite=2]="GridComposite",o[o.GroupBackgroundComposite=3]="GroupBackgroundComposite",o[o.COUNT=4]="COUNT"})(t||(t={}));var e;(function(o){o[o.Normal=0]="Normal",o[o.Average=1]="Average",o[o.Lighten=2]="Lighten",o[o.Lighter=3]="Lighter",o[o.Plus=4]="Plus",o[o.Screen=5]="Screen",o[o.ColorDodge=6]="ColorDodge",o[o.Darken=7]="Darken",o[o.Multiply=8]="Multiply",o[o.ColorBurn=9]="ColorBurn",o[o.Overlay=10]="Overlay",o[o.SoftLight=11]="SoftLight",o[o.HardLight=12]="HardLight",o[o.VividLight=13]="VividLight",o[o.Hue=14]="Hue",o[o.Saturation=15]="Saturation",o[o.Luminosity=16]="Luminosity",o[o.Color=17]="Color",o[o.DestinationOver=18]="DestinationOver",o[o.DestinationAtop=19]="DestinationAtop",o[o.DestinationIn=20]="DestinationIn",o[o.DestinationOut=21]="DestinationOut",o[o.SourceAtop=22]="SourceAtop",o[o.SourceIn=23]="SourceIn",o[o.SourceOut=24]="SourceOut",o[o.Xor=25]="Xor",o[o.Difference=26]="Difference",o[o.Exclusion=27]="Exclusion",o[o.Minus=28]="Minus",o[o.Invert=29]="Invert",o[o.Reflect=30]="Reflect",o[o.COUNT=31]="COUNT"})(e||(e={}));var V={normal:e.Normal,average:e.Average,lighten:e.Lighten,lighter:e.Lighter,screen:e.Screen,plus:e.Plus,"color-dodge":e.ColorDodge,darken:e.Darken,multiply:e.Multiply,"color-burn":e.ColorBurn,overlay:e.Overlay,"soft-light":e.SoftLight,"hard-light":e.HardLight,"vivid-light":e.VividLight,hue:e.Hue,saturation:e.Saturation,luminosity:e.Luminosity,color:e.Color,difference:e.Difference,exclusion:e.Exclusion,minus:e.Minus,invert:e.Invert,reflect:e.Reflect,"destination-over":e.DestinationOver,"destination-atop":e.DestinationAtop,"destination-in":e.DestinationIn,"destination-out":e.DestinationOut,"source-atop":e.SourceAtop,"source-in":e.SourceIn,"source-out":e.SourceOut,xor:e.Xor};function H(o){return o===e.DestinationOver||o===e.DestinationAtop||o===e.DestinationIn||o===e.DestinationOut||o===e.SourceAtop||o===e.SourceIn||o===e.SourceOut||o===e.Xor}var b;(function(o){o[o.NotRequired=0]="NotRequired",o[o.Required=1]="Required",o[o.COUNT=2]="COUNT"})(b||(b={}));var u;(function(o){o[o.Off=0]="Off",o[o.On=1]="On",o[o.COUNT=2]="COUNT"})(u||(u={}));function S(o,l){let r=l.blendMode;r!==e.Normal&&(r===e.Reflect&&o.code.add(c`float reflectBlend(in float cb, in float cl) {
return (cl == 1.0) ? cl : min(cb * cb / (1.0 - cl), 1.0);
}`),r!==e.ColorDodge&&r!==e.VividLight||o.code.add(c`float colorDodge(in float cb, in float cl) {
return (cb == 0.0) ? 0.0 : (cl == 1.0) ? 1.0 : min(1.0, cb / (1.0 - cl));
}`),r!==e.ColorBurn&&r!==e.VividLight||o.code.add(c`float colorBurn(in float cb, in float cl) {
return (cb == 1.0) ? 1.0 : (cl == 0.0) ? 0.0 : 1.0 - min(1.0, (1.0 - cb) / cl);
}`),r===e.Overlay&&o.code.add(c`float overlay(in float cb, in float cl) {
return (1.0 - step(0.5, cl)) * (1.0 - 2.0 * (1.0 - cl ) * (1.0 - cb)) + step(0.5, cl) * (2.0 * cl * cb);
}`),r===e.HardLight&&o.code.add(c`float hardLight(in float cb, in float cl) {
return (1.0 - step(0.5, cl)) * (2.0 * cl * cb) + step(0.5, cl) * (1.0 - 2.0 * (1.0 - cl) * (1.0 - cb));
}`),r===e.SoftLight&&o.code.add(c`float softLight(in float cb, in float cl) {
if (cl <= 0.5) {
return cb - (1.0 - 2.0 * cl) * cb * (1.0 - cb);
}
if (cb <= 0.25) {
return cb + (2.0 * cl - 1.0) * cb * ((16.0 * cb - 12.0) * cb + 3.0);
}
return cb + (2.0 * cl - 1.0) * (sqrt(cb) - cb);
}`),r===e.VividLight&&o.code.add(c`float vividLight(in float cb, in float cl) {
return (1.0 - step(0.5, cl)) * colorBurn(cb, 2.0 * cl) + step(0.5, cl) * colorDodge(cb, (2.0 * (cl - 0.5)));
}`),r!==e.Hue&&r!==e.Saturation&&r!==e.Color&&r!==e.Luminosity||(o.code.add(c`float minv3(in vec3 c) {
return min(min(c.r, c.g), c.b);
}
float maxv3(in vec3 c) {
return max(max(c.r, c.g), c.b);
}
float lumv3(in vec3 c) {
return dot(c, vec3(0.3, 0.59, 0.11));
}
vec3 clipColor(vec3 color) {
float lum = lumv3(color);
float mincol = minv3(color);
float maxcol = maxv3(color);
if (mincol < 0.0) {
color = lum + ((color - lum) * lum) / (lum - mincol);
}
if (maxcol > 1.0) {
color = lum + ((color - lum) * (1.0 - lum)) / (maxcol - lum);
}
return color;
}
vec3 setLum(vec3 cbase, vec3 clum) {
return clipColor(cbase + vec3(lumv3(clum) - lumv3(cbase)));
}`),r!==e.Hue&&r!==e.Saturation||o.code.add(c`float satv3(vec3 c) {
return maxv3(c) - minv3(c);
}
vec3 setLumSat(vec3 cbase, vec3 csat, vec3 clum)
{
float minbase = minv3(cbase);
float sbase = satv3(cbase);
float ssat = satv3(csat);
return setLum(sbase > 0.0 ? (cbase - minbase) * ssat / sbase : vec3(0.0), clum);
}`)),o.code.add(c`
    vec4 applyBlendMode(vec3 cl, float ol, vec3 cb, float ob) {
      ${r===e.Multiply?c`return vec4(cl * ol * cb * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:r===e.Average?c`return vec4((cb + cl) * 0.5 * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:r===e.Lighten?c`return vec4(max(cb, cl) * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:r===e.Darken?c`return vec4(min(cl, cb) * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:r===e.Lighter?c`return vec4(cl * ol + cb * ob, ol + ob);`:r===e.Plus?c`return clamp(vec4(cl.rgb + cb.rgb, ol + ob), 0.0, 1.0);`:r===e.Minus?c`return vec4(clamp(vec3(cb.rgb - cl.rgb), 0.0, 1.0), ob * ol);`:r===e.Screen?c`return vec4((cl + cb - cl * cb) * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:r===e.Difference?c`return vec4(abs(cb - cl) * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:r===e.Invert?c`return vec4((1.0 - cb) * ol * ob + cb * ob * (1.0 - ol), ob);`:r===e.DestinationOver?c`return vec4(cl * ol * (1.0 - ob) + cb * ob, ol + ob - ol * ob);`:r===e.DestinationAtop?c`return vec4(cl * ol * (1.0 - ob) + cb * ob * ol, ol);`:r===e.DestinationOut?c`return vec4(cb * ob * (1.0 - ol), ob * (1.0 - ol));`:r===e.SourceAtop?c`return vec4(cl * ol * ob + cb * ob * (1.0 - ol), ob);`:r===e.SourceOut?c`return vec4(cl * ol * (1.0 - ob), ol * (1.0 - ob));`:r===e.Xor?c`return vec4(cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), ol * (1.0 - ob) + ob * (1.0 - ol));`:r===e.DestinationIn?c`return vec4(cb * ob * ol, ol * ob);`:r===e.SourceIn?c`return vec4(cl * ol * ob, ol * ob);`:r===e.Hue?c`
          vec3 f = setLumSat(cl, cb, cb);
          return vec4(f * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:r===e.Saturation?c`
          vec3 f = setLumSat(cb, cl, cb);
          return vec4(f * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:r===e.Color?c`
          vec3 f = setLum(cl, cb);
          return vec4(f * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:r===e.Luminosity?c`
          vec3 f = setLum(cb, cl);
          return vec4(f * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:r===e.Exclusion?c`
          vec3 f = cl + cb - 2.0 * cl * cb;
          return vec4(f * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:r===e.Reflect?c`
          vec3 f = vec3(reflectBlend(cb.r, cl.r), reflectBlend(cb.g, cl.g), reflectBlend(cb.b, cl.b));
          return vec4(f * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:r===e.ColorDodge?c`
          vec3 f = vec3(colorDodge(cb.r, cl.r), colorDodge(cb.g, cl.g), colorDodge(cb.b, cl.b));
          return vec4(f * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:r===e.ColorBurn?c`
          vec3 f = vec3(colorBurn(cb.r, cl.r), colorBurn(cb.g, cl.g), colorBurn(cb.b, cl.b));
          return vec4(f * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:r===e.Overlay?c`
          vec3 f = vec3(overlay(cb.r, cl.r), overlay(cb.g, cl.g), overlay(cb.b, cl.b));
          return vec4(f * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:r===e.SoftLight?c`
          vec3 f = vec3(softLight(cb.r, cl.r), softLight(cb.g, cl.g), softLight(cb.b, cl.b));
          return vec4(f * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:r===e.HardLight?c`
          vec3 f = vec3(hardLight(cb.r, cl.r), hardLight(cb.g, cl.g), hardLight(cb.b, cl.b));
          return vec4(f * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:r===e.VividLight?c`
          vec3 f = vec3(vividLight(cb.r, cl.r), vividLight(cb.g, cl.g), vividLight(cb.b, cl.b));
          return vec4(f * ol * ob + cl * ol * (1.0 - ob) + cb * ob * (1.0 - ol), mix(ob, 1.0, ol));`:c``}
    }
  `))}function ro(o,l){let r=l.output===t.GridComposite,d=l.output===t.ColorComposite,f=l.output===t.GroupBackgroundComposite,g=l.output===t.Composite,s=l.baseOpacityMode===b.Required,i=o.fragment;s&&i.uniforms.add(new n("baseOpacity",a=>a.baseOpacity)),r?i.include(x):d?i.uniforms.add(new C("backgroundColor",a=>a.backgroundColor)):g&&i.uniforms.add(new h("fboColor",a=>a.fboTexture));let p=l.blendMode!==e.Normal,D=l.premultipliedSource===u.On,B=!p&&!D&&(g&&!s||f);i.include(S,l),i.code.add(c`
    vec4 getBackground(vec2 uv) {
      return ${s?c`baseOpacity *`:""} ${f?c`vec4(0.0, 0.0, 0.0, 0.0)`:d?c`vec4(backgroundColor, 1.0)`:r?c`vec4(gridColor(uv), 1.0)`:c`texelFetch(fboColor, ivec2(gl_FragCoord.xy), 0)`};
    }

    vec4 blendLayers(vec2 bgUV, vec4 colorLayer, float opacity) {
      ${p?c`
          vec3 cl = colorLayer.a == 0.0 ? colorLayer.rgb : colorLayer.rgb / colorLayer.a;
          vec4 bgColor = getBackground(bgUV);
          vec3 cb = bgColor.a == 0.0 ? bgColor.rgb : bgColor.rgb / bgColor.a;
          return applyBlendMode(clamp(cl, vec3(0.0), vec3(1.0)), colorLayer.a * opacity, cb, bgColor.a);`:c`
          float composeAlpha = colorLayer.a * opacity;
          ${B?c`return colorLayer * opacity;`:c`
            vec4 bgColor = getBackground(bgUV);
            return bgColor * (1.0 - composeAlpha) + colorLayer * opacity;`}`}
    }`)}export{O as a,I as b,e as c,V as d,H as e,b as f,t as g,u as h,ro as i};
