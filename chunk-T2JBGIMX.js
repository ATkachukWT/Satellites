import{a as T}from"./chunk-BYYGFX6P.js";import{a as x,b as m}from"./chunk-CMKJEBQJ.js";import{a as z}from"./chunk-YVCKQBWT.js";import{a as v}from"./chunk-4XEE5PE3.js";import{a as g}from"./chunk-GVSOJUIP.js";import{a as C}from"./chunk-L7NOU4T2.js";import{a as s}from"./chunk-HUUJBVXR.js";import{a as b}from"./chunk-4LDVFWME.js";import{a as w}from"./chunk-A45BLB26.js";import{a as i}from"./chunk-47NSYSFY.js";import{b as f,c as S}from"./chunk-PTZYZULI.js";import{a as d}from"./chunk-QGVBCWUY.js";var o;(function(e){e[e.Gradient=0]="Gradient",e[e.Threshold=1]="Threshold",e[e.COUNT=2]="COUNT"})(o||(o={}));var n=class extends x{constructor(){super(...arguments),this.visualization=o.Gradient,this.bandsEnabled=!1}};d([m({count:o.COUNT})],n.prototype,"visualization",void 0),d([m()],n.prototype,"bandsEnabled",void 0);var p=class extends C{constructor(t){super(),this._data=t,this.sampleScale=0,this.opacityFromElevation=1,this.color=f(y),this.bandSize=.1,this.threshold=.5}get shadowCastMap(){return this._data.shadowCastTexture}},y=S(.01,0,.25,1);function P(e){let t=new w,r=t.fragment;t.include(z),t.include(v);let{visualization:u,bandsEnabled:c}=e;r.constants.add("inverseSampleValue","float",T),r.uniforms.add(new b("shadowCastMap",a=>a.shadowCastMap),new s("sampleScale",a=>a.sampleScale),new s("opacityFromElevation",a=>a.opacityFromElevation),new g("uColor",a=>a.color));let l=u===o.Gradient,h=u===o.Threshold;return l&&c?r.uniforms.add(new s("bandSize",a=>a.bandSize)):h&&r.uniforms.add(new s("threshold",a=>a.threshold)),r.main.add(i`
    float record = texture(shadowCastMap, uv).r;
    float pixelSamples = record * inverseSampleValue;

    fragColor = vec4(0.0);
    if (pixelSamples < 1.0) {
      return;
    }

    float strength = pixelSamples * sampleScale;
    ${h?i`if (strength <= threshold) return;`:""}
    ${l&&c?i`strength = ceil(strength / bandSize) * bandSize;`:""}
    fragColor = vec4(uColor.xyz, uColor.a * opacityFromElevation ${l?"* strength":""});
  `),t}var k=Object.freeze(Object.defineProperty({__proto__:null,ShadowCastVisualizePassParameters:p,build:P},Symbol.toStringTag,{value:"Module"}));export{n as a,p as b,P as c,k as d};
