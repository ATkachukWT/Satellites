import{a as m}from"./chunk-4XEE5PE3.js";import{a as u}from"./chunk-L7NOU4T2.js";import{a as r}from"./chunk-4LDVFWME.js";import{a as l}from"./chunk-A45BLB26.js";import{a as i,b as c}from"./chunk-47NSYSFY.js";var s=class extends u{};function f(a){let o=new l;o.include(m);let n=a.hasEmission,t=o.fragment;return t.uniforms.add(new r("colorTexture",e=>e.colorTexture),new r("alphaTexture",e=>e.alphaTexture),new r("frontFaceTexture",e=>e.frontFaceTexture)),o.outputs.add("fragColor","vec4",0),n&&(o.outputs.add("fragEmission","vec4",1),t.uniforms.add(new r("emissionTexture",e=>e.emissionTexture)),t.uniforms.add(new r("emissionFrontFaceTexture",e=>e.emissionFrontFaceTexture))),t.main.add(i`
      float srcAlpha = texture(alphaTexture, uv).r;
      if(srcAlpha == 0.0){
        fragColor = vec4(0.0);
        return;
      }

      vec4 srcColor = texture(colorTexture, uv);
      vec4 frontFace = texture(frontFaceTexture, uv);

      vec4 transparentColor = vec4(mix(srcColor.rgb / srcAlpha, frontFace.rgb, frontFace.a), 1.0 - srcColor.a);
      fragColor = transparentColor;

      ${c(n,`vec4 emission = texture(emissionTexture, uv);
         vec4 emissionFrontFace = texture(emissionFrontFaceTexture, uv);
        fragEmission = vec4(mix(emission.rgb / srcAlpha, emissionFrontFace.rgb, emissionFrontFace.a), emissionFrontFace.a);`)}
    `),o}var v=Object.freeze(Object.defineProperty({__proto__:null,OITBlendPassParameters:s,build:f},Symbol.toStringTag,{value:"Module"}));export{s as a,f as b,v as c};
