import{b as t}from"./chunk-DH67ILIV.js";import{a as d}from"./chunk-F6TN7E7K.js";import{a as e}from"./chunk-YEXMIDOT.js";import{a as o}from"./chunk-47NSYSFY.js";function n(a){a.varyings.add("linearDepth","float")}function s(a){a.vertex.uniforms.add(new d("nearFar",r=>r.camera.nearFar))}function c(a){a.vertex.code.add(o`float calculateLinearDepth(vec2 nearFar,float z) {
return (-z - nearFar[0]) / (nearFar[1] - nearFar[0]);
}`)}function u(a,r){let{vertex:i}=a;switch(r.output){case e.Color:case e.ColorEmission:if(r.receiveShadows)return n(a),void i.code.add(o`void forwardLinearDepth() { linearDepth = gl_Position.w; }`);break;case e.Shadow:case e.ShadowHighlight:case e.ShadowExcludeHighlight:case e.ViewshedShadow:return a.include(t,r),n(a),s(a),c(a),void i.code.add(o`void forwardLinearDepth() {
linearDepth = calculateLinearDepth(nearFar, vPosition_view.z);
}`)}i.code.add(o`void forwardLinearDepth() {}`)}export{n as a,s as b,c,u as d};
