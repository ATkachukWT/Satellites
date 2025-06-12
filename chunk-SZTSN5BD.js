import{c as T}from"./chunk-WS4AMEGN.js";import{a as x}from"./chunk-4LDVFWME.js";import{a as R}from"./chunk-MVDZB4AK.js";import{a as g}from"./chunk-GV3ZFCVD.js";import{a as v}from"./chunk-T7PUQGWM.js";import{a as i,b as u}from"./chunk-47NSYSFY.js";import{a as d}from"./chunk-QXNVQZT7.js";import{D as h}from"./chunk-6B5XFA6F.js";import{d as m,i as f}from"./chunk-BOVYXYHK.js";function y({normalTexture:e,metallicRoughnessTexture:c,metallicFactor:o,roughnessFactor:r,emissiveTexture:t,emissiveFactor:l,occlusionTexture:a}){return e==null&&c==null&&t==null&&(l==null||h(l,f))&&a==null&&(r==null||r===1)&&(o==null||o===1)}function B({normalTexture:e,metallicRoughnessTexture:c,metallicFactor:o,roughnessFactor:r,emissiveTexture:t,emissiveFactor:l,occlusionTexture:a}){return e==null&&c==null&&t==null&&(l==null||h(l,f))&&a==null&&(r==null||r===1)&&(o==null||o===1||o===0)}var S=m(1,1,.5),M=m(0,.6,.2),b=m(0,1,.2);var n;(function(e){e[e.Disabled=0]="Disabled",e[e.Normal=1]="Normal",e[e.Schematic=2]="Schematic",e[e.Water=3]="Water",e[e.WaterOnIntegratedMesh=4]="WaterOnIntegratedMesh",e[e.Simplified=5]="Simplified",e[e.TerrainWithWater=6]="TerrainWithWater",e[e.COUNT=7]="COUNT"})(n||(n={}));function z(e,c){let o=c.pbrMode,r=e.fragment;if(o!==n.Schematic&&o!==n.Disabled&&o!==n.Normal)return void r.code.add(i`void applyPBRFactors() {}`);if(o===n.Disabled)return void r.code.add(i`void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`);if(o===n.Schematic)return void r.code.add(i`vec3 mrr = vec3(0.0, 0.6, 0.2);
float occlusion = 1.0;
void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`);let{hasMetallicRoughnessTexture:t,hasMetallicRoughnessTextureTransform:l,hasOcclusionTexture:a,hasOcclusionTextureTransform:F,bindType:p}=c;(t||a)&&e.include(T,c),r.code.add(i`vec3 mrr;
float occlusion;`),t&&r.uniforms.add(p===d.Pass?new x("texMetallicRoughness",s=>s.textureMetallicRoughness):new R("texMetallicRoughness",s=>s.textureMetallicRoughness)),a&&r.uniforms.add(p===d.Pass?new x("texOcclusion",s=>s.textureOcclusion):new R("texOcclusion",s=>s.textureOcclusion)),r.uniforms.add(p===d.Pass?new v("mrrFactors",s=>s.mrrFactors):new g("mrrFactors",s=>s.mrrFactors)),r.code.add(i`
    ${u(t,i`void applyMetallicRoughness(vec2 uv) {
            vec3 metallicRoughness = textureLookup(texMetallicRoughness, uv).rgb;
            mrr[0] *= metallicRoughness.b;
            mrr[1] *= metallicRoughness.g;
          }`)}

    ${u(a,"void applyOcclusion(vec2 uv) { occlusion *= textureLookup(texOcclusion, uv).r; }")}

    float getBakedOcclusion() {
      return ${a?"occlusion":"1.0"};
    }

    void applyPBRFactors() {
      mrr = mrrFactors;
      occlusion = 1.0;

      ${u(t,`applyMetallicRoughness(${l?"metallicRoughnessUV":"vuv0"});`)}
      ${u(a,`applyOcclusion(${F?"occlusionUV":"vuv0"});`)}
    }
  `)}export{y as a,B as b,S as c,M as d,b as e,n as f,z as g};
