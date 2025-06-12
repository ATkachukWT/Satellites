import{b as x}from"./chunk-TMY7UIU7.js";import{a as u}from"./chunk-EDOVNTC7.js";import{a as p,b as i}from"./chunk-FSWSNKJD.js";import{a as v}from"./chunk-MVDZB4AK.js";import{a as f}from"./chunk-WVKBXQWE.js";import{a as w}from"./chunk-FGEB67EG.js";import{a as d}from"./chunk-GV3ZFCVD.js";import{a as T}from"./chunk-SOEEM7Z7.js";import{a as m}from"./chunk-T7PUQGWM.js";import{a as e}from"./chunk-47NSYSFY.js";import{a as n}from"./chunk-RWCIDBNQ.js";function A(o,l){let t=o.vertex;t.include(f),o.include(u,l);let{silhouette:s,legacy:c,spherical:M}=l;t.uniforms.add(new v("componentDataTex",r=>r.componentDataTexture)),o.attributes.add(n.COMPONENTINDEX,"float"),t.constants.add("lineWidthFractionFactor","float",8),t.constants.add("extensionLengthOffset","float",128),t.code.add(e`
    vec2 _componentTextureCoords(float componentIndex, float fieldOffset) {
      float fieldIndex = ${e.float(3)}  * componentIndex + fieldOffset;
      float texSize = float(textureSize(componentDataTex, 0).x);
      float colIndex = mod(fieldIndex, texSize);
      float rowIndex = floor(fieldIndex / texSize);

      return vec2(colIndex, rowIndex) + 0.5;
    }

    struct ComponentData {
      vec4 color;
      vec3 normal;
      vec3 normal2;
      float lineWidth;
      float extensionLength;
      float type;
      float verticalOffset;
    };

    ComponentData readComponentData() {
      vec2 colorIndex = _componentTextureCoords(componentIndex, ${e.float(0)});
      vec2 otherIndex = _componentTextureCoords(componentIndex, ${e.float(1)});
      vec2 verticalOffsetIndex = _componentTextureCoords(float(componentIndex), ${e.float(2)} );
      vec3 normal = normalModel();
      vec3 normal2 = ${s?e`decompressNormal(normal2Compressed)`:e`normal`};

      vec4 colorValue = texelFetch(componentDataTex, ivec2(colorIndex), 0);
      vec4 otherValue = texelFetch(componentDataTex, ivec2(otherIndex), 0);
      float verticalOffset = uninterpolatedRGBAToFloat(texelFetch(componentDataTex, ivec2(verticalOffsetIndex), 0)) * ${e.float(x)};

      return ComponentData(
        vec4(colorValue.rgb, colorValue.a * otherValue.w), // otherValue.w stores separate opacity
        normal, normal2,
        otherValue.x * (255.0 / ${e.float(8)} ),
        otherValue.y * 255.0 - ${e.float(128)},
        -(otherValue.z * 255.0) + 0.5, // SOLID (=0/255) needs to be > 0.0, SKETCHY (=1/255) needs to be <= 0;
        verticalOffset
      );
    }
  `),c?t.code.add(e`vec3 _modelToWorldNormal(vec3 normal) {
return (model * vec4(normal, 0.0)).xyz;
}
vec3 _modelToViewNormal(vec3 normal) {
return (localView * model * vec4(normal, 0.0)).xyz;
}`):(t.uniforms.add(new i("transformNormalGlobalFromModel",r=>r.transformNormalGlobalFromModel)),t.code.add(e`vec3 _modelToWorldNormal(vec3 normal) {
return transformNormalGlobalFromModel * normal;
}`)),s?(o.attributes.add(n.NORMAL2COMPRESSED,"vec2"),t.code.add(e`vec3 worldNormal(ComponentData data) {
return _modelToWorldNormal(normalize(data.normal + data.normal2));
}`)):t.code.add(e`vec3 worldNormal(ComponentData data) {
return _modelToWorldNormal(data.normal);
}`),c?t.code.add(e`void worldAndViewFromModelPosition(vec3 modelPos, float verticalOffset, out vec3 worldPos, out vec3 viewPos) {
worldPos = (model * vec4(modelPos, 1.0)).xyz;
viewPos = (localView * vec4(worldPos, 1.0)).xyz;
}`):(t.include(p,l),t.uniforms.add(new w("transformViewFromCameraRelativeRS",r=>r.transformViewFromCameraRelativeRS),new i("transformWorldFromModelRS",r=>r.transformWorldFromModelRS),new d("transformWorldFromModelTL",r=>r.transformWorldFromModelTL),new d("transformWorldFromModelTH",r=>r.transformWorldFromModelTH),new m("transformWorldFromViewTL",r=>r.transformWorldFromViewTL),new m("transformWorldFromViewTH",r=>r.transformWorldFromViewTH)),t.code.add(e`
      void worldAndViewFromModelPosition(vec3 modelPos, float verticalOffset, out vec3 worldPos, out vec3 viewPos) {
        vec3 rotatedModelPosition = transformWorldFromModelRS * modelPos;

        vec3 transformCameraRelativeFromModel = dpAdd(
          transformWorldFromModelTL,
          transformWorldFromModelTH,
          -transformWorldFromViewTL,
          -transformWorldFromViewTH
        );

        worldPos = transformCameraRelativeFromModel + rotatedModelPosition;

        if (verticalOffset != 0.0) {
          vec3 vUp = ${M?"normalize(transformWorldFromModelTL + rotatedModelPosition);":"vec3(0.0, 0.0, 1.0);"}
          worldPos += verticalOffset * vUp;
        }

        viewPos = transformViewFromCameraRelativeRS * worldPos;
      }
    `)),t.uniforms.add(new T("transformProjFromView",r=>r.camera.projectionMatrix)).code.add(e`vec4 projFromViewPosition(vec3 position) {
return transformProjFromView * vec4(position, 1.0);
}`),t.code.add(e`float calculateExtensionLength(float extensionLength, float lineLength) {
return extensionLength / (log2(max(1.0, 256.0 / lineLength)) * 0.2 + 1.0);
}`)}function H(o){return o===a.Sketch||o===a.Mixed}var a,F;(function(o){o[o.Solid=0]="Solid",o[o.Sketch=1]="Sketch",o[o.Mixed=2]="Mixed",o[o.COUNT=3]="COUNT"})(a||(a={})),function(o){o[o.REGULAR=0]="REGULAR",o[o.SILHOUETTE=1]="SILHOUETTE"}(F||(F={}));export{A as a,H as b,a as c,F as d};
