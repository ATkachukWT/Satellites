import{a as w}from"./chunk-CSFAHB4Y.js";import{a as n}from"./chunk-L7NOU4T2.js";import{a as v,b as F}from"./chunk-FSWSNKJD.js";import{a as W}from"./chunk-FGEB67EG.js";import{a as s}from"./chunk-GV3ZFCVD.js";import{a as i}from"./chunk-T7PUQGWM.js";import{a as e}from"./chunk-47NSYSFY.js";import{a as f}from"./chunk-ALWV3RJ2.js";import{a as m}from"./chunk-DEH76MSI.js";import{a as l}from"./chunk-RWCIDBNQ.js";import{a}from"./chunk-BOVYXYHK.js";function c(o){o.attributes.add(l.POSITION,"vec3"),o.vertex.code.add(e`vec3 positionModel() { return position; }`)}function U(o,d){o.include(c);let t=o.vertex;t.include(v,d),o.varyings.add("vPositionWorldCameraRelative","vec3"),o.varyings.add("vPosition_view","vec3"),t.uniforms.add(new i("transformWorldFromViewTH",r=>r.transformWorldFromViewTH),new i("transformWorldFromViewTL",r=>r.transformWorldFromViewTL),new W("transformViewFromCameraRelativeRS",r=>r.transformViewFromCameraRelativeRS),new w("transformProjFromView",r=>r.transformProjFromView),new F("transformWorldFromModelRS",r=>r.transformWorldFromModelRS),new s("transformWorldFromModelTH",r=>r.transformWorldFromModelTH),new s("transformWorldFromModelTL",r=>r.transformWorldFromModelTL)),t.code.add(e`vec3 positionWorldCameraRelative() {
vec3 rotatedModelPosition = transformWorldFromModelRS * positionModel();
vec3 transform_CameraRelativeFromModel = dpAdd(
transformWorldFromModelTL,
transformWorldFromModelTH,
-transformWorldFromViewTL,
-transformWorldFromViewTH
);
return transform_CameraRelativeFromModel + rotatedModelPosition;
}`),t.code.add(e`
    void forwardPosition(float fOffset) {
      vPositionWorldCameraRelative = positionWorldCameraRelative();
      if (fOffset != 0.0) {
        vPositionWorldCameraRelative += fOffset * ${d.spherical?e`normalize(transformWorldFromViewTL + vPositionWorldCameraRelative)`:e`vec3(0.0, 0.0, 1.0)`};
      }

      vPosition_view = transformViewFromCameraRelativeRS * vPositionWorldCameraRelative;
      gl_Position = transformProjFromView * vec4(vPosition_view, 1.0);
    }
  `),o.fragment.uniforms.add(new i("transformWorldFromViewTL",r=>r.transformWorldFromViewTL)),t.code.add(e`vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`),o.fragment.code.add(e`vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`)}var P=class extends n{constructor(){super(...arguments),this.transformWorldFromViewTH=a(),this.transformWorldFromViewTL=a(),this.transformViewFromCameraRelativeRS=m(),this.transformProjFromView=f()}},p=class extends n{constructor(){super(...arguments),this.transformWorldFromModelRS=m(),this.transformWorldFromModelTH=a(),this.transformWorldFromModelTL=a()}};export{c as a,U as b,P as c,p as d};
