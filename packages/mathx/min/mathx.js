'use strict';(function(){var e=function(a){a=+a;if(Number.isNaN(a))return NaN;a=a.toString();let b=/^[+-]?\d+(?:\.(\d+))?e([+-]?\d+)$/,c=/^[+-]?\d+(?:\.(\d+))?$/,d=/^[+-]?\d+?(0+)$/;if(d.test(a))return(a=a.match(d)[1])?-a.length:0;if(c.test(a))return(a=a.match(c)[1])?a.length:0;if(b.test(a)){let [,c="",d=0]=a.match(b);return c.length-d}return 0},f=function(a,b=12){return+(+(a*10**b).toFixed(0)*10**-b).toFixed(0>b?0:b)};return{approx:function(a,b,c=0){let d=Math.max(e(a),e(b),e(c));return+Math.abs(a-
b).toFixed(d)<=c},getPrecision:e,modulo:function(a,b){return(+a%+b+ +b)%+b},random:function(a=[0,1],b=12){let [c,d]=a;return f(c+Math.random()*(d-c),b)},round:f,toNumber:function(a,b=12){if(null==a||Array.isArray(a))return NaN;a=a.toString();a=/%$/.test(a)?+a.slice(0,-1)/100:+a;void 0!==b&&(a=f(a,b));return a}}})()