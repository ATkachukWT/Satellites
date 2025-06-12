import{a as V,b as v}from"./chunk-X5NPIY3C.js";import{a as y}from"./chunk-6L543SC5.js";import{a as T}from"./chunk-CU7FHMWW.js";import{a as u}from"./chunk-CSFAHB4Y.js";import{a as x}from"./chunk-AMISFAT3.js";import{a as b}from"./chunk-YVCKQBWT.js";import{a as U}from"./chunk-4XEE5PE3.js";import{a as F}from"./chunk-UJ7KVQR6.js";import{a as P}from"./chunk-ELCBU4NP.js";import{a as g}from"./chunk-L7NOU4T2.js";import{a as n}from"./chunk-WOZSH7YY.js";import{a as D}from"./chunk-2CKJLDTO.js";import{a as M}from"./chunk-HUUJBVXR.js";import{a as h}from"./chunk-4LDVFWME.js";import{a as O}from"./chunk-A45BLB26.js";import{a as d}from"./chunk-SOEEM7Z7.js";import{a as s}from"./chunk-T7PUQGWM.js";import{a as t}from"./chunk-47NSYSFY.js";import{a as r,d as l}from"./chunk-ALWV3RJ2.js";import{e as a,h as p}from"./chunk-ZTOZWLEE.js";import{f as m}from"./chunk-BOVYXYHK.js";var c=class extends g{constructor(){super(...arguments),this.localOrigin=m()}};function z(o){o.include(b),o.fragment.uniforms.add(new u("inverseViewMatrix",(i,e)=>{let w=p(r(),e.camera.viewMatrix,i.localOrigin);return a(w,w)})).code.add(t`vec4 reconstructLocalPosition(vec2 coord, float linearDepth) {
vec4 cameraSpace = vec4(reconstructPosition(coord, linearDepth), 1.0);
return inverseViewMatrix * cameraSpace;
}`)}var f=class extends c{constructor(){super(...arguments),this.shadowMap={depthTexture:null,nearFar:[1,100],numActiveFaces:1,atlasRegions:[[0,0,1,1]]},this.targetVector=[1,0,0],this.upVector=[0,0,1],this.fovs=[45,45],this.headingAndTilt=[0,0],this.observerOffset=[0,0,0],this.projectionMatrices=l.flat(),this.viewMatrices=l.flat(),this.volumeOffset=0}};function S(){let o=new O,i=o.fragment;return o.include(U),o.include(z),o.include(T),i.include(D),i.include(V),o.include(y),i.uniforms.add(new P("depthTexture",e=>e.depth?.attachment),new d("inverseProjectionMatrix",e=>e.camera.inverseProjectionMatrix),new d("inverseViewNormalMatrix",({camera:e})=>a(A,e.viewInverseTransposeMatrix)),new s("viewshedObserverOffset",e=>e.observerOffset),new s("viewshedTargetVector",e=>e.targetVector),new s("viewshedUpVector",e=>e.upVector),new n("viewshedFOVs",e=>e.fovs),new n("viewshedHeadingAndTilt",e=>e.headingAndTilt),new n("viewshedNearFar",e=>e.shadowMap.nearFar??[1,100]),new M("viewshedVolumeOffset",e=>e.volumeOffset),new h("viewshedShadowMap",e=>e.shadowMap.depthTexture),new v("viewshedProjectionMatrices",e=>e.projectionMatrices,6),new v("viewshedViewMatrices",e=>e.viewMatrices,6),new x("viewshedNumFaces",e=>e.shadowMap.numActiveFaces),new F("viewshedAtlasRegions",e=>e.shadowMap.atlasRegions.flat(),24),new h("normalMap",e=>e.normals)),i.constants.add("visibleColor","vec4",[0,1,0,.5]),i.constants.add("occludedColor","vec4",[1,0,0,.5]),i.code.add(t`vec2 getViewshedUv(vec4 worldPosition, int face) {
mat4 viewshedMatrix = viewshedProjectionMatrices[face];
vec4 viewshedUv4 = viewshedMatrix * worldPosition;
vec3 viewshedUv = viewshedUv4.xyz / viewshedUv4.w;
return viewshedUv.xy;
}
float viewshedDepthToFloat(float depth) {
return (depth - viewshedNearFar[0]) / (viewshedNearFar[1] - viewshedNearFar[0]);
}
float getOrthographicDepthToViewshed(vec4 worldPosition, int face) {
mat4 viewshedViewMatrix = viewshedViewMatrices[face];
vec4 viewshedUv4 = viewshedViewMatrix * worldPosition;
vec3 viewshedUv = viewshedUv4.xyz / viewshedUv4.w;
float depth = -viewshedUv.z;
return viewshedDepthToFloat(depth);
}
float getDepthFromShadowMap(vec2 uv, int face) {
int index = 4 * face;
float umin = viewshedAtlasRegions[index];
float umax = viewshedAtlasRegions[index + 1];
float vmin = viewshedAtlasRegions[index + 2];
float vmax = viewshedAtlasRegions[index + 3];
vec4 atlasRegion = vec4(umin, vmin, umax, vmax);
return rgba4ToFloat(textureAtlasLookup(viewshedShadowMap, uv, atlasRegion));
}
struct ViewshedPoint {
int face;
vec2 uv;
bool isWithin;
float orthographicDepth;
};
mat3 rotationMatrix(vec3 axis, float angle)
{
float s = sin(angle);
float c = cos(angle);
float oc = 1.0 - c;
return mat3(
oc * axis.xxz * axis.xyx + vec3(c, axis.zy) * vec3(1., -s, s),
oc * axis.xyy * axis.yyz + vec3(axis.z, c, axis.x) * vec3(s, 1., -s),
oc * axis.zyz * axis.xzz + vec3(axis.yx, c) * vec3(-s, s, 1.)
);
}
float distanceToPlane(vec3 position, vec3 normal) {
return dot(position, normal);
}
bool outsideViewshed(float distance) {
return distance > -viewshedVolumeOffset;
}
bool isWithinViewshed(vec3 position) {
float positionLength = length(position - viewshedObserverOffset);
float farSphereDistance = positionLength - viewshedNearFar[1];
if (outsideViewshed(farSphereDistance)) { return false; }
float nearSphereDistance = viewshedNearFar[0] - positionLength;
if (outsideViewshed(nearSphereDistance)) { return false; }
vec3 westVector = normalize(cross(viewshedUpVector, viewshedTargetVector));
bool leftOfTarget = distanceToPlane(position, westVector) > 0.0;
if (viewshedFOVs[0] < TWO_PI) {
float horAngle = viewshedFOVs[0] / 2.0;
horAngle = leftOfTarget ? horAngle : -horAngle;
vec3 sideVector = viewshedTargetVector * rotationMatrix(viewshedUpVector, horAngle);
bool inFront = distanceToPlane(position, sideVector) > 0.0;
if (inFront) {
vec3 sideNormal = cross(viewshedUpVector, sideVector) * (leftOfTarget ? 1. : -1.);
float sideDistance = distanceToPlane(position, normalize(sideNormal));
if (outsideViewshed(sideDistance)) { return false; }
} else if (viewshedFOVs[0] < PI) { return false; }
}
if (viewshedFOVs[1] < PI) {
float t = dot(viewshedUpVector, position);
vec3 nProjVector = normalize(position - t * viewshedUpVector);
float heading = acos(clamp(dot(normalize(viewshedTargetVector), nProjVector), -1.0, 1.0));
heading = leftOfTarget ? heading : -heading;
bool aboveTarget = distanceToPlane(position, viewshedUpVector) > 0.0;
float verFOV = viewshedFOVs[1] / 2.0;
verFOV = aboveTarget ? -verFOV : verFOV;
mat3 rotateByHeading = rotationMatrix(viewshedUpVector, heading);
vec3 sideVector = viewshedTargetVector * rotationMatrix(westVector, verFOV) * rotateByHeading;
vec3 leftVector = westVector * rotateByHeading;
vec3 sideNormal = cross(sideVector, leftVector) * (aboveTarget ? 1. : -1.);
float sideDistance = distanceToPlane(position, normalize(sideNormal));
if (outsideViewshed(sideDistance)) { return false; }
}
return true;
}
bool getViewshedPoint(vec4 localPosition, out ViewshedPoint point) {
for(int i=0; i < viewshedNumFaces; i++) {
vec2 viewshedUv = getViewshedUv(localPosition, i);
if (viewshedUv.x > 0. && viewshedUv.x < 1. && viewshedUv.y > 0. && viewshedUv.y < 1.) {
float orthoDepth = getOrthographicDepthToViewshed(localPosition, i);
if (orthoDepth >= 0.) {
bool isWithin = isWithinViewshed(localPosition.xyz);
point = ViewshedPoint(i, viewshedUv, isWithin, orthoDepth);
return true;
}
}
}
return false;
}
float normalCosAngle(float linearDepth, vec3 localPosition) {
vec4 normal4 = texture(normalMap, uv);
vec3 normalN = vec3(-1.0) + 2.0 * normal4.xyz;
vec3 normal =  normalize((inverseViewNormalMatrix * vec4(normalN, 1.0)).xyz);
vec3 viewingDir = normalize(localPosition);
return dot(normal, viewingDir);
}`),i.main.add(t`float depth = depthFromTexture(depthTexture, uv);
if (depth >= 1.0 || depth <= 0.0) {
return;
}
float linearDepth = linearizeDepth(depth);
vec4 localPosition = reconstructLocalPosition(gl_FragCoord.xy, linearDepth);
ViewshedPoint point;
bool foundFace = getViewshedPoint(localPosition, point);
if (!foundFace || !point.isWithin) {
return;
}
float viewshedDepth = getDepthFromShadowMap(point.uv, point.face);
float distance = point.orthographicDepth;
bool visible = distance < viewshedDepth;
fragColor = visible ? visibleColor : occludedColor;
float cosAngle = normalCosAngle(linearDepth, localPosition.xyz);
float threshold = -0.01;
if (cosAngle > threshold) {
fragColor = occludedColor;
}`),o}var A=r(),se=Object.freeze(Object.defineProperty({__proto__:null,ViewshedPassParameters:f,build:S},Symbol.toStringTag,{value:"Module"}));export{f as a,S as b,se as c};
