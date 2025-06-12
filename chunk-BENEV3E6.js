import{a as fe,d as ve,j as ue}from"./chunk-R3G2IXBO.js";import{a as me}from"./chunk-BSKAVVQS.js";import{b as d}from"./chunk-CMKJEBQJ.js";import{a as se}from"./chunk-6L543SC5.js";import{a as de,b as ce}from"./chunk-7GUYYJRR.js";import{a as ee}from"./chunk-WS4AMEGN.js";import{b as ne,e as ae}from"./chunk-PMLKCTEJ.js";import{a as te}from"./chunk-SFANISLX.js";import{a as le}from"./chunk-GSXOR3JU.js";import{a as pe}from"./chunk-55OTJIMU.js";import{a as b}from"./chunk-VGAXEXH3.js";import{c as X}from"./chunk-76X7RFM4.js";import{a as Z,b as Y,d as T}from"./chunk-HMNTGQTR.js";import{a as L}from"./chunk-GVSOJUIP.js";import{a as re}from"./chunk-2PJRHNJW.js";import{a as P}from"./chunk-B2RVSTL3.js";import{a as Q}from"./chunk-F6TN7E7K.js";import{a as m}from"./chunk-HUUJBVXR.js";import{a as ie}from"./chunk-4LDVFWME.js";import{a as oe}from"./chunk-A45BLB26.js";import{a as q}from"./chunk-WVKBXQWE.js";import{a as G}from"./chunk-YEXMIDOT.js";import{a as K}from"./chunk-SOEEM7Z7.js";import{a as t,b as H}from"./chunk-47NSYSFY.js";import{a as J}from"./chunk-K7YQAHQ7.js";import{a as S}from"./chunk-RWCIDBNQ.js";import{l as $,n as k}from"./chunk-HM5RIVQC.js";import{a as M,f as B}from"./chunk-PTZYZULI.js";import{c as U}from"./chunk-NMLYCCKN.js";import{B as N}from"./chunk-QHVIRF5H.js";import{a as p}from"./chunk-QGVBCWUY.js";var R=class{constructor(i,a,r){this._createTexture=i,this._parametersKey=a,this._repository=new Map,this._orphanCache=r.newCache(`procedural-texture-repository:${N()}`,o=>o.dispose())}destroy(){for(let{texture:i}of this._repository.values())i.dispose();this._repository.clear(),this._orphanCache.destroy()}swap(i,a=null){let r=this._acquire(i);return this.release(a),r}release(i){if(i==null)return;let a=this._parametersKey(i),r=this._repository.get(a);if(r&&(r.refCount--,r.refCount===0)){this._repository.delete(a);let{texture:o}=r;this._orphanCache.put(a,o)}}_acquire(i){if(i==null)return null;let a=this._parametersKey(i),r=this._repository.get(a);if(r)return r.refCount++,r.texture;let o=this._orphanCache.pop(a)??this._createTexture(i),n=new F(o);return this._repository.set(a,n),o}},F=class{constructor(i){this.texture=i,this.refCount=1}};function ze(e,i){return new R(a=>{let{encodedData:r,textureSize:o}=De(a),n=new ne;return n.internalFormat=k.RGBA,n.width=o,n.height=1,n.wrapMode=$.REPEAT,new ae(e,n,r)},a=>`${a.pattern.join(",")}-r${a.pixelRatio}`,i)}function De(e){let i=A(e),a=1/e.pixelRatio,r=O(e),o=z(e),n=(Math.floor(.5*(o-1))+.5)*a,x=[],f=1;for(let h of i){for(let v=0;v<h;v++){let w=f*(Math.min(v,h-1-v)+.5)*a/n*.5+.5;x.push(w)}f=-f}let y=Math.round(i[0]/2),C=[...x.slice(y),...x.slice(0,y)],c=new Uint8Array(4*r),D=0;for(let h of C)J(h,c,D),D+=4;return{encodedData:c,textureSize:r}}function A(e){return e.pattern.map(i=>Math.round(i*e.pixelRatio))}function O(e){if(e==null)return 1;let i=A(e);return Math.floor(i.reduce((a,r)=>a+r))}function z(e){return A(e).reduce((i,a)=>Math.max(i,a))}function he(e){return e==null?B:e.length===4?e:U(Le,e[0],e[1],e[2],1)}var Le=M();function ge(e,i){if(!i.stippleEnabled)return void e.fragment.code.add(t`float getStippleAlpha() { return 1.0; }
void discardByStippleAlpha(float stippleAlpha, float threshold) {}
vec4 blendStipple(vec4 color, float stippleAlpha) { return color; }`);let a=!(i.draped&&i.stipplePreferContinuous),{vertex:r,fragment:o}=e;o.include(q),i.draped||(Z(r,i),r.uniforms.add(new P("worldToScreenPerDistanceRatio",({camera:n})=>1/n.perScreenPixelRatio)).code.add(t`float computeWorldToScreenRatio(vec3 segmentCenter) {
float segmentDistanceToCamera = length(segmentCenter - cameraPosition);
return worldToScreenPerDistanceRatio / segmentDistanceToCamera;
}`)),e.varyings.add("vStippleDistance","float"),e.varyings.add("vStippleDistanceLimits","vec2"),e.varyings.add("vStipplePatternStretch","float"),r.code.add(t`
    float discretizeWorldToScreenRatio(float worldToScreenRatio) {
      float step = ${t.float(Ce)};

      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);
      return discreteWorldToScreenRatio;
    }
  `),r.code.add(t`vec2 computeStippleDistanceLimits(float startPseudoScreen, float segmentLengthPseudoScreen, float segmentLengthScreen, float patternLength) {`),r.code.add(t`
    if (segmentLengthPseudoScreen >= ${a?"patternLength":"1e4"}) {
  `),T(r),r.code.add(t`float repetitions = segmentLengthScreen / (patternLength * pixelRatio);
float flooredRepetitions = max(1.0, floor(repetitions + 0.5));
float segmentLengthScreenRounded = flooredRepetitions * patternLength;
float stretch = repetitions / flooredRepetitions;
vStipplePatternStretch = max(0.75, stretch);
return vec2(0.0, segmentLengthScreenRounded);
}
return vec2(startPseudoScreen, startPseudoScreen + segmentLengthPseudoScreen);
}`),o.uniforms.add(new ie("stipplePatternTexture",n=>n.stippleTexture),new m("stipplePatternSDFNormalizer",n=>ye(n.stipplePattern)),new m("stipplePatternPixelSizeInv",n=>1/E(n))),i.stippleOffColorEnabled&&o.uniforms.add(new L("stippleOffColor",n=>he(n.stippleOffColor))),o.code.add(t`float getStippleSDF(out bool isClamped) {
float stippleDistanceClamped = clamp(vStippleDistance, vStippleDistanceLimits.x, vStippleDistanceLimits.y);
vec2 aaCorrectedLimits = vStippleDistanceLimits + vec2(1.0, -1.0) / gl_FragCoord.w;
isClamped = vStippleDistance < aaCorrectedLimits.x || vStippleDistance > aaCorrectedLimits.y;
float u = stippleDistanceClamped * gl_FragCoord.w * stipplePatternPixelSizeInv * vLineSizeInv;
u = fract(u);
float encodedSDF = rgbaTofloat(texture(stipplePatternTexture, vec2(u, 0.5)));
float sdf = (encodedSDF * 2.0 - 1.0) * stipplePatternSDFNormalizer;
return (sdf - 0.5) * vStipplePatternStretch + 0.5;
}
float getStippleSDF() {
bool ignored;
return getStippleSDF(ignored);
}
float getStippleAlpha() {
bool isClamped;
float stippleSDF = getStippleSDF(isClamped);
float antiAliasedResult = clamp(stippleSDF * vLineWidth + 0.5, 0.0, 1.0);
return isClamped ? floor(antiAliasedResult + 0.5) : antiAliasedResult;
}`),o.code.add(t`
    void discardByStippleAlpha(float stippleAlpha, float threshold) {
     ${H(!i.stippleOffColorEnabled,"if (stippleAlpha < threshold) { discard; }")}
    }

    vec4 blendStipple(vec4 color, float stippleAlpha) {
      return ${i.stippleOffColorEnabled?"mix(color, stippleOffColor, stippleAlpha)":"vec4(color.rgb, color.a * stippleAlpha)"};
    }
  `)}function ye(e){return e?(Math.floor(.5*(z(e)-1))+.5)/e.pixelRatio:1}function E(e){let i=e.stipplePattern;return i?O(e.stipplePattern)/i.pixelRatio:1}var Ce=.4;var u;(function(e){e[e.BUTT=0]="BUTT",e[e.SQUARE=1]="SQUARE",e[e.ROUND=2]="ROUND",e[e.COUNT=3]="COUNT"})(u||(u={}));var l=class extends me{constructor(){super(...arguments),this.capType=u.BUTT,this.hasPolygonOffset=!1,this.writeDepth=!1,this.draped=!1,this.stippleEnabled=!1,this.stippleOffColorEnabled=!1,this.stipplePreferContinuous=!0,this.roundJoins=!1,this.applyMarkerOffset=!1,this.vvSize=!1,this.vvColor=!1,this.vvOpacity=!1,this.falloffEnabled=!1,this.innerColorEnabled=!1,this.hasOccludees=!1,this.occluder=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.wireframe=!1,this.discardInvisibleFragments=!1,this.objectAndLayerIdColorInstanced=!1,this.textureCoordinateType=ee.None,this.emissionSource=de.None,this.occlusionPass=!1,this.hasVvInstancing=!0,this.hasSliceTranslatedView=!0}};p([d({count:u.COUNT})],l.prototype,"capType",void 0),p([d()],l.prototype,"hasPolygonOffset",void 0),p([d()],l.prototype,"writeDepth",void 0),p([d()],l.prototype,"draped",void 0),p([d()],l.prototype,"stippleEnabled",void 0),p([d()],l.prototype,"stippleOffColorEnabled",void 0),p([d()],l.prototype,"stipplePreferContinuous",void 0),p([d()],l.prototype,"roundJoins",void 0),p([d()],l.prototype,"applyMarkerOffset",void 0),p([d()],l.prototype,"vvSize",void 0),p([d()],l.prototype,"vvColor",void 0),p([d()],l.prototype,"vvOpacity",void 0),p([d()],l.prototype,"falloffEnabled",void 0),p([d()],l.prototype,"innerColorEnabled",void 0),p([d()],l.prototype,"hasOccludees",void 0),p([d()],l.prototype,"occluder",void 0),p([d()],l.prototype,"terrainDepthTest",void 0),p([d()],l.prototype,"cullAboveTerrain",void 0),p([d()],l.prototype,"wireframe",void 0),p([d()],l.prototype,"discardInvisibleFragments",void 0),p([d()],l.prototype,"objectAndLayerIdColorInstanced",void 0);var W=1;function Pe(e){let i=new oe,{attributes:a,varyings:r,vertex:o,fragment:n}=i,{applyMarkerOffset:x,draped:f,output:y,capType:C,stippleEnabled:c,falloffEnabled:D,roundJoins:h,wireframe:v,innerColorEnabled:w}=e;i.include(se),i.include(ve,e),i.include(ge,e),i.include(te,e),i.include(le,e);let j=x&&!f;j&&(o.uniforms.add(new m("markerScale",s=>s.markerScale)),i.include(ue,{space:fe.World})),Y(o,e),o.uniforms.add(new K("inverseProjectionMatrix",s=>s.camera.inverseProjectionMatrix),new Q("nearFar",s=>s.camera.nearFar),new m("miterLimit",s=>s.join!=="miter"?0:s.miterLimit),new re("viewport",s=>s.camera.fullViewport)),o.constants.add("LARGE_HALF_FLOAT","float",65500),a.add(S.POSITION,"vec3"),a.add(S.PREVPOSITION,"vec3"),a.add(S.NEXTPOSITION,"vec3"),a.add(S.SUBDIVISIONFACTOR,"float"),a.add(S.UV0,"vec2"),r.add("vColor","vec4"),r.add("vpos","vec3"),r.add("vLineDistance","float"),r.add("vLineWidth","float");let _=c;_&&r.add("vLineSizeInv","float");let g=C===u.ROUND,V=c&&g,I=D||V;I&&r.add("vLineDistanceNorm","float"),g&&(r.add("vSegmentSDF","float"),r.add("vReverseSegmentSDF","float")),o.code.add(t`vec2 perpendicular(vec2 v) {
return vec2(v.y, -v.x);
}
float interp(float ncp, vec4 a, vec4 b) {
return (-ncp - a.z) / (b.z - a.z);
}
vec2 rotate(vec2 v, float a) {
float s = sin(a);
float c = cos(a);
mat2 m = mat2(c, -s, s, c);
return m * v;
}`),o.code.add(t`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),o.code.add(t`void clipAndTransform(inout vec4 pos, inout vec4 prev, inout vec4 next, in bool isStartVertex) {
float vnp = nearFar[0] * 0.99;
if(pos.z > -nearFar[0]) {
if (!isStartVertex) {
if(prev.z < -nearFar[0]) {
pos = mix(prev, pos, interp(vnp, prev, pos));
next = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
} else {
if(next.z < -nearFar[0]) {
pos = mix(pos, next, interp(vnp, pos, next));
prev = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
}
} else {
if (prev.z > -nearFar[0]) {
prev = mix(pos, prev, interp(vnp, pos, prev));
}
if (next.z > -nearFar[0]) {
next = mix(next, pos, interp(vnp, next, pos));
}
}
forwardViewPosDepth(pos.xyz);
pos = projectAndScale(pos);
next = projectAndScale(next);
prev = projectAndScale(prev);
}`),T(o),o.constants.add("aaWidth","float",c?0:1).main.add(t`
    // unpack values from uv0.y
    bool isStartVertex = abs(abs(uv0.y)-3.0) == 1.0;

    float coverage = 1.0;

    // Check for special value of uv0.y which is used by the Renderer when graphics
    // are removed before the VBO is recompacted. If this is the case, then we just
    // project outside of clip space.
    if (uv0.y == 0.0) {
      // Project out of clip space
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
    }
    else {
      bool isJoin = abs(uv0.y) < 3.0;
      float lineSize = getSize();

      if (lineSize < 1.0) {
        coverage = lineSize; // convert sub-pixel coverage to alpha
        lineSize = 1.0;
      }
      lineSize += aaWidth;

      float lineWidth = lineSize * pixelRatio;
      vLineWidth = lineWidth;
      ${_?t`vLineSizeInv = 1.0 / lineSize;`:""}

      vec4 pos  = view * vec4(position, 1.0);
      vec4 prev = view * vec4(prevPosition, 1.0);
      vec4 next = view * vec4(nextPosition, 1.0);
  `),j&&o.main.add(t`vec4 other = isStartVertex ? next : prev;
bool markersHidden = areWorldMarkersHidden(pos, other);
if(!isJoin && !markersHidden) {
pos.xyz += normalize(other.xyz - pos.xyz) * getWorldMarkerSize(pos) * 0.5;
}`),o.main.add(t`clipAndTransform(pos, prev, next, isStartVertex);
vec2 left = (pos.xy - prev.xy);
vec2 right = (next.xy - pos.xy);
float leftLen = length(left);
float rightLen = length(right);`),(c||g)&&o.main.add(t`
      float isEndVertex = float(!isStartVertex);
      vec2 segmentOrigin = mix(pos.xy, prev.xy, isEndVertex);
      vec2 segment = mix(right, left, isEndVertex);
      ${g?t`vec2 segmentEnd = mix(next.xy, pos.xy, isEndVertex);`:""}
    `),o.main.add(t`left = (leftLen > 0.001) ? left/leftLen : vec2(0.0, 0.0);
right = (rightLen > 0.001) ? right/rightLen : vec2(0.0, 0.0);
vec2 capDisplacementDir = vec2(0, 0);
vec2 joinDisplacementDir = vec2(0, 0);
float displacementLen = lineWidth;
if (isJoin) {
bool isOutside = (left.x * right.y - left.y * right.x) * uv0.y > 0.0;
joinDisplacementDir = normalize(left + right);
joinDisplacementDir = perpendicular(joinDisplacementDir);
if (leftLen > 0.001 && rightLen > 0.001) {
float nDotSeg = dot(joinDisplacementDir, left);
displacementLen /= length(nDotSeg * left - joinDisplacementDir);
if (!isOutside) {
displacementLen = min(displacementLen, min(leftLen, rightLen)/abs(nDotSeg));
}
}
if (isOutside && (displacementLen > miterLimit * lineWidth)) {`),h?o.main.add(t`
        vec2 startDir = leftLen < 0.001 ? right : left;
        startDir = perpendicular(startDir);

        vec2 endDir = rightLen < 0.001 ? left : right;
        endDir = perpendicular(endDir);

        float factor = ${c?t`min(1.0, subdivisionFactor * ${t.float((W+2)/(W+1))})`:t`subdivisionFactor`};

        float rotationAngle = acos(clamp(dot(startDir, endDir), -1.0, 1.0));
        joinDisplacementDir = rotate(startDir, -sign(uv0.y) * factor * rotationAngle);
      `):o.main.add(t`if (leftLen < 0.001) {
joinDisplacementDir = right;
}
else if (rightLen < 0.001) {
joinDisplacementDir = left;
}
else {
joinDisplacementDir = (isStartVertex || subdivisionFactor > 0.0) ? right : left;
}
joinDisplacementDir = perpendicular(joinDisplacementDir);`);let Se=C!==u.BUTT;return o.main.add(t`
        displacementLen = lineWidth;
      }
    } else {
      // CAP handling ---------------------------------------------------
      joinDisplacementDir = isStartVertex ? right : left;
      joinDisplacementDir = perpendicular(joinDisplacementDir);

      ${Se?t`capDisplacementDir = isStartVertex ? -right : left;`:""}
    }
  `),o.main.add(t`
    // Displacement (in pixels) caused by join/or cap
    vec2 dpos = joinDisplacementDir * sign(uv0.y) * displacementLen + capDisplacementDir * displacementLen;
    float lineDistNorm = sign(uv0.y) * pos.w;

    vLineDistance =  lineWidth * lineDistNorm;
    ${I?t`vLineDistanceNorm = lineDistNorm;`:""}

    pos.xy += dpos;
  `),g&&o.main.add(t`vec2 segmentDir = normalize(segment);
vSegmentSDF = (isJoin && isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentOrigin, segmentDir) * pos.w) ;
vReverseSegmentSDF = (isJoin && !isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentEnd, -segmentDir) * pos.w);`),c&&(f?o.uniforms.add(new P("worldToScreenRatio",s=>1/s.screenToPCSRatio)):o.main.add(t`vec3 segmentCenter = mix((nextPosition + position) * 0.5, (position + prevPosition) * 0.5, isEndVertex);
float worldToScreenRatio = computeWorldToScreenRatio(segmentCenter);`),o.main.add(t`float segmentLengthScreenDouble = length(segment);
float segmentLengthScreen = segmentLengthScreenDouble * 0.5;
float discreteWorldToScreenRatio = discretizeWorldToScreenRatio(worldToScreenRatio);
float segmentLengthRender = length(mix(nextPosition - position, position - prevPosition, isEndVertex));
vStipplePatternStretch = worldToScreenRatio / discreteWorldToScreenRatio;`),f?o.main.add(t`float segmentLengthPseudoScreen = segmentLengthScreen / pixelRatio * discreteWorldToScreenRatio / worldToScreenRatio;
float startPseudoScreen = uv0.x * discreteWorldToScreenRatio - mix(0.0, segmentLengthPseudoScreen, isEndVertex);`):o.main.add(t`float startPseudoScreen = mix(uv0.x, uv0.x - segmentLengthRender, isEndVertex) * discreteWorldToScreenRatio;
float segmentLengthPseudoScreen = segmentLengthRender * discreteWorldToScreenRatio;`),o.uniforms.add(new m("stipplePatternPixelSize",s=>E(s))),o.main.add(t`float patternLength = lineSize * stipplePatternPixelSize;
vStippleDistanceLimits = computeStippleDistanceLimits(startPseudoScreen, segmentLengthPseudoScreen, segmentLengthScreen, patternLength);
vStippleDistance = mix(vStippleDistanceLimits.x, vStippleDistanceLimits.y, isEndVertex);
if (segmentLengthScreenDouble >= 0.001) {
vec2 stippleDisplacement = pos.xy - segmentOrigin;
float stippleDisplacementFactor = dot(segment, stippleDisplacement) / (segmentLengthScreenDouble * segmentLengthScreenDouble);
vStippleDistance += (stippleDisplacementFactor - isEndVertex) * (vStippleDistanceLimits.y - vStippleDistanceLimits.x);
}
vStippleDistanceLimits *= pos.w;
vStippleDistance *= pos.w;
vStippleDistanceLimits = isJoin ?
vStippleDistanceLimits :
isStartVertex ?
vec2(-1e34, vStippleDistanceLimits.y) :
vec2(vStippleDistanceLimits.x, 1e34);`)),o.main.add(t`
      // Convert back into NDC
      pos.xy = (pos.xy / viewport.zw) * pos.w;

      vColor = getColor();
      vColor.a *= coverage;

      ${v&&!f?"pos.z -= 0.001 * pos.w;":""}

      // transform final position to camera space for slicing
      vpos = (inverseProjectionMatrix * pos).xyz;
      gl_Position = pos;
      forwardObjectAndLayerIdColor();
    }`),i.fragment.include(X,e),i.include(ce,e),n.include(pe),n.main.add(t`discardBySlice(vpos);
discardByTerrainDepth();`),v?n.main.add(t`vec4 finalColor = vec4(1.0, 0.0, 1.0, 1.0);`):(g&&n.main.add(t`
        float sdf = min(vSegmentSDF, vReverseSegmentSDF);
        vec2 fragmentPosition = vec2(
          min(sdf, 0.0),
          vLineDistance
        ) * gl_FragCoord.w;

        float fragmentRadius = length(fragmentPosition);
        float fragmentCapSDF = (fragmentRadius - vLineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
        float capCoverage = clamp(0.5 - fragmentCapSDF, 0.0, 1.0);

        if (capCoverage < ${t.float(b)}) {
          discard;
        }
      `),V?n.main.add(t`
      vec2 stipplePosition = vec2(
        min(getStippleSDF() * 2.0 - 1.0, 0.0),
        vLineDistanceNorm * gl_FragCoord.w
      );
      float stippleRadius = length(stipplePosition * vLineWidth);
      float stippleCapSDF = (stippleRadius - vLineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
      float stippleCoverage = clamp(0.5 - stippleCapSDF, 0.0, 1.0);
      float stippleAlpha = step(${t.float(b)}, stippleCoverage);
      `):n.main.add(t`float stippleAlpha = getStippleAlpha();`),y!==G.ObjectAndLayerIdColor&&n.main.add(t`discardByStippleAlpha(stippleAlpha, ${t.float(b)});`),n.uniforms.add(new L("intrinsicColor",s=>s.color)),n.main.add(t`vec4 color = intrinsicColor * vColor;`),w&&(n.uniforms.add(new L("innerColor",s=>s.innerColor??s.color),new m("innerWidth",(s,xe)=>s.innerWidth*xe.camera.pixelRatio)),n.main.add(t`float distToInner = abs(vLineDistance * gl_FragCoord.w) - innerWidth;
float innerAA = clamp(0.5 - distToInner, 0.0, 1.0);
float innerAlpha = innerColor.a + color.a * (1.0 - innerColor.a);
color = mix(color, vec4(innerColor.rgb, innerAlpha), innerAA);`)),n.main.add(t`vec4 finalColor = blendStipple(color, stippleAlpha);`),D&&(n.uniforms.add(new m("falloff",s=>s.falloff)),n.main.add(t`finalColor.a *= pow(max(0.0, 1.0 - abs(vLineDistanceNorm * gl_FragCoord.w)), falloff);`)),c||n.main.add(t`float featherStartDistance = max(vLineWidth - 2.0, 0.0);
float value = abs(vLineDistance) * gl_FragCoord.w;
float feather = (value - featherStartDistance) / (vLineWidth - featherStartDistance);
finalColor.a *= 1.0 - clamp(feather, 0.0, 1.0);`)),n.main.add(t`outputColorHighlightOID(finalColor, vpos);`),i}var yt=Object.freeze(Object.defineProperty({__proto__:null,build:Pe,ribbonlineNumRoundJoinSubdivisions:W},Symbol.toStringTag,{value:"Module"}));export{R as a,ze as b,u as c,l as d,W as e,Pe as f,yt as g};
