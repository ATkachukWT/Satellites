import{a as d}from"./chunk-EG2DTURK.js";import{a as C}from"./chunk-YEPHAEAY.js";import{a as B,d as _}from"./chunk-76X7RFM4.js";import{a as j}from"./chunk-ZLIWNUFM.js";import{a as F}from"./chunk-L7NOU4T2.js";import{a as H}from"./chunk-WOZSH7YY.js";import{a as D}from"./chunk-A45BLB26.js";import{a as R}from"./chunk-WVKBXQWE.js";import{h as O}from"./chunk-YEXMIDOT.js";import{a as f}from"./chunk-GV3ZFCVD.js";import{a as b}from"./chunk-SOEEM7Z7.js";import{a as n}from"./chunk-47NSYSFY.js";import{a as y}from"./chunk-ALWV3RJ2.js";import{N as M,d as P}from"./chunk-KD27XIJC.js";import{a as m}from"./chunk-RWCIDBNQ.js";import{a as w}from"./chunk-EM35R6FY.js";import{b as l}from"./chunk-QXXXCEV5.js";import{c as p}from"./chunk-6B5XFA6F.js";import{g as v,n as h}from"./chunk-ZTOZWLEE.js";import{a as g}from"./chunk-BOVYXYHK.js";import{v as s}from"./chunk-QT6UNBJP.js";var u=class extends F{constructor(){super(...arguments),this.clipBox=P(M),this.useFixedSizes=!1,this.useRealWorldSymbolSizes=!1,this.scaleFactor=1,this.minSizePx=0,this.size=0,this.sizePx=0}get fixedSize(){return this.drawScreenSpace?this.sizePx:this.size}get screenMinSize(){return this.useFixedSizes?0:this.minSizePx}get drawScreenSpace(){return this.useFixedSizes&&!this.useRealWorldSymbolSizes}},x=class extends B{constructor(a,c,r){super(a),this.origin=a,this.isLeaf=c,this.splatSize=r}};function L(t){let a=new D,c=O(t.output),{vertex:r,fragment:z}=a;return a.vertex.include(_,t),a.attributes.add(m.POSITION,"vec3"),a.attributes.add(m.COLOR,"vec3"),r.uniforms.add(new j("modelView",(i,e)=>v(U,e.camera.viewMatrix,h(U,i.origin))),new b("proj",i=>i.camera.projectionMatrix),new d("screenMinMaxSize",(i,e,o)=>l(S,o.useFixedSizes?0:o.minSizePx*e.camera.pixelRatio,I(i.isLeaf)*e.camera.pixelRatio)),t.useFixedSizes?new H("pointScale",(i,e)=>l(S,i.fixedSize*e.camera.pixelRatio,e.camera.fullHeight)):new d("pointScale",(i,e,o)=>l(S,i.splatSize*o.scaleFactor*e.camera.pixelRatio,e.camera.fullHeight/e.camera.pixelRatio))),t.clippingEnabled?r.uniforms.add(new f("clipMin",(i,e,o)=>p(E,o.clipBox[0]-i.origin[0],o.clipBox[1]-i.origin[1],o.clipBox[2]-i.origin[2])),new f("clipMax",(i,e,o)=>p(E,o.clipBox[3]-i.origin[0],o.clipBox[4]-i.origin[1],o.clipBox[5]-i.origin[2]))):(r.constants.add("clipMin","vec3",[-s,-s,-s]),r.constants.add("clipMax","vec3",[s,s,s])),c&&a.varyings.add("vColor","vec3"),r.main.add(n`
    // Move clipped points outside of clipspace
    if (position.x < clipMin.x || position.y < clipMin.y || position.z < clipMin.z ||
      position.x > clipMax.x || position.y > clipMax.y || position.z > clipMax.z) {
      gl_Position = vec4(0.0,0.0,0.0,2.0);
      gl_PointSize = 0.0;
      return;
    }

    if (rejectBySlice(position)) {
      gl_Position = vec4(0.0, 0.0, 0.0, 2.0);
      gl_PointSize = 0.0;
      return;
    }

    // Position in camera space
    vec4 camera = modelView * vec4(position, 1.0);

    float pointSize = pointScale.x;
    vec4 position = proj * camera;
    ${t.drawScreenSize?n`float clampedScreenSize = pointSize;`:n`float pointRadius = 0.5 * pointSize;
           vec4 cameraOffset = camera + vec4(0.0, pointRadius, 0.0, 0.0);
           vec4 positionOffset = proj * cameraOffset;
           float radius = abs(positionOffset.y - position.y);
           float viewHeight = pointScale.y;
           // screen diameter = (2 * r / w) * (h / 2)
           float screenPointSize = (radius / position.w) * viewHeight;
           float clampedScreenSize = clamp(screenPointSize, screenMinMaxSize.x, screenMinMaxSize.y);
           // Shift towards camera, to move rendered point out of terrain i.e. to
           // the camera-facing end of the virtual point when considering it as a
           // 3D sphere.
           camera.xyz -= normalize(camera.xyz) * pointRadius * clampedScreenSize / screenPointSize;
           position = proj * camera;`}

    gl_PointSize = clampedScreenSize;
    gl_Position = position;
    ${c?n`vColor = color;`:""}`),z.include(R,t),a.include(C,t),z.main.add(n`
    vec2 vOffset = gl_PointCoord - vec2(0.5, 0.5);
    float r2 = dot(vOffset, vOffset);

    if (r2 > 0.25) {
      discard;
    }
    calculateOcclusionAndOutputHighlight();
    ${c?n`fragColor = vec4(vColor, 1.0);`:""}`),a}function I(t){return t?256:64}var U=y(),E=g(),S=w(),si=Object.freeze(Object.defineProperty({__proto__:null,PointRendererDrawParameters:x,PointRendererPassParameters:u,build:L,getMaxPointSizeScreenspace:I},Symbol.toStringTag,{value:"Module"}));export{u as a,x as b,L as c,I as d,si as e};
