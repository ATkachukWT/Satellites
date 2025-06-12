import{a as S}from"./chunk-B7E6TWPE.js";import{a as l}from"./chunk-2L3Q5NER.js";import{b as z}from"./chunk-Y7XG5IWW.js";import{a as D}from"./chunk-YVCKQBWT.js";import{a as x}from"./chunk-4XEE5PE3.js";import{a as v}from"./chunk-GVSOJUIP.js";import{a as f}from"./chunk-GWSX6PRO.js";import{a as r}from"./chunk-ELCBU4NP.js";import{a as P}from"./chunk-2CKJLDTO.js";import{a}from"./chunk-HUUJBVXR.js";import{a as u}from"./chunk-4LDVFWME.js";import{a as w}from"./chunk-A45BLB26.js";import{a as g}from"./chunk-WVKBXQWE.js";import{a as m}from"./chunk-SOEEM7Z7.js";import{a as i}from"./chunk-47NSYSFY.js";import{a as d}from"./chunk-ALWV3RJ2.js";import{u as n,y as s}from"./chunk-6B5XFA6F.js";import{f as p,h as c}from"./chunk-ZTOZWLEE.js";import{a as h}from"./chunk-BOVYXYHK.js";function M(t){let o=t.fragment;t.include(D),o.include(P),o.code.add(i`vec3 normalFromDepth(sampler2D depthMap, vec3 pixelPos, vec2 fragCoord, vec2 uv) {
ivec2 iuv = ivec2(uv * vec2(textureSize(depthMap, 0)));
float leftPixelDepth = linearizeDepth(texelFetch(depthMap, iuv + ivec2(-1, 0), 0).r);
float rightPixelDepth = linearizeDepth(texelFetch(depthMap, iuv + ivec2(1, 0), 0).r);
float bottomPixelDepth = linearizeDepth(texelFetch(depthMap, iuv + ivec2(0, -1), 0).r);
float topPixelDepth = linearizeDepth(texelFetch(depthMap, iuv + ivec2(0, 1), 0).r);
bool pickLeft = abs(pixelPos.z - leftPixelDepth) < abs(pixelPos.z - rightPixelDepth);
bool pickBottom = abs(pixelPos.z - bottomPixelDepth) < abs(pixelPos.z - topPixelDepth);
vec3 fragCoordHorizontal = pickLeft
? vec3(fragCoord + vec2(-1.0, 0.0), leftPixelDepth)
: vec3(fragCoord + vec2(1.0, 0.0), rightPixelDepth);
vec3 fragCoordVertical = pickBottom
? vec3(fragCoord + vec2(0.0, -1.0), bottomPixelDepth)
: vec3(fragCoord + vec2(0.0, 1.0), topPixelDepth);
vec3 verticalPixelPos = reconstructPosition(fragCoordHorizontal.xy, fragCoordHorizontal.z);
vec3 horizontalPixelPos = reconstructPosition(fragCoordVertical.xy, fragCoordVertical.z);
vec3 normal = normalize(cross(verticalPixelPos - pixelPos, horizontalPixelPos - pixelPos));
return pickLeft == pickBottom ? normal : -normal;
}`)}var F=.025;function T(){let t=new w;t.include(z,H),t.include(x),t.include(M);let o=t.fragment;return o.include(g),o.uniforms.add(new r("defaultDepthTex",e=>e.shadowMap.getSnapshot(l.ExcludeHighlight)),new r("highlightDepthTex",e=>e.shadowMap.getSnapshot(l.Highlight)),new r("depthMap",e=>e.depth?.attachment),new u("highlightTexture",e=>e.highlight),new v("uColor",e=>e.shadowColor),new a("opacity",e=>e.shadowOpacity),new a("occludedOpacity",e=>e.occludedShadowOpacity),new a("terminationFactor",e=>e.opacityElevation*e.dayNightTerminator),new f("lightingMainDirectionView",({lighting:e,camera:C})=>n(y,s(y,e.mainLight.direction,C.viewInverseTransposeMatrix))),new m("inverseViewMatrix",({camera:e})=>p(b,c(b,e.viewMatrix,e.center)))).main.add(i`
    ivec2 highlightTextureSize = textureSize(highlightTexture, 0);
    ivec2 highlightIUV = ivec2(uv * vec2(highlightTextureSize));
    vec4 highlightInfo = texelFetch(highlightTexture, highlightIUV, 0);

    fragColor = vec4(0.0);

    // Calculate bit mask to check if pixel is highlit unoccluded at any level
    int ored =
         (int(highlightInfo.r*255.0) << 0)
       | (int(highlightInfo.g*255.0) << 8);
    bool visiblyHighlighted = ((ored & ~(ored >> 1)) & (1+4+16+64)) != 0;
    if (visiblyHighlighted) {
      return;
    }

    // 1.0 is the clear value of depthMap, which means nothing has been drawn there and we should discard
    float depth = depthFromTexture(depthMap, uv);
    if (depth >= 1.0 || depth <= 0.0) {
      return;
    }

    float currentPixelDepth = linearizeDepth(depth);
    vec4 currentPixelPos = vec4(reconstructPosition(gl_FragCoord.xy, currentPixelDepth), 1.0);
    vec4 worldSpacePos = inverseViewMatrix * currentPixelPos;

    mat4 shadowMatrix;
    float linearDepth = -currentPixelDepth;
    int i = chooseCascade(linearDepth, shadowMatrix);
    if (i >= numCascades) {
      return;
    }

    // vertex completely outside? -> no shadow
    vec3 lvpos = lightSpacePosition(worldSpacePos.xyz, shadowMatrix);
    if (lvpos.z >= 1.0 || lvpos.x < 0.0 || lvpos.x > 1.0 || lvpos.y < 0.0 || lvpos.y > 1.0) {
      return;
    }

    ivec2 texSize = textureSize(highlightDepthTex, 0);
    ivec2 uvShadow = ivec2(cascadeCoordinates(i, texSize, lvpos) * vec2(texSize));

    float depthHighlight = readShadowMapDepth(uvShadow, highlightDepthTex);
    bool shadowHighlight = depthHighlight < lvpos.z;
    if (!shadowHighlight) {
      return;
    }

    float depthDefault = readShadowMapDepth(uvShadow, defaultDepthTex);
    bool shadowDefault = depthDefault < lvpos.z;

    vec3 normal = normalFromDepth(depthMap, currentPixelPos.xyz, gl_FragCoord.xy, uv);
    bool shaded = dot(normal, lightingMainDirectionView) < ${i.float(F)};

    float fragOpacity = (shadowDefault || shaded) ? occludedOpacity : opacity;
    fragColor = vec4(uColor.rgb, uColor.a * fragOpacity * terminationFactor);
  `),t}var b=d(),y=h(),H=new S,Z=Object.freeze(Object.defineProperty({__proto__:null,build:T},Symbol.toStringTag,{value:"Module"}));export{T as a,Z as b};
