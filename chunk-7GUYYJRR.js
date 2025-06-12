import{c as O}from"./chunk-WS4AMEGN.js";import{a as P}from"./chunk-55OTJIMU.js";import{a as p}from"./chunk-EM2AEAFS.js";import{a as h}from"./chunk-VGAXEXH3.js";import{a as E}from"./chunk-YEPHAEAY.js";import{a as T}from"./chunk-4LDVFWME.js";import{a as g}from"./chunk-MVDZB4AK.js";import{a as d,h as l,p as C}from"./chunk-YEXMIDOT.js";import{a as v}from"./chunk-GV3ZFCVD.js";import{a as x}from"./chunk-T7PUQGWM.js";import{a as e,b as r}from"./chunk-47NSYSFY.js";import{a as c}from"./chunk-QXNVQZT7.js";var f;(function(o){o[o.None=0]="None",o[o.Value=1]="Value",o[o.Texture=2]="Texture",o[o.COUNT=3]="COUNT"})(f||(f={}));function $(o,s){if(!l(s.output))return;let{emissionSource:n,hasEmissiveTextureTransform:m,bindType:t}=s,a=n===f.Texture;a&&(o.include(O,s),o.fragment.uniforms.add(t===c.Pass?new T("texEmission",i=>i.textureEmissive):new g("texEmission",i=>i.textureEmissive)));let u=n===f.Value||a;u&&o.fragment.uniforms.add(t===c.Pass?new x("emissionFactor",i=>i.emissiveFactor):new v("emissionFactor",i=>i.emissiveFactor)),o.fragment.code.add(e`
    vec4 getEmissions() {
      vec4 emissions = ${u?"vec4(emissionFactor, 1.0)":"vec4(0.0)"};
      ${r(a,`emissions *= textureLookup(texEmission, ${m?"emissiveUV":"vuv0"});
         emissions.w = emissions.rgb == vec3(0.0) ? 0.0: emissions.w;`)}
      return emissions;
    }
  `)}function q(o,s){o.include(E,s),o.include($,s),o.fragment.include(P);let n=s.output===d.ObjectAndLayerIdColor,m=C(s.output),t=l(s.output)&&s.oitPass===p.ColorAlpha,a=l(s.output)&&s.oitPass!==p.ColorAlpha,u=s.discardInvisibleFragments,i=0;(a||m||t)&&o.outputs.add("fragColor","vec4",i++),m&&o.outputs.add("fragEmission","vec4",i++),t&&o.outputs.add("fragAlpha","float",i++),o.fragment.code.add(e`
    void outputColorHighlightOID(vec4 finalColor, const in vec3 vWorldPosition) {
      ${r(n,"finalColor.a = 1.0;")}

      ${r(u,`if (finalColor.a < ${e.float(h)}) { discard; }`)}

      finalColor = applySlice(finalColor, vWorldPosition);
      ${r(t,e`fragColor = premultiplyAlpha(finalColor);
             fragAlpha = finalColor.a;`)}
      ${r(a,"fragColor = finalColor;")}
      ${r(m,"fragEmission = finalColor.a * getEmissions();")}
      calculateOcclusionAndOutputHighlight();
      ${r(n,"outputObjectAndLayerIdColor();")}
    }
  `)}export{f as a,q as b};
