"use strict";(self.webpackChunkgarden_game=self.webpackChunkgarden_game||[]).push([[889],{5889:(e,a,n)=>{n.r(a),n.d(a,{default:()=>c});var t=n(7294);const o=["shovel","tree-food","watering-can","bug-spray","phonograph"];var r=function(e){return"url(./assets/images/tools/".concat(e,".png)")};function c(e){var a=e.tool,n=e.setTool,c=e.costTreeFood,s=e.costWateringCan;return t.createElement("div",null,o.map((function(e,o){return t.createElement("div",{className:"gd-bank",style:{top:80*o+60},onClick:function(){return function(e){a===e?(n(null),document.body.style.cursor="auto"):(n(e),document.body.style.cursor=r(e)+" 40 40, auto")}(e)},key:e},t.createElement("div",{className:"gd-bank-image",style:{backgroundImage:r(e),display:a===e?"none":""}}),"tree-food"===e&&t.createElement("div",{className:"gd-bank-price"},c),"watering-can"===e&&t.createElement("div",{className:"gd-bank-price"},s))})))}}}]);