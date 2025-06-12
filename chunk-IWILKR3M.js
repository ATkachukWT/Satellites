import{b as f}from"./chunk-HMNTGQTR.js";import{a as m}from"./chunk-HUUJBVXR.js";import{a as v}from"./chunk-A45BLB26.js";import{a as o}from"./chunk-47NSYSFY.js";import{a}from"./chunk-RWCIDBNQ.js";function S(i){let s=new v,{vertex:e,fragment:d,attributes:t,varyings:u}=s;f(e,i);let{isAttributeDriven:r,usesHalfFloat:n}=i;return t.add(a.POSITION,"vec3"),t.add(a.UV0,"vec2"),r&&(t.add(a.FEATUREATTRIBUTE,"float"),u.add("attributeValue","float")),n&&d.constants.add("compressionFactor","float",.25),u.add("unitCirclePos","vec2"),e.uniforms.add(new m("radius",({resolutionForScale:l,searchRadius:R},{camera:c,screenToWorldRatio:p,overlayStretch:P})=>2*R*(l===0?1:l/p)*c.pixelRatio/c.fullViewport[2]/P)),e.main.add(o`
    unitCirclePos = uv0;

    vec4 posProj = proj * (view * vec4(${a.POSITION}, 1.0));
    vec4 quadOffset = vec4(unitCirclePos * radius, 0.0, 0.0);

    ${r?o`attributeValue = ${a.FEATUREATTRIBUTE};`:""}
    gl_Position = posProj + quadOffset;
  `),d.main.add(o`
    float radiusRatioSquared = dot(unitCirclePos, unitCirclePos);
    if (radiusRatioSquared > 1.0) {
      fragColor = vec4(0.0);
    }
    else {
      float oneMinusRadiusRatioSquared = 1.0 - radiusRatioSquared;
      float density = oneMinusRadiusRatioSquared * oneMinusRadiusRatioSquared ${r?o` * attributeValue`:""} ${n?o` * compressionFactor`:""};
      fragColor = vec4(density);
    }
  `),s}var C=Object.freeze(Object.defineProperty({__proto__:null,build:S},Symbol.toStringTag,{value:"Module"}));export{S as a,C as b};
