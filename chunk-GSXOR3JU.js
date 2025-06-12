import{a as d}from"./chunk-ELCBU4NP.js";import{a as n}from"./chunk-2CKJLDTO.js";import{a,b as i}from"./chunk-47NSYSFY.js";function f(r,{occlusionPass:e,terrainDepthTest:p,cullAboveTerrain:s}){let o=r.vertex,t=r.fragment;if(!p)return o.code.add("void forwardViewPosDepth(vec3 pos) {}"),void t.code.add(`${e?"bool":"void"} discardByTerrainDepth() { ${i(e,"return false;")}}`);r.varyings.add("viewPosDepth","float"),o.code.add(`void forwardViewPosDepth(vec3 pos) {
    viewPosDepth = pos.z;
  }`),t.include(n),t.uniforms.add(new d("terrainDepthTexture",h=>h.terrainDepth?.attachment)).code.add(a`
    ${e?"bool":"void"} discardByTerrainDepth() {
      float depth = texelFetch(terrainDepthTexture, ivec2(gl_FragCoord.xy), 0).r;
      float linearDepth = linearizeDepth(depth);
      ${e?"return viewPosDepth < linearDepth && depth < 1.0;":`if(viewPosDepth ${s?">":"<="} linearDepth) discard;`}
    }`)}export{f as a};
