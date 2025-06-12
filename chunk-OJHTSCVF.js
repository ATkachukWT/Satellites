import{a as V}from"./chunk-BSKAVVQS.js";import{b as T}from"./chunk-CMKJEBQJ.js";import{a as U}from"./chunk-VAOSSSLB.js";import{a as y}from"./chunk-6FI5AY7X.js";import{a as w}from"./chunk-GWSX6PRO.js";import{a as x}from"./chunk-L7NOU4T2.js";import{a as F}from"./chunk-WOZSH7YY.js";import{a as d}from"./chunk-HUUJBVXR.js";import{a as P}from"./chunk-4LDVFWME.js";import{a as S}from"./chunk-A45BLB26.js";import{a as f}from"./chunk-SOEEM7Z7.js";import{a as m}from"./chunk-T7PUQGWM.js";import{a as t}from"./chunk-47NSYSFY.js";import{a as p}from"./chunk-RWCIDBNQ.js";import{a as C}from"./chunk-EM35R6FY.js";import{a as l}from"./chunk-BOVYXYHK.js";import{a as v}from"./chunk-QGVBCWUY.js";var n;(function(e){e[e.Cone=0]="Cone",e[e.Cylinder=1]="Cylinder",e[e.Underground=2]="Underground",e[e.COUNT=3]="COUNT"})(n||(n={}));var u=class extends V{constructor(){super(...arguments),this.geometry=n.Cone}};v([T({count:n.COUNT})],u.prototype,"geometry",void 0);var h=class extends x{constructor(){super(...arguments),this.texV=C(),this.altitudeFade=0,this.innerScale=0,this.undergroundFadeAlpha=0,this.silhouette=new c}},c=class{constructor(){this.center=l(),this.v1=l(),this.v2=l()}};function z(e){let i=new S,{vertex:r,fragment:s}=i;if(U(r),e.geometry===n.Underground)i.attributes.add(p.POSITION,"vec2"),i.varyings.add("color","vec4"),r.uniforms.add(new w("cameraPosition",a=>a.camera.eye),new d("undergroundFadeAlpha",a=>a.undergroundFadeAlpha)),r.main.add(t`float ndotl = dot(normalize(cameraPosition), mainLightDirection);
float lighting = max(0.0, smoothstep(-1.0, 0.8, 2.0 * ndotl));
color = vec4(vec3(lighting), undergroundFadeAlpha);
gl_Position = vec4(position.xy, 1.0, 1.0);`),s.main.add(t`fragColor = color;`);else{i.include(y,e),i.attributes.add(p.POSITION,"vec3"),i.varyings.add("vtc","vec2"),i.varyings.add("falloff","float");let a=e.geometry===n.Cylinder;r.uniforms.add(new f("proj",o=>o.camera.projectionMatrix),new f("view",o=>o.camera.viewMatrix)),a||(i.varyings.add("innerFactor","float"),r.uniforms.add(new m("silCircleCenter",o=>o.silhouette.center)),r.uniforms.add(new m("silCircleV1",o=>o.silhouette.v1)),r.uniforms.add(new m("silCircleV2",o=>o.silhouette.v2)),r.uniforms.add(new F("texV",o=>o.texV)),r.uniforms.add(new d("innerScale",o=>o.innerScale)));let b=6.2831853,g=1/128;r.main.add(t`
      ${a?t`
      vec3 pos = position;
      float ndotl = mainLightDirection.z;
      vtc = vec2(0.0, position.z + 0.05);`:t`
      innerFactor = clamp(-position.z, 0.0, 1.0);
      float scale = position.y * (1.0 + innerFactor * innerScale);
      float phi = position.x * ${t.float(b*g)} + 1.0;
      vec3 pos =  (silCircleCenter + sin(phi) * silCircleV1 + cos(phi) * silCircleV2) * scale;
      float ndotl = dot(normalize(position.y > 0.0 ? pos: silCircleCenter), mainLightDirection);
      vtc.x = position.x  * ${t.float(g)};
      vtc.y = texV.x * (1.0 - position.z) + texV.y * position.z;
      `}
      falloff = max(0.0, smoothstep(-1.0, 0.8, 2.0 * ndotl));

		  gl_Position = transformPosition(proj, view, pos);
		  gl_Position.z = gl_Position.w; // project atmosphere onto the far plane
	  `),s.uniforms.add(new P("tex",o=>o.texture)),a||s.uniforms.add(new d("altitudeFade",o=>o.altitudeFade)),s.main.add(t`
			vec4 atmosphereColor = texture(tex, vtc) * falloff;
      ${a?t`fragColor = atmosphereColor;`:t`
			vec4 innerColor = vec4(atmosphereColor.rgb, 1.0 - altitudeFade);
			fragColor = mix(atmosphereColor, innerColor, smoothstep(0.0, 1.0, innerFactor));`}`)}return i}var R=Object.freeze(Object.defineProperty({__proto__:null,SilhouetteCircle:c,SimpleAtmospherePassParameters:h,build:z},Symbol.toStringTag,{value:"Module"}));export{n as a,u as b,h as c,c as d,z as e,R as f};
