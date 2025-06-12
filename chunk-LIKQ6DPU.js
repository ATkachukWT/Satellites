import{a as Y}from"./chunk-H6LI7TZP.js";import{a as K}from"./chunk-2IWALBQY.js";import{a as D,b as R,c as I,d as H}from"./chunk-QQ5W5TEP.js";import{a as S,d as W,f as so}from"./chunk-YQHQQW4I.js";import{c as Q,d as oo,e as ro,f as eo}from"./chunk-IZU6TNEP.js";import{b as ao,c as io}from"./chunk-Y7XG5IWW.js";import{a as J}from"./chunk-FQIIIJGL.js";import{f as T,g as X}from"./chunk-SZTSN5BD.js";import{b as Z}from"./chunk-VAOSSSLB.js";import{a as F}from"./chunk-CUV3BSEW.js";import{a as L}from"./chunk-6FI5AY7X.js";import{d as A}from"./chunk-ZCAR53EN.js";import{a as O}from"./chunk-DH67ILIV.js";import{b as no}from"./chunk-7GUYYJRR.js";import{a as d,b as B}from"./chunk-WS4AMEGN.js";import{d as G}from"./chunk-KALTBP5D.js";import{a as j}from"./chunk-422PSKZ7.js";import{a as to}from"./chunk-GSXOR3JU.js";import{a as z}from"./chunk-VGAXEXH3.js";import{c as E}from"./chunk-76X7RFM4.js";import{a as p,b as $}from"./chunk-HMNTGQTR.js";import{a as _}from"./chunk-GVSOJUIP.js";import{a as g}from"./chunk-HUUJBVXR.js";import{a as k}from"./chunk-4LDVFWME.js";import{a as q}from"./chunk-A45BLB26.js";import{a as N,b as m}from"./chunk-EDOVNTC7.js";import{a as l}from"./chunk-FGEB67EG.js";import{h as M}from"./chunk-YEXMIDOT.js";import{a as x}from"./chunk-T7PUQGWM.js";import{a as e,b as t}from"./chunk-47NSYSFY.js";import{d as n}from"./chunk-DEH76MSI.js";import{a as P}from"./chunk-RWCIDBNQ.js";function lo(o,r){r.hasColorTextureTransform?(o.varyings.add("colorUV","vec2"),o.vertex.uniforms.add(new l("colorTextureTransformMatrix",a=>a.colorTextureTransformMatrix??n)).code.add(e`void forwardColorUV(){
colorUV = (colorTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):o.vertex.code.add(e`void forwardColorUV(){}`)}function mo(o,r){r.hasNormalTextureTransform&&r.textureCoordinateType!==d.None?(o.varyings.add("normalUV","vec2"),o.vertex.uniforms.add(new l("normalTextureTransformMatrix",a=>a.normalTextureTransformMatrix??n)).code.add(e`void forwardNormalUV(){
normalUV = (normalTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):o.vertex.code.add(e`void forwardNormalUV(){}`)}function co(o,r){r.hasEmissionTextureTransform&&r.textureCoordinateType!==d.None?(o.varyings.add("emissiveUV","vec2"),o.vertex.uniforms.add(new l("emissiveTextureTransformMatrix",a=>a.emissiveTextureTransformMatrix??n)).code.add(e`void forwardEmissiveUV(){
emissiveUV = (emissiveTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):o.vertex.code.add(e`void forwardEmissiveUV(){}`)}function uo(o,r){r.hasOcclusionTextureTransform&&r.textureCoordinateType!==d.None?(o.varyings.add("occlusionUV","vec2"),o.vertex.uniforms.add(new l("occlusionTextureTransformMatrix",a=>a.occlusionTextureTransformMatrix??n)).code.add(e`void forwardOcclusionUV(){
occlusionUV = (occlusionTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):o.vertex.code.add(e`void forwardOcclusionUV(){}`)}function vo(o,r){r.hasMetallicRoughnessTextureTransform&&r.textureCoordinateType!==d.None?(o.varyings.add("metallicRoughnessUV","vec2"),o.vertex.uniforms.add(new l("metallicRoughnessTextureTransformMatrix",a=>a.metallicRoughnessTextureTransformMatrix??n)).code.add(e`void forwardMetallicRoughnessUV(){
metallicRoughnessUV = (metallicRoughnessTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):o.vertex.code.add(e`void forwardMetallicRoughnessUV(){}`)}function Co(o){let r=new q,{vertex:a,fragment:s,varyings:c}=r,{output:fo,normalType:u,offsetBackfaces:h,instancedColor:w,spherical:C,receiveShadows:xo,snowCover:v,pbrMode:V,textureAlphaPremultiplied:po,instancedDoublePrecision:go,hasVertexColors:b,hasVertexTangents:y,hasColorTexture:U,hasNormalTexture:To,hasNormalTextureTransform:ho,hasColorTextureTransform:wo}=o;if($(a,o),r.include(O),c.add("vpos","vec3"),r.include(j,o),r.include(R,o),r.include(G,o),r.include(lo,o),!M(fo))return r.include(H,o),r;r.include(mo,o),r.include(co,o),r.include(uo,o),r.include(vo,o),p(a,o),r.include(N,o),r.include(L,o);let f=u===m.Attribute||u===m.Compressed;return f&&h&&r.include(D),r.include(Y,o),r.include(S,o),w&&r.attributes.add(P.INSTANCECOLOR,"vec4"),c.add("vPositionLocal","vec3"),r.include(B,o),r.include(A,o),r.include(I,o),r.include(F,o),a.uniforms.add(new _("externalColor",i=>i.externalColor)),c.add("vcolorExt","vec4"),r.include(to,o),a.main.add(e`
    forwardNormalizedVertexColor();
    vcolorExt = externalColor;
    ${t(w,"vcolorExt *= instanceColor * 0.003921568627451;")}
    vcolorExt *= vvColor();
    vcolorExt *= getSymbolColor();
    forwardColorMixMode();

    vpos = getVertexInLocalOriginSpace();
    vPositionLocal = vpos - view[3].xyz;
    vpos = subtractOrigin(vpos);
    ${t(f,"vNormalWorld = dpNormal(vvLocalNormal(normalModel()));")}
    vpos = addVerticalOffset(vpos, localOrigin);
    ${t(y,"vTangent = dpTransformVertexTangent(tangent);")}
    gl_Position = transformPosition(proj, view, vpos);
    ${t(f&&h,"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);")}

    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardLinearDepth();
    forwardTextureCoordinates();
    forwardColorUV();
    forwardNormalUV();
    forwardEmissiveUV();
    forwardOcclusionUV();
    forwardMetallicRoughnessUV();

    if (vcolorExt.a < ${e.float(z)}) {
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
    }
  `),r.include(eo,o),r.include(Q,o),r.include(W,o),r.include(go?ao:io,o),r.fragment.include(E,o),r.include(no,o),p(s,o),s.uniforms.add(a.uniforms.get("localOrigin"),new x("ambient",i=>i.ambient),new x("diffuse",i=>i.diffuse),new g("opacity",i=>i.opacity),new g("layerOpacity",i=>i.layerOpacity)),U&&s.uniforms.add(new k("tex",i=>i.texture)),r.include(X,o),r.include(J,o),s.include(so),r.include(K,o),oo(s),ro(s),Z(s),s.main.add(e`
    discardBySlice(vpos);
    discardByTerrainDepth();
    ${U?e`
            vec4 texColor = texture(tex, ${wo?"colorUV":"vuv0"});
            ${t(po,"texColor.rgb /= texColor.a;")}
            discardOrAdjustAlpha(texColor);`:e`vec4 texColor = vec4(1.0);`}
    shadingParams.viewDirection = normalize(vpos - cameraPosition);
    ${u===m.ScreenDerivative?e`vec3 normal = screenDerivativeNormal(vPositionLocal);`:e`shadingParams.normalView = vNormalWorld;
                vec3 normal = shadingNormal(shadingParams);`}
    applyPBRFactors();
    float ssao = evaluateAmbientOcclusionInverse() * getBakedOcclusion();

    vec3 posWorld = vpos + localOrigin;

      float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
      float shadow = ${xo?"max(lightingGlobalFactor * (1.0 - additionalAmbientScale), readShadowMap(vpos, linearDepth))":t(C,"lightingGlobalFactor * (1.0 - additionalAmbientScale)","0.0")};

    vec3 matColor = max(ambient, diffuse);
    vec3 albedo = mixExternalColor(${t(b,"vColor.rgb *")} matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
    float opacity_ = layerOpacity * mixExternalOpacity(${t(b,"vColor.a * ")} opacity, texColor.a, vcolorExt.a, int(colorMixMode));
    ${To?`mat3 tangentSpace = computeTangentSpace(${y?"normal":"normal, vpos, vuv0"});
            vec3 shadingNormal = computeTextureNormal(tangentSpace, ${ho?"normalUV":"vuv0"});`:"vec3 shadingNormal = normal;"}
    vec3 normalGround = ${C?"normalize(posWorld);":"vec3(0.0, 0.0, 1.0);"}

    ${t(v,e`
          float snow = smoothstep(0.5, 0.55, dot(normal, normalGround));
          albedo = mix(albedo, vec3(1), snow);
          shadingNormal = mix(shadingNormal, normal, snow);
          ssao = mix(ssao, 1.0, snow);`)}

    vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

    ${V===T.Normal||V===T.Schematic?e`
            float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
            ${t(v,e`mrr = mix(mrr, vec3(0.0, 1.0, 0.04), snow);`)}
            vec4 emission = ${v?"mix(getEmissions(), vec4(0.0), snow)":"getEmissions()"};
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:e`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
    vec4 finalColor = vec4(shadedColor, opacity_);
    outputColorHighlightOID(finalColor, vpos);
  `),r}var mr=Object.freeze(Object.defineProperty({__proto__:null,build:Co},Symbol.toStringTag,{value:"Module"}));export{Co as a,mr as b};
