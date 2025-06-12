import{a as L,b as D,c as E,d as z}from"./chunk-QQ5W5TEP.js";import{d as R,f as Z}from"./chunk-YQHQQW4I.js";import{c as G,d as q,e as J,f as K}from"./chunk-IZU6TNEP.js";import{b as Q,c as X}from"./chunk-Y7XG5IWW.js";import{a as H}from"./chunk-FQIIIJGL.js";import{f as v,g as k}from"./chunk-SZTSN5BD.js";import{a as U,b as W}from"./chunk-VAOSSSLB.js";import{a as $}from"./chunk-CUV3BSEW.js";import{a as M}from"./chunk-6FI5AY7X.js";import{d as O}from"./chunk-ZCAR53EN.js";import{a as P}from"./chunk-DH67ILIV.js";import{b as _}from"./chunk-7GUYYJRR.js";import{b as F}from"./chunk-WS4AMEGN.js";import{d as I}from"./chunk-KALTBP5D.js";import{a as V}from"./chunk-422PSKZ7.js";import{a as Y}from"./chunk-GSXOR3JU.js";import{a as B}from"./chunk-VGAXEXH3.js";import{c as A}from"./chunk-76X7RFM4.js";import{a as f,b as S}from"./chunk-HMNTGQTR.js";import{a as N}from"./chunk-GVSOJUIP.js";import{a as p}from"./chunk-HUUJBVXR.js";import{a as T}from"./chunk-4LDVFWME.js";import{a as j}from"./chunk-A45BLB26.js";import{a as y}from"./chunk-EDOVNTC7.js";import{h as c}from"./chunk-YEXMIDOT.js";import{a as m}from"./chunk-T7PUQGWM.js";import{a as i,b as t}from"./chunk-47NSYSFY.js";import{a as w}from"./chunk-RWCIDBNQ.js";function io(o){let a=new j,{vertex:l,fragment:e,varyings:s}=a,{output:u,offsetBackfaces:g,instancedColor:h,pbrMode:x,snowCover:d,spherical:b}=o,C=x===v.Normal||x===v.Schematic;if(S(l,o),a.include(P),s.add("vpos","vec3"),a.include(V,o),a.include(D,o),a.include(I,o),a.include(Y,o),c(u)&&(f(a.vertex,o),a.include(y,o),a.include(M,o),g&&a.include(L),h&&a.attributes.add(w.INSTANCECOLOR,"vec4"),s.add("vNormalWorld","vec3"),s.add("localvpos","vec3"),a.include(F,o),a.include(O,o),a.include(E,o),a.include($,o),l.uniforms.add(new N("externalColor",n=>n.externalColor)),s.add("vcolorExt","vec4"),l.main.add(i`
      forwardNormalizedVertexColor();
      vcolorExt = externalColor;
      ${t(h,"vcolorExt *= instanceColor * 0.003921568627451;")}
      vcolorExt *= vvColor();
      vcolorExt *= getSymbolColor();
      forwardColorMixMode();

      bool alphaCut = vcolorExt.a < ${i.float(B)};
      vpos = getVertexInLocalOriginSpace();
      localvpos = vpos - view[3].xyz;
      vpos = subtractOrigin(vpos);
      vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
      vpos = addVerticalOffset(vpos, localOrigin);
      vec4 basePosition = transformPosition(proj, view, vpos);

      forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
      forwardLinearDepth();
      forwardTextureCoordinates();

      gl_Position = alphaCut ? vec4(1e38, 1e38, 1e38, 1.0) :
      ${t(g,"offsetBackfacingClipPosition(basePosition, vpos, vNormalWorld, cameraPosition);","basePosition;")}
    `)),c(u)){let{hasColorTexture:n,hasColorTextureTransform:oo,receiveShadows:ao}=o;a.include(K,o),a.include(G,o),a.include(R,o),a.include(o.instancedDoublePrecision?Q:X,o),a.fragment.include(A,o),a.include(_,o),f(a.fragment,o),U(e),q(e),J(e),e.uniforms.add(l.uniforms.get("localOrigin"),l.uniforms.get("view"),new m("ambient",r=>r.ambient),new m("diffuse",r=>r.diffuse),new p("opacity",r=>r.opacity),new p("layerOpacity",r=>r.layerOpacity)),n&&e.uniforms.add(new T("tex",r=>r.texture)),a.include(k,o),a.include(H,o),e.include(Z),W(e),e.main.add(i`
      discardBySlice(vpos);
      discardByTerrainDepth();
      vec4 texColor = ${n?`texture(tex, ${oo?"colorUV":"vuv0"})`:" vec4(1.0)"};
      ${t(n,`${t(o.textureAlphaPremultiplied,"texColor.rgb /= texColor.a;")}
        discardOrAdjustAlpha(texColor);`)}
      vec3 viewDirection = normalize(vpos - cameraPosition);
      applyPBRFactors();
      float ssao = evaluateAmbientOcclusionInverse();
      ssao *= getBakedOcclusion();

      float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
      vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
      float shadow = ${ao?"max(lightingGlobalFactor * (1.0 - additionalAmbientScale), readShadowMap(vpos, linearDepth))":b?"lightingGlobalFactor * (1.0 - additionalAmbientScale)":"0.0"};
      vec3 matColor = max(ambient, diffuse);
      ${o.hasVertexColors?i`vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
             float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:i`vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
             float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
      ${t(d,"albedo = mix(albedo, vec3(1), 0.9);")}
      ${i`vec3 shadingNormal = normalize(vNormalWorld);
             albedo *= 1.2;
             vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
             float alignmentLightView = clamp(dot(viewForward, -mainLightDirection), 0.0, 1.0);
             float transmittance = 1.0 - clamp(dot(viewForward, shadingNormal), 0.0, 1.0);
             float treeRadialFalloff = vColor.r;
             float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
             additionalLight += backLightFactor * mainLightIntensity;`}
      ${t(C,`vec3 normalGround = ${b?"normalize(vpos + localOrigin)":"vec3(0.0, 0.0, 1.0)"};`)}
      ${C?i`float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
                 ${t(d,i`mrr = vec3(0.0, 1.0, 0.04);`)}
            vec4 emission = ${d?"vec4(0.0)":"getEmissions()"};
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:i`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
      vec4 finalColor = vec4(shadedColor, opacity_);
      outputColorHighlightOID(finalColor, vpos);`)}return a.include(z,o),a}var Ro=Object.freeze(Object.defineProperty({__proto__:null,build:io},Symbol.toStringTag,{value:"Module"}));export{io as a,Ro as b};
