import{a as m}from"./chunk-YHVPPOYO.js";import{a as C,b as z,i as P}from"./chunk-DNRMZMJ3.js";import{a as x}from"./chunk-AMISFAT3.js";import{a as i}from"./chunk-UJ7KVQR6.js";import{a as y}from"./chunk-55OTJIMU.js";import{a as u}from"./chunk-WOZSH7YY.js";import{a as c}from"./chunk-HUUJBVXR.js";import{a as n}from"./chunk-4LDVFWME.js";import{a as h}from"./chunk-A45BLB26.js";import{a as r}from"./chunk-47NSYSFY.js";import{i as g}from"./chunk-BOVYXYHK.js";var s,d;(function(e){e[e.Stretch=0]="Stretch",e[e.Lut=1]="Lut",e[e.Hillshade=2]="Hillshade",e[e.COUNT=3]="COUNT"})(s||(s={})),function(e){e[e.Noop=0]="Noop",e[e.PerBand=1]="PerBand",e[e.COUNT=2]="COUNT"}(d||(d={}));function b(e){e.fragment.uniforms.add(new n("u_colormap",o=>o.u_colormap),new c("u_colormapOffset",o=>o.colormap.u_colormapOffset),new c("u_colormapMaxIndex",o=>o.colormap.u_colormapMaxIndex),new c("u_opacity",o=>o.common.u_opacity)),e.fragment.code.add(r`vec4 colormap(vec4 currentPixel, bool isFloat) {
float colorIndex = isFloat ? currentPixel.r - u_colormapOffset : currentPixel.r * 255.0 - u_colormapOffset;
vec4 result;
if (currentPixel.a == 0.0 || colorIndex > u_colormapMaxIndex) {
result = vec4(0.0, 0.0, 0.0, 0.0);
} else {
vec2 texelCoordinates = vec2((colorIndex + 0.5), 0.5);
result = texelFetch(u_colormap, ivec2(texelCoordinates), 0);
}
return result;
}`)}function O(e){e.fragment.uniforms.add(new n("u_transformGrid",o=>o.u_transformGrid),new u("u_transformSpacing",o=>o.common.u_transformSpacing),new u("u_targetImageSize",o=>o.common.u_targetImageSize)),e.fragment.code.add(r`vec2 projectPixelLocation(vec2 coords) {
vec2 index_image = floor(coords * u_targetImageSize);
vec2 oneTransformPixel = vec2(4.0, 1.0);
vec2 index_transform = floor(index_image / u_transformSpacing) * oneTransformPixel;
vec2 pos = fract((index_image + 0.5) / u_transformSpacing);
vec2 transform_location = index_transform + 0.5;
vec2 srcLocation;
if (pos.s <= pos.t) {
vec3 ll_abc = texelFetch(u_transformGrid, ivec2(transform_location), 0).rgb;
vec3 ll_def = texelFetch(u_transformGrid, ivec2(transform_location.s + 1.0, transform_location.t), 0).rgb;
srcLocation.s = dot(ll_abc, vec3(pos, 1.0));
srcLocation.t = dot(ll_def, vec3(pos, 1.0));
} else {
vec3 ur_abc = texelFetch(u_transformGrid, ivec2(transform_location.s + 2.0, transform_location.t), 0).rgb;
vec3 ur_def = texelFetch(u_transformGrid, ivec2(transform_location.s + 3.0, transform_location.t), 0).rgb;
srcLocation.s = dot(ur_abc, vec3(pos, 1.0));
srcLocation.t = dot(ur_def, vec3(pos, 1.0));
}
return srcLocation;
}`)}var p=class extends C{constructor(o,l,a){super(),this.common=o,this.u_image=l,this.u_transformGrid=a}};function L(e,o){e.include(O),e.fragment.uniforms.add(new n("u_image",a=>a.u_image),new m("u_flipY",a=>a.common.u_flipY),new m("u_applyTransform",a=>a.common.u_applyTransform));let{requireBilinearWithNN:l}=o;l&&e.fragment.uniforms.add(new u("u_srcImageSize",a=>a.common.u_srcImageSize)),e.fragment.code.add(r`vec2 getPixelLocation(vec2 coords) {
vec2 targetLocation = u_flipY ? vec2(coords.s, 1.0 - coords.t) : coords;
if (!u_applyTransform) {
return targetLocation;
}
return projectPixelLocation(targetLocation);
}
bool isOutside(vec2 coords){
if (coords.t>1.00001 ||coords.t<-0.00001 || coords.s>1.00001 ||coords.s<-0.00001) {
return true;
} else {
return false;
}
}`),l?e.fragment.code.add(r`vec4 sampleBilinear(sampler2D sampler, vec2 coords, vec2 texSize) {
vec2 texelStart = floor(coords * texSize);
vec2 coord0 = texelStart / texSize;
vec2 coord1 = (texelStart +  vec2(1.0, 0.0)) / texSize;
vec2 coord2 = (texelStart +  vec2(0.0, 1.0)) / texSize;
vec2 coord3 = (texelStart +  vec2(1.0, 1.0)) / texSize;
vec4 color0 = texture(sampler, coord0);
vec4 color1 = texture(sampler, coord1);
vec4 color2 = texture(sampler, coord2);
vec4 color3 = texture(sampler, coord3);
vec2 blend = fract(coords * texSize);
vec4 color01 = mix(color0, color1, blend.x);
vec4 color23 = mix(color2, color3, blend.x);
vec4 color = mix(color01, color23, blend.y);
float alpha = floor(color0.a * color1.a * color2.a * color3.a + 0.5);
color = color * alpha + (1.0 - alpha) * texture(sampler, coords);
return color;
}
vec4 getPixel(vec2 pixelLocation) {
return sampleBilinear(u_image, pixelLocation, u_srcImageSize);
}`):e.fragment.code.add(r`vec4 getPixel(vec2 pixelLocation) {
return texture(u_image, pixelLocation);
}`)}var f=class extends p{constructor(o,l,a,t,w,V){super(o,t,w),this.colormap=l,this.symbolizer=a,this.u_colormap=V,this.backgroundColor=g,this.fboTexture=null,this.baseOpacity=1}},v=class extends f{},_=class extends f{};function B(e){let o=new h;return o.include(z),o.include(L,e),o.include(b,e),o.include(P,e),o.fragment.code.add(r`vec4 applyBackgroundBlend(vec4 layerColor) {
return blendLayers(vuv, layerColor, u_opacity);
}`),e.colorizerType===s.Stretch?T(o,e):e.colorizerType===s.Lut?S(o):e.colorizerType===s.Hillshade&&k(o,e),o}function S(e){e.fragment.main.add(r`vec2 pixelLocation = getPixelLocation(uv);
if (isOutside(pixelLocation)) {
fragColor = applyBackgroundBlend(vec4(0.0, 0.0, 0.0, 0.0));
return;
}
vec4 currentPixel = getPixel(pixelLocation);
fragColor = applyBackgroundBlend(colormap(currentPixel, true));`)}function T(e,o){e.fragment.uniforms.add(new x("u_bandCount",a=>a.symbolizer.u_bandCount),new i("u_minCutOff",a=>a.symbolizer.u_minCutOff,3),new i("u_maxCutOff",a=>a.symbolizer.u_maxCutOff,3),new i("u_factor",a=>a.symbolizer.u_factor,3),new c("u_minOutput",a=>a.symbolizer.u_minOutput),new c("u_maxOutput",a=>a.symbolizer.u_maxOutput),new m("u_useGamma",a=>a.symbolizer.u_useGamma),new i("u_gamma",a=>a.symbolizer.u_gamma,3),new i("u_gammaCorrection",a=>a.symbolizer.u_gammaCorrection,3),new c("u_opacity",a=>a.common.u_opacity)),e.fragment.code.add(r`float stretchOneValue(float val, float minCutOff, float maxCutOff, float minOutput, float maxOutput, float factor, bool useGamma, float gamma, float gammaCorrection) {
if (val >= maxCutOff) {
return maxOutput;
} else if (val <= minCutOff) {
return minOutput;
}
float stretchedVal;
if (useGamma) {
float tempf = 1.0;
float outRange = maxOutput - minOutput;
float relativeVal = (val - minCutOff) / (maxCutOff - minCutOff);
if (gamma > 1.0) {
tempf -= pow(1.0 / outRange, relativeVal * gammaCorrection);
}
stretchedVal = (tempf * outRange * pow(relativeVal, 1.0 / gamma) + minOutput) / 255.0;
} else {
stretchedVal = minOutput + (val - minCutOff) * factor;
}
return stretchedVal;
}`);let l=o.applyColormap?r`fragColor = applyBackgroundBlend(colormap(vec4(grayVal, grayVal, grayVal, currentPixel.a), !u_useGamma));`:r`fragColor = applyBackgroundBlend(vec4(grayVal, grayVal, grayVal, currentPixel.a));`;e.fragment.main.add(r`
    vec2 pixelLocation = getPixelLocation(uv);
    if (isOutside(pixelLocation)) {
      fragColor = applyBackgroundBlend(vec4(0.0, 0.0, 0.0, 0.0));
      return;
    }

    vec4 currentPixel = getPixel(pixelLocation);
    ${o.stretchType===d.Noop?r`fragColor = applyBackgroundBlend(currentPixel);`:r`
    if (currentPixel.a == 0.0) {
      fragColor = applyBackgroundBlend(vec4(0.0, 0.0, 0.0, 0.0));
      return;
    }
    if (u_bandCount == 1) {
      float grayVal = stretchOneValue(currentPixel.r, u_minCutOff[0], u_maxCutOff[0], u_minOutput, u_maxOutput, u_factor[0], u_useGamma, u_gamma[0], u_gammaCorrection[0]);
      ${l}
    } else {
      float redVal = stretchOneValue(currentPixel.r, u_minCutOff[0], u_maxCutOff[0], u_minOutput, u_maxOutput, u_factor[0], u_useGamma, u_gamma[0], u_gammaCorrection[0]);
      float greenVal = stretchOneValue(currentPixel.g, u_minCutOff[1], u_maxCutOff[1], u_minOutput, u_maxOutput, u_factor[1], u_useGamma, u_gamma[1], u_gammaCorrection[1]);
      float blueVal = stretchOneValue(currentPixel.b, u_minCutOff[2], u_maxCutOff[2], u_minOutput, u_maxOutput, u_factor[2], u_useGamma, u_gamma[2], u_gammaCorrection[2]);
      fragColor = applyBackgroundBlend(vec4(redVal, greenVal, blueVal, currentPixel.a));
    }`}`)}function k(e,o){let l=e.fragment;l.uniforms.add(new n("u_image",t=>t.u_image),new x("u_hillshadeType",t=>t.symbolizer.u_hillshadeType),new i("u_sinZcosAs",t=>t.symbolizer.u_sinZcosAs,6),new i("u_sinZsinAs",t=>t.symbolizer.u_sinZsinAs,6),new i("u_cosZs",t=>t.symbolizer.u_cosZs,6),new i("u_weights",t=>t.symbolizer.u_weights,6),new u("u_factor",t=>t.symbolizer.u_factor),new c("u_minValue",t=>t.symbolizer.u_minValue),new c("u_maxValue",t=>t.symbolizer.u_maxValue),new u("u_srcImageSize",t=>t.common.u_srcImageSize)),l.include(y),l.code.add(r`vec4 overlay(float val, float minValue, float maxValue, float hillshade, float alpha) {
val = clamp((val - minValue) / (maxValue - minValue), 0.0, 1.0);
vec4 color = colormap(vec4(val, val, val, 1.0), false);
vec3 hsv = rgb2hsv(color.rgb);
hsv.z = hillshade;
return vec4(hsv2rgb(hsv), 1.0) * alpha * color.a;
}`),l.code.add(r`float getNeighborHoodAlpha(float a, float b, float c, float d, float e, float f, float g, float h, float i){
if (a == 0.0 || a == 0.0 || a==0.0 || a == 0.0 || a == 0.0 || a==0.0 || a == 0.0 || a == 0.0 || a==0.0) {
return 0.0;
}  else {
return e;
}
}`);let a=o.applyColormap?r`fragColor = applyBackgroundBlend(overlay(ve.r, u_minValue, u_maxValue, hillshade, alpha));`:r`hillshade *= alpha;
fragColor = applyBackgroundBlend(vec4(hillshade, hillshade, hillshade, alpha));`;l.main.add(r`
      vec2 pixelLocation = getPixelLocation(uv);
      if (isOutside(pixelLocation)) {
        fragColor = applyBackgroundBlend(vec4(0.0, 0.0, 0.0, 0.0));
        return;
      }

      vec4 currentPixel = getPixel(pixelLocation);
      if (currentPixel.a == 0.0) {
        fragColor = applyBackgroundBlend(vec4(0.0, 0.0, 0.0, 0.0));
        return;
      }

      //mirror edge pixels
      vec2 axy = vec2(-1.0, -1.0);
      vec2 bxy = vec2(0.0, -1.0);
      vec2 cxy = vec2(1.0, -1.0);
      vec2 dxy = vec2(-1.0, 0.0);
      vec2 fxy = vec2(1.0, 0.0);
      vec2 gxy = vec2(-1.0, 1.0);
      vec2 hxy = vec2(0.0, 1.0);
      vec2 ixy = vec2(1.0, 1.0);
      vec2 onePixel = 1.0 / u_srcImageSize;
      if (pixelLocation.s < onePixel.s) {
        axy[0] = 1.0;
        dxy[0] = 1.0;
        gxy[0] = 1.0;
      }
      if (pixelLocation.t < onePixel.t) {
        axy[1] = 1.0;
        bxy[1] = 1.0;
        cxy[1] = 1.0;
      }
      if (pixelLocation.s > 1.0 - onePixel.s) {
        cxy[0] = -1.0;
        fxy[0] = -1.0;
        ixy[0] = -1.0;
      }
      if (pixelLocation.t > 1.0 - onePixel.t) {
        gxy[1] = -1.0;
        hxy[1] = -1.0;
        ixy[1] = -1.0;
      }

      // calculate hillshade
      vec4 va = texture(u_image, pixelLocation + onePixel * axy);
      vec4 vb = texture(u_image, pixelLocation + onePixel * bxy);
      vec4 vc = texture(u_image, pixelLocation + onePixel * cxy);
      vec4 vd = texture(u_image, pixelLocation + onePixel * dxy);
      vec4 ve = texture(u_image, pixelLocation);
      vec4 vf = texture(u_image, pixelLocation + onePixel * fxy);
      vec4 vg = texture(u_image, pixelLocation + onePixel * gxy);
      vec4 vh = texture(u_image, pixelLocation + onePixel * hxy);
      vec4 vi = texture(u_image, pixelLocation + onePixel * ixy);

      // calculate the rate of z change along the x, y, and diagonal direction
      float dzx = (vc + 2.0 * vf + vi - va - 2.0 * vd - vg).r * u_factor.s;
      float dzy = (vg + 2.0 * vh + vi - va - 2.0 * vb - vc).r * u_factor.t;
      float dzd = sqrt(1.0 + dzx * dzx + dzy * dzy);
      float hillshade = 0.0;

      // traditional single light source
      if (u_hillshadeType == 0){
        float cosDelta = u_sinZsinAs[0] * dzy - u_sinZcosAs[0] * dzx;
        float z = (u_cosZs[0] + cosDelta) / dzd;
        if (z < 0.0)  z = 0.0;
        hillshade = z;
      } else {
        // multi-directional with 6 light sources
        for (int k = 0; k < 6; k++) {
        float cosDelta = u_sinZsinAs[k] * dzy - u_sinZcosAs[k] * dzx;
        float z = (u_cosZs[k] + cosDelta) / dzd;
        if (z < 0.0) z = 0.0;
        hillshade = hillshade + z * u_weights[k];
        if (k == 5) break;
        }
      }

      // set color
      float alpha = getNeighborHoodAlpha(va.a, vb.a, vc.a, vd.a, ve.a, vf.a, vg.a, vh.a, vi.a);
      alpha *= u_opacity;
      ${a}`)}var se=Object.freeze(Object.defineProperty({__proto__:null,ColorizerHillshadeUniforms:_,ColorizerStretchUniforms:v,ColorizerUniforms:f,build:B},Symbol.toStringTag,{value:"Module"}));export{s as a,d as b,f as c,v as d,_ as e,B as f,se as g};
