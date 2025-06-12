import{b}from"./chunk-53FQLWMN.js";import{a as u}from"./chunk-N3W77OHB.js";import{f as y}from"./chunk-SZTSN5BD.js";import{a as T,b as V}from"./chunk-VAOSSSLB.js";import{a as I}from"./chunk-HUUJBVXR.js";import{a as C}from"./chunk-4LDVFWME.js";import{a as m}from"./chunk-ESSDCWGF.js";import{a as O,h as g}from"./chunk-YEXMIDOT.js";import{a as h}from"./chunk-44A27HB7.js";import{a as v}from"./chunk-47NSYSFY.js";import{a as f}from"./chunk-PTZYZULI.js";import{k as n,l as d,n as x}from"./chunk-LXFQWIWE.js";var c;(function(e){e[e.Color=0]="Color",e[e.ColorNoRasterImage=1]="ColorNoRasterImage",e[e.Highlight=2]="Highlight",e[e.WaterNormal=3]="WaterNormal",e[e.Occluded=4]="Occluded",e[e.ObjectAndLayerIdColor=5]="ObjectAndLayerIdColor"})(c||(c={}));var s;(function(e){e[e.Material=0]="Material",e[e.ShadowMap=1]="ShadowMap",e[e.Highlight=2]="Highlight",e[e.ViewshedShadowMap=3]="ViewshedShadowMap"})(s||(s={}));var w;function K(e,o){let{vertex:r,fragment:t}=e;r.uniforms.add(new m("overlayTexOffset",(a,i)=>D(a,i)),new m("overlayTexScale",(a,i)=>W(a,i))),t.constants.add("overlayOpacity","float",1),t.uniforms.add(new C("ovColorTex",(a,i)=>S(a,i))),M(e,o)}function Q(e,o){let{vertex:r,fragment:t}=e;r.uniforms.add(new p("overlayTexOffset"),new p("overlayTexScale")),t.uniforms.add(new I("overlayOpacity",a=>a.overlayOpacity),new C("ovColorTex",(a,i)=>i.overlay?.getTexture(a.overlayContent))),M(e,o)}function M(e,o){let r=o.pbrMode===y.Water||o.pbrMode===y.WaterOnIntegratedMesh||o.pbrMode===y.TerrainWithWater;r&&e.include(b,o);let{vertex:t,fragment:a}=e;e.varyings.add("vtcOverlay","vec4"),t.code.add(v`void setOverlayVTC(in vec2 uv) {
vtcOverlay = vec4(uv, uv) * overlayTexScale + overlayTexOffset;
}`),a.code.add(v`bool isValid(vec2 uv, vec2 dxdy) {
return (uv.x >= 0.0 + dxdy.x) && (uv.x <= 1.0 - dxdy.x) && (uv.y >= 0.0 + dxdy.y) && (uv.y <= 1.0 - dxdy.y);
}
vec4 getOverlayColor(sampler2D ov0Tex, vec4 texCoords) {
vec4 color0 = texture(ov0Tex, vec2(texCoords.x * 0.5, texCoords.y));
vec4 color1 = texture(ov0Tex, vec2(texCoords.z * 0.5 + 0.5, texCoords.w));
bool isValid0 = isValid(texCoords.xy, fwidth(texCoords.xy));
bool isValid1 = isValid(texCoords.zw, vec2(0.0, 0.0));
return mix(color1 * float(isValid1), color0, float(isValid0));
}`),a.code.add(v`vec4 getCombinedOverlayColor() {
return overlayOpacity * getOverlayColor(ovColorTex, vtcOverlay);
}`),a.code.add(v`vec4 getOverlayColorTexel() {
vec4 texCoords = vtcOverlay;
vec2 texDim =  vec2(textureSize(ovColorTex, 0));
vec4 color0 = texelFetch(ovColorTex, ivec2(vec2(texCoords.x * 0.5, texCoords.y) * texDim), 0);
vec4 color1 = texelFetch(ovColorTex, ivec2(vec2(texCoords.z * 0.5 + 0.5, texCoords.w) * texDim), 0);
bool isValid0 = isValid(texCoords.xy, fwidth(texCoords.xy));
bool isValid1 = isValid(texCoords.zw, vec2(0.0, 0.0));
return mix(color1 * float(isValid1), color0, float(isValid0));
}`),a.code.add(v`vec2 getAllOverlayHighlightValuesEncoded() {
vec4 texCoords = vtcOverlay;
vec2 uvInner = texCoords.xy;
vec2 uvOuter = texCoords.zw;
bool isValidInner = isValid(uvInner, fwidth(uvInner));
bool isValidOuter = isValid(uvOuter, vec2(0.0, 0.0));
vec2 texelCoordInner = uvInner * vec2(0.5, 1.0);
vec2 texelCoordOuter = uvOuter * vec2(0.5, 1.0) + vec2(0.5,0.0);
vec2 texDim =  vec2(textureSize(ovColorTex, 0));
vec2 texelValueInner = texelFetch(ovColorTex, ivec2(texelCoordInner * texDim), 0).rg;
vec2 texelValueOuter = texelFetch(ovColorTex, ivec2(texelCoordOuter * texDim), 0).rg;
return
isValidInner ? texelValueInner :
isValidOuter ? texelValueOuter :
vec2(0.0);
}`),r&&(T(a),V(a),a.code.add(v`vec4 getOverlayWaterColor(vec4 maskInput, vec4 colorInput, vec3 vposEyeDir,
float shadow, vec3 localUp, mat3 tbn, vec3 position, vec3 positionWorld) {
vec3 n = normalize(tbn *  (2.0 * maskInput.rgb - vec3(1.0)));
vec3 v = vposEyeDir;
vec3 final = getSeaColor(n, v, mainLightDirection, colorInput.rgb, mainLightIntensity, localUp, 1.0 - shadow, maskInput.w, position, positionWorld);
return vec4(final, colorInput.w);
}`))}function S(e,o){return e.identifier===s.Material&&g(e.output)?o.overlay?.getTexture(c.ColorNoRasterImage):e.identifier===s.Material&&e.output===O.ObjectAndLayerIdColor?o.overlay?.getTexture(c.ObjectAndLayerIdColor):e.identifier===s.Highlight?o.overlay?.getTexture(c.Highlight):null}function D(e,o){let r=o.overlay?.overlays[u.INNER]?.extent;x(r)&&(l[0]=e.toMapSpace[0]/n(r)-r[0]/n(r),l[1]=e.toMapSpace[1]/d(r)-r[1]/d(r));let t=o.overlay?.overlays[u.OUTER]?.extent;return x(t)&&(l[2]=e.toMapSpace[0]/n(t)-t[0]/n(t),l[3]=e.toMapSpace[1]/d(t)-t[1]/d(t)),l}function W(e,o){let r=o.overlay?.overlays[u.INNER]?.extent;x(r)&&(l[0]=e.toMapSpace[2]/n(r),l[1]=e.toMapSpace[3]/d(r));let t=o.overlay?.overlays[u.OUTER]?.extent;return x(t)&&(l[2]=e.toMapSpace[2]/n(t),l[3]=e.toMapSpace[3]/d(t)),l}(function(e){e[e.Disabled=0]="Disabled",e[e.Enabled=1]="Enabled",e[e.EnabledWithWater=2]="EnabledWithWater",e[e.COUNT=3]="COUNT"})(w||(w={}));var l=f(),p=class extends h{constructor(o){super(o,"vec4")}};export{c as a,s as b,w as c,K as d,Q as e,S as f};
