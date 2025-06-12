import{f as C}from"./chunk-WUXNV6ZW.js";import{a as k}from"./chunk-BSKAVVQS.js";import{b as o}from"./chunk-CMKJEBQJ.js";import{a as g}from"./chunk-7GUYYJRR.js";import{a as y}from"./chunk-WS4AMEGN.js";import{b as z,e as x}from"./chunk-PMLKCTEJ.js";import{a as T}from"./chunk-422PSKZ7.js";import{a as m}from"./chunk-UJ7KVQR6.js";import{d as S}from"./chunk-HMNTGQTR.js";import{a as h}from"./chunk-B2RVSTL3.js";import{a as O}from"./chunk-HUUJBVXR.js";import{a as d}from"./chunk-T7PUQGWM.js";import{a as n}from"./chunk-47NSYSFY.js";import{a as p}from"./chunk-RWCIDBNQ.js";import{l as u,n as f}from"./chunk-HM5RIVQC.js";import{a}from"./chunk-QGVBCWUY.js";var c,l;(function(e){e[e.Draped=0]="Draped",e[e.Screen=1]="Screen",e[e.World=2]="World",e[e.COUNT=3]="COUNT"})(c||(c={})),function(e){e[e.Center=0]="Center",e[e.Tip=1]="Tip",e[e.COUNT=2]="COUNT"}(l||(l={}));var i=class extends k{constructor(){super(...arguments),this.space=c.Screen,this.anchor=l.Center,this.occluder=!1,this.writeDepth=!1,this.hideOnShortSegments=!1,this.hasCap=!1,this.hasTip=!1,this.vvSize=!1,this.vvColor=!1,this.vvOpacity=!1,this.hasOccludees=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.textureCoordinateType=y.None,this.emissionSource=g.None,this.discardInvisibleFragments=!0,this.occlusionPass=!1,this.hasVvInstancing=!0,this.hasSliceTranslatedView=!0,this.objectAndLayerIdColorInstanced=!1}get draped(){return this.space===c.Draped}};a([o({count:c.COUNT})],i.prototype,"space",void 0),a([o({count:l.COUNT})],i.prototype,"anchor",void 0),a([o()],i.prototype,"occluder",void 0),a([o()],i.prototype,"writeDepth",void 0),a([o()],i.prototype,"hideOnShortSegments",void 0),a([o()],i.prototype,"hasCap",void 0),a([o()],i.prototype,"hasTip",void 0),a([o()],i.prototype,"vvSize",void 0),a([o()],i.prototype,"vvColor",void 0),a([o()],i.prototype,"vvOpacity",void 0),a([o()],i.prototype,"hasOccludees",void 0),a([o()],i.prototype,"terrainDepthTest",void 0),a([o()],i.prototype,"cullAboveTerrain",void 0);var R=8;function _(e,s){let r=e.vertex;r.uniforms.add(new O("intrinsicWidth",t=>t.width)),s.vvSize?(e.attributes.add(p.SIZEFEATUREATTRIBUTE,"float"),r.uniforms.add(new d("vvSizeMinSize",t=>t.vvSize.minSize),new d("vvSizeMaxSize",t=>t.vvSize.maxSize),new d("vvSizeOffset",t=>t.vvSize.offset),new d("vvSizeFactor",t=>t.vvSize.factor)),r.code.add(n`float getSize() {
return intrinsicWidth * clamp(vvSizeOffset + sizeFeatureAttribute * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).x;
}`)):(e.attributes.add(p.SIZE,"float"),r.code.add(n`float getSize(){
return intrinsicWidth * size;
}`)),s.vvOpacity?(e.attributes.add(p.OPACITYFEATUREATTRIBUTE,"float"),r.constants.add("vvOpacityNumber","int",8),r.uniforms.add(new m("vvOpacityValues",t=>t.vvOpacity.values,R),new m("vvOpacityOpacities",t=>t.vvOpacity.opacityValues,R)),r.code.add(n`float interpolateOpacity( float value ){
if (value <= vvOpacityValues[0]) {
return vvOpacityOpacities[0];
}
for (int i = 1; i < vvOpacityNumber; ++i) {
if (vvOpacityValues[i] >= value) {
float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
return mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f);
}
}
return vvOpacityOpacities[vvOpacityNumber - 1];
}
vec4 applyOpacity( vec4 color ){
return vec4(color.xyz, interpolateOpacity(opacityFeatureAttribute));
}`)):r.code.add(n`vec4 applyOpacity( vec4 color ){
return color;
}`),s.vvColor?(e.include(T,s),e.attributes.add(p.COLORFEATUREATTRIBUTE,"float"),r.code.add(n`vec4 getColor(){
return applyOpacity(interpolateVVColor(colorFeatureAttribute));
}`)):(e.attributes.add(p.COLOR,"vec4"),r.code.add(n`vec4 getColor(){
return applyOpacity(color);
}`))}var v=64,b=v/2,M=b/5,P=v/M,Y=.25;function J(e,s){let r=C(e,v,b,M),t=new z;return t.internalFormat=f.RGBA,t.width=v,t.height=v,t.wrapMode=u.CLAMP_TO_EDGE,new x(s,t,r)}function re(e,s){let r=e.vertex;S(r),r.uniforms.get("markerScale")==null&&r.constants.add("markerScale","float",1),r.constants.add("markerSizePerLineWidth","float",P).code.add(n`float getLineWidth() {
return max(getSize(), 1.0) * pixelRatio;
}
float getScreenMarkerSize() {
return markerSizePerLineWidth * markerScale * getLineWidth();
}`),s.space===c.World&&(r.constants.add("maxSegmentLengthFraction","float",.45),r.uniforms.add(new h("perRenderPixelRatio",t=>t.camera.perRenderPixelRatio)),r.code.add(n`bool areWorldMarkersHidden(vec4 pos, vec4 other) {
vec3 midPoint = mix(pos.xyz, other.xyz, 0.5);
float distanceToCamera = length(midPoint);
float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
float worldMarkerSize = getScreenMarkerSize() * screenToWorldRatio;
float segmentLen = length(pos.xyz - other.xyz);
return worldMarkerSize > maxSegmentLengthFraction * segmentLen;
}
float getWorldMarkerSize(vec4 pos) {
float distanceToCamera = length(pos.xyz);
float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
return getScreenMarkerSize() * screenToWorldRatio;
}`))}export{c as a,l as b,i as c,_ as d,v as e,b as f,P as g,Y as h,J as i,re as j};
