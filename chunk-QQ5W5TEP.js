import{a as z,d as x}from"./chunk-YQHQQW4I.js";import{a as B}from"./chunk-IZU6TNEP.js";import{a as u}from"./chunk-6FI5AY7X.js";import{b as F}from"./chunk-ZCAR53EN.js";import{b as f}from"./chunk-WS4AMEGN.js";import{a as _}from"./chunk-CSFAHB4Y.js";import{a as H}from"./chunk-AMISFAT3.js";import{b as j,c as $}from"./chunk-PTXLSCMJ.js";import{a as C}from"./chunk-422PSKZ7.js";import{a as W}from"./chunk-SFANISLX.js";import{h}from"./chunk-B74L7AUE.js";import{a as U}from"./chunk-YEPHAEAY.js";import{c as p}from"./chunk-76X7RFM4.js";import{b as v,c as E}from"./chunk-HMNTGQTR.js";import{a as O}from"./chunk-GWSX6PRO.js";import{a as g}from"./chunk-4LDVFWME.js";import{d as L}from"./chunk-FGY3YBPM.js";import{a as P,b as m}from"./chunk-EDOVNTC7.js";import{a as V}from"./chunk-FSWSNKJD.js";import{a as D}from"./chunk-FGEB67EG.js";import{a as s}from"./chunk-YEXMIDOT.js";import{a as r,b as c}from"./chunk-47NSYSFY.js";import{g as A}from"./chunk-ONYJLWAD.js";import{q as I}from"./chunk-DJW5LMRG.js";import{d as N}from"./chunk-ALWV3RJ2.js";import{a as S}from"./chunk-DEH76MSI.js";import{a as d}from"./chunk-RWCIDBNQ.js";import{c as y}from"./chunk-6B5XFA6F.js";import{a as T}from"./chunk-BOVYXYHK.js";function Y(o){o.vertex.code.add(r`vec4 offsetBackfacingClipPosition(vec4 posClip, vec3 posWorld, vec3 normalWorld, vec3 camPosWorld) {
vec3 camToVert = posWorld - camPosWorld;
bool isBackface = dot(camToVert, normalWorld) > 0.0;
if (isBackface) {
posClip.z += 0.0000003 * posClip.w;
}
return posClip;
}`)}var k=S();function po(o,e){let i=e.hasModelTransformation,a=e.instancedDoublePrecision;i&&(o.vertex.uniforms.add(new _("model",n=>n.modelTransformation??N)),o.vertex.uniforms.add(new D("normalLocalOriginFromModel",n=>(I(k,n.modelTransformation??N),k)))),e.instanced&&a&&(o.attributes.add(d.INSTANCEMODELORIGINHI,"vec3"),o.attributes.add(d.INSTANCEMODELORIGINLO,"vec3"),o.attributes.add(d.INSTANCEMODEL,"mat3"),o.attributes.add(d.INSTANCEMODELNORMAL,"mat3"));let t=o.vertex;a&&(t.include(V,e),t.uniforms.add(new O("viewOriginHi",n=>j(y(b,n.camera.viewInverseTransposeMatrix[3],n.camera.viewInverseTransposeMatrix[7],n.camera.viewInverseTransposeMatrix[11]),b)),new O("viewOriginLo",n=>$(y(b,n.camera.viewInverseTransposeMatrix[3],n.camera.viewInverseTransposeMatrix[7],n.camera.viewInverseTransposeMatrix[11]),b)))),t.code.add(r`
    vec3 getVertexInLocalOriginSpace() {
      return ${i?a?"(model * vec4(instanceModel * localPosition().xyz, 1.0)).xyz":"(model * localPosition()).xyz":a?"instanceModel * localPosition().xyz":"localPosition().xyz"};
    }

    vec3 subtractOrigin(vec3 _pos) {
      ${a?r`
          // Negated inputs are intentionally the first two arguments. The other way around the obfuscation in dpAdd() stopped
          // working for macOS 14+ and iOS 17+.
          // Issue: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/56280
          vec3 originDelta = dpAdd(-instanceModelOriginHi, -instanceModelOriginLo, viewOriginHi, viewOriginLo);
          return _pos - originDelta;`:"return vpos;"}
    }
    `),t.code.add(r`
    vec3 dpNormal(vec4 _normal) {
      return normalize(${i?a?"normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz)":"normalLocalOriginFromModel * _normal.xyz":a?"instanceModelNormal * _normal.xyz":"_normal.xyz"});
    }
    `),e.output===s.Normal&&(E(t),t.code.add(r`
    vec3 dpNormalView(vec4 _normal) {
      return normalize((viewNormal * ${i?a?"vec4(normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz), 1.0)":"vec4(normalLocalOriginFromModel * _normal.xyz, 1.0)":a?"vec4(instanceModelNormal * _normal.xyz, 1.0)":"_normal"}).xyz);
    }
    `)),e.hasVertexTangents&&t.code.add(r`
    vec4 dpTransformVertexTangent(vec4 _tangent) {
      ${i?a?"return vec4(normalLocalOriginFromModel * (instanceModelNormal * _tangent.xyz), _tangent.w);":"return vec4(normalLocalOriginFromModel * _tangent.xyz, _tangent.w);":a?"return vec4(instanceModelNormal * _tangent.xyz, _tangent.w);":"return _tangent;"}
    }`)}var b=T();function wo(o,e){e.hasSymbolColors?(o.include(L),o.attributes.add(d.SYMBOLCOLOR,"vec4"),o.varyings.add("colorMixMode","mediump float"),o.vertex.code.add(r`int symbolColorMixMode;
vec4 getSymbolColor() {
return decodeSymbolColor(symbolColor, symbolColorMixMode) * 0.003921568627451;
}
void forwardColorMixMode() {
colorMixMode = float(symbolColorMixMode) + 0.5;
}`)):(o.fragment.uniforms.add(new H("colorMixMode",i=>h[i.colorMixMode])),o.vertex.code.add(r`vec4 getSymbolColor() { return vec4(1.0); }
void forwardColorMixMode() {}`))}function $o(o,e){let{vertex:i,fragment:a}=o,t=e.hasColorTexture&&e.alphaDiscardMode!==A.Opaque,{output:n,normalType:M,hasColorTextureTransform:w}=e;switch(n){case s.Depth:v(i,e),o.include(u,e),o.fragment.include(p,e),o.include(f,e),t&&a.uniforms.add(new g("tex",l=>l.texture)),i.main.add(r`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),o.include(x,e),a.main.add(r`
        discardBySlice(vpos);
        ${c(t,r`vec4 texColor = texture(tex, ${w?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}`);break;case s.Shadow:case s.ShadowHighlight:case s.ShadowExcludeHighlight:case s.ViewshedShadow:case s.ObjectAndLayerIdColor:v(i,e),o.include(u,e),o.include(f,e),o.include(C,e),o.include(B,e),o.fragment.include(p,e),o.include(W,e),F(o),o.varyings.add("depth","float"),t&&a.uniforms.add(new g("tex",l=>l.texture)),i.main.add(r`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);
forwardTextureCoordinates();
forwardObjectAndLayerIdColor();`),o.include(x,e),a.main.add(r`
        discardBySlice(vpos);
        ${c(t,r`vec4 texColor = texture(tex, ${w?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}
        ${n===s.ObjectAndLayerIdColor?r`outputObjectAndLayerIdColor();`:r`outputDepth(depth);`}`);break;case s.Normal:{v(i,e),o.include(u,e),o.include(P,e),o.include(z,e),o.include(f,e),o.include(C,e),t&&a.uniforms.add(new g("tex",R=>R.texture)),M===m.ScreenDerivative&&o.varyings.add("vPositionView","vec3");let l=M===m.Attribute||M===m.Compressed;i.main.add(r`
        vpos = getVertexInLocalOriginSpace();
        ${l?r`vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:r`vPositionView = (view * vec4(vpos, 1.0)).xyz;`}
        vpos = subtractOrigin(vpos);
        vpos = addVerticalOffset(vpos, localOrigin);
        gl_Position = transformPosition(proj, view, vpos);
        forwardTextureCoordinates();`),o.fragment.include(p,e),o.include(x,e),a.main.add(r`
        discardBySlice(vpos);
        ${c(t,r`vec4 texColor = texture(tex, ${w?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}

        ${M===m.ScreenDerivative?r`vec3 normal = screenDerivativeNormal(vPositionView);`:r`vec3 normal = normalize(vNormalWorld);
                    if (gl_FrontFacing == false){
                      normal = -normal;
                    }`}
        fragColor = vec4(0.5 + 0.5 * normal, 1.0);`);break}case s.Highlight:v(i,e),o.include(u,e),o.include(f,e),o.include(C,e),t&&a.uniforms.add(new g("tex",l=>l.texture)),i.main.add(r`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),o.fragment.include(p,e),o.include(x,e),o.include(U,e),a.main.add(r`
        discardBySlice(vpos);
        ${c(t,r`vec4 texColor = texture(tex, ${w?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}
        calculateOcclusionAndOutputHighlight();`)}}export{Y as a,po as b,wo as c,$o as d};
