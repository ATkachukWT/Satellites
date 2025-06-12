import{a as h}from"./chunk-7V6BRQYE.js";import{c as x,d as v}from"./chunk-DH67ILIV.js";import{a as N}from"./chunk-55OTJIMU.js";import{a as C}from"./chunk-VGAXEXH3.js";import{a as M}from"./chunk-HUUJBVXR.js";import{a as i}from"./chunk-FGY3YBPM.js";import{a as c,b as s}from"./chunk-EDOVNTC7.js";import{b as u}from"./chunk-FSWSNKJD.js";import{a as p}from"./chunk-FGEB67EG.js";import{a,b as f}from"./chunk-47NSYSFY.js";import{g as t}from"./chunk-ONYJLWAD.js";import{a as n}from"./chunk-DEH76MSI.js";import{a as d}from"./chunk-PTZYZULI.js";function $(r,e){switch(e.normalType){case s.Attribute:case s.Compressed:r.include(c,e),r.varyings.add("vNormalWorld","vec3"),r.varyings.add("vNormalView","vec3"),r.vertex.uniforms.add(new u("transformNormalGlobalFromModel",o=>o.transformNormalGlobalFromModel),new p("transformNormalViewFromGlobal",o=>o.transformNormalViewFromGlobal)),r.vertex.code.add(a`void forwardNormal() {
vNormalWorld = transformNormalGlobalFromModel * normalModel();
vNormalView = transformNormalViewFromGlobal * vNormalWorld;
}`);break;case s.ScreenDerivative:r.vertex.code.add(a`void forwardNormal() {}`);break;default:e.normalType;case s.COUNT:}}var w=class extends x{constructor(){super(...arguments),this.transformNormalViewFromGlobal=n()}},g=class extends v{constructor(){super(...arguments),this.transformNormalGlobalFromModel=n(),this.toMapSpace=d()}};function R(r,e){b(r,e,new M("textureAlphaCutoff",o=>o.textureAlphaCutoff))}function B(r,e){b(r,e,new h("textureAlphaCutoff",o=>o.textureAlphaCutoff))}function b(r,e,o){let m=r.fragment,l=e.alphaDiscardMode,O=l===t.Blend;l!==t.Mask&&l!==t.MaskBlend||m.uniforms.add(o),m.code.add(a`
    void discardOrAdjustAlpha(inout vec4 color) {
      ${l===t.Opaque?"color.a = 1.0;":`if (color.a < ${O?a.float(C):"textureAlphaCutoff"}) {
              discard;
             } ${f(l===t.Mask,"else { color.a = 1.0; }")}`}
    }
  `)}function K(r){r.include(N),r.code.add(a`
    vec3 mixExternalColor(vec3 internalColor, vec3 textureColor, vec3 externalColor, int mode) {
      // workaround for artifacts in macOS using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      vec3 internalMixed = internalColor * textureColor;
      vec3 allMixed = internalMixed * externalColor;

      if (mode == ${a.int(i.Multiply)}) {
        return allMixed;
      }
      if (mode == ${a.int(i.Ignore)}) {
        return internalMixed;
      }
      if (mode == ${a.int(i.Replace)}) {
        return externalColor;
      }

      // tint (or something invalid)
      float vIn = rgb2v(internalMixed);
      vec3 hsvTint = rgb2hsv(externalColor);
      vec3 hsvOut = vec3(hsvTint.x, hsvTint.y, vIn * hsvTint.z);
      return hsv2rgb(hsvOut);
    }

    float mixExternalOpacity(float internalOpacity, float textureOpacity, float externalOpacity, int mode) {
      // workaround for artifacts in macOS using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      float internalMixed = internalOpacity * textureOpacity;
      float allMixed = internalMixed * externalOpacity;

      if (mode == ${a.int(i.Ignore)}) {
        return internalMixed;
      }
      if (mode == ${a.int(i.Replace)}) {
        return externalOpacity;
      }

      // multiply or tint (or something invalid)
      return allMixed;
    }
  `)}export{$ as a,w as b,g as c,R as d,B as e,K as f};
