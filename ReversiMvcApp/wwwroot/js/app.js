"use strict";function _createForOfIteratorHelper(e,t){var n,r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length)return r&&(e=r),n=0,{s:t=function(){},n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:t};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o=!0,i=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return o=e.done,e},e:function(e){i=!0,a=e},f:function(){try{o||null==r.return||r.return()}finally{if(i)throw a}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(n="Object"===n&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function asyncGeneratorStep(e,t,n,r,a,o,i){try{var u=e[o](i),c=u.value}catch(e){return void n(e)}u.done?t(c):Promise.resolve(c).then(r,a)}function _asyncToGenerator(u){return function(){var e=this,i=arguments;return new Promise(function(t,n){var r=u.apply(e,i);function a(e){asyncGeneratorStep(r,t,n,a,o,"next",e)}function o(e){asyncGeneratorStep(r,t,n,a,o,"throw",e)}a(void 0)})}}var apiUrl="url/super/duper/game",Game=function(){console.log("hallo, vanuit een module");var s,f={gameState:null,oldGameState:null,gameToken:"",playerId:""},p=function(){var e=_asyncToGenerator(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Game.Data.get("https://localhost:5000/api/Spel/Beurt/".concat(f.gameToken)));case 1:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),r=function(){var e=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,n,r,a,o,i,u,c,l;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Game.Model.getGameState(f.gameToken);case 2:if(f.gameState=e.sent,null===f.oldGameState)Game.Reversi.showBoard(f.gameState.bord),Game.Stats.updateChart(f.gameState.bord);else if(f.gameState.bord!==f.oldGameState.bord){for(t=!1,n=0;n<8;n++)for(r=0;r<8;r++)a=f.oldGameState.bord[r][n],o=f.gameState.bord[r][n],a!==o&&(t=!0,Game.Reversi.showFiche(n,r,o));t&&Game.Stats.updateChart(f.gameState.bord)}return document.getElementById("kleur").innerHTML=f.gameState.speler1Token===f.playerId?"Kleur: Wit":"Kleur: Rood",i=document.getElementById("aanDeBeurt"),e.next=9,p();case 9:if(e.t0=e.sent,1!==e.t0){e.next=14;break}e.t1="Aan de beurt: Wit",e.next=15;break;case 14:e.t1="Aaan de beurt: Rood";case 15:if(i.innerHTML=e.t1,u=f.gameState.bord.map(function(e){return e.filter(function(e){return 1===e}).length}).reduce(function(e,t){return e+t}),c=f.gameState.bord.map(function(e){return e.filter(function(e){return 2===e}).length}).reduce(function(e,t){return e+t}),l="Wit: ".concat(u)+" - "+"Rood: ".concat(c),document.getElementById("score").innerHTML=l,f.gameState.isKlaar)return clearInterval(s),i.innerHTML=c<u?"Wit heeft gewonnen!":u<c?"Rood heeft gewonnen!":"Gelijk spel",e.next=26,p();e.next=34;break;case 26:if(e.t2=e.sent,1!==e.t2){e.next=31;break}e.t3=f.gameState.speler1Token,e.next=32;break;case 31:e.t3=f.gameState.speler2Token;case 32:e.t3===f.playerId&&$.get("https://localhost:5000/Spel/Done/".concat(f.gameToken)).then(function(e){return e});case 34:f.oldGameState=f.gameState;case 35:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();return{init:function(e,t){f.gameToken=t,f.playerId=e,Game.Template.init(),Game.Api.init(),Game.Stats.init(),r(),s=setInterval(r,2e3)},doeZet:function(){var n=_asyncToGenerator(regeneratorRuntime.mark(function e(t,n){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p();case 2:if(e.t0=e.sent,1!==e.t0){e.next=7;break}e.t1=f.gameState.speler1Token,e.next=8;break;case 7:e.t1=f.gameState.speler2Token;case 8:if(e.t1===f.playerId)return e.next=12,Game.Data.put("https://localhost:5000/api/spel/".concat(f.gameToken,"/zet?token=").concat(f.playerId,"&x=").concat(t,"&y=").concat(n));e.next=14;break;case 12:return e.next=14,r();case 14:case"end":return e.stop()}},e)}));return function(e,t){return n.apply(this,arguments)}}()}}(),FeedbackWidget=(Game.Data=function(){console.log("hallo, vanuit module Data");function t(t){var n=e.mock.find(function(e){return e.url===t});return new Promise(function(e,t){e(n)})}var e={mock:[{url:"api/Spel/Beurt",data:0}]},n="production";return{init:function(e){if("development"===n)return t(e);if("production"!==n)throw new Error("de environment is geen development of production")},get:function(e){return"production"===n?$.get(e).then(function(e){return e}).catch(function(e){console.log(e.message)}):"development"===n?t(e):void 0},put:function(e){return"production"===n?new Promise(function(t){$.ajax({url:e,type:"PUT",success:function(e){t(e)}})}):"development"===n?t(e):void 0},funFact:function(){var e=_asyncToGenerator(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,$.get("https://api.aakhilv.me/fun/facts");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()}}(),Game.Model=function(){console.log("hallo, vanuit module Model");return{init:function(){console.log("private model")},weather:function(e){Game.Data.get(e).then(function(e){if(null==e.main.temp)throw new Error("Geen temperatuur");console.log(e)})},getGameState:function(){var t=_asyncToGenerator(regeneratorRuntime.mark(function e(t){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Game.Data.get("https://localhost:5000/api/spel/".concat(t));case 2:return(n=e.sent).bord=function(e){for(var t,n=[],r=0;r<8;r++)n.push([0,0,0,0,0,0,0,0]);for(t in e){var a=e[t],o=t.split(",");n[o[0]][o[1]]=a}return n}(n.bord),e.abrupt("return",n);case 5:case"end":return e.stop()}},e)}));return function(e){return t.apply(this,arguments)}}()}}(),Game.Reversi=function(){console.log("hallo, vanuit module Reversi");return{init:function(){console.log("private spel")},showBoard:function(e){document.querySelector(".board").innerHTML=Game.Template.parseTemplate("reversi.board",{board:e});for(var t=function(r){for(var e=0;e<8;e++)!function(t){var n=document.querySelector(".board-row-y-".concat(r,".board-row-x-").concat(t));n.addEventListener("click",function(e){0<n.children.length||Game.doeZet(t,r)})}(e)},n=0;n<8;n++)t(n)},showFiche:function(e,t,n){t=document.querySelector(".board-row-y-".concat(t,".board-row-x-").concat(e)),e=document.createElement("div");e.classList.add("fade-in"),e.classList.add("fiche-".concat(n)),t.innerHTML="",t.append(e)}}}(),function(){function t(e){_classCallCheck(this,t),_defineProperty(this,"count",1),this._elementId=e}return _createClass(t,[{key:"elementId",get:function(){return this._elementId}},{key:"show",value:function(e,t){var n=document.getElementById(this._elementId);n.style.display="block",$(n).text(e),"danger"===t?($(n).addClass("alert alert-danger"),$(n).removeClass("alert alert-success")):"success"===t&&($(n).addClass("alert alert-success"),$(n).removeClass("alert alert-danger")),this.log({message:e,type:t}),console.log(this.history())}},{key:"hide",value:function(){document.getElementById(this._elementId).style.display="none"}},{key:"log",value:function(e){var t=this.count-10;10<=localStorage.length&&(localStorage.removeItem("feedback_widget"+t),console.log("boven de 10")),localStorage.setItem("feedback_widget"+this.count,JSON.stringify(e)),this.count++}},{key:"removelog",value:function(){for(var e=this.count-10;e<this.count;e++)localStorage.removeItem("feedback_widget"+e);for(e=0;e<10;e++)localStorage.removeItem("feedback_widget"+e)}},{key:"history",value:function(){for(var e=[],t=this.count-localStorage.length;t<this.count;t++)e.push(JSON.parse(localStorage.getItem("feedback_widget"+t)));var n="";for(t=0;t<e.length;t++)n+=e[t].type+" - "+e[t].message+"\n";return n}}]),t}());Game.Api=function(){function e(){return(e=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=document.getElementById("funFact"),e.next=3,r();case 3:n=e.sent,t.innerHTML=Game.Template.parseTemplate("api.funFact",{fact:n});case 5:case"end":return e.stop()}},e)}))).apply(this,arguments)}function r(){return t.apply(this,arguments)}function t(){return(t=_asyncToGenerator(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Game.Data.funFact();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}))).apply(this,arguments)}return{init:function(){return e.apply(this,arguments)},funFact:r}}(),Game.Stats=function(){var n={myChart:null,player1:[],player2:[]};function r(){var e,t=$("#myChart");null!=(e=n.myChart)&&e.destroy(),n.myChart=new Chart(t,{type:"line",data:{labels:n.player1.map(function(e,t){return t+1}),datasets:[{label:"Wit",data:n.player1,fill:!1,borderColor:"rgb(255,255,255)",tension:.1},{label:"Rood",data:n.player2,fill:!1,borderColor:"rgb(255,0,0)",tension:.1}]},options:{scales:{y:{beginAtZero:!0,color:"rgb(255,255,255)",grid:{color:"rgb(255,255,255)"},title:{color:"rgb(255,255,255)"}},x:{color:"rgb(255,255,255)",grid:{color:"rgb(255,255,255)"},title:{color:"rgb(255,255,255)"}}}}})}return{init:r,updateChart:function(e){var t=e.map(function(e){return e.filter(function(e){return 1===e}).length}).reduce(function(e,t){return e+t}),e=e.map(function(e){return e.filter(function(e){return 2===e}).length}).reduce(function(e,t){return e+t});n.player1.push(t),n.player2.push(e),r()}}}(),Game.Template=function(){function n(e){var t,n=spa_templates.templates,r=_createForOfIteratorHelper(e.split("."));try{for(r.s();!(t=r.n()).done;)n=n[t.value]}catch(e){r.e(e)}finally{r.f()}return n}return{init:function(){Handlebars.registerHelper("ifeq",function(e,t,n){return e===t?n.fn(this):n.inverse(this)}),Handlebars.registerHelper("ifnoteq",function(e,t,n){return e!==t?n.fn(this):n.inverse(this)})},getTemplate:n,parseTemplate:function(e,t){return n(e)(t)}}}();