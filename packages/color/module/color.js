function t(t){if(t=+t,Number.isNaN(t))return NaN;t=t.toString();const e=/^[+-]?\d+(?:\.(\d+))?e([+-]?\d+)$/,s=/^[+-]?\d+(?:\.(\d+))?$/,r=/^[+-]?\d+?(0+)$/;if(r.test(t)){const e=t.match(r)[1];return e?-e.length:0}if(s.test(t)){const e=t.match(s)[1];return e?e.length:0}if(e.test(t)){const[,s="",r=0]=t.match(e);return s.length-r}return 0}function e(e,s,r=0){const i=Math.max(t(e),t(s),t(r));return+Math.abs(e-s).toFixed(i)<=r}function s(t,e){return(+t%+e+ +e)%+e}function r(t,e=12){return+(+(t*10**e).toFixed(0)*10**-e).toFixed(e<0?0:e)}function i(t,e=12){return null==t||Array.isArray(t)?NaN:(t=t.toString(),t=/%$/.test(t)?+t.slice(0,-1)/100:+t,void 0!==e&&(t=r(t,e)),t)}function n(){if(this.length>4294967295)throw RangeError("Cannot iterate infinite size range")}function a(t=1){if(t=+t,Number.isNaN(t)&&(t=1),t<=0)throw TypeError("Step cannot be 0 or negative number");return t}class Range{constructor(t,e,s=1){const r=arguments.length>1?+t:0,i=arguments.length>1?+e:+t;Number.isNaN(r)||Number.isNaN(i)||!arguments.length||(s=a(s),Object.defineProperties(this,{from:{value:r},to:{value:i},step:{value:s}}))}*[Symbol.iterator](){n.call(this);const e=this.from<=this.to,s=Math.max(t(this.step),t(this.from),t(this.to));for(let t=this.from;e?t<=this.to:t>=this.to;t=+(e?t+this.step:t-this.step).toFixed(s))yield t}static from(t){if(null==t)return new Range;if("function"!=typeof t[Symbol.iterator])return new Range;if(void 0!==t.length&&!t.length)return new Range;if(void 0!==t.size&&!t.size)return new Range;const e=Math.min(...t),s=Math.max(...t);return new Range(e,s)}forEach(e,s=this.step){n.call(this),s=a(s);const r=this.from<=this.to,i=Math.max(t(s),t(this.from),t(this.to));let o=0;for(let t=this.from;r?t<=this.to:t>=this.to;t=+(r?t+s:t-s).toFixed(i))e(t,o,this),o+=1}forEachReverse(e,s=this.step){n.call(this),s=a(s);const r=this.from<=this.to,i=Math.max(t(s),t(this.from),t(this.to));let o=0;for(let t=this.to;r?t>=this.from:t<=this.from;t=+(r?t-s:t+s).toFixed(i))e(t,o,this),o+=1}get length(){return void 0===this.to||void 0===this.from?0:Math.round(Math.abs(this.to-this.from)/this.step)+1}get max(){return this.from<=this.to?this.to:this.from}get min(){return this.from<=this.to?this.from:this.to}get center(){if(void 0!==this.to&&void 0!==this.from)return this.min+(this.max-this.min)/2}has(t){return+t>=this.min&&+t<=this.max}clamp(t){return+t<this.min?this.min:+t>this.max?this.max:+t}toArray(){return[...this]}getFraction(t,e=12){return Number.isNaN(+e)||+e<0?NaN:(e>100&&(e=100),+((+t-this.min)/(this.max-this.min)).toFixed(e))}fromFraction(t,e=12){return+(this.min+ +t*(this.max-this.min)).toFixed(e)}slice(t){if(!t)return[];const e=+((this.max-this.min+this.step)/t).toFixed(12),s=[];return this.forEach(t=>s.push(t),e),s}mod(t){return this.min+s(+t,this.max-this.min+1)}}const o=new Range(255),h=new Range(359),l=new Range(1);function u([t,e,s,i]){const n=t/255,a=e/255,o=s/255,u=Math.min(n,a,o),f=Math.max(n,a,o),c=f-u;let g=0,d=0,m=0;return g=0===c?0:f===n?(a-o)/c:f===a?(o-n)/c+2:(n-a)/c+4,g=h.mod(r(60*g,0)),m=(f+u)/2,d=m>0&&m<=.5?c/(2*m):c/(2-2*m||m),m=l.clamp(r(m,2)),d=l.clamp(r(d,2)),[t,e,s,g,d,m,i]}function f(t){return null==t?1:l.clamp(i(t,4))}function c(t){return"number"==typeof t?l.clamp(r(t,2)):/%$/.test(t)?l.clamp(i(t,2)):NaN}function g(t){return"number"==typeof t?o.clamp(r(t,0)):"string"!=typeof t?NaN:o.clamp(/%$/.test(t)?o.fromFraction(i(t),0):r(t,0))}function d(...t){return t.every(t=>t||!t&&0==t)}function m(t,e){return(e.exec(t)||[]).filter((t,e)=>e&&!!t)}function p(t){return Array.isArray(t)?!t.length||t.length>4?[]:(t[0]=g(t[0]),t[1]=g(t[1]),t[2]=g(t[2]),t[3]=f(t[3]),t.some(t=>Number.isNaN(t))?[]:u(t)):[]}function b(t){return Array.isArray(t)?!t.length||t.length>4?[]:(t[0]=function(t){if("number"==typeof t)return h.mod(r(t,0));if("string"!=typeof t)return NaN;const e=(t=t.trim().toLowerCase()).match(/^([+\-0-9e.]+)(turn|g?rad|deg)?$/);if(!e)return NaN;switch(e[1]=r(e[1]),e[2]=e[2]||"deg",e[2]){case"turn":return r(h.mod(360*parseFloat(e[1])),0);case"rad":return r(h.mod(parseFloat(e[1])*(180/Math.PI)),0);case"grad":return r(h.mod(.9*parseFloat(e[1])),0);case"deg":return r(h.mod(parseFloat(e[1])),0);default:return NaN}}(t[0]),t[1]=c(t[1]),t[2]=c(t[2]),t[3]=f(t[3]),t.some(t=>Number.isNaN(t))?[]:function([t,e,s,i]){const n=(1-Math.abs(2*s-1))*e,a=n*(1-Math.abs(t/60%2-1)),h=s-n/2;let l=0,u=0,f=0;return t>=0&&t<60?(l=n,u=a,f=0):t>=60&&t<120?(l=a,u=n,f=0):t>=120&&t<180?(l=0,u=n,f=a):t>=180&&t<240?(l=0,u=a,f=n):t>=240&&t<300?(l=a,u=0,f=n):t>=300&&t<360&&(l=n,u=0,f=a),l=o.clamp(r(255*(l+h),0)),u=o.clamp(r(255*(u+h),0)),f=o.clamp(r(255*(f+h),0)),[l,u,f,t,e,s,i]}(t)):[]}function y(t){return"object"!=typeof t?[]:d(t.red,t.green,t.blue)?p([t.red,t.green,t.blue,t.alpha]):d(t.hue,t.saturation,t.lightness)?b([t.hue,t.saturation,t.lightness,t.alpha]):[]}class Entry{constructor(t,e,...s){this.key=t,this.value=e,this.aliases=new Set(s.filter(s=>s!==t||s!==e))}values(){return void 0!==this.key||void 0!==this.value||this.aliases.size?[this.key,this.value,...this.aliases]:[]}}const w=new WeakMap,v={strict:!0,immutable:!0},$=function(t){const e=Map.prototype.get.call(this,t);if(e)return t===e.key||t===e.value?this.delete(t):this.deleteAlias(e.key,t)},k=function(t){w.get(this).entryCount+=t},M=function(...t){if(t.some(t=>null==t)){if(!this.getOwnDescriptor().strict)return!1;throw TypeError("AliasMap entry cannot be null or undefined")}return!0},x=function(...t){if(this.getOwnDescriptor().immutable&&t.some(t=>this.has(t))){if(!this.getOwnDescriptor().strict)return!1;throw TypeError("Cannot reassign immutable entry. Delete entry first or set immutable property to false: .setOwnDescriptor({ immutable: false }).")}return!0},N=function(t,e,...s){if(s.some(s=>s===t||s===e)&&this.getOwnDescriptor().strict)throw TypeError("Key or value cannot be alias for itself")};class AliasMap extends Map{constructor(t=v){super();const e={entryCount:0,...v};Object.entries(t).forEach(([t,s])=>{e[t]=s}),w.set(this,e)}get entryCount(){return w.get(this).entryCount}get[Symbol.toStringTag](){return"AliasMap"}getOwnDescriptor(){const{strict:t,immutable:e}=w.get(this);return{strict:t,immutable:e}}getEntry(t){return super.get(t)}get(t){const e=this.getEntry(t);if(e)return e.value===t?e.key:e.value}getPrimaryKey(t){const e=this.getEntry(t);return e?e.key:e}getAliases(t){const e=this.getEntry(t);if(e&&"aliases"in e)return[...e.aliases]}getValue(t){const e=this.getEntry(t);return e?e.value:e}hasAlias(t,e){const s=this.getEntry(t);return!!s&&s.aliases.has(e)}delete(t){const e=this.getEntry(t);return!!e&&(super.delete(e.key),super.delete(e.value),e.aliases.forEach(t=>{super.delete(t)}),k.call(this,-1),!0)}deleteAlias(t,e){const s=this.getEntry(t);return!!s&&s.aliases.has(e)&&super.delete(e)&&s.aliases.delete(e)}set(t,e,...s){if(!M.call(this,t,e,...s))return!1;const r=this.getEntry(t);if(r&&r.key===t&&r.value===e)return this.setAlias(t,...s);if(!x.call(this,t,e,...s))return!1;N.call(this,t,e,...s),r&&r.key===t&&(s=[...r.aliases,...s]);const i=new Entry(t,e,...s);return i.values().forEach(t=>{$.call(this,t),super.set(t,i)}),k.call(this,1),this}setAlias(t,...e){if(!M.call(this,...e))return!1;if(!x.call(this,...e))return!1;const s=this.getEntry(t);return!(!s||!e.length)&&(N.call(this,s.key,s.value,...e),e.forEach(t=>{s.aliases.has(t)||($.call(this,t),s.aliases.add(t),super.set(t,s))}),[...s.aliases])}setOwnDescriptor(t){const e=this.getOwnDescriptor();"strict"in t&&"boolean"==typeof t.strict&&(e.strict=t.strict),"immutable"in t&&"boolean"==typeof t.immutable&&(e.immutable=t.immutable);const s={...w.get(this),...e};return w.set(this,s),e}clear(){return k.call(this,-this.entryCount),super.clear()}entries(){return[...new Set([...super.values()])]}keys(){return this.entries().map(t=>t.key)}values(){return this.entries().map(t=>t.value)}forEach(t,e){return this.entries().forEach(t,e)}}const C=new AliasMap;function A(t){return"string"!=typeof t?[]:C.get(t.trim().toLowerCase())||[]}C.set("aliceblue",[240,248,255,208,1,.97,1],"#f0f8ff"),C.set("antiquewhite",[250,235,215,34,.78,.91,1],"#faebd7"),C.set("cyan",[0,255,255,180,1,.5,1],"#00ffff","aqua","#0ff"),C.set("aquamarine",[127,255,212,160,1,.75,1],"#7fffd4"),C.set("azure",[240,255,255,180,1,.97,1],"#f0ffff"),C.set("beige",[245,245,220,60,.56,.91,1],"#f5f5dc"),C.set("bisque",[255,228,196,33,1,.88,1],"#ffe4c4"),C.set("black",[0,0,0,0,0,0,1],"#000000","#000"),C.set("blanchedalmond",[255,235,205,36,1,.9,1],"#ffebcd"),C.set("blue",[0,0,255,240,1,.5,1],"#0000ff","#00f"),C.set("blueviolet",[138,43,226,271,.76,.53,1],"#8a2be2"),C.set("brown",[165,42,42,0,.59,.41,1],"#a52a2a"),C.set("burlywood",[222,184,135,34,.57,.7,1],"#deb887"),C.set("cadetblue",[95,158,160,182,.25,.5,1],"#5f9ea0"),C.set("chartreuse",[127,255,0,90,1,.5,1],"#7fff00"),C.set("chocolate",[210,105,30,25,.75,.47,1],"#d2691e"),C.set("coral",[255,127,80,16,1,.66,1],"#ff7f50"),C.set("cornflowerblue",[100,149,237,219,.79,.66,1],"#6495ed"),C.set("cornsilk",[255,248,220,48,1,.93,1],"#fff8dc"),C.set("crimson",[220,20,60,348,.83,.47,1],"#dc143c"),C.set("darkblue",[0,0,139,240,1,.27,1],"#00008b"),C.set("darkcyan",[0,139,139,180,1,.27,1],"#008b8b"),C.set("darkgoldenrod",[184,134,11,43,.89,.38,1],"#b8860b"),C.set("darkgray",[169,169,169,0,0,.66,1],"#a9a9a9","darkgrey"),C.set("darkgreen",[0,100,0,120,1,.2,1],"#006400"),C.set("darkkhaki",[189,183,107,56,.38,.58,1],"#bdb76b"),C.set("darkmagenta",[139,0,139,300,1,.27,1],"#8b008b"),C.set("darkolivegreen",[85,107,47,82,.39,.3,1],"#556b2f"),C.set("darkorange",[255,140,0,33,1,.5,1],"#ff8c00"),C.set("darkorchid",[153,50,204,280,.61,.5,1],"#9932cc"),C.set("darkred",[139,0,0,0,1,.27,1],"#8b0000"),C.set("darksalmon",[233,150,122,15,.72,.7,1],"#e9967a"),C.set("darkseagreen",[143,188,143,120,.25,.65,1],"#8fbc8f"),C.set("darkslateblue",[72,61,139,248,.39,.39,1],"#483d8b"),C.set("darkslategray",[47,79,79,180,.25,.25,1],"#2f4f4f","darkslategrey"),C.set("darkturquoise",[0,206,209,181,1,.41,1],"#00ced1"),C.set("darkviolet",[148,0,211,282,1,.41,1],"#9400d3"),C.set("deeppink",[255,20,147,328,1,.54,1],"#ff1493"),C.set("deepskyblue",[0,191,255,195,1,.5,1],"#00bfff"),C.set("dimgray",[105,105,105,0,0,.41,1],"#696969","dimgrey"),C.set("dodgerblue",[30,144,255,210,1,.56,1],"#1e90ff"),C.set("firebrick",[178,34,34,0,.68,.42,1],"#b22222"),C.set("floralwhite",[255,250,240,40,1,.97,1],"#fffaf0"),C.set("forestgreen",[34,139,34,120,.61,.34,1],"#228b22"),C.set("gainsboro",[220,220,220,0,0,.86,1],"#dcdcdc"),C.set("ghostwhite",[248,248,255,240,1,.99,1],"#f8f8ff"),C.set("gold",[255,215,0,51,1,.5,1],"#ffd700"),C.set("goldenrod",[218,165,32,43,.74,.49,1],"#daa520"),C.set("gray",[128,128,128,0,0,.5,1],"#808080","grey"),C.set("green",[0,128,0,120,1,.25,1],"#008000"),C.set("greenyellow",[173,255,47,84,1,.59,1],"#adff2f"),C.set("honeydew",[240,255,240,120,1,.97,1],"#f0fff0"),C.set("hotpink",[255,105,180,330,1,.71,1],"#ff69b4"),C.set("indianred",[205,92,92,0,.53,.58,1],"#cd5c5c"),C.set("indigo",[75,0,130,275,1,.25,1],"#4b0082"),C.set("ivory",[255,255,240,60,1,.97,1],"#fffff0"),C.set("khaki",[240,230,140,54,.77,.75,1],"#f0e68c"),C.set("lavender",[230,230,250,240,.67,.94,1],"#e6e6fa"),C.set("lavenderblush",[255,240,245,340,1,.97,1],"#fff0f5"),C.set("lawngreen",[124,252,0,90,1,.49,1],"#7cfc00"),C.set("lemonchiffon",[255,250,205,54,1,.9,1],"#fffacd"),C.set("lightblue",[173,216,230,195,.53,.79,1],"#add8e6"),C.set("lightcoral",[240,128,128,0,.79,.72,1],"#f08080"),C.set("lightcyan",[224,255,255,180,1,.94,1],"#e0ffff"),C.set("lightgoldenrodyellow",[250,250,210,60,.8,.9,1],"#fafad2"),C.set("lightgray",[211,211,211,0,0,.83,1],"#d3d3d3","lightgrey"),C.set("lightgreen",[144,238,144,120,.73,.75,1],"#90ee90"),C.set("lightpink",[255,182,193,351,1,.86,1],"#ffb6c1"),C.set("lightsalmon",[255,160,122,17,1,.74,1],"#ffa07a"),C.set("lightseagreen",[32,178,170,177,.7,.41,1],"#20b2aa"),C.set("lightskyblue",[135,206,250,203,.92,.75,1],"#87cefa"),C.set("lightslategray",[119,136,153,210,.14,.53,1],"#778899","lightslategrey","#789"),C.set("lightsteelblue",[176,196,222,214,.41,.78,1],"#b0c4de"),C.set("lightyellow",[255,255,224,60,1,.94,1],"#ffffe0"),C.set("lime",[0,255,0,120,1,.5,1],"#00ff00","#0f0"),C.set("limegreen",[50,205,50,120,.61,.5,1],"#32cd32"),C.set("linen",[250,240,230,30,.67,.94,1],"#faf0e6"),C.set("magenta",[255,0,255,300,1,.5,1],"#ff00ff","fuchsia","#f0f"),C.set("maroon",[128,0,0,0,1,.25,1],"#800000"),C.set("mediumaquamarine",[102,205,170,160,.51,.6,1],"#66cdaa"),C.set("mediumblue",[0,0,205,240,1,.4,1],"#0000cd"),C.set("mediumorchid",[186,85,211,288,.59,.58,1],"#ba55d3"),C.set("mediumpurple",[147,112,219,260,.6,.65,1],"#9370db"),C.set("mediumseagreen",[60,179,113,147,.5,.47,1],"#3cb371"),C.set("mediumslateblue",[123,104,238,249,.8,.67,1],"#7b68ee"),C.set("mediumspringgreen",[0,250,154,157,1,.49,1],"#00fa9a"),C.set("mediumturquoise",[72,209,204,178,.6,.55,1],"#48d1cc"),C.set("mediumvioletred",[199,21,133,322,.81,.43,1],"#c71585"),C.set("midnightblue",[25,25,112,240,.64,.27,1],"#191970"),C.set("mintcream",[245,255,250,150,1,.98,1],"#f5fffa"),C.set("mistyrose",[255,228,225,6,1,.94,1],"#ffe4e1"),C.set("moccasin",[255,228,181,38,1,.85,1],"#ffe4b5"),C.set("navajowhite",[255,222,173,36,1,.84,1],"#ffdead"),C.set("navy",[0,0,128,240,1,.25,1],"#000080"),C.set("oldlace",[253,245,230,39,.85,.95,1],"#fdf5e6"),C.set("olive",[128,128,0,60,1,.25,1],"#808000"),C.set("olivedrab",[107,142,35,80,.6,.35,1],"#6b8e23"),C.set("orange",[255,165,0,39,1,.5,1],"#ffa500"),C.set("orangered",[255,69,0,16,1,.5,1],"#ff4500"),C.set("orchid",[218,112,214,302,.59,.65,1],"#da70d6"),C.set("palegoldenrod",[238,232,170,55,.67,.8,1],"#eee8aa"),C.set("palegreen",[152,251,152,120,.93,.79,1],"#98fb98"),C.set("paleturquoise",[175,238,238,180,.65,.81,1],"#afeeee"),C.set("palevioletred",[219,112,147,340,.6,.65,1],"#db7093"),C.set("papayawhip",[255,239,213,37,1,.92,1],"#ffefd5"),C.set("peachpuff",[255,218,185,28,1,.86,1],"#ffdab9"),C.set("peru",[205,133,63,30,.59,.53,1],"#cd853f"),C.set("pink",[255,192,203,350,1,.88,1],"#ffc0cb"),C.set("plum",[221,160,221,300,.47,.75,1],"#dda0dd"),C.set("powderblue",[176,224,230,187,.52,.8,1],"#b0e0e6"),C.set("purple",[128,0,128,300,1,.25,1],"#800080"),C.set("rebeccapurple",[102,51,153,270,.5,.4,1],"#663399","#639"),C.set("red",[255,0,0,0,1,.5,1],"#ff0000","#f00"),C.set("rosybrown",[188,143,143,0,.25,.65,1],"#bc8f8f"),C.set("royalblue",[65,105,225,225,.73,.57,1],"#4169e1"),C.set("saddlebrown",[139,69,19,25,.76,.31,1],"#8b4513"),C.set("salmon",[250,128,114,6,.93,.71,1],"#fa8072"),C.set("sandybrown",[244,164,96,28,.87,.67,1],"#f4a460"),C.set("seagreen",[46,139,87,146,.5,.36,1],"#2e8b57"),C.set("seashell",[255,245,238,25,1,.97,1],"#fff5ee"),C.set("sienna",[160,82,45,19,.56,.4,1],"#a0522d"),C.set("silver",[192,192,192,0,0,.75,1],"#c0c0c0"),C.set("skyblue",[135,206,235,197,.71,.73,1],"#87ceeb"),C.set("slateblue",[106,90,205,248,.53,.58,1],"#6a5acd"),C.set("slategray",[112,128,144,210,.13,.5,1],"#708090","slategrey"),C.set("snow",[255,250,250,0,1,.99,1],"#fffafa"),C.set("springgreen",[0,255,127,150,1,.5,1],"#00ff7f"),C.set("steelblue",[70,130,180,207,.44,.49,1],"#4682b4"),C.set("tan",[210,180,140,34,.44,.69,1],"#d2b48c"),C.set("teal",[0,128,128,180,1,.25,1],"#008080"),C.set("thistle",[216,191,216,300,.24,.8,1],"#d8bfd8"),C.set("tomato",[255,99,71,9,1,.64,1],"#ff6347"),C.set("turquoise",[64,224,208,174,.72,.56,1],"#40e0d0"),C.set("violet",[238,130,238,300,.76,.72,1],"#ee82ee"),C.set("wheat",[245,222,179,39,.77,.83,1],"#f5deb3"),C.set("white",[255,255,255,0,0,1,1],"#ffffff","#fff"),C.set("whitesmoke",[245,245,245,0,0,.96,1],"#f5f5f5"),C.set("yellow",[255,255,0,60,1,.5,1],"#ffff00","#ff0"),C.set("yellowgreen",[154,205,50,80,.61,.5,1],"#9acd32"),C.set("transparent",[0,0,0,0,0,0,0]);const E=/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i,S=/^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?$/i;function R(t){return parseInt(1===t.length?t.repeat(2):t.substring(0,2),16)}function F(t){return(t=o.clamp(+t)).toString(16).padStart(2,"0")}function L(t){if("string"!=typeof t)return[];const e=m(t,t.length>5?E:S);if(!e.length)return e;const s=e.map(R);return s[3]=void 0!==s[3]?o.getFraction(s[3],4):1,u(s)}const O=/^rgba?\(\s*([^\s,]+)\s*,\s*([^\s,]+)\s*,\s*([^\s,]+)\s*(?:,\s*([^\s,]+)\s*)?\)$/i,D=/^rgba?\(\s*(\S+)\s+(\S+)\s+(\S+)\s*(?:\s+\/\s+(\S+)\s*)?\)$/i;function z(t){if("string"!=typeof t)return[];const e=t.includes(",")?O:D;return p(m(t,e))}const q=/^hsla?\(\s*([^\s,]+)\s*,\s*([^\s,]+)\s*,\s*([^\s,]+)\s*(?:,\s*([^\s,]+)\s*)?\)$/i,H=/^hsla?\(\s*(\S+)\s+(\S+)\s+(\S+)\s*(?:\s+\/\s+(\S+)\s*)?\)$/i;function P(t){if("string"!=typeof t)return[];const e=t.includes(",")?q:H;return b(m(t,e))}const G=[[.4124564,.3575761,.1804375],[.2126729,.7151522,.072175],[.0193339,.119192,.9503041]],I=[[3.2404542,-1.5371385,-.4985314],[-.969266,1.8760108,.041556],[.0556434,-.2040259,1.0572252]];function j(t,e){return t.map((t,s,r)=>r.reduce((t,r,i)=>t+r*e[s][i],0))}class Color{constructor(t){const e=function(t){if(null==t)return[];let e=[];const s=[P,z,L,A,y,p];for(;s.length&&!e.length;)e=s.pop()(t);return e}(t);if(!e.length)throw Error("Cannot recognize color");Object.defineProperties(this,{red:{value:e[0]},green:{value:e[1]},blue:{value:e[2]},hue:{value:e[3]},saturation:{value:e[4]},lightness:{value:e[5]},alpha:{value:e[6]}})}static get D50(){return[.96422,1,.82521]}static get D65(){return[.9505,1,1.089]}static transferGamma(t){if(Array.isArray(t))return t.map(t=>t>.0031308?t**(1/2.4)*1.055-.055:12.92*t)}static xyz(t){if(!Array.isArray(t))return;const e=t[3]||1,s=j(t.slice(0,3),I);return new Color(Color.transferGamma(s).map(t=>255*t).concat(e))}static lab(t,e=Color.D65){if(!Array.isArray(t))return;const s=t[3]||1,r=.008856,i=903.3,n=(t[0]+16)/116,a=t[1]/500+n,o=n-t[2]/200,h=[a**3>r?a**3:(116*a-16)/i,t[0]>i*r?((t[0]+16)/116)**3:t[0]/i,o**3>r?o**3:(116*o-16)/i].map((t,s)=>t*e[s]);return Color.xyz(h.concat(s))}static lch(t){if(Array.isArray(t))return Color.lab([t[0],t[1]*Math.cos(t[2]*Math.PI/180),t[1]*Math.sin(t[2]*Math.PI/180),t[3]||1])}static hbw(t){if(!Array.isArray(t))return;const e=t[3]||1,s=(1-t[1]+t[2])/2,r=1-t[1]-t[2];let i;return i=s>0&&s<=.5?r/(2*s):r/(2-2*s||s),new Color({hue:t[0],lightness:s,saturation:i,alpha:e})}get luminance(){return this.toXyz()[1]}get chroma(){const t=this.toRgbr().slice(0,3);return Math.max(...t)-Math.min(...t)}get intensity(){return r(this.toRgbr().slice(0,3).reduce((t,e)=>t+e,0)/3,4)}get maxValue(){const t=this.toRgbr().slice(0,3);return Math.max(...t)}get whiteness(){const t=this.toRgbr().slice(0,3);return Math.min(...t)}get mode(){return+(this.luminance<.25)}get hueGroup(){return s(Math.floor((this.hue+15)%360/30)+1,11)}get hueGroupOffset(){return s(this.hue%30+15,30)}get hrad(){return r(this.hue*(Math.PI/180),4)}get hgrad(){return r(this.hue/.9,4)}get hturn(){return r(this.hue/360,4)}get name(){const t=function(t){if("string"==typeof t)return C.getPrimaryKey(t.trim().toLowerCase())}(this.toHexString().substring(0,7));return 1===this.alpha?t:t+"*"}toRgbString(){return this.alpha<1?`rgb(${this.red} ${this.green} ${this.blue} / ${this.alpha})`:`rgb(${this.red} ${this.green} ${this.blue})`}toHexString(){return`#${F(this.red)}${F(this.green)}${F(this.blue)}${this.alpha<1?F(Math.round(255*this.alpha)):""}`}toHslString(){return this.alpha<1?`hsl(${this.hue}deg ${r(100*this.saturation,0)}% ${r(100*this.lightness,0)}% / ${this.alpha})`:`hsl(${this.hue}deg ${r(100*this.saturation,0)}% ${r(100*this.lightness,0)}%)`}contrast(t){if(!t)return 1;const e=this.mix(t),s=Math.min(this.luminance,e.luminance);return r((Math.max(this.luminance,e.luminance)+.05)/(s+.05),2)}mix(t,e=1){if(!t)return this;const s=t instanceof Color?t:new Color(t);if(1===s.alpha&&1===e)return s;const r=l.clamp(s.alpha*e),i=this.red+r*(s.red-this.red),n=this.green+r*(s.green-this.green),a=this.blue+r*(s.blue-this.blue);return new Color([i,n,a])}opacity(t=1){return this.alpha===t?this:new Color([this.red,this.green,this.blue,t])}findByContrast(t,s=0,i=0){let n,a,o=0,h=1,l=0;for(;l<=7;){const u=new Color({hue:s,saturation:i,lightness:r((h+o)/2,2)}),f=this.contrast(u);if(Math.abs(f-t)<Math.abs(a-t)&&(a=f,n=u),e(a,t,.05))return n;a>t&&n.luminance>this.luminance||a<t&&n.luminance<this.luminance?h=(h+o)/2:o=(h+o)/2,l+=1}return n}tone(){return.5===this.lightness?this:new Color({hue:this.hue,saturation:this.saturation,lightness:.5})}invert(){return new Color([255-this.red,255-this.green,255-this.blue,this.alpha])}shiftHue(t=1){return 0===s(t,360)?this:new Color({hue:this.hue+t,saturation:this.saturation,lightness:this.lightness,alpha:this.alpha})}opposite(){return this.shiftHue(180)}offsetHue(t){return this.hueGroupOffset===t?this:new Color({hue:s(30*this.hueGroup-45+this.hueGroupOffset,360),saturation:this.saturation,lightness:this.lightness,alpha:this.alpha})}warmer(t=.1,e=[247,166,115]){return this.mix(e,t/2)}cooler(t=.1,e=[67,162,237]){return this.mix(e,t/2)}grayscale(){if(0===this.saturation)return this;const t=this.luminance>.0393?255*(this.luminance**(1/2.4)*1.055-.055):3294.6*this.luminance;return new Color([t,t,t,this.alpha])}grayscaleLab(){const t=this.toLab()[0]/100*255;return new Color([t,t,t,this.alpha])}toLinearRgb(){return[this.red,this.green,this.blue].map(t=>{const e=t/255;return r(e<.04045?e/12.92:((e+.055)/1.055)**2.4,7)})}toXyz(){return j(this.toLinearRgb(),G).map(t=>r(t,7))}toLab(t=Color.D65){const[e,s,i]=this.toXyz().map((e,s)=>e/t[s]).map(t=>t>.008856?Math.cbrt(t):(903.3*t+16)/116);return[116*s-16,500*(e-s),200*(s-i)].map(t=>r(t,7))}toLch(){const[t,e,i]=this.toLab();return[t,Math.sqrt(e**2+i**2),s(180*Math.atan2(i,e)/Math.PI,360)].map(t=>r(t,7))}toLchString(){const[t,e,s]=this.toLch().map(t=>r(t,3));return this.alpha<1?`lch(${t}% ${e} ${s}deg / ${this.alpha})`:`lch(${t}% ${e} ${s}deg)`}toLabString(){const[t,e,s]=this.toLab().map(t=>r(t,3));return this.alpha<1?`lab(${t}% ${e} ${s} / ${this.alpha})`:`lab(${t}% ${e} ${s})`}toRgb(){return[this.red,this.green,this.blue,this.alpha]}toRgbr(){return[this.red,this.green,this.blue].map(t=>r(t/255,2)).concat(this.alpha)}copyWith(t){return"red"in t||"blue"in t||"green"in t?new Color({red:this.red,green:this.green,blue:this.blue,alpha:this.alpha,...t}):"hue"in t||"saturation"in t||"lightness"in t?new Color({hue:this.hue,saturation:this.saturation,lightness:this.lightness,alpha:this.alpha,...t}):"alpha"in t?this.opacity(t.alpha):this}toHwb(){const t=this.toRgbr().slice(0,3);return[this.hue,Math.min(...t),1-Math.max(...t),this.alpha]}toHbwString(){const[t,e,s]=this.toHwb();return this.alpha<1?`hbw(${t}deg ${e}% ${s}% / ${this.alpha})`:`hbw(${t}deg ${e}% ${s}%)`}}export default Color;
