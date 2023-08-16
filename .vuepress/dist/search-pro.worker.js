const nt="ENTRIES",V="KEYS",T="VALUES",F="";class D{set;_type;_path;constructor(t,s){const n=t._tree,o=Array.from(n.keys());this.set=t,this._type=s,this._path=o.length>0?[{node:n,keys:o}]:[]}next(){const t=this.dive();return this.backtrack(),t}dive(){if(this._path.length===0)return{done:!0,value:void 0};const{node:t,keys:s}=E(this._path);if(E(s)===F)return{done:!1,value:this.result()};const n=t.get(E(s));return this._path.push({node:n,keys:Array.from(n.keys())}),this.dive()}backtrack(){if(this._path.length===0)return;const t=E(this._path).keys;t.pop(),!(t.length>0)&&(this._path.pop(),this.backtrack())}key(){return this.set._prefix+this._path.map(({keys:t})=>E(t)).filter(t=>t!==F).join("")}value(){return E(this._path).node.get(F)}result(){switch(this._type){case T:return this.value();case V:return this.key();default:return[this.key(),this.value()]}}[Symbol.iterator](){return this}}const E=e=>e[e.length-1],ot=(e,t,s)=>{const n=new Map;if(t===void 0)return n;const o=t.length+1,u=o+s,i=new Uint8Array(u*o).fill(s+1);for(let r=0;r<o;++r)i[r]=r;for(let r=1;r<u;++r)i[r*o]=r;return W(e,t,s,n,i,1,o,""),n},W=(e,t,s,n,o,u,i,r)=>{const h=u*i;t:for(const c of e.keys())if(c===F){const d=o[h-1];d<=s&&n.set(r,[e.get(c),d])}else{let d=u;for(let l=0;l<c.length;++l,++d){const p=c[l],f=i*d,g=f-i;let a=o[f];const m=Math.max(0,d-s-1),y=Math.min(i-1,d+s);for(let _=m;_<y;++_){const b=p!==t[_],z=o[g+_]+ +b,A=o[g+_+1]+1,w=o[f+_]+1,L=o[f+_+1]=Math.min(z,A,w);L<a&&(a=L)}if(a>s)continue t}W(e.get(c),t,s,n,o,d,i,r+c)}};class C{_tree;_prefix;_size=void 0;constructor(t=new Map,s=""){this._tree=t,this._prefix=s}atPrefix(t){if(!t.startsWith(this._prefix))throw new Error("Mismatched prefix");const[s,n]=x(this._tree,t.slice(this._prefix.length));if(s===void 0){const[o,u]=O(n);for(const i of o.keys())if(i!==F&&i.startsWith(u)){const r=new Map;return r.set(i.slice(u.length),o.get(i)),new C(r,t)}}return new C(s,t)}clear(){this._size=void 0,this._tree.clear()}delete(t){return this._size=void 0,ut(this._tree,t)}entries(){return new D(this,nt)}forEach(t){for(const[s,n]of this)t(s,n,this)}fuzzyGet(t,s){return ot(this._tree,t,s)}get(t){const s=I(this._tree,t);return s!==void 0?s.get(F):void 0}has(t){const s=I(this._tree,t);return s!==void 0&&s.has(F)}keys(){return new D(this,V)}set(t,s){if(typeof t!="string")throw new Error("key must be a string");return this._size=void 0,M(this._tree,t).set(F,s),this}get size(){if(this._size)return this._size;this._size=0;const t=this.entries();for(;!t.next().done;)this._size+=1;return this._size}update(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=M(this._tree,t);return n.set(F,s(n.get(F))),this}fetch(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=M(this._tree,t);let o=n.get(F);return o===void 0&&n.set(F,o=s()),o}values(){return new D(this,T)}[Symbol.iterator](){return this.entries()}static from(t){const s=new C;for(const[n,o]of t)s.set(n,o);return s}static fromObject(t){return C.from(Object.entries(t))}}const x=(e,t,s=[])=>{if(t.length===0||e==null)return[e,s];for(const n of e.keys())if(n!==F&&t.startsWith(n))return s.push([e,n]),x(e.get(n),t.slice(n.length),s);return s.push([e,t]),x(void 0,"",s)},I=(e,t)=>{if(t.length===0||e==null)return e;for(const s of e.keys())if(s!==F&&t.startsWith(s))return I(e.get(s),t.slice(s.length))},M=(e,t)=>{const s=t.length;t:for(let n=0;e&&n<s;){for(const u of e.keys())if(u!==F&&t[n]===u[0]){const i=Math.min(s-n,u.length);let r=1;for(;r<i&&t[n+r]===u[r];)++r;const h=e.get(u);if(r===u.length)e=h;else{const c=new Map;c.set(u.slice(r),h),e.set(t.slice(n,n+r),c),e.delete(u),e=c}n+=r;continue t}const o=new Map;return e.set(t.slice(n),o),o}return e},ut=(e,t)=>{const[s,n]=x(e,t);if(s!==void 0){if(s.delete(F),s.size===0)R(n);else if(s.size===1){const[o,u]=s.entries().next().value;$(n,o,u)}}},R=e=>{if(e.length===0)return;const[t,s]=O(e);if(t.delete(s),t.size===0)R(e.slice(0,-1));else if(t.size===1){const[n,o]=t.entries().next().value;n!==F&&$(e.slice(0,-1),n,o)}},$=(e,t,s)=>{if(e.length===0)return;const[n,o]=O(e);n.set(o+t,s),n.delete(o)},O=e=>e[e.length-1],it=(e,t)=>{const s=e._idToShortId.get(t);if(s!=null)return e._storedFields.get(s)},rt=/[\n\r -#%-*,-/:;?@[-\]_{}\u00A0\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/u,S="or",q="and",ct="and_not",lt=(e,t)=>{e.includes(t)||e.push(t)},P=(e,t)=>{for(const s of t)e.includes(s)||e.push(s)},G=({score:e},{score:t})=>t-e,ht=()=>new Map,k=e=>{const t=new Map;for(const s of Object.keys(e))t.set(parseInt(s,10),e[s]);return t},N=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0,dt={[S]:(e,t)=>{for(const s of t.keys()){const n=e.get(s);if(n==null)e.set(s,t.get(s));else{const{score:o,terms:u,match:i}=t.get(s);n.score=n.score+o,n.match=Object.assign(n.match,i),P(n.terms,u)}}return e},[q]:(e,t)=>{const s=new Map;for(const n of t.keys()){const o=e.get(n);if(o==null)continue;const{score:u,terms:i,match:r}=t.get(n);P(o.terms,i),s.set(n,{score:o.score+u,terms:o.terms,match:Object.assign(o.match,r)})}return s},[ct]:(e,t)=>{for(const s of t.keys())e.delete(s);return e}},at=(e,t,s,n,o,u)=>{const{k:i,b:r,d:h}=u;return Math.log(1+(s-t+.5)/(t+.5))*(h+e*(i+1)/(e+i*(1-r+r*n/o)))},ft=e=>(t,s,n)=>{const o=typeof e.fuzzy=="function"?e.fuzzy(t,s,n):e.fuzzy||!1,u=typeof e.prefix=="function"?e.prefix(t,s,n):e.prefix===!0;return{term:t,fuzzy:o,prefix:u}},H=(e,t,s,n)=>{for(const o of Object.keys(e._fieldIds))if(e._fieldIds[o]===s){e._options.logger("warn",`SlimSearch: document with ID ${e._documentIds.get(t)} has changed before removal: term "${n}" was not present in field "${o}". Removing a document after it has changed can corrupt the index!`,"version_conflict");return}},gt=(e,t,s,n)=>{if(!e._index.has(n)){H(e,s,t,n);return}const o=e._index.fetch(n,ht),u=o.get(t);u==null||u.get(s)==null?H(e,s,t,n):u.get(s)<=1?u.size<=1?o.delete(t):u.delete(s):u.set(s,u.get(s)-1),e._index.get(n).size===0&&e._index.delete(n)},mt={k:1.2,b:.7,d:.5},pt={idField:"id",extractField:(e,t)=>e[t],tokenize:e=>e.split(rt),processTerm:e=>e.toLowerCase(),fields:void 0,searchOptions:void 0,storeFields:[],logger:(e,t)=>{typeof(console==null?void 0:console[e])=="function"&&console[e](t)},autoVacuum:!0},J={combineWith:S,prefix:!1,fuzzy:!1,maxFuzzy:6,boost:{},weights:{fuzzy:.45,prefix:.375},bm25:mt},Ft={combineWith:q,prefix:(e,t,s)=>t===s.length-1},_t={batchSize:1e3,batchWait:10},U={minDirtFactor:.1,minDirtCount:20},yt={..._t,...U},Y=(e,t=S)=>{if(e.length===0)return new Map;const s=t.toLowerCase();return e.reduce(dt[s])||new Map},B=(e,t,s,n,o,u,i,r,h=new Map)=>{if(o==null)return h;for(const c of Object.keys(u)){const d=u[c],l=e._fieldIds[c],p=o.get(l);if(p==null)continue;let f=p.size;const g=e._avgFieldLength[l];for(const a of p.keys()){if(!e._documentIds.has(a)){gt(e,l,a,s),f-=1;continue}const m=i?i(e._documentIds.get(a),s,e._storedFields.get(a)):1;if(!m)continue;const y=p.get(a),_=e._fieldLength.get(a)[l],b=at(y,f,e._documentCount,_,g,r),z=n*d*m*b,A=h.get(a);if(A){A.score+=z,lt(A.terms,t);const w=N(A.match,s);w?w.push(c):A.match[s]=[c]}else h.set(a,{score:z,terms:[t],match:{[s]:[c]}})}}return h},At=(e,t,s)=>{const n={...e._options.searchOptions,...s},o=(n.fields||e._options.fields).reduce((a,m)=>({...a,[m]:N(n.boost,m)||1}),{}),{boostDocument:u,weights:i,maxFuzzy:r,bm25:h}=n,{fuzzy:c,prefix:d}={...J.weights,...i},l=e._index.get(t.term),p=B(e,t.term,t.term,1,l,o,u,h);let f,g;if(t.prefix&&(f=e._index.atPrefix(t.term)),t.fuzzy){const a=t.fuzzy===!0?.2:t.fuzzy,m=a<1?Math.min(r,Math.round(t.term.length*a)):a;m&&(g=e._index.fuzzyGet(t.term,m))}if(f)for(const[a,m]of f){const y=a.length-t.term.length;if(!y)continue;g==null||g.delete(a);const _=d*a.length/(a.length+.3*y);B(e,t.term,a,_,m,o,u,h,p)}if(g)for(const a of g.keys()){const[m,y]=g.get(a);if(!y)continue;const _=c*a.length/(a.length+y);B(e,t.term,a,_,m,o,u,h,p)}return p},X=(e,t,s={})=>{if(typeof t!="string"){const d={...s,...t,queries:void 0},l=t.queries.map(p=>X(e,p,d));return Y(l,d.combineWith)}const{tokenize:n,processTerm:o,searchOptions:u}=e._options,i={tokenize:n,processTerm:o,...u,...s},{tokenize:r,processTerm:h}=i,c=r(t).flatMap(d=>h(d)).filter(d=>!!d).map(ft(i)).map(d=>At(e,d,i));return Y(c,i.combineWith)},K=(e,t,s={})=>{const n=X(e,t,s),o=[];for(const[u,{score:i,terms:r,match:h}]of n){const c=r.length,d={id:e._documentIds.get(u),score:i*c,terms:Object.keys(h),match:h};Object.assign(d,e._storedFields.get(u)),(s.filter==null||s.filter(d))&&o.push(d)}return o.sort(G),o},Ct=(e,t,s={})=>{s={...e._options.autoSuggestOptions,...s};const n=new Map;for(const{score:u,terms:i}of K(e,t,s)){const r=i.join(" "),h=n.get(r);h!=null?(h.score+=u,h.count+=1):n.set(r,{score:u,terms:i,count:1})}const o=[];for(const[u,{score:i,terms:r,count:h}]of n)o.push({suggestion:u,terms:r,score:i/h});return o.sort(G),o};class Et{_options;_index;_documentCount;_documentIds;_idToShortId;_fieldIds;_fieldLength;_avgFieldLength;_nextId;_storedFields;_dirtCount;_currentVacuum;_enqueuedVacuum;_enqueuedVacuumConditions;constructor(t){if((t==null?void 0:t.fields)==null)throw new Error('SlimSearch: option "fields" must be provided');const s=t.autoVacuum==null||t.autoVacuum===!0?yt:t.autoVacuum;this._options={...pt,...t,autoVacuum:s,searchOptions:{...J,...t.searchOptions||{}},autoSuggestOptions:{...Ft,...t.autoSuggestOptions||{}}},this._index=new C,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldIds={},this._fieldLength=new Map,this._avgFieldLength=[],this._nextId=0,this._storedFields=new Map,this._dirtCount=0,this._currentVacuum=null,this._enqueuedVacuum=null,this._enqueuedVacuumConditions=U,this.addFields(this._options.fields)}get isVacuuming(){return this._currentVacuum!=null}get dirtCount(){return this._dirtCount}get dirtFactor(){return this._dirtCount/(1+this._documentCount+this._dirtCount)}get documentCount(){return this._documentCount}get termCount(){return this._index.size}toJSON(){const t=[];for(const[s,n]of this._index){const o={};for(const[u,i]of n)o[u]=Object.fromEntries(i);t.push([s,o])}return{documentCount:this._documentCount,nextId:this._nextId,documentIds:Object.fromEntries(this._documentIds),fieldIds:this._fieldIds,fieldLength:Object.fromEntries(this._fieldLength),averageFieldLength:this._avgFieldLength,storedFields:Object.fromEntries(this._storedFields),dirtCount:this._dirtCount,index:t,serializationVersion:2}}addFields(t){for(let s=0;s<t.length;s++)this._fieldIds[t[s]]=s}}const zt=({index:e,documentCount:t,nextId:s,documentIds:n,fieldIds:o,fieldLength:u,averageFieldLength:i,storedFields:r,dirtCount:h,serializationVersion:c},d)=>{if(c!==1&&c!==2)throw new Error("SlimSearch: cannot deserialize an index created with an incompatible version");const l=new Et(d);l._documentCount=t,l._nextId=s,l._documentIds=k(n),l._idToShortId=new Map,l._fieldIds=o,l._fieldLength=k(u),l._avgFieldLength=i,l._storedFields=k(r),l._dirtCount=h||0,l._index=new C;for(const[p,f]of l._documentIds)l._idToShortId.set(f,p);for(const[p,f]of e){const g=new Map;for(const a of Object.keys(f)){let m=f[a];c===1&&(m=m.ds),g.set(parseInt(a,10),k(m))}l._index.set(p,g)}return l},Q=Object.entries,wt=Object.fromEntries,j=(e,t)=>{const s=e.toLowerCase(),n=t.toLowerCase(),o=[];let u=0,i=0;const r=(c,d=!1)=>{let l="";i===0?l=c.length>20?`… ${c.slice(-20)}`:c:d?l=c.length+i>100?`${c.slice(0,100-i)}… `:c:l=c.length>20?`${c.slice(0,20)} … ${c.slice(-20)}`:c,l&&o.push(l),i+=l.length,d||(o.push(["mark",t]),i+=t.length,i>=100&&o.push(" …"))};let h=s.indexOf(n,u);if(h===-1)return null;for(;h>=0;){const c=h+n.length;if(r(e.slice(u,h)),u=c,i>100)break;h=s.indexOf(n,u)}return i<100&&r(e.slice(u),!0),o},Z=/[\u4e00-\u9fa5]/g,tt=(e={})=>({fuzzy:.2,prefix:!0,processTerm:t=>{const s=t.match(Z)||[],n=t.replace(Z,"").toLowerCase();return n?[n,...s]:[...s]},...e}),xt=(e,t)=>t.contents.reduce((s,[,n])=>s+n,0)-e.contents.reduce((s,[,n])=>s+n,0),kt=(e,t)=>Math.max(...t.contents.map(([,s])=>s))-Math.max(...e.contents.map(([,s])=>s)),et=(e,t,s={})=>{const n={};return K(t,e,tt({boost:{h:2,t:1,c:4},...s})).forEach(o=>{const{id:u,terms:i,score:r}=o,h=u.includes("@"),c=u.includes("#"),[d,l]=u.split(/[#@]/),{contents:p}=n[d]??={title:"",contents:[]};if(h)p.push([{type:"customField",key:d,index:l,display:i.map(f=>o.c.map(g=>j(g,f))).flat().filter(f=>f!==null)},r]);else{const f=i.map(g=>j(o.h,g)).filter(g=>g!==null);if(f.length&&p.push([{type:c?"heading":"title",key:d,...c&&{anchor:l},display:f},r]),"t"in o)for(const g of o.t){const a=i.map(m=>j(g,m)).filter(m=>m!==null);a.length&&p.push([{type:"text",key:d,...c&&{anchor:l},display:a},r])}}}),Q(n).sort(([,o],[,u])=>"max"==="total"?xt(o,u):kt(o,u)).map(([o,{title:u,contents:i}])=>{if(!u){const r=it(t,o);r&&(u=r.h)}return{title:u,contents:i.map(([r])=>r)}})},st=(e,t,s={})=>Ct(t,e,tt(s)).map(({suggestion:n})=>n),v=wt(Q(JSON.parse("{\"/\":{\"documentCount\":91,\"nextId\":91,\"documentIds\":{\"0\":\"v-184f4da6\",\"1\":\"v-cc04a6e6\",\"2\":\"v-cc04a6e6#标题-2\",\"3\":\"v-cc04a6e6#标题-3\",\"4\":\"v-cc04a6e6@0\",\"5\":\"v-cc04a6e6@1\",\"6\":\"v-c89af5a8\",\"7\":\"v-c89af5a8#标题-2\",\"8\":\"v-c89af5a8#标题-3\",\"9\":\"v-c89af5a8@0\",\"10\":\"v-c89af5a8@1\",\"11\":\"v-c531446a\",\"12\":\"v-c531446a#标题-2\",\"13\":\"v-c531446a#标题-3\",\"14\":\"v-c531446a@0\",\"15\":\"v-c531446a@1\",\"16\":\"v-c1c7932c\",\"17\":\"v-c1c7932c#标题-2\",\"18\":\"v-c1c7932c#标题-3\",\"19\":\"v-c1c7932c@0\",\"20\":\"v-c1c7932c@1\",\"21\":\"v-1473bf53\",\"22\":\"v-1473bf53#目录\",\"23\":\"v-1473bf53@0\",\"24\":\"v-4e65ec78\",\"25\":\"v-4e65ec78@0\",\"26\":\"v-4e65ec78@1\",\"27\":\"v-c151bf32\",\"28\":\"v-c151bf32@0\",\"29\":\"v-c151bf32@1\",\"30\":\"v-438ffe52\",\"31\":\"v-438ffe52#markdown-介绍\",\"32\":\"v-438ffe52#markdown-配置\",\"33\":\"v-438ffe52#markdown-扩展\",\"34\":\"v-438ffe52#vuepress-扩展\",\"35\":\"v-438ffe52#主题扩展\",\"36\":\"v-438ffe52#自定义容器\",\"37\":\"v-438ffe52#代码块\",\"38\":\"v-438ffe52#上下角标\",\"39\":\"v-438ffe52#自定义对齐\",\"40\":\"v-438ffe52#attrs\",\"41\":\"v-438ffe52#脚注\",\"42\":\"v-438ffe52#标记\",\"43\":\"v-438ffe52#任务列表\",\"44\":\"v-438ffe52#图片增强\",\"45\":\"v-438ffe52#卡片\",\"46\":\"v-438ffe52#图表\",\"47\":\"v-438ffe52#echarts\",\"48\":\"v-438ffe52#流程图\",\"49\":\"v-438ffe52#mermaid\",\"50\":\"v-438ffe52#tex-语法\",\"51\":\"v-438ffe52#导入文件\",\"52\":\"v-438ffe52#代码演示\",\"53\":\"v-438ffe52#样式化\",\"54\":\"v-438ffe52#交互演示\",\"55\":\"v-438ffe52#vue-交互演示\",\"56\":\"v-438ffe52#幻灯片\",\"57\":\"v-438ffe52@0\",\"58\":\"v-438ffe52@1\",\"59\":\"v-6e19edb7\",\"60\":\"v-6e19edb7#页面信息\",\"61\":\"v-6e19edb7#页面内容\",\"62\":\"v-6e19edb7#页面结构\",\"63\":\"v-6e19edb7@0\",\"64\":\"v-6e19edb7@1\",\"65\":\"v-433d2831\",\"66\":\"v-433d2831#标题-2\",\"67\":\"v-433d2831#标题-3\",\"68\":\"v-433d2831@0\",\"69\":\"v-433d2831@1\",\"70\":\"v-44f200d0\",\"71\":\"v-44f200d0#标题-2\",\"72\":\"v-44f200d0#标题-3\",\"73\":\"v-44f200d0@0\",\"74\":\"v-44f200d0@1\",\"75\":\"v-46a6d96f\",\"76\":\"v-46a6d96f#标题-2\",\"77\":\"v-46a6d96f#标题-3\",\"78\":\"v-46a6d96f@0\",\"79\":\"v-46a6d96f@1\",\"80\":\"v-485bb20e\",\"81\":\"v-485bb20e#标题-2\",\"82\":\"v-485bb20e#标题-3\",\"83\":\"v-485bb20e@0\",\"84\":\"v-485bb20e@1\",\"85\":\"v-19b8d8ae\",\"86\":\"v-f0383c18\",\"87\":\"v-e1e3da16\",\"88\":\"v-5e4178de\",\"89\":\"v-cccd9e0e\",\"90\":\"v-74458d05\"},\"fieldIds\":{\"h\":0,\"t\":1,\"c\":2},\"fieldLength\":{\"0\":[1,2],\"1\":[2],\"2\":[2,2],\"3\":[2,2],\"4\":[null,null,2],\"5\":[null,null,3],\"6\":[2,4],\"7\":[2,2],\"8\":[2,2],\"9\":[null,null,2],\"10\":[null,null,3],\"11\":[2],\"12\":[2,2],\"13\":[2,2],\"14\":[null,null,1],\"15\":[null,null,3],\"16\":[2],\"17\":[2,2],\"18\":[2,2],\"19\":[null,null,1],\"20\":[null,null,3],\"21\":[3],\"22\":[1,5],\"23\":[null,null,1],\"24\":[1,18],\"25\":[null,null,1],\"26\":[null,null,1],\"27\":[1,7],\"28\":[null,null,1],\"29\":[null,null,1],\"30\":[2,11],\"31\":[2,8],\"32\":[2,13],\"33\":[2,11],\"34\":[2,10],\"35\":[1,10],\"36\":[1,19],\"37\":[1,1],\"38\":[1,3],\"39\":[1,3],\"40\":[1,5],\"41\":[1,3],\"42\":[1,3],\"43\":[1,5],\"44\":[1,2],\"45\":[1,24],\"46\":[1,1],\"47\":[1,1],\"48\":[1,1],\"49\":[1,1],\"50\":[2,10],\"51\":[1,6],\"52\":[1,1],\"53\":[1,5],\"54\":[1,1],\"55\":[2,1],\"56\":[1,3],\"57\":[null,null,1],\"58\":[null,null,1],\"59\":[1,3],\"60\":[1,20],\"61\":[1,17],\"62\":[1,16],\"63\":[null,null,1],\"64\":[null,null,2],\"65\":[2],\"66\":[2,2],\"67\":[2,2],\"68\":[null,null,1],\"69\":[null,null,3],\"70\":[2,2],\"71\":[2,2],\"72\":[2,2],\"73\":[null,null,1],\"74\":[null,null,3],\"75\":[2],\"76\":[2,2],\"77\":[2,2],\"78\":[null,null,2],\"79\":[null,null,3],\"80\":[2],\"81\":[2,2],\"82\":[2,2],\"83\":[null,null,2],\"84\":[null,null,3],\"85\":[2],\"86\":[2],\"87\":[1],\"88\":[2],\"89\":[2],\"90\":[1]},\"averageFieldLength\":[1.6013982951145265,4.710218694784654,1.3584251320043002],\"storedFields\":{\"0\":{\"h\":\"介绍页\",\"t\":[\"将你的个人介绍和档案放置在此处。\"]},\"1\":{\"h\":\"香蕉 1\"},\"2\":{\"h\":\"标题 2\",\"t\":[\"这里是内容。\"]},\"3\":{\"h\":\"标题 3\",\"t\":[\"这里是内容。\"]},\"4\":{\"c\":[\"香蕉\",\"水果\"]},\"5\":{\"c\":[\"黄\",\"弯曲的\",\"长\"]},\"6\":{\"h\":\"香蕉 2\",\"t\":[\"一个被数字 10 星标了的香蕉文章。\"]},\"7\":{\"h\":\"标题 2\",\"t\":[\"这里是内容。\"]},\"8\":{\"h\":\"标题 3\",\"t\":[\"这里是内容。\"]},\"9\":{\"c\":[\"香蕉\",\"水果\"]},\"10\":{\"c\":[\"黄\",\"弯曲的\",\"长\"]},\"11\":{\"h\":\"香蕉 3\"},\"12\":{\"h\":\"标题 2\",\"t\":[\"这里是内容。\"]},\"13\":{\"h\":\"标题 3\",\"t\":[\"这里是内容。\"]},\"14\":{\"c\":[\"香蕉\"]},\"15\":{\"c\":[\"黄\",\"弯曲的\",\"长\"]},\"16\":{\"h\":\"香蕉 4\"},\"17\":{\"h\":\"标题 2\",\"t\":[\"这里是内容。\"]},\"18\":{\"h\":\"标题 3\",\"t\":[\"这里是内容。\"]},\"19\":{\"c\":[\"香蕉\"]},\"20\":{\"c\":[\"黄\",\"弯曲的\",\"长\"]},\"21\":{\"h\":\"站点功能备忘(自用)\"},\"22\":{\"h\":\"目录\",\"t\":[\"Markdown 展示\",\"页面展示\",\"禁用展示\",\"加密展示\"]},\"23\":{\"c\":[\"使用指南\"]},\"24\":{\"h\":\"布局与功能禁用\",\"t\":[\"你可以通过设置页面的 Frontmatter，在页面禁用功能与布局。\",\"本页面就是一个示例，禁用了如下功能:\",\"导航栏\",\"侧边栏\",\"路径导航\",\"页面信息\",\"贡献者\",\"编辑此页链接\",\"更新时间\",\"上一篇/下一篇 链接\",\"评论\",\"页脚\",\"返回顶部按钮\"]},\"25\":{\"c\":[\"使用指南\"]},\"26\":{\"c\":[\"禁用\"]},\"27\":{\"h\":\"密码加密的文章\",\"t\":[\"实际的文章内容。\",\"段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字。\",\"段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字。\"]},\"28\":{\"c\":[\"使用指南\"]},\"29\":{\"c\":[\"文章加密\"]},\"30\":{\"h\":\"Markdown 展示\",\"t\":[\"VuePress 主要从 Markdown 文件生成页面。因此，你可以使用它轻松生成文档或博客站点。\",\"你应该创建和编写 Markdown 文件，以便 VuePress 可以根据文件结构将它们转换为不同的页面。\"]},\"31\":{\"h\":\"Markdown 介绍\",\"t\":[\"如果你是一个新手，还不会编写 Markdown，请先阅读 Markdown 介绍 和 Markdown 演示。\"]},\"32\":{\"h\":\"Markdown 配置\",\"t\":[\"VuePress 通过 Frontmatter 为每个 Markdown 页面引入配置。\",\"相关信息\",\"Frontmatter 是 VuePress 中很重要的一个概念，如果你不了解它，你需要阅读 Frontmatter 介绍。\"]},\"33\":{\"h\":\"Markdown 扩展\",\"t\":[\"VuePress 会使用 markdown-it 来解析 Markdown 内容，因此可以借助于 markdown-it 插件来实现 语法扩展 。\"]},\"34\":{\"h\":\"VuePress 扩展\",\"t\":[\"为了丰富文档写作，VuePress 对 Markdown 语法进行了扩展。\",\"关于这些扩展，请阅读 VuePress 中的 Markdown 扩展。\"]},\"35\":{\"h\":\"主题扩展\",\"t\":[\"通过 vuepress-plugin-md-enhance，主题扩展了更多 Markdown 语法，提供更加丰富的写作功能。\"]},\"36\":{\"h\":\"自定义容器\",\"t\":[\"安全的在 Markdown 中使用 {{ variable }}。\",\"自定义标题\",\"信息容器，包含 代码 与 链接。\",\"const a = 1; \",\"自定义标题\",\"提示容器\",\"自定义标题\",\"警告容器\",\"自定义标题\",\"危险容器\",\"自定义标题\",\"详情容器\",\"查看详情\"]},\"37\":{\"h\":\"代码块\",\"t\":[\"查看详情\"]},\"38\":{\"h\":\"上下角标\",\"t\":[\"19th H2O\",\"查看详情\"]},\"39\":{\"h\":\"自定义对齐\",\"t\":[\"我是居中的\",\"我在右对齐\",\"查看详情\"]},\"40\":{\"h\":\"Attrs\",\"t\":[\"一个拥有 ID 的 单词。\",\"查看详情\"]},\"41\":{\"h\":\"脚注\",\"t\":[\"此文字有脚注[1].\",\"查看详情\"]},\"42\":{\"h\":\"标记\",\"t\":[\"你可以标记 重要的内容 。\",\"查看详情\"]},\"43\":{\"h\":\"任务列表\",\"t\":[\" 计划 1\",\" 计划 2\",\"查看详情\"]},\"44\":{\"h\":\"图片增强\",\"t\":[\"支持为图片设置颜色模式和大小\",\"查看详情\"]},\"45\":{\"h\":\"卡片\",\"t\":[\"title: Mr.Hope desc: Where there is light, there is hope logo: https://mister-hope.com/logo2.jpg link: https://mister-hope.com color: rgba(253, 230, 138, 0.15) \",\"查看详情\"]},\"46\":{\"h\":\"图表\",\"t\":[\"查看详情\"]},\"47\":{\"h\":\"Echarts\",\"t\":[\"查看详情\"]},\"48\":{\"h\":\"流程图\",\"t\":[\"查看详情\"]},\"49\":{\"h\":\"Mermaid\",\"t\":[\"查看详情\"]},\"50\":{\"h\":\"Tex 语法\",\"t\":[\"∂ωr∂r​(ωyω​)=(ωyω​){(logy)r+i=1∑r​ωi(−1)ir⋯(r−i+1)(logy)r−i​}\",\"查看详情\"]},\"51\":{\"h\":\"导入文件\",\"t\":[\"Markdown 展示\",\"页面展示\",\"禁用展示\",\"加密展示\",\"查看详情\"]},\"52\":{\"h\":\"代码演示\",\"t\":[\"查看详情\"]},\"53\":{\"h\":\"样式化\",\"t\":[\"向 Mr.Hope 捐赠一杯咖啡。 \",\"查看详情\"]},\"54\":{\"h\":\"交互演示\",\"t\":[\"查看详情\"]},\"55\":{\"h\":\"Vue 交互演示\",\"t\":[\"查看详情\"]},\"56\":{\"h\":\"幻灯片\",\"t\":[\"查看详情\",\"这是脚注内容 ↩︎\"]},\"57\":{\"c\":[\"使用指南\"]},\"58\":{\"c\":[\"Markdown\"]},\"59\":{\"h\":\"页面配置\",\"t\":[\"more 注释之前的内容被视为文章摘要。\"]},\"60\":{\"h\":\"页面信息\",\"t\":[\"你可以在 Markdown 的 Frontmatter 中设置页面信息。\",\"作者设置为 Ms.Hope。\",\"写作日期为 2020 年 1 月 1 日\",\"分类为 “使用指南”\",\"标签为 “页面配置” 和 “使用指南”\"]},\"61\":{\"h\":\"页面内容\",\"t\":[\"你可以自由在这里书写你的 Markdown。\",\"提示\",\"你可以将图片和 Markdown 文件放置在一起，但是你需要使用相对链接./ 进行引用。\",\"对于 .vuepress/public 文件夹的图片，请使用绝对链接 / 进行引用。\",\"主题包含了一个自定义徽章可以使用:\",\"文字结尾应该有深蓝色的 徽章文字 徽章。 \"]},\"62\":{\"h\":\"页面结构\",\"t\":[\"此页面应当包含:\",\"路径导航\",\"标题和页面信息\",\"TOC (文章标题列表)\",\"贡献者、更新时间等页面元信息\",\"评论\",\"导航栏\",\"侧边栏\",\"页脚\",\"返回顶部按钮\",\"你可以通过主题选项和页面 Frontmatter 自定义它们。\"]},\"63\":{\"c\":[\"使用指南\"]},\"64\":{\"c\":[\"页面配置\",\"使用指南\"]},\"65\":{\"h\":\"苹果 1\"},\"66\":{\"h\":\"标题 2\",\"t\":[\"这里是内容。\"]},\"67\":{\"h\":\"标题 3\",\"t\":[\"这里是内容。\"]},\"68\":{\"c\":[\"苹果\"]},\"69\":{\"c\":[\"红\",\"大\",\"圆\"]},\"70\":{\"h\":\"苹果 2\",\"t\":[\"一个被星标了的苹果文章。\"]},\"71\":{\"h\":\"标题 2\",\"t\":[\"这里是内容。\"]},\"72\":{\"h\":\"标题 3\",\"t\":[\"这里是内容。\"]},\"73\":{\"c\":[\"苹果\"]},\"74\":{\"c\":[\"红\",\"大\",\"圆\"]},\"75\":{\"h\":\"苹果 3\"},\"76\":{\"h\":\"标题 2\",\"t\":[\"这里是内容。\"]},\"77\":{\"h\":\"标题 3\",\"t\":[\"这里是内容。\"]},\"78\":{\"c\":[\"苹果\",\"水果\"]},\"79\":{\"c\":[\"红\",\"大\",\"圆\"]},\"80\":{\"h\":\"苹果 4\"},\"81\":{\"h\":\"标题 2\",\"t\":[\"这里是内容。\"]},\"82\":{\"h\":\"标题 3\",\"t\":[\"这里是内容。\"]},\"83\":{\"c\":[\"苹果\",\"水果\"]},\"84\":{\"c\":[\"红\",\"大\",\"圆\"]},\"85\":{\"h\":\"JavaScript 系列\"},\"86\":{\"h\":\"Linux 系列\"},\"87\":{\"h\":\"读后记\"},\"88\":{\"h\":\"TypeScript 系列\"},\"89\":{\"h\":\"Vue 系列\"},\"90\":{\"h\":\"Css\"}},\"dirtCount\":0,\"index\":[[\"css\",{\"0\":{\"90\":1}}],[\"color\",{\"1\":{\"45\":1}}],[\"com\",{\"1\":{\"45\":2}}],[\"const\",{\"1\":{\"36\":1}}],[\"读后记\",{\"0\":{\"87\":1}}],[\"系列\",{\"0\":{\"85\":1,\"86\":1,\"88\":1,\"89\":1}}],[\"javascript\",{\"0\":{\"85\":1}}],[\"jpg\",{\"1\":{\"45\":1}}],[\"圆\",{\"2\":{\"69\":1,\"74\":1,\"79\":1,\"84\":1}}],[\"大\",{\"2\":{\"69\":1,\"74\":1,\"79\":1,\"84\":1}}],[\"红\",{\"2\":{\"69\":1,\"74\":1,\"79\":1,\"84\":1}}],[\"苹果\",{\"0\":{\"65\":1,\"70\":1,\"75\":1,\"80\":1},\"2\":{\"68\":1,\"73\":1,\"78\":1,\"83\":1}}],[\"此页面应当包含\",{\"1\":{\"62\":1}}],[\"此文字有脚注\",{\"1\":{\"41\":1}}],[\"徽章\",{\"1\":{\"61\":1}}],[\"徽章文字\",{\"1\":{\"61\":1}}],[\"public\",{\"1\":{\"61\":1}}],[\"plugin\",{\"1\":{\"35\":1}}],[\"进行引用\",{\"1\":{\"61\":2}}],[\"但是你需要使用相对链接\",{\"1\":{\"61\":1}}],[\"分类为\",{\"1\":{\"60\":1}}],[\"日\",{\"1\":{\"60\":1}}],[\"月\",{\"1\":{\"60\":1}}],[\"年\",{\"1\":{\"60\":1}}],[\"写作日期为\",{\"1\":{\"60\":1}}],[\"作者设置为\",{\"1\":{\"60\":1}}],[\"注释之前的内容被视为文章摘要\",{\"1\":{\"59\":1}}],[\"↩︎\",{\"1\":{\"56\":1}}],[\"这是脚注内容\",{\"1\":{\"56\":1}}],[\"这里是内容\",{\"1\":{\"2\":1,\"3\":1,\"7\":1,\"8\":1,\"12\":1,\"13\":1,\"17\":1,\"18\":1,\"66\":1,\"67\":1,\"71\":1,\"72\":1,\"76\":1,\"77\":1,\"81\":1,\"82\":1}}],[\"幻灯片\",{\"0\":{\"56\":1}}],[\"交互演示\",{\"0\":{\"54\":1,\"55\":1}}],[\"捐赠一杯咖啡\",{\"1\":{\"53\":1}}],[\"向\",{\"1\":{\"53\":1}}],[\"样式化\",{\"0\":{\"53\":1}}],[\"导入文件\",{\"0\":{\"51\":1}}],[\"导航栏\",{\"1\":{\"24\":1,\"62\":1}}],[\"−1\",{\"1\":{\"50\":1}}],[\"r−i​\",{\"1\":{\"50\":1}}],[\"r−i+1\",{\"1\":{\"50\":1}}],[\"r+i=1∑r​ωi\",{\"1\":{\"50\":1}}],[\"rgba\",{\"1\":{\"45\":1}}],[\"ωyω​\",{\"1\":{\"50\":2}}],[\"∂ωr∂r​\",{\"1\":{\"50\":1}}],[\"流程图\",{\"0\":{\"48\":1}}],[\"echarts\",{\"0\":{\"47\":1}}],[\"enhance\",{\"1\":{\"35\":1}}],[\"图表\",{\"0\":{\"46\":1}}],[\"图片增强\",{\"0\":{\"44\":1}}],[\"0\",{\"1\":{\"45\":1}}],[\"logy\",{\"1\":{\"50\":2}}],[\"logo2\",{\"1\":{\"45\":1}}],[\"logo\",{\"1\":{\"45\":1}}],[\"linux\",{\"0\":{\"86\":1}}],[\"link\",{\"1\":{\"45\":1}}],[\"light\",{\"1\":{\"45\":1}}],[\"typescript\",{\"0\":{\"88\":1}}],[\"toc\",{\"1\":{\"62\":1}}],[\"tex\",{\"0\":{\"50\":1}}],[\"there\",{\"1\":{\"45\":2}}],[\"title\",{\"1\":{\"45\":1}}],[\"where\",{\"1\":{\"45\":1}}],[\"desc\",{\"1\":{\"45\":1}}],[\"https\",{\"1\":{\"45\":2}}],[\"hope\",{\"1\":{\"45\":4,\"53\":1,\"60\":1}}],[\"h2o\",{\"1\":{\"38\":1}}],[\"卡片\",{\"0\":{\"45\":1}}],[\"支持为图片设置颜色模式和大小\",{\"1\":{\"44\":1}}],[\"计划\",{\"1\":{\"43\":2}}],[\"任务列表\",{\"0\":{\"43\":1}}],[\"重要的内容\",{\"1\":{\"42\":1}}],[\"标签为\",{\"1\":{\"60\":1}}],[\"标记\",{\"0\":{\"42\":1}}],[\"标题和页面信息\",{\"1\":{\"62\":1}}],[\"标题\",{\"0\":{\"2\":1,\"3\":1,\"7\":1,\"8\":1,\"12\":1,\"13\":1,\"17\":1,\"18\":1,\"66\":1,\"67\":1,\"71\":1,\"72\":1,\"76\":1,\"77\":1,\"81\":1,\"82\":1}}],[\"脚注\",{\"0\":{\"41\":1}}],[\"单词\",{\"1\":{\"40\":1}}],[\"的\",{\"1\":{\"40\":1,\"60\":1}}],[\"ir⋯\",{\"1\":{\"50\":1}}],[\"is\",{\"1\":{\"45\":2}}],[\"id\",{\"1\":{\"40\":1}}],[\"it\",{\"1\":{\"33\":2}}],[\"一个被星标了的苹果文章\",{\"1\":{\"70\":1}}],[\"一个被数字\",{\"1\":{\"6\":1}}],[\"一个拥有\",{\"1\":{\"40\":1}}],[\"我在右对齐\",{\"1\":{\"39\":1}}],[\"我是居中的\",{\"1\":{\"39\":1}}],[\"上下角标\",{\"0\":{\"38\":1}}],[\"上一篇\",{\"1\":{\"24\":1}}],[\"查看详情\",{\"1\":{\"36\":1,\"37\":1,\"38\":1,\"39\":1,\"40\":1,\"41\":1,\"42\":1,\"43\":1,\"44\":1,\"45\":1,\"46\":1,\"47\":1,\"48\":1,\"49\":1,\"50\":1,\"51\":1,\"52\":1,\"53\":1,\"54\":1,\"55\":1,\"56\":1}}],[\"详情容器\",{\"1\":{\"36\":1}}],[\"危险容器\",{\"1\":{\"36\":1}}],[\"警告容器\",{\"1\":{\"36\":1}}],[\"提示\",{\"1\":{\"61\":1}}],[\"提示容器\",{\"1\":{\"36\":1}}],[\"提供更加丰富的写作功能\",{\"1\":{\"35\":1}}],[\"=\",{\"1\":{\"36\":1,\"50\":1}}],[\"attrs\",{\"0\":{\"40\":1}}],[\"a\",{\"1\":{\"36\":1}}],[\"与\",{\"1\":{\"36\":1}}],[\"代码演示\",{\"0\":{\"52\":1}}],[\"代码块\",{\"0\":{\"37\":1}}],[\"代码\",{\"1\":{\"36\":1}}],[\"包含\",{\"1\":{\"36\":1}}],[\"信息容器\",{\"1\":{\"36\":1}}],[\"vue\",{\"0\":{\"55\":1,\"89\":1}}],[\"vuepress\",{\"0\":{\"34\":1},\"1\":{\"30\":2,\"32\":2,\"33\":1,\"34\":2,\"35\":1,\"61\":1}}],[\"variable\",{\"1\":{\"36\":1}}],[\"安全的在\",{\"1\":{\"36\":1}}],[\"自定义它们\",{\"1\":{\"62\":1}}],[\"自定义对齐\",{\"0\":{\"39\":1}}],[\"自定义标题\",{\"1\":{\"36\":5}}],[\"自定义容器\",{\"0\":{\"36\":1}}],[\"自用\",{\"0\":{\"21\":1}}],[\"ms\",{\"1\":{\"60\":1}}],[\"more\",{\"1\":{\"59\":1}}],[\"mermaid\",{\"0\":{\"49\":1}}],[\"mister\",{\"1\":{\"45\":2}}],[\"mr\",{\"1\":{\"45\":1,\"53\":1}}],[\"md\",{\"1\":{\"35\":1}}],[\"markdown\",{\"0\":{\"30\":1,\"31\":1,\"32\":1,\"33\":1},\"1\":{\"22\":1,\"30\":2,\"31\":3,\"32\":1,\"33\":3,\"34\":2,\"35\":1,\"36\":1,\"51\":1,\"60\":1,\"61\":2},\"2\":{\"58\":1}}],[\"主题包含了一个自定义徽章可以使用\",{\"1\":{\"61\":1}}],[\"主题扩展了更多\",{\"1\":{\"35\":1}}],[\"主题扩展\",{\"0\":{\"35\":1}}],[\"主要从\",{\"1\":{\"30\":1}}],[\"中设置页面信息\",{\"1\":{\"60\":1}}],[\"中使用\",{\"1\":{\"36\":1}}],[\"中的\",{\"1\":{\"34\":1}}],[\"中很重要的一个概念\",{\"1\":{\"32\":1}}],[\"请使用绝对链接\",{\"1\":{\"61\":1}}],[\"请阅读\",{\"1\":{\"34\":1}}],[\"请先阅读\",{\"1\":{\"31\":1}}],[\"关于这些扩展\",{\"1\":{\"34\":1}}],[\"语法\",{\"0\":{\"50\":1},\"1\":{\"35\":1}}],[\"语法进行了扩展\",{\"1\":{\"34\":1}}],[\"语法扩展\",{\"1\":{\"33\":1}}],[\"对于\",{\"1\":{\"61\":1}}],[\"对\",{\"1\":{\"34\":1}}],[\"为了丰富文档写作\",{\"1\":{\"34\":1}}],[\"为每个\",{\"1\":{\"32\":1}}],[\"插件来实现\",{\"1\":{\"33\":1}}],[\"内容\",{\"1\":{\"33\":1}}],[\"来解析\",{\"1\":{\"33\":1}}],[\"会使用\",{\"1\":{\"33\":1}}],[\"扩展\",{\"0\":{\"33\":1,\"34\":1},\"1\":{\"34\":1}}],[\"如果你不了解它\",{\"1\":{\"32\":1}}],[\"如果你是一个新手\",{\"1\":{\"31\":1}}],[\"是\",{\"1\":{\"32\":1}}],[\"相关信息\",{\"1\":{\"32\":1}}],[\"通过\",{\"1\":{\"32\":1,\"35\":1}}],[\"配置\",{\"0\":{\"32\":1}}],[\"演示\",{\"1\":{\"31\":1}}],[\"和\",{\"1\":{\"31\":1,\"60\":1}}],[\"还不会编写\",{\"1\":{\"31\":1}}],[\"介绍\",{\"0\":{\"31\":1},\"1\":{\"31\":1,\"32\":1}}],[\"介绍页\",{\"0\":{\"0\":1}}],[\"可以根据文件结构将它们转换为不同的页面\",{\"1\":{\"30\":1}}],[\"以便\",{\"1\":{\"30\":1}}],[\"你需要阅读\",{\"1\":{\"32\":1}}],[\"你应该创建和编写\",{\"1\":{\"30\":1}}],[\"你可以通过主题选项和页面\",{\"1\":{\"62\":1}}],[\"你可以通过设置页面的\",{\"1\":{\"24\":1}}],[\"你可以将图片和\",{\"1\":{\"61\":1}}],[\"你可以自由在这里书写你的\",{\"1\":{\"61\":1}}],[\"你可以在\",{\"1\":{\"60\":1}}],[\"你可以标记\",{\"1\":{\"42\":1}}],[\"你可以使用它轻松生成文档或博客站点\",{\"1\":{\"30\":1}}],[\"因此可以借助于\",{\"1\":{\"33\":1}}],[\"因此\",{\"1\":{\"30\":1}}],[\"文章标题列表\",{\"1\":{\"62\":1}}],[\"文章加密\",{\"2\":{\"29\":1}}],[\"文件夹的图片\",{\"1\":{\"61\":1}}],[\"文件放置在一起\",{\"1\":{\"61\":1}}],[\"文件\",{\"1\":{\"30\":1}}],[\"文件生成页面\",{\"1\":{\"30\":1}}],[\"文字结尾应该有深蓝色的\",{\"1\":{\"61\":1}}],[\"文字\",{\"1\":{\"27\":2}}],[\"文字段落\",{\"1\":{\"27\":24}}],[\"段落\",{\"1\":{\"27\":2}}],[\"实际的文章内容\",{\"1\":{\"27\":1}}],[\"密码加密的文章\",{\"0\":{\"27\":1}}],[\"返回顶部按钮\",{\"1\":{\"24\":1,\"62\":1}}],[\"页脚\",{\"1\":{\"24\":1,\"62\":1}}],[\"页面结构\",{\"0\":{\"62\":1}}],[\"页面内容\",{\"0\":{\"61\":1}}],[\"页面配置\",{\"0\":{\"59\":1},\"1\":{\"60\":1},\"2\":{\"64\":1}}],[\"页面引入配置\",{\"1\":{\"32\":1}}],[\"页面信息\",{\"0\":{\"60\":1},\"1\":{\"24\":1}}],[\"页面展示\",{\"1\":{\"22\":1,\"51\":1}}],[\"评论\",{\"1\":{\"24\":1,\"62\":1}}],[\"链接\",{\"1\":{\"24\":1,\"36\":1}}],[\"下一篇\",{\"1\":{\"24\":1}}],[\"更新时间等页面元信息\",{\"1\":{\"62\":1}}],[\"更新时间\",{\"1\":{\"24\":1}}],[\"编辑此页链接\",{\"1\":{\"24\":1}}],[\"贡献者\",{\"1\":{\"24\":1,\"62\":1}}],[\"路径导航\",{\"1\":{\"24\":1,\"62\":1}}],[\"侧边栏\",{\"1\":{\"24\":1,\"62\":1}}],[\"禁用\",{\"2\":{\"26\":1}}],[\"禁用了如下功能\",{\"1\":{\"24\":1}}],[\"禁用展示\",{\"1\":{\"22\":1,\"51\":1}}],[\"本页面就是一个示例\",{\"1\":{\"24\":1}}],[\"在页面禁用功能与布局\",{\"1\":{\"24\":1}}],[\"frontmatter\",{\"1\":{\"24\":1,\"32\":3,\"60\":1,\"62\":1}}],[\"布局与功能禁用\",{\"0\":{\"24\":1}}],[\"使用指南\",{\"1\":{\"60\":2},\"2\":{\"23\":1,\"25\":1,\"28\":1,\"57\":1,\"63\":1,\"64\":1}}],[\"加密展示\",{\"1\":{\"22\":1,\"51\":1}}],[\"展示\",{\"0\":{\"30\":1},\"1\":{\"22\":1,\"51\":1}}],[\"目录\",{\"0\":{\"22\":1}}],[\"站点功能备忘\",{\"0\":{\"21\":1}}],[\"4\",{\"0\":{\"16\":1,\"80\":1}}],[\"星标了的香蕉文章\",{\"1\":{\"6\":1}}],[\"长\",{\"2\":{\"5\":1,\"10\":1,\"15\":1,\"20\":1}}],[\"弯曲的\",{\"2\":{\"5\":1,\"10\":1,\"15\":1,\"20\":1}}],[\"黄\",{\"2\":{\"5\":1,\"10\":1,\"15\":1,\"20\":1}}],[\"水果\",{\"2\":{\"4\":1,\"9\":1,\"78\":1,\"83\":1}}],[\"3\",{\"0\":{\"3\":1,\"8\":1,\"11\":1,\"13\":1,\"18\":1,\"67\":1,\"72\":1,\"75\":1,\"77\":1,\"82\":1}}],[\"2020\",{\"1\":{\"60\":1}}],[\"230\",{\"1\":{\"45\":1}}],[\"253\",{\"1\":{\"45\":1}}],[\"2\",{\"0\":{\"2\":1,\"6\":1,\"7\":1,\"12\":1,\"17\":1,\"66\":1,\"70\":1,\"71\":1,\"76\":1,\"81\":1},\"1\":{\"27\":14,\"43\":1}}],[\"15\",{\"1\":{\"45\":1}}],[\"138\",{\"1\":{\"45\":1}}],[\"19th\",{\"1\":{\"38\":1}}],[\"10\",{\"1\":{\"6\":1}}],[\"1\",{\"0\":{\"1\":1,\"65\":1},\"1\":{\"27\":12,\"36\":1,\"41\":1,\"43\":1,\"60\":2}}],[\"香蕉\",{\"0\":{\"1\":1,\"6\":1,\"11\":1,\"16\":1},\"2\":{\"4\":1,\"9\":1,\"14\":1,\"19\":1}}],[\"将你的个人介绍和档案放置在此处\",{\"1\":{\"0\":1}}]],\"serializationVersion\":2}}")).map(([e,t])=>[e,zt(t,{fields:["h","t","c"],storeFields:["h","t","c"]})]));self.onmessage=({data:{type:e="all",query:t,locale:s,options:n}})=>{e==="suggest"?self.postMessage(st(t,v[s],n)):e==="search"?self.postMessage(et(t,v[s],n)):self.postMessage({suggestions:st(t,v[s],n),results:et(t,v[s],n)})};
//# sourceMappingURL=index.js.map
