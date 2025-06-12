import{a as P}from"./chunk-P5PR77YK.js";import{a as f,b as z,c as E,d as n,g as C}from"./chunk-KVXZQWKR.js";import{b as m}from"./chunk-IQA3CVAZ.js";import{a as R,b as d}from"./chunk-CMKJEBQJ.js";import{a as w}from"./chunk-4XEE5PE3.js";import{a as D}from"./chunk-L7NOU4T2.js";import{a as T}from"./chunk-WOZSH7YY.js";import{a as i}from"./chunk-HUUJBVXR.js";import{a as x}from"./chunk-4LDVFWME.js";import{a as b}from"./chunk-A45BLB26.js";import{a as S}from"./chunk-FGEB67EG.js";import{a as e}from"./chunk-47NSYSFY.js";import{a as v}from"./chunk-DEH76MSI.js";import{a as y}from"./chunk-EM35R6FY.js";import{b as g}from"./chunk-QXXXCEV5.js";import{f as s}from"./chunk-QT6UNBJP.js";import{a as u}from"./chunk-QGVBCWUY.js";import{a as h}from"./chunk-V76GWARL.js";var r;(function(a){a[a.SIXTEEN=0]="SIXTEEN",a[a.HUNDRED=1]="HUNDRED",a[a.TWOHUNDRED=2]="TWOHUNDRED",a[a.COUNT=3]="COUNT"})(r||(r={}));var l=class extends R{constructor(){super(...arguments),this.steps=r.SIXTEEN,this.writeTextureChannels=m.RG}};u([d({count:r.COUNT})],l.prototype,"steps",void 0),u([d({count:m.COUNT})],l.prototype,"writeTextureChannels",void 0);var p=class extends D{constructor(){super(...arguments),this.cloudRadius=0,this.cloudSize=0,this.detailSize=0,this.absorption=0,this.density=0,this.smoothness=0,this.cloudHeight=0,this.coverage=0,this.viewMatrix=v()}},H=h("esri-mobile")?1024:2048;function M(a){let c=new b;c.include(w,!1);let o=c.fragment;return o.include(P),o.uniforms.add(new i("cloudRadius",t=>t.cloudRadius),new i("power",t=>s(35,120,t.absorption)),new i("sigmaE",t=>1+t.absorption),new i("density",t=>s(0,.3,t.density)),new i("cloudSize",t=>s(0,.02,Math.max(.01,1-t.cloudSize))),new i("detailSize",t=>s(0,.2,Math.max(.01,1-t.detailSize))),new i("smoothness",t=>s(0,.5,1-t.smoothness)),new i("cloudHeight",t=>s(0,1500,t.cloudHeight)),new i("coverage",t=>t.coverage),new S("view",t=>t.viewMatrix),new x("cloudShapeTexture",t=>t.noiseTexture!=null?t.noiseTexture.textureAtlas:null),new T("cloudVariables",t=>g(F,t.coverage,t.absorption))),o.constants.add("halfCubeMapSize","float",.5*H),o.code.add(e`
    const int STEPS = ${a.steps===r.SIXTEEN?e`16`:a.steps===r.HUNDRED?e`100`:e`200`};
    const int STEPS_LIGHT = 6;
    const float stepL = 300.0 / float(STEPS_LIGHT);
    const float cloudStart = 1500.0;

    vec3 rayDirection(vec2 fragCoord) {
      vec2 xy = fragCoord - halfCubeMapSize;
      return normalize(vec3(-xy, -halfCubeMapSize));
    }

    float remap(float x, float low1, float high1, float low2, float high2) {
      return low2 + (x - low1) * (high2 - low2) / (high1 - low1);
    }

    float saturate(float x) {
      return clamp(x, 0.0, 1.0);
    }`),o.code.add(e`
    float getCloudShape(vec3 pos, float pOffset) {
      const float textureWidth = ${e.float(n)};
      const float dataWidth = ${e.float(n)};
      const float tileRows = ${e.float(E)};
      const vec3 atlasDimensions = vec3(${e.float(f)}, ${e.float(f)}, tileRows * tileRows);

      //Change from Y being height to Z being height
      vec3 p = float(${e.float(z)}) * pos.xzy;

      //Pixel coordinates of point in the 3D data
      vec3 coord = vec3(mod(p - pOffset * atlasDimensions, atlasDimensions));
      float f = fract(coord.z);
      float level = floor(coord.z);
      float tileY = floor(level / tileRows);
      float tileX = level - tileY * tileRows;

      //The data coordinates are offset by the x and y tile, the two boundary cells between each tile pair and the initial boundary cell on the first row/column
      vec2 offset = atlasDimensions.x * vec2(tileX, tileY) + 2.0 * vec2(tileX, tileY) + 1.0;
      vec2 pixel = coord.xy + offset;
      vec2 data = texture(cloudShapeTexture, mod(pixel, dataWidth) / textureWidth).xy;

      return 1.0 - mix(data.x, data.y, f);
    }

    float getCloudMap(vec2 p){
      // Shift the texture center to origin to avoid seam artifacts
      vec2 uv = (${e.float(C)} * p) / ${e.float(n)} + 0.5;

      return texture(cloudShapeTexture, uv).a;
    }
    `),o.code.add(e`float clouds(vec3 p) {
float cloud = saturate(0.5 * mix(0.0, 1.0, min(2.0 * coverage, 1.0)));
if (cloud <= 0.0) {
return 0.0;
}
float cloudMap = getCloudMap(cloudSize * p.xy);
cloud = mix(cloud, min(2.0 * (coverage), 1.0) * cloudMap, min(2.0 * (1.0 - coverage), 1.0));
if (cloud <= 0.0) {
return 0.0;
}
float shape = getCloudShape(8.0 * cloudSize * p, 0.0);
cloud = saturate(remap(cloud, smoothness * shape, 1.0, 0.0, 1.0));
if (cloud <= 0.0) {
return 0.0;
}
float heightFraction = saturate((length(p) - cloudRadius - cloudStart) / cloudHeight);
cloud *= saturate(remap(heightFraction, 0.0, 0.25, 0.0, 1.0)) * smoothstep(1.0, 0.25, heightFraction);
if (cloud <= 0.0) {
return 0.0;
}
return density * saturate(remap(cloud, 0.35 * smoothness * getCloudShape(detailSize * p, 0.0), 1.0, 0.0, 1.0));
}`),o.code.add(e`float HenyeyGreenstein(float g, float costh) {
return (1.0 / (4.0 * 3.1415))  * ((1.0 - g * g) / pow(1.0 + g * g - 2.0 * g * costh, 1.5));
}
float multipleOctaves(float extinction, float mu, float stepL) {
float attenuation = 1.0;
float contribution = 1.0;
float phaseAttenuation = 1.0;
float luminance = 0.0;
for (int i = 0; i < 4; i++) {
float phase = mix(HenyeyGreenstein(0.0, mu), HenyeyGreenstein(0.3 * phaseAttenuation, mu), 0.7);
luminance += contribution * phase * exp(-stepL * extinction * sigmaE * attenuation);
attenuation *= 0.2;
contribution *= 0.6;
phaseAttenuation *= 0.5;
}
return luminance;
}`),o.code.add(e`float lightRay(vec3 org, vec3 p, float phaseFunction, float mu, vec3 sunDirection) {
float lightRayDensity = clouds(p);
lightRayDensity += clouds(p + sunDirection * 1.0 * stepL);
lightRayDensity += clouds(p + sunDirection * 2.0 * stepL);
lightRayDensity += clouds(p + sunDirection * 3.0 * stepL);
lightRayDensity += clouds(p + sunDirection * 4.0 * stepL);
lightRayDensity += clouds(p + sunDirection * 5.0 * stepL);
float beersLaw = multipleOctaves(lightRayDensity, mu, stepL);
return mix(beersLaw * 2.0 * (1.0 - (exp(-stepL * lightRayDensity * 2.0 * sigmaE ))), beersLaw, 0.5 + 0.5 * mu);
}`),o.code.add(e`float mainRay(vec3 org, vec3 dir, vec3 sunDirection, float distToStart, float totalDistance, out float totalTransmittance) {
if (dir.z < 0.0) {
return 0.0;
}
totalTransmittance = 1.0;
float stepS = totalDistance / float(STEPS);
float cameraHeight = length(org);
float mu = 0.5 + 0.5 * dot(sunDirection, dir);
float phaseFunction = mix(HenyeyGreenstein(-0.3, mu), HenyeyGreenstein(0.3, mu), 0.7);
vec3 p = org + distToStart  * dir;
float dist = distToStart;
float shading = 0.0;
for (int i = 0; i < STEPS; i++) {
float sampleDensity = clouds(p);
float sampleSigmaE = sampleDensity * sigmaE;
if (sampleDensity > 0.0 ) {
float ambient = mix((1.2), (1.6), saturate((length(p) - cloudRadius - cloudStart) / cloudHeight));
float luminance = sampleDensity * (ambient + power * phaseFunction * lightRay(org, p, phaseFunction, mu, sunDirection));
float transmittance = exp(-sampleSigmaE * stepS);
shading += totalTransmittance * (luminance - luminance * transmittance) / sampleSigmaE;
totalTransmittance *= transmittance;
if (totalTransmittance <= 0.001) {
totalTransmittance = 0.0;
break;
}
}
dist += stepS;
p = org + dir * dist;
}
return shading;
}`),o.main.add(e`if (coverage ==  0.0) {
fragColor = vec4(0.0, 1.0, 0.0, 1.0);
return;
}
vec3 rayDir = rayDirection(gl_FragCoord.xy);
rayDir = normalize(view * rayDir);
vec3 viewPos = vec3(0, 0, cloudRadius + 1.0);
bool hitsPlanet = rayDir.z < 0.0;
float hazeFactor = smoothstep(-0.01, mix(0.0, 0.075, cloudVariables.x), abs(dot(rayDir, vec3(0, 0, 1))));
float totalTransmittance = 1.0;
float shading = 0.0;
if (hitsPlanet) {
shading = clamp(1.0 - cloudVariables.y, 0.6, 1.0) * (1.0 - hazeFactor);
totalTransmittance = hazeFactor;
fragColor = vec4(shading, totalTransmittance, shading, totalTransmittance);
return;
}
float cloudDistance = cloudRadius + cloudStart;
float rayStartDistance = dot(viewPos, viewPos) - (cloudDistance * cloudDistance);
vec2 rayStartIntersect = sphereIntersect(viewPos, rayDir, rayStartDistance);
float rayEndDistance = dot(viewPos, viewPos) - ((cloudDistance + cloudHeight) * (cloudDistance + cloudHeight));
vec2 rayEndIntersect = sphereIntersect(viewPos, rayDir, rayEndDistance);
float distToStart = rayStartIntersect.y;
float totalDistance = rayEndIntersect.y - distToStart;
vec3 sunDirection = normalize(vec3(0, 0, 1));
shading = 0.5 * mainRay(viewPos, rayDir, sunDirection, distToStart, totalDistance, totalTransmittance);
shading = mix(clamp(1.0 - cloudVariables.y, 0.6, 1.0), shading, hazeFactor);
totalTransmittance = mix(0.0, totalTransmittance, hazeFactor);
fragColor = vec4(shading, totalTransmittance, shading, totalTransmittance);`),c}var F=y(),Q=Object.freeze(Object.defineProperty({__proto__:null,CloudsPassParameters:p,build:M,cubeMapSize:H},Symbol.toStringTag,{value:"Module"}));export{r as a,l as b,p as c,H as d,M as e,Q as f};
