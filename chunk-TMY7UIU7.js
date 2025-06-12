import{a as E}from"./chunk-4K47EN3B.js";import{d as C}from"./chunk-FGY3YBPM.js";import{a as M}from"./chunk-MVDZB4AK.js";import{a as v}from"./chunk-ESSDCWGF.js";import{a as f}from"./chunk-WVKBXQWE.js";import{a as c}from"./chunk-YEXMIDOT.js";import{a as p}from"./chunk-44A27HB7.js";import{a as t,b as m}from"./chunk-47NSYSFY.js";import{a as u}from"./chunk-QXNVQZT7.js";import{a as s}from"./chunk-K7YQAHQ7.js";import{a as x}from"./chunk-RWCIDBNQ.js";var i=class extends p{constructor(e,r){super(e,"int",u.Draw,(d,n,a)=>d.setUniform1i(e,r(n,a)))}};var l;(function(o){o[o.Uniform=0]="Uniform",o[o.Varying=1]="Varying",o[o.COUNT=2]="COUNT"})(l||(l={}));var g=429496.7296;function R(o,e){s(o/g*.5+.5,e)}function V(o,e){switch(e.componentData){case l.Varying:return y(o,e);case l.Uniform:return O(o,e);case l.COUNT:return;default:e.componentData}}function y(o,e){let{vertex:r,fragment:d}=o;r.include(f),r.uniforms.add(new M("componentColorTex",a=>a.componentParameters.texture.texture)),o.attributes.add(x.COMPONENTINDEX,"float"),o.varyings.add("vExternalColorMixMode","mediump float"),o.varyings.add("vExternalColor","vec4");let n=e.output===c.ObjectAndLayerIdColor;n&&o.varyings.add("vObjectAndLayerIdColor","vec4"),o.include(C),r.constants.add("stride","float",E()?3:2),r.code.add(t`vec2 getComponentTextureCoordinates(float componentIndex, float typeOffset) {
float index = componentIndex * stride + typeOffset;
float texSize = float(textureSize(componentColorTex, 0).x);
float coordX = mod(index, texSize);
float coordY = floor(index / texSize);
return vec2(coordX, coordY) + 0.5;
}`),r.code.add(t`
  vec4 _readComponentColor() {
    vec2 textureCoordinates = getComponentTextureCoordinates(componentIndex, 0.0);
    return texelFetch(componentColorTex, ivec2(textureCoordinates), 0);
   }

  float readElevationOffset() {
    vec2 textureCoordinates = getComponentTextureCoordinates(componentIndex, 1.0);
    vec4 encodedElevation = texelFetch(componentColorTex, ivec2(textureCoordinates), 0);
    return uninterpolatedRGBAToFloat(encodedElevation) * ${t.float(g)};
  }

  ${n?t`
          void forwardObjectAndLayerIdColor() {
            vec2 textureCoordinates = getComponentTextureCoordinates(componentIndex, 2.0);
            vObjectAndLayerIdColor = texelFetch(componentColorTex, ivec2(textureCoordinates), 0);
          }`:t`void forwardObjectAndLayerIdColor() {}`}

  vec4 forwardExternalColor(out bool castShadows) {
    vec4 componentColor = _readComponentColor() * 255.0;

    float shadowFlag = mod(componentColor.b * 255.0, 2.0);
    componentColor.b -= shadowFlag;
    castShadows = shadowFlag >= 1.0;

    int decodedColorMixMode;
    vExternalColor = decodeSymbolColor(componentColor, decodedColorMixMode) * 0.003921568627451; // = 1/255;
    vExternalColorMixMode = float(decodedColorMixMode) + 0.5; // add 0.5 to avoid interpolation artifacts

    return vExternalColor;
  }
`),d.code.add(t`
  void readExternalColor(out vec4 externalColor, out int externalColorMixMode) {
    externalColor = vExternalColor;
    externalColorMixMode = int(vExternalColorMixMode);
  }

  void outputObjectAndLayerIdColor() {
     ${n?t`fragColor = vObjectAndLayerIdColor;`:""}
  }
`)}function O(o,e){let{vertex:r,fragment:d}=o;o.varyings.add("vExternalColor","vec4"),r.uniforms.add(new v("externalColor",a=>a.componentParameters.externalColor)).code.add(t`float readElevationOffset() {
return 0.0;
}
void forwardObjectAndLayerIdColor() {}
vec4 forwardExternalColor(out bool castShadows) {
vExternalColor = externalColor;
castShadows = true;
return externalColor;
}`);let n=e.output===c.ObjectAndLayerIdColor;d.uniforms.add(new i("externalColorMixMode",a=>a.componentParameters.externalColorMixMode)).code.add(t`
    void readExternalColor(out vec4 color, out int colorMixMode) {
      color = vExternalColor;
      colorMixMode = externalColorMixMode;
    }

    void outputObjectAndLayerIdColor() {
      ${m(n,"fragColor = vec4(0, 0, 0, 0);")}
    }
  `)}export{l as a,g as b,R as c,V as d};
