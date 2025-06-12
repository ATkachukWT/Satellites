import{a as d}from"./chunk-7V6BRQYE.js";import{a as S}from"./chunk-CSFAHB4Y.js";import{a as C}from"./chunk-GSXOR3JU.js";import{c as y}from"./chunk-76X7RFM4.js";import{a as T}from"./chunk-2PJRHNJW.js";import{a as V}from"./chunk-B2RVSTL3.js";import{a as u}from"./chunk-F6TN7E7K.js";import{a as j}from"./chunk-HUUJBVXR.js";import{a as D}from"./chunk-A45BLB26.js";import{a as b,b as N,c as r}from"./chunk-6CO4643W.js";import{a as m}from"./chunk-MVDZB4AK.js";import{a as h}from"./chunk-WVKBXQWE.js";import{a as k}from"./chunk-FGEB67EG.js";import{a as L}from"./chunk-SOEEM7Z7.js";import{a as A}from"./chunk-44A27HB7.js";import{a as t,b as n}from"./chunk-47NSYSFY.js";import{a as l}from"./chunk-RWCIDBNQ.js";import{a as w,c as g}from"./chunk-EM35R6FY.js";import{b as x}from"./chunk-QXXXCEV5.js";function F(i){let e=t`bool isNaN( float val )
{
return ( val < 0.0 || 0.0 < val || val == 0.0 ) ? false : true;
}`;i.code.add(e)}var R=g(.5,-4e-4);function O(i,e){let o=i.vertex;o.include(F),o.constants.add("depthBias","vec2",R),o.uniforms.add(new u("inverseViewport",a=>a.inverseViewport)),e.legacy?(o.uniforms.add(new L("proj",a=>a.camera.projectionMatrix)),o.code.add(t`vec2 calculateProjectedBiasXY(vec4 projPos, vec3 globalNormal) {
float offsetXY = depthBias.x;
vec4 projNormal = proj * localView * vec4(globalNormal, 0.0);
return offsetXY * projPos.w * 2.0 * inverseViewport * normalize(projNormal.xyz).xy;
}`)):(o.uniforms.add(new k("transformNormalViewFromGlobal",a=>a.transformNormalViewFromGlobal),new S("transformProjFromView",a=>a.transformProjFromView)),o.code.add(t`vec2 calculateProjectedBiasXY(vec4 projPos, vec3 globalNormal) {
float offsetXY = depthBias.x;
vec4 projNormal = transformProjFromView * vec4(transformNormalViewFromGlobal * globalNormal, 0.0);
return offsetXY * projPos.w * 2.0 * inverseViewport * normalize(projNormal.xyz).xy;
}`)),o.code.add(t`float _calculateProjectedBiasZ(vec4 projPos) {
float offsetZ = depthBias.y;
return sqrt(max(projPos.z,0.0)) * offsetZ;
}
vec4 adjustProjectedPosition(vec4 projPos, vec3 worldNormal, float lineWidth) {
vec2 offsetXY = calculateProjectedBiasXY(projPos, worldNormal);
if (!isNaN(offsetXY.x) && !isNaN(offsetXY.y)) {
projPos.xy += offsetXY;
}
projPos.z += _calculateProjectedBiasZ(projPos);
return projPos;
}`)}function U(i,e){let o=i.vertex;e.silhouette?(o.code.add(t`bool isSilhouetteEdge(vec3 viewDir, vec3 normalA, vec3 normalB) {
float faceAVisible = dot(viewDir, normalA);
float faceBVisible = dot(viewDir, normalB);
return faceAVisible * faceBVisible < 0.0;
}`),e.legacy?o.code.add(t`bool discardNonSilhouetteEdges(vec3 viewPos, vec3 worldPos, ComponentData data) {
vec3 viewNormalA = _modelToViewNormal(data.normal);
vec3 viewNormalB = _modelToViewNormal(data.normal2);
vec3 viewDir = -viewPos;
if (isSilhouetteEdge(viewDir, viewNormalA, viewNormalB)) {
return false;
}
gl_Position = vec4(10.0, 10.0, 10.0, 1.0);
return true;
}`):o.code.add(t`bool discardNonSilhouetteEdges(vec3 viewPos, vec3 worldPos, ComponentData data) {
vec3 worldNormalA = _modelToWorldNormal(data.normal);
vec3 worldNormalB = _modelToWorldNormal(data.normal2);
vec3 viewDir = -worldPos;
if (isSilhouetteEdge(viewDir, worldNormalA, worldNormalB)) {
return false;
}
gl_Position = vec4(10.0, 10.0, 10.0, 1.0);
return true;
}`)):o.code.add(t`bool discardNonSilhouetteEdges(vec3 viewPos, vec3 worldPos, ComponentData data) {
return false;
}`)}function z(i){let e=i.vertex;e.uniforms.add(new j("distanceFalloffFactor",o=>o.distanceFalloffFactor)),e.code.add(t`float distanceBasedPerspectiveFactor(float distance) {
return clamp(sqrt(distanceFalloffFactor / distance), 0.0, 1.0);
}`)}function p(i,e){let o=e.type===r.Mixed,a=e.type===r.Solid;i.attributes.add(l.SIDENESS,"vec2"),i.vertex.code.add(t`
    struct UnpackedAttributes {
      vec2 sideness;
      vec2 sidenessNorm;
      float lineWidthPixels;
      float extensionLengthPixels;
      ${n(o,"float type;")}
    };
  `).code.add(t`
    UnpackedAttributes unpackAttributes(ComponentData component) {
      vec2 sidenessNorm = sideness;
      vec2 sideness = sidenessNorm * 2.0 - 1.0;
      float extensionLengthPixels = component.extensionLength;
      float lineWidth = component.lineWidth;
      ${n(o,"if (component.type <= 0.0) {")}
      ${n(!a,"extensionLengthPixels *= variantExtension * 2.0 - 1.0;")}
      ${n(o,"}")}
      return UnpackedAttributes(sideness, sidenessNorm, lineWidth, extensionLengthPixels ${n(o,", component.type")});
    }
  `)}function B(i,e){let o=i.vertex;switch(i.include(p,e),e.type){case r.Solid:o.code.add(t`float calculateLineAmplitude(UnpackedAttributes unpackedAttributes) {
return 0.0;
}`);break;case r.Sketch:o.uniforms.add(new d("strokesAmplitude",a=>a.strokesTexture.amplitude)).code.add(t`float calculateLineAmplitude(UnpackedAttributes unpackedAttributes) {
return strokesAmplitude;
}`);break;case r.Mixed:o.uniforms.add(new d("strokesAmplitude",a=>a.strokesTexture.amplitude)).code.add(t`float calculateLineAmplitude(UnpackedAttributes unpackedAttributes) {
float type = unpackedAttributes.type;
if (type <= 0.0) {
return strokesAmplitude;
}
return 0.0;
}`);break;case r.COUNT:break;default:e.type}}function W(i,e){i.include(p,e);let{vertex:o,fragment:a}=i;switch(N(e.type)&&(i.varyings.add("vStrokeUV","vec2"),o.uniforms.add(new m("strokesTexture",s=>s.strokesTexture.texture),new d("strokesLog2Resolution",s=>Math.log2(s.strokesTexture.resolution)),new d("strokeVariants",s=>s.strokesTexture.variants)).code.add(t`void calculateStyleOutputsSketch(float lineLength, UnpackedAttributes unpackedAttributes) {
vec2 sidenessNorm = unpackedAttributes.sidenessNorm;
float lineIndex = clamp(ceil(log2(lineLength)), 0.0, strokesLog2Resolution);
vStrokeUV = vec2(exp2(lineIndex) * sidenessNorm.y, lineIndex * strokeVariants + variantStroke + 0.5) / vec2(textureSize(strokesTexture, 0));
vStrokeUV.x += variantOffset;
}`),i.fragment.include(h),a.uniforms.add(new m("strokesTexture",s=>s.strokesTexture.texture),new d("strokesNormalizationScale",s=>s.strokesTexture.normalizationScale)).code.add(t`float calculateLineOffsetSketch() {
float offsetNorm = rgbaTofloat(texture(strokesTexture, vStrokeUV));
return (offsetNorm - 0.5) * strokesNormalizationScale;
}
float calculateLinePressureSketch() {
return rgbaTofloat(texture(strokesTexture, vStrokeUV + vec2(0.0, 0.5)));
}`)),e.type){case r.Solid:o.code.add(t`void calculateStyleOutputs(UnpackedAttributes unpackedAttributes) {}`),a.code.add(t`float calculateLineOffset() {
return 0.0;
}
float calculateLinePressure() {
return 1.0;
}`);break;case r.Sketch:o.code.add(t`void calculateStyleOutputs(UnpackedAttributes unpackedAttributes)
{
calculateStyleOutputsSketch(vLineLengthPixels, unpackedAttributes);
}`),a.code.add(t`float calculateLineOffset() {
return calculateLineOffsetSketch();
}
float calculateLinePressure() {
return calculateLinePressureSketch();
}`);break;case r.Mixed:i.varyings.add("vType","float"),o.code.add(t`void calculateStyleOutputs(UnpackedAttributes unpackedAttributes)
{
vType = unpackedAttributes.type;
if (unpackedAttributes.type <= 0.0) {
calculateStyleOutputsSketch(vLineLengthPixels, unpackedAttributes);
}
}`),a.code.add(t`float calculateLineOffset() {
if (vType <= 0.0) {
return calculateLineOffsetSketch();
}
else {
return 0.0;
}
}
float calculateLinePressure() {
if (vType <= 0.0) {
return calculateLinePressureSketch();
}
else {
return 1.0;
}
}`);break;case r.COUNT:break;default:e.type}}function I(i){let e=new D,{vertex:o,fragment:a}=e;i.legacy&&o.uniforms.add(new f("model"),new f("localView")),e.include(O,i),e.include(b,i),e.include(B,i),e.include(p,i),e.include(W,i),e.fragment.include(y,i),e.include(U,i),e.include(C,i),e.include(z,i),e.varyings.add("vColor","vec4"),e.varyings.add("vRadius","float"),e.varyings.add("vPosition","vec3"),e.varyings.add("vWorldPosition","vec3"),e.varyings.add("vLineLengthPixels","float"),e.varyings.add("vSizeFalloffFactor","float"),o.uniforms.add(new u("pixelToNDC",({camera:c})=>x(_,2/c.fullViewport[2],2/c.fullViewport[3])),new T("viewport",c=>c.camera.fullViewport),new V("pixelRatio",c=>c.camera.pixelRatio)),e.attributes.add(l.POSITION0,"vec3"),e.attributes.add(l.POSITION1,"vec3"),e.attributes.add(l.VARIANTOFFSET,"float"),e.attributes.add(l.VARIANTSTROKE,"float"),e.attributes.add(l.VARIANTEXTENSION,"float");let s=i.type===r.Sketch,P=i.type===r.Mixed,E=1/255,v=1;return o.code.add(t`
    void calculateGeometricOutputs(vec3 viewPosV0, vec3 viewPosV1, vec3 worldPosV0, vec3 worldPosV1, vec3 worldNormal, UnpackedAttributes unpackedAttributes) {
      vec2 sideness = unpackedAttributes.sideness;
      vec2 sidenessNorm = unpackedAttributes.sidenessNorm;

      vWorldPosition = mix(worldPosV0, worldPosV1, sidenessNorm.y).xyz;

      vec3 viewPos = mix(viewPosV0, viewPosV1, sidenessNorm.y);
      forwardViewPosDepth(viewPos);

      vec4 projPosV0 = projFromViewPosition(viewPosV0);
      vec4 projPosV1 = projFromViewPosition(viewPosV1);
      vec4 projPos = projFromViewPosition(viewPos);

      vec3 screenSpaceLineNDC = (projPosV1.xyz / projPosV1.w - projPosV0.xyz / projPosV0.w);
      vec2 ndcToPixel = viewport.zw * 0.5;
      vec2 screenSpaceLinePixels = screenSpaceLineNDC.xy * ndcToPixel;
      float lineLengthPixels = length(screenSpaceLinePixels);

      float dzPerPixel = screenSpaceLineNDC.z / lineLengthPixels;
      vec2 screenSpaceDirection = screenSpaceLinePixels / lineLengthPixels;
      vec2 perpendicularScreenSpaceDirection = vec2(screenSpaceDirection.y, -screenSpaceDirection.x) * sideness.x;

      float falloffFactor = distanceBasedPerspectiveFactor(-viewPos.z) * pixelRatio;
      float lineWidthPixels = unpackedAttributes.lineWidthPixels * falloffFactor;

      float extensionLengthPixels = calculateExtensionLength(unpackedAttributes.extensionLengthPixels, lineLengthPixels) * falloffFactor;
      float lineAmplitudePixels = calculateLineAmplitude(unpackedAttributes) * pixelRatio;

      vSizeFalloffFactor = falloffFactor;

      float lineWidthAndAmplitudePixels = lineWidthPixels + lineAmplitudePixels + lineAmplitudePixels;
      float extendedLineLengthPixels = lineLengthPixels + extensionLengthPixels + extensionLengthPixels;

      // Line size with padding
      float halfAAPaddedLineWidthAndAmplitudePixels = lineWidthAndAmplitudePixels * 0.5 + ${t.float(v)};
      float aaPaddedRoundedCapSizePixels = lineWidthPixels * 0.5 + ${t.float(v)};

      // Half line width in NDC including padding for anti aliasing
      vec2 halfAAPaddedLineWidthAndAmplitudeNDC = halfAAPaddedLineWidthAndAmplitudePixels * pixelToNDC;
      vec2 aaPaddedRoundedCapSizeNDC = aaPaddedRoundedCapSizePixels * pixelToNDC;
      vec2 extensionLengthNDC = extensionLengthPixels * pixelToNDC;

      // Compute screen space position of vertex, offsetting for line size and end caps
      vec2 ndcOffset = (
          screenSpaceDirection * sideness.y * (aaPaddedRoundedCapSizeNDC + extensionLengthNDC)
        + perpendicularScreenSpaceDirection * halfAAPaddedLineWidthAndAmplitudeNDC
      );

      projPos.xy += ndcOffset * projPos.w;
      projPos.z += (dzPerPixel * (aaPaddedRoundedCapSizePixels + extensionLengthPixels)) * sideness.y * projPos.w;

      projPos = adjustProjectedPosition(projPos, worldNormal, 1.0 + max((lineWidthAndAmplitudePixels - 1.0) * 0.5, 0.0));

      // Line length with end caps
      float aaPaddedLineWithCapsLengthPixels = extendedLineLengthPixels + aaPaddedRoundedCapSizePixels + aaPaddedRoundedCapSizePixels;

      float pixelPositionAlongLine = aaPaddedLineWithCapsLengthPixels * sidenessNorm.y - aaPaddedRoundedCapSizePixels;

      // Position in pixels with origin at first vertex of line segment
      vPosition = vec3(
        halfAAPaddedLineWidthAndAmplitudePixels * sideness.x,
        pixelPositionAlongLine,
        pixelPositionAlongLine / extendedLineLengthPixels
      );

      // The line width radius in pixels
      vRadius = lineWidthPixels * 0.5;
      vLineLengthPixels = extendedLineLengthPixels;

      // discard short edges below a certain length threshold
      ${n(s||P,t`if (lineLengthPixels <= 3.0 ${n(P," && unpackedAttributes.type <= 0.0")}) {
                gl_Position = vec4(10.0, 10.0, 10.0, 1.0);
                return;
             }`)}
      gl_Position = projPos;
    }`),o.main.add(t`
    ComponentData component = readComponentData();
    UnpackedAttributes unpackedAttributes = unpackAttributes(component);

    vec3 worldPosV0, worldPosV1, viewPosV0, viewPosV1;
    worldAndViewFromModelPosition(position0, component.verticalOffset, worldPosV0, viewPosV0);
    worldAndViewFromModelPosition(position1, component.verticalOffset, worldPosV1, viewPosV1);

    // Component color
    vColor = component.color;

    // Discard fully transparent edges
    if (vColor.a < ${t.float(E)}) {
      gl_Position = vec4(10.0, 10.0, 10.0, 1.0);
      return;
    }

    if (discardNonSilhouetteEdges(viewPosV0, worldPosV0, component)) {
      return;
    }

    // General geometric computation for all types of edges
    calculateGeometricOutputs(viewPosV0, viewPosV1, worldPosV0, worldPosV1, worldNormal(component), unpackedAttributes);

    // Specific computation for different edge styles
    calculateStyleOutputs(unpackedAttributes);`),a.code.add(t`float lineWithCapsDistance(float radius, vec2 position, float lineLength) {
float positionX = position.x - calculateLineOffset();
if (radius < 1.0) {
float coverageX = clamp(min(radius, positionX + 0.5) - max(-radius, positionX - 0.5), 0.0, 1.0);
float coverageY = clamp(min(lineLength, position.y + 0.5) - max(0.0, position.y - 0.5), 0.0, 1.0);
return 0.5 - min(coverageX, coverageY);
}
else {
float positionOnCap = position.y - clamp(position.y, 0.0, lineLength);
return length(vec2(positionX, positionOnCap)) - radius;
}
}`),a.main.add(t`discardByTerrainDepth();
float radius = vRadius * calculateLinePressure();
float distance = lineWithCapsDistance(radius, vPosition.xy, vLineLengthPixels);
float coverage = clamp(0.5 - distance, 0.0, 1.0);
discardBySlice(vWorldPosition);
fragColor = vec4(vColor.rgb, vColor.a * coverage);`),e}var _=w(),f=class extends A{constructor(e){super(e,"mat4")}},_e=Object.freeze(Object.defineProperty({__proto__:null,build:I},Symbol.toStringTag,{value:"Module"}));export{I as a,_e as b};
