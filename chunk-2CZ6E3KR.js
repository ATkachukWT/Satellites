import{a as h}from"./chunk-NOHUHVCW.js";import{a}from"./chunk-CMKJEBQJ.js";import{t as s}from"./chunk-UHRSAPGQ.js";var l=class{constructor(e){this.context=e,this._debug=!1,this._precompiling=this._debug?0:1,this._cache=new h}get precompiling(){return this._precompiling}set precompiling(e){this._precompiling=e,e===0&&this.context.rctx.gl.flush()}get viewingMode(){return this.context.viewingMode}destroy(){this._cache.forAll(e=>e.destroy()),this._cache.clear()}precompile(e,t=p){++this.precompiling,this.get(e,t),--this.precompiling}get(e,t=p){let n=t.key.code,i=this._cache.get(e,n);if(i==null){if(this._precompiling===0){let o=`Uncached shader compile in ${new Error().stack}
  for configuration
${t.decode()}`,r=this._cache.getInner(e);throw r?.size&&(o+=`

  cached configurations:
`,o+=Array.from(r.values()).map(g=>t.decode(g.key)).sort().join(`

`)),console.log(o),new s(o)}i=new e(this.context,t),this._cache.set(e,n,i)}return i}async reloadAll(){let e=new Array;this._cache.forEach(t=>e.push(m(t))),await Promise.all(e)}};async function m(c){let e=!0;c.forEach(async t=>{await t.reload(e),e=!1})}var p=new a;export{l as a,p as b};
