import{a as p,b as R,c as tt}from"./chunk-IQA3CVAZ.js";import{a as X,b as Z}from"./chunk-VAOSSSLB.js";import{a as L}from"./chunk-O2J7LFYY.js";import{a as T}from"./chunk-GWSX6PRO.js";import{a as S}from"./chunk-B2RVSTL3.js";import{a as I}from"./chunk-SOEEM7Z7.js";import{a as Q}from"./chunk-44A27HB7.js";import{a as n}from"./chunk-47NSYSFY.js";import{a as K}from"./chunk-QXNVQZT7.js";import{a as J,c as O}from"./chunk-KOUNUVF6.js";import{a as Y,d as E}from"./chunk-ALWV3RJ2.js";import{a as k,b as h,e as G,n as z,r as $,u as V}from"./chunk-6B5XFA6F.js";import{j as A}from"./chunk-ZTOZWLEE.js";import{a as u}from"./chunk-NRBJLISB.js";import{a as P,c as x}from"./chunk-BOVYXYHK.js";import{b as U}from"./chunk-QT6UNBJP.js";import{a as F}from"./chunk-BUSG3ZOF.js";import{a as f}from"./chunk-ARRCN5K3.js";import{f as l}from"./chunk-SG7CQU4O.js";import{H as i}from"./chunk-QHVIRF5H.js";import{I as c}from"./chunk-WZDN6K3C.js";import{a as o}from"./chunk-QGVBCWUY.js";var M,w=M=class extends l{constructor(a){super(a),this.type="cloudy",this.cloudCover=.5}clone(){return new M({cloudCover:this.cloudCover})}};o([u({cloudy:"cloudy"}),i({json:{write:{isRequired:!0}}})],w.prototype,"type",void 0),o([i({type:Number,nonNullable:!0,range:{min:0,max:1},json:{write:!0}})],w.prototype,"cloudCover",void 0),w=M=o([c("esri.views.3d.environment.CloudyWeather")],w);var et=w;var H,g=H=class extends l{constructor(a){super(a),this.type="foggy",this.fogStrength=.5}clone(){return new H({fogStrength:this.fogStrength})}};o([u({foggy:"foggy"}),i({json:{write:{isRequired:!0}}})],g.prototype,"type",void 0),o([i({type:Number,nonNullable:!0,range:{min:0,max:1},json:{write:!0}})],g.prototype,"fogStrength",void 0),g=H=o([c("esri.views.3d.environment.FoggyWeather")],g);var at=g;var W,v=W=class extends l{constructor(a){super(a),this.type="rainy",this.cloudCover=.5,this.precipitation=.5}clone(){return new W({cloudCover:this.cloudCover,precipitation:this.precipitation})}};o([u({rainy:"rainy"}),i({json:{write:{isRequired:!0}}})],v.prototype,"type",void 0),o([i({type:Number,nonNullable:!0,range:{min:0,max:1},json:{write:!0}})],v.prototype,"cloudCover",void 0),o([i({type:Number,nonNullable:!0,range:{min:0,max:1},json:{write:!0}})],v.prototype,"precipitation",void 0),v=W=o([c("esri.views.3d.environment.RainyWeather")],v);var ot=v;var B,m=B=class extends l{constructor(a){super(a),this.type="snowy",this.cloudCover=.5,this.precipitation=.5,this.snowCover="disabled"}clone(){return new B({cloudCover:this.cloudCover,precipitation:this.precipitation,snowCover:this.snowCover})}};o([u({snowy:"snowy"}),i({json:{write:{isRequired:!0}}})],m.prototype,"type",void 0),o([i({type:Number,nonNullable:!0,range:{min:0,max:1},json:{write:!0}})],m.prototype,"cloudCover",void 0),o([i({type:Number,nonNullable:!0,range:{min:0,max:1},json:{write:!0}})],m.prototype,"precipitation",void 0),o([i({type:["enabled","disabled"],nonNullable:!0,json:{write:!0}})],m.prototype,"snowCover",void 0),m=B=o([c("esri.views.3d.environment.SnowyWeather")],m);var rt=m;var j,_=j=class extends l{constructor(a){super(a),this.type="sunny",this.cloudCover=.5}clone(){return new j({cloudCover:this.cloudCover})}};o([u({sunny:"sunny"}),i({json:{write:{isRequired:!0}}})],_.prototype,"type",void 0),o([i({type:Number,nonNullable:!0,range:{min:0,max:1},json:{write:!0}})],_.prototype,"cloudCover",void 0),_=j=o([c("esri.views.3d.environment.SunnyWeather")],_);var q=_;var ct={key:"type",base:q,typeMap:{sunny:q,cloudy:et,rainy:ot,snowy:rt,foggy:at}},lt=Object.keys(ct.typeMap);function we(a,e){return!!lt.includes(a)||(e.error(`"${a}" is not a valid weather type`),!1)}var D=1e4,it=1e5;var st=class{constructor(){this.startTime=0,this._data=F(null),this._readChannels=R.RG,this.parallax=new b,this.parallaxNew=new b,this._anchorPoint=P(),this._fadeState=F(t.HIDE),this._fadeFactor=F(1)}get data(){return this._data.value}set data(e){this._data.value=e}get readChannels(){return this._readChannels}get fadeState(){return this._fadeState.value}get fadeFactor(){return this._fadeFactor.value}get opacity(){switch(this.fadeState){case t.HIDE:return 0;case t.FADE_OUT:return 1-this.fadeFactor;case t.FADE_IN:return this.fadeFactor;case t.SHOW:case t.CROSS_FADE:return 1}}fade(e,s,d){this.isFading&&this.fadeFactor<1&&(this._fadeFactor.value=d?U((s-this.startTime)/(ht*d),0,1):1,this.fadeFactor===1&&this._endFade()),this._evaluateState(e,s),this._updateParallax(e)}_evaluateState(e,s){let d=e.relativeElevation,C=this._updateAnchorPoint(e);(d>1.7*D||d<-1e4||C>dt)&&this.opacity>0?this._startFade(t.HIDE,s):this.isFading||(d>D||d<-.35*D||C>pt*dt?this.opacity>0&&this._startFade(t.FADE_OUT,s):tt(this.data)&&(this.opacity===0?this._startFade(t.FADE_IN,s):this.data.state===p.Ready&&(this.fadeState===t.SHOW?this._startFade(t.CROSS_FADE,s):this._startFade(t.SHOW,s))))}_updateParallax(e){let s=$(e.eye);this.parallax.radiusCurvatureCorrection=.84*Math.sqrt(Math.max(s-f.radius*f.radius,0))/Math.sqrt(s),O(nt,this.parallax.anchorPoint,y),A(this.parallax.transform,E,y[3],y),O(nt,this.parallaxNew.anchorPoint,y),A(this.parallaxNew.transform,E,y[3],y)}_updateAnchorPoint(e){return V(this._anchorPoint,e.eye),z(this._anchorPoint,this._anchorPoint,f.radius),this.fadeState===t.HIDE&&this.data?.state===p.Ready?(h(this.parallax.anchorPoint,this._anchorPoint),0):k(G(ut,this.parallax.anchorPoint,this._anchorPoint))}requestFade(){this._fadeFactor.value=0}_startFade(e,s){switch(this._fadeState.value=e,this.startTime=s,e){case t.CROSS_FADE:this.requestFade(),this._switchReadChannels(),h(this.parallaxNew.anchorPoint,this._anchorPoint);break;case t.FADE_IN:this.requestFade(),this._switchReadChannels(),h(this.parallax.anchorPoint,this._anchorPoint),h(this.parallaxNew.anchorPoint,this._anchorPoint);break;case t.FADE_OUT:this.requestFade();break;case t.SHOW:this._switchReadChannels(),h(this.parallax.anchorPoint,this._anchorPoint),h(this.parallaxNew.anchorPoint,this._anchorPoint),this._endFade();break;case t.HIDE:this._endFade()}}_endFade(){switch(this._fadeFactor.value=1,this.data&&this.data.state!==p.Ready&&(this.data.state=p.Idle),this.fadeState){case t.CROSS_FADE:h(this.parallax.anchorPoint,this.parallaxNew.anchorPoint),this._fadeState.value=t.SHOW;break;case t.FADE_IN:this._fadeState.value=t.SHOW;break;case t.FADE_OUT:this._fadeState.value=t.HIDE;break;case t.SHOW:case t.HIDE:break;default:this.fadeState}}_switchReadChannels(){this.data?.state===p.Ready&&(this._readChannels=1-this._readChannels,this.data.state=p.Fading)}get isFading(){return this.fadeState===t.FADE_OUT||this.fadeState===t.FADE_IN||this.fadeState===t.CROSS_FADE}},t;(function(a){a[a.HIDE=0]="HIDE",a[a.FADE_IN=1]="FADE_IN",a[a.SHOW=2]="SHOW",a[a.CROSS_FADE=3]="CROSS_FADE",a[a.FADE_OUT=4]="FADE_OUT"})(t||(t={}));var b=class{constructor(){this.anchorPoint=P(),this.radiusCurvatureCorrection=0,this.transform=Y()}},nt=x(0,0,1),y=J(),ut=P(),ht=1.25,pt=.5,dt=2e5;var N=class extends Q{constructor(e,s){super(e,"samplerCube",K.Bind,(d,C)=>d.bindTexture(e,s(C)))}};function Ke(a){let e=a.fragment;e.constants.add("radiusCloudsSquared","float",mt).code.add(n`vec3 intersectWithCloudLayer(vec3 dir, vec3 cameraPosition, vec3 spherePos) {
float B = 2.0 * dot(cameraPosition, dir);
float C = dot(cameraPosition, cameraPosition) - radiusCloudsSquared;
float det = B * B - 4.0 * C;
float pointIntDist = max(0.0, 0.5 *(-B + sqrt(det)));
return (cameraPosition + dir * pointIntDist) - spherePos;
}`),e.uniforms.add(new S("radiusCurvatureCorrection",({clouds:r})=>r.parallax.radiusCurvatureCorrection)).code.add(n`vec3 correctForPlanetCurvature(vec3 dir) {
dir.z = dir.z * (1.0 - radiusCurvatureCorrection) + radiusCurvatureCorrection;
return dir;
}`),e.code.add(n`vec3 rotateDirectionToAnchorPoint(mat4 rotMat, vec3 inVec) {
return (rotMat * vec4(inVec, 0.0)).xyz;
}`),X(e),Z(e);let s=x(.28,.175,.035);e.constants.add("RIM_COLOR","vec3",s),e.code.add(n`
    vec3 calculateCloudColor(vec3 cameraPosition, vec3 worldSpaceRay, vec4 clouds) {
      float upDotLight = dot(cameraPosition, mainLightDirection);
      float dirDotLight = max(dot(worldSpaceRay, mainLightDirection), 0.0);
      float sunsetTransition = clamp(pow(max(upDotLight, 0.0), ${n.float(.3)}), 0.0, 1.0);

      // Base color of the clouds that depends on lighting of the sun and sky
      vec3 ambientLight = calculateAmbientIrradiance(cameraPosition,  0.0);
      vec3 combinedLight = clamp((mainLightIntensity + ambientLight )/PI, vec3(0.0), vec3(1.0));
      vec3 baseCloudColor = pow(combinedLight * pow(clouds.xyz, vec3(GAMMA)), vec3(INV_GAMMA));

      // Rim light around the edge of the clouds simulating scattering of the direct lun light
      float scatteringMod = max(clouds.a < 0.5 ? clouds.a / 0.5 : - clouds.a / 0.5 + 2.0, 0.0);
      float rimLightIntensity = 0.5 + 0.5 * pow(max(upDotLight, 0.0), 0.35);
      vec3 directSunScattering = RIM_COLOR * rimLightIntensity * (pow(dirDotLight, ${n.float(140)})) * scatteringMod;

      // Brighten the clouds around the sun at the sunsets
      float additionalLight = ${n.float(.2)} * pow(dirDotLight, ${n.float(10)}) * (1. - pow(sunsetTransition, ${n.float(.3)})) ;

      return vec3(baseCloudColor * (1.0 + additionalLight) + directSunScattering);
    }
  `),e.uniforms.add(new L("readChannelsRG",r=>r.clouds.readChannels===R.RG),new N("cubeMap",r=>r.clouds.data?.cubeMap?.colorTexture??null)).code.add(n`vec4 sampleCloud(vec3 rayDir, bool readOtherChannel) {
vec4 s = texture(cubeMap, rayDir);
bool readRG = readChannelsRG ^^ readOtherChannel;
s = readRG ? vec4(vec3(s.r), s.g) : vec4(vec3(s.b), s.a);
return length(s) == 0.0 ? vec4(s.rgb, 1.0) : s;
}`),e.uniforms.add(new T("anchorPoint",r=>r.clouds.parallax.anchorPoint),new T("anchorPointNew",r=>r.clouds.parallaxNew.anchorPoint),new I("rotationClouds",r=>r.clouds.parallax.transform),new I("rotationCloudsNew",r=>r.clouds.parallaxNew.transform),new S("cloudsOpacity",r=>r.clouds.opacity),new S("fadeFactor",r=>r.clouds.fadeFactor),new L("crossFade",r=>r.clouds.fadeState===t.CROSS_FADE)).code.add(n`vec4 renderClouds(vec3 worldRay, vec3 cameraPosition) {
vec3 intersectionPoint = intersectWithCloudLayer(worldRay, cameraPosition, anchorPoint);
vec3 worldRayRotated = rotateDirectionToAnchorPoint(rotationClouds, normalize(intersectionPoint));
vec3 worldRayRotatedCorrected = correctForPlanetCurvature(worldRayRotated);
vec4 cloudData = sampleCloud(worldRayRotatedCorrected, crossFade);
vec3 cameraPositionN = normalize(cameraPosition);
vec4 cloudColor = vec4(calculateCloudColor(cameraPositionN, worldRay, cloudData), cloudData.a);
if(crossFade) {
intersectionPoint = intersectWithCloudLayer(worldRay, cameraPosition, anchorPointNew);
worldRayRotated = rotateDirectionToAnchorPoint(rotationCloudsNew, normalize(intersectionPoint));
worldRayRotatedCorrected = correctForPlanetCurvature(worldRayRotated);
cloudData = sampleCloud(worldRayRotatedCorrected, false);
vec4 cloudColorNew = vec4(calculateCloudColor(cameraPositionN, worldRay, cloudData), cloudData.a);
cloudColor = mix(cloudColor, cloudColorNew, fadeFactor);
}
float totalTransmittance = length(cloudColor.rgb) == 0.0 ?
1.0 :
clamp(cloudColor.a * cloudsOpacity + (1.0 - cloudsOpacity), 0.0 , 1.0);
return vec4(cloudColor.rgb, totalTransmittance);
}`)}var mt=(f.radius+it)**2;export{q as a,ct as b,we as c,D as d,st as e,Ke as f};
