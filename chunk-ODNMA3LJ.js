import{a as f}from"./chunk-GVSOJUIP.js";import{a as g}from"./chunk-GWSX6PRO.js";import{a as d}from"./chunk-L7NOU4T2.js";import{a as u}from"./chunk-WOZSH7YY.js";import{a,b as s}from"./chunk-47NSYSFY.js";import{a as h}from"./chunk-EM35R6FY.js";import{a as p}from"./chunk-PTZYZULI.js";import{c as i}from"./chunk-BOVYXYHK.js";import{b as m}from"./chunk-QT6UNBJP.js";import{a as o}from"./chunk-ARRCN5K3.js";function A(e){return m((e-1e5)/9e5,0,1)}var I=1e4,r=i(parseFloat(5802e-9.toFixed(6)),parseFloat(13558e-9.toFixed(6)),parseFloat(331e-7.toFixed(6))),n=3,l=i(n*parseFloat(65e-8.toFixed(6)),n*parseFloat(1881e-9.toFixed(6)),n*parseFloat(85e-9.toFixed(6))),y=3996e-9,P=i(parseFloat(Number(r[0]+l[0]).toFixed(6)),parseFloat(Number(r[1]+l[1]).toFixed(6)),parseFloat(Number(r[2]+l[2]).toFixed(6)));var x=class extends d{constructor(){super(...arguments),this.radii=h(),this.heightParameters=p()}};function b(e){e.uniforms.add(new u("radii",t=>t.radii),new f("heightParameters",t=>t.heightParameters)),e.constants.add("scaleHeight","float",o.scaleHeight*o.atmosphereHeight),e.code.add(a`float chapmanApproximation(float thickness, float height, float cosZenith) {
float c = sqrt(thickness + height);
float cExpH = c * exp(-height);
if (cosZenith >= 0.0) {
return cExpH / (c * cosZenith + 1.0);
} else {
float x0 = sqrt(1.0 - cosZenith * cosZenith) * (thickness + height);
float c0 = sqrt(x0);
return 2.0 * c0 * exp(thickness - x0) - cExpH / (1.0 - c * cosZenith);
}
}`),e.code.add(a`float getOpticalDepth(vec3 position, vec3 dir, float h) {
return scaleHeight * chapmanApproximation(radii[0] / scaleHeight, h, dot(normalize(position), dir));
}`),e.code.add(a`vec4 planetIntersect(vec3 cameraPos, vec3 rayDir) {
float reducedPlanetRadius = radii[0] - 20000.0;
float rayPlanetDistance = heightParameters[1] - reducedPlanetRadius * reducedPlanetRadius;
vec2 rayPlanetIntersect = sphereIntersect(cameraPos, rayDir, rayPlanetDistance);
vec2 rayAtmosphereIntersect = sphereIntersect(cameraPos, rayDir, heightParameters[2]);
bool hitsAtmosphere = (rayAtmosphereIntersect.x <= rayAtmosphereIntersect.y) && rayAtmosphereIntersect.x > 0.0;
bool insideAtmosphere = heightParameters[0] < radii[1];
if (!(hitsAtmosphere || insideAtmosphere)) {
return vec4(1.0, 0.0, 0.0, 0.0);
}
bool hitsPlanet = (rayPlanetIntersect.x <= rayPlanetIntersect.y) && rayPlanetIntersect.x > 0.0;
float start = insideAtmosphere ? 0.0 : rayAtmosphereIntersect.x;
if (heightParameters[0] < reducedPlanetRadius) {
if (dot(rayDir, normalize(cameraPos)) < -0.025) {
return vec4(1.0, 0.0, 0.0, 0.0);
}
start = rayPlanetIntersect.y;
}
float end = hitsPlanet ? rayPlanetIntersect.x : rayAtmosphereIntersect.y;
return vec4(0.0, hitsPlanet ? 1.0 : 0.0, start, end);
}`)}function E(e,t){e.include(b);let c=6;e.uniforms.add(new g("cameraPosition",D=>D.camera.eye)),e.constants.add("betaRayleigh","vec3",r),e.constants.add("betaCombined","vec3",P),e.constants.add("betaMie","float",y),e.code.add(a`
    vec3 raymarchAtmosphere(vec3 cameraPos, vec3 rayDir, vec3 lightDir, float terrainDepth) {
      vec4 ray = planetIntersect(cameraPos, rayDir);
      if(ray.x == 1.0) {
        return vec3(0);
      }
      ${s(t,"if (terrainDepth != -1.0) { ray.w = terrainDepth; }")}

      vec3 samplePoint = cameraPos + rayDir * ray.w;
      float multiplier = ray.y == 1.0 ? -1.0 : 1.0;

      vec3 scattering = vec3(0);
      float scaleFract = (length(samplePoint) - radii[0]) / scaleHeight;
      float lastOpticalDepth = getOpticalDepth(samplePoint, rayDir, scaleFract);
      float stepSize = (ray.w - ray.z) / ${a.float(c)};

      for (int i = 0; i < ${a.int(c)}; i++) {
        samplePoint -= stepSize * rayDir;
        scaleFract = (length(samplePoint) - radii[0]) / scaleHeight;
        float opticalDepth = multiplier * getOpticalDepth(samplePoint, rayDir * multiplier, scaleFract);

        if (i > 0) {
          scattering *= exp(-(mix(betaCombined, betaRayleigh, 0.5) + betaMie) * max(0.0, (opticalDepth - lastOpticalDepth)));
          ${s(!t,"scattering *= mix(2.5, 1.0, clamp((length(cameraPos) - radii[0]) / 50e3, 0.0, 1.0))")};
        }

        if (dot(normalize(samplePoint), lightDir) > -0.3) {
          float scale = exp(-scaleFract);
          float lightDepth = getOpticalDepth(samplePoint, lightDir, scaleFract);
          scattering += scale * exp(-(betaCombined + betaMie) * lightDepth);
          ${s(!t,"scattering += scale * exp(-(0.25 * betaCombined ) * lightDepth);")}
        }
        lastOpticalDepth = opticalDepth;
      }

      float mu = dot(rayDir, lightDir);
      float mumu = 1.0 + mu * mu;

      float phaseRayleigh = 0.0596831 * mumu;
      ${t?"return 3.0 * scattering * stepSize * phaseRayleigh * betaRayleigh;":a`const float g = 0.8;
             const float gg = g * g;
             float phaseMie = 0.1193662 * ((1.0 - gg) * mumu) / (pow(1.0 + gg - 2.0 * mu * g, 1.5) * (2.0 + gg));
             phaseMie = clamp(phaseMie, 0.0, 128.0);
             return 3.0 * scattering * stepSize * (phaseRayleigh * betaRayleigh + 0.025 * phaseMie * betaMie);`}
    }`)}export{A as a,I as b,x as c,E as d};
