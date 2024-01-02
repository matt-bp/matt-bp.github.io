(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();class T{constructor(t){this.htmlElement=t,this._handlers={},this._inputBuffer={},this.process=()=>{for(const e in this._inputBuffer)if(this._inputBuffer.hasOwnProperty(e))for(let i=0;this._handlers[e]&&i<this._handlers[e].length;i++)this._handlers[e][i](this._inputBuffer[e]);this._inputBuffer={}},this._addEventListeners=()=>{this.htmlElement.addEventListener("click",this._handleInput),this.htmlElement.addEventListener("mousemove",this._handleInput)},this._removeEventListeners=()=>{this.htmlElement.removeEventListener("click",this._handleInput),this.htmlElement.removeEventListener("mousemove",this._handleInput)},this._handleInput=e=>{(e.type==="click"||e.type==="mousemove")&&(this._inputBuffer[e.type]=e)},this._addEventListeners()}destroy(){this._removeEventListeners(),this._handlers={}}resetHandlers(){this._handlers={}}register(t,e){this._handlers[t]||(this._handlers[t]=[]),this._handlers[t].push(e)}getPos(t){const e=this.htmlElement.getBoundingClientRect(),i=t.clientX-e.left,s=t.clientY-e.top,n=1024/e.width,r=1024/e.height;return{x:i*n,y:s*r}}static getCursorPosition(t,e){const i=t.getBoundingClientRect(),s=e.clientX-i.left,n=e.clientY-i.top,r=1024/i.width,h=1024/i.height;return{x:s*r,y:n*h}}}class k{constructor(t){this.context=t.getContext("2d")}get middleX(){return this.width/2}get width(){return this.context.canvas.width}clear(){const{width:t,height:e}=this.context.canvas;this.context.clearRect(0,0,t,e)}drawRectangle(t,e,i,s,n,r){this.context.fillStyle=r,this.context.lineWidth=5,this.context.save(),this.context.translate(t,e),this.context.rotate(n),this.context.translate(-t,-e),this.context.fillRect(t,e,i,s),this.context.restore()}drawText(t,e,i=0,s,n="64px arial"){this.context.save(),this.context.font=n;const r=this.context.measureText(e).width;this.context.restore(),this.context.save(),this.context.font=n;let h=this.context.measureText("m").width;this.context.restore(),this.context.save(),this.context.font=n,this.context.fillStyle=s,this.context.textBaseline="top",this.context.translate(t.x+r/2,t.y+h/2),this.context.rotate(i),this.context.translate(-(t.x+r/2),-(t.y+h/2)),this.context.fillText(e,t.x,t.y),this.context.restore()}drawPoints(t,e,i,s=!1){this.context.beginPath(),this.context.strokeStyle=e,this.context.fillStyle=i,this.context.lineWidth=3,this.context.moveTo(t[0].x,t[0].y);for(let n=1;n<t.length;n++)this.context.lineTo(t[n].x,t[n].y);s&&this.context.closePath(),this.context.fill(),this.context.stroke()}getTextWidth(t,e){this.context.save(),this.context.font=e;const i=this.context.measureText(t).width;return this.context.restore(),i}getFontHeight(t){this.context.save(),this.context.font=t;const e=this.context.measureText("m").width;return this.context.restore(),e}drawTexture(t){t.ready&&(this.context.save(),this.context.translate(t.center.x,t.center.y),this.context.rotate(t.rotation),this.context.translate(-t.center.x,-t.center.y),this.context.drawImage(t.image,t.center.x-t.width/2,t.center.y-t.height/2,t.width,t.height),this.context.restore())}drawSubTexture(t,e,i,s,n){if(t.ready){const r=t.getBounds(e);this.context.save(),this.context.translate(i.x,i.y),this.context.rotate(s),this.context.translate(-i.x,-i.y),this.context.drawImage(t.image,r.x,r.y,r.w,r.h,i.x-n.w/2,i.y-n.h/2,n.w,n.h),this.context.restore()}}createGradient(t,e){return this.context.createLinearGradient(t.x,t.y,e.x,e.y)}}class b{constructor(t=!1){this.clearBuffer=t,this.inputBuffer={},this.handlers={},this.addToInputBuffer=e=>{this.inputBuffer[e.key]=e.key},this.removeKey=e=>{delete this.inputBuffer[e.key]},window.addEventListener("keydown",this.addToInputBuffer),window.addEventListener("keyup",this.removeKey)}destroy(){window.removeEventListener("keydown",this.addToInputBuffer),window.removeEventListener("keyup",this.removeKey),this.inputBuffer={},this.handlers={}}process(t){for(const e in this.inputBuffer)if(this.inputBuffer.hasOwnProperty(e))for(let i=0;this.handlers[e]&&i<this.handlers[e].length;i++)this.handlers[e][i](t);this.clearBuffer&&(this.inputBuffer={})}register(t,e){this.handlers[t]||(this.handlers[t]=[]),this.handlers[t].push(e)}registerMultiple(t,e){for(let i=0;i<t.length;i++)this.register(t[i],e)}}let R=!1,I=0;var u;(function(o){function t(r,h){let a=0,l=0,c=0,d=0;if(R)return R=!1,r+I*h;R=!0;do a=2*Math.random()-1,l=2*Math.random()-1,d=a*a+l*l;while(d>=1);return d=Math.sqrt(-2*Math.log(d)/d),c=a*d,I=l*d,r+c*h}o.nextGaussian=t;function e(r,h){let a=h-r;return Math.floor(Math.random()*a+r)}o.nextRange=e;function i(){let r=Math.random()*2*Math.PI;return{x:Math.cos(r),y:Math.sin(r)}}o.nextCircleVector=i;function s(r=2*Math.PI){let h=Math.random()*r;return{x:Math.cos(h),y:Math.sin(h)}}o.nextAngleVector=s;function n(r,h=Math.PI/2){const a=h/2,l=t(a,h/4)+h,c=r-a+l;return{x:Math.cos(c),y:Math.sin(c)}}o.nextAngleInCone=n})(u||(u={}));function N(o,t,e){return o<t?t:o>e?e:o}class z{constructor(t){this.gravityScaling=3e-5,this.momentumScaling=.022,this.GRAVITY=-1.625,this._momentum={x:0,y:0},this.rotateLeft=e=>{this._rotation-=this.rotationRate*e},this.rotateRight=e=>{this._rotation+=this.rotationRate*e},this.thrust=e=>{if(this.fuel<=0)return;const i=Math.sin(this._rotation),s=-Math.cos(this._rotation);this._momentum.x+=i*this.thrustRate*e,this._momentum.y+=s*this.thrustRate*e,this.fuel-=e},this.thrustRate=t.thrustRate,this.rotationRate=t.rotationRate,this._center=t.center,this.radius=t.radius,this._rotation=t.rotation,this.fuel=t.fuel,this.spriteSheet=t.spriteSheet}update(t){this._momentum.y-=this.GRAVITY*this.gravityScaling*t,this._center.x+=this._momentum.x*t,this._center.y+=this._momentum.y*t}render(t){t.drawSubTexture(this.spriteSheet,"lander",this._center,this._rotation,{w:50,h:50})}get collisionShape(){return{center:this._center,radius:this.radius}}get rotationInDeg(){return this._rotation*180/Math.PI}get rotationInRad(){return this._rotation}get speed(){const{x:t,y:e}=this._momentum;return Math.sqrt(Math.pow(t,2)+Math.pow(e,2))/this.momentumScaling}get fuelTime(){return this.fuel}get center(){return this._center}}class H{constructor(t,e){this.bounds=e,this._ready=!1,this._image=new Image,this._image.onload=()=>{this._ready=!0},this._image.src=t}getBounds(t){return this.bounds[t]}get image(){return this._image}get ready(){return this._ready}}class E{constructor(t,e,i,s){this.x=t,this.y=e,this.w=i,this.h=s}inBounds(t){return t.x>=this.x&&t.x<=this.x+this.w&&t.y>=this.y&&t.y<=this.y+this.h}}function Y(o,t,e){let i={x:t.x-o.x,y:t.y-o.y},s={x:o.x-e.center.x,y:o.y-e.center.y},n=-2*(i.x*s.x+i.y*s.y),r=2*(i.x*i.x+i.y*i.y),h=Math.sqrt(n*n-2*r*(s.x*s.x+s.y*s.y-e.radius*e.radius));if(isNaN(h))return!1;let a=(n-h)/r,l=(n+h)/r;return a<=1&&a>=0||l<=1&&l>=0}class U{constructor(t,e,i){this.interval=t,this.numTimes=e,this.callback=i,this.timeSinceLastEvent=0}update(t){this.timeSinceLastEvent+=t,this.timeSinceLastEvent>this.interval&&(this.timeSinceLastEvent-=this.interval,this.numTimes--,this.callback&&this.callback())}get timesLeft(){return this.numTimes}}class ${constructor(){this.events=[],this.addEvent=(t,e,i)=>{this.events.push(new U(t,e,i))},this.update=t=>{for(let e=0;e<this.events.length;e++){if(this.events[e].timesLeft<=0){this.events.splice(e,1),e--;continue}this.events[e].update(t)}},this.destroy=()=>{this.events.length=0}}}function L(o,t,e){return{r:(o.r-t.r)/e,g:(o.g-t.g)/e,b:(o.b-t.b)/e,a:(o.a-t.a)/e}}class P{constructor(t){this.props=t,this.elapsedTime=0,this.fading=!1,this.update=e=>{const{speed:i,direction:s}=this.props;this.center.x+=i*s.x*e,this.center.y+=i*s.y*e,this.elapsedTime+=e,this.updateColor(e),this.props.rotation+=i*.5},this.updateColor=e=>{!this.fading&&this.elapsedTime>=this.props.lifetime-this.props.fadeTransition&&(this.fading=!0,this.colorTransition=L(this.color,{r:this.color.r,g:this.color.g,b:this.color.b,a:0},this.props.fadeTransition)),this.color.r-=this.colorTransition.r*e,this.color.g-=this.colorTransition.g*e,this.color.b-=this.colorTransition.b*e,this.color.a-=this.colorTransition.a*e},this.color=t.fromColor,this.colorTransition=L(t.fromColor,t.toColor,t.lifetime)}get alive(){return this.elapsedTime<=this.props.lifetime}get center(){return this.props.center}get rotation(){return this.props.rotation}get fill(){return`rgb(${this.color.r},${this.color.g},${this.color.b})`}get size(){return this.props.size}}class W{constructor(){this._particles=[],this.update=t=>{for(let e=this._particles.length-1;e>=0;e--)if(this._particles[e].update(t),!this._particles[e].alive){this._particles.splice(e,1);continue}}}shipThrust(t,e,i){for(let s=0;s<5;s++){const n=Math.abs(u.nextGaussian(i.size.mean,i.size.stdev)),r=Math.abs(u.nextGaussian(i.speed.mean,i.speed.stdev)),h=new P({center:t,size:{x:n,y:n},rotation:0,speed:r,direction:u.nextAngleInCone(e),lifetime:u.nextGaussian(i.lifetime.mean,i.lifetime.stdev),fromColor:{r:i.fromColor.r,g:i.fromColor.g,b:i.fromColor.b,a:i.fromColor.a},toColor:{r:i.toColor.r,g:i.toColor.g,b:i.toColor.b,a:i.toColor.a},fadeTransition:50});this._particles.push(h)}}shipCrash(t,e){for(let i=0;i<1e3;i++){const s=Math.abs(u.nextGaussian(e.size.mean,e.size.stdev)),n=Math.abs(u.nextGaussian(e.speed.mean,e.speed.stdev)),r=new P({center:{x:t.x,y:t.y},size:{x:s,y:s},rotation:0,speed:n,direction:u.nextCircleVector(),lifetime:u.nextGaussian(e.lifetime.mean,e.lifetime.stdev),fromColor:{r:e.fromColor.r,g:e.fromColor.g,b:e.fromColor.b,a:e.fromColor.a},toColor:{r:e.toColor.r,g:e.toColor.g,b:e.toColor.b,a:e.toColor.a},fadeTransition:100});this._particles.push(r)}}get particles(){return this._particles}}const X=o=>t=>{const{particles:e}=o;for(let i=e.length-1;i>=0;i--){const{center:s,rotation:n,size:r,fill:h}=e[i];t.drawRectangle(s.x,s.y,r.x,r.y,n,h)}};class D{constructor(t,e,i){this._ready=!1,this._image=new Image,this._rotation=0,this._width=0,this._height=0,this._image.onload=()=>{this._ready=!0;let s=this._image.width/this._image.height;this._width=i*s,this._height=i},this._image.src=e,this._center=t}get ready(){return this._ready}get center(){return this._center}get image(){return this._image}get rotation(){return this._rotation}set rotation(t){this._rotation=t}get width(){return this._width}get height(){return this._height}}const _=[{numLandingPads:2,padSize:100,fuelTime:2e4},{numLandingPads:1,padSize:75,fuelTime:15e3}];class V{constructor(t,e=0,i=!1,s=1,n){this.source=t,this.delay=e,this.loop=i,this.volume=s,this.callback=n,this.elapsedTime=0,this.update=r=>{this.audioEl||(this.elapsedTime+=r,this.elapsedTime>=this.delay&&(this.audioEl=new Audio(this.source),this.audioEl.volume=this.volume,this.audioEl.play().then(this.callback)))},this.pause=()=>{this.audioEl&&this.audioEl.pause()},this.play=()=>{this.audioEl&&this.audioEl.play()},this.destory=()=>{this.audioEl.pause()}}get done(){return this.audioEl&&this.audioEl.played&&!this.loop}}class B{constructor(){this.audio=[],this.addAudio=(t,e=0,i=!1,s=1,n)=>{this.audio.push(new V(t,e,i,s,n))},this.update=t=>{for(let e=this.audio.length-1;e>=0;e--){if(this.audio[e].update(t),this.audio[e].done){this.audio.splice(e,1);continue}this.audio[e].update(t)}},this.clearAllSounds=()=>{for(let t=0;t<this.audio.length;t++)this.audio[t].pause();this.audio.length=0},this.destroy=()=>{for(let t=0;t<this.audio.length;t++)this.audio[t].destory();this.audio.length=0}}}const g=1024;class q{constructor(){this.level=0,this.points=[],this.landingPoints=[],this._spriteSheet=new H("images/LunarLander.png",{lander:new E(0,57,20,20)}),this.background=new D({x:g/2,y:g/2},"images/game-background.png",g),this.eventSystem=new $,this.thrustParticleParams={size:{mean:2,stdev:1},speed:{mean:.025,stdev:.005},lifetime:{mean:900,stdev:50},fromColor:{r:255,g:77,b:0,a:1},toColor:{r:100,g:100,b:100,a:1}},this.crashParticleParams={size:{mean:4,stdev:4},speed:{mean:.01,stdev:.01},lifetime:{mean:2e3,stdev:500},fromColor:{r:255,g:0,b:0,a:1},toColor:{r:0,g:0,b:0,a:1}},this.score=0,this.handlingLanding=!1,this.audioSystem=new B,this.start=()=>{this.audioSystem.clearAllSounds(),this.generateTerrain(),this._player=new z({thrustRate:15e-5,rotationRate:Math.PI*3e-4,center:{x:g/2,y:200},radius:22/(Math.PI/4),rotation:Math.PI/2,fuel:_[this.level].fuelTime,spriteSheet:this._spriteSheet}),this.handlingLanding=!1,this.internalUpdate=this.gameUpdate,this.internalRender=this.gameRender,this.internalRotateLeft=this._player.rotateLeft,this.internalRotateRight=this._player.rotateRight,this.internalThrust=this.gameThrust,this.particleSystem=new W,this.particleSystemRenderer=X(this.particleSystem),this.audioSystem.addAudio("audio/gameplay.mp3",0,!0,.75)},this.render=t=>{this.internalRender(t)},this.destroy=()=>{this.eventSystem.destroy(),this.audioSystem.destroy()},this.gameThrust=t=>{if(this._player.fuelTime<=0)return;this.thrustAudio||(this.thrustAudio=new Audio("audio/smallthrust1.mp3"),this.thrustAudio.play().then(()=>{this.thrustAudio=void 0})),this._player.thrust(t);const{center:e,rotationInRad:i}=this._player,s={x:0,y:20},n={x:s.x*Math.cos(i)-s.y*Math.sin(i),y:s.x*Math.sin(i)+s.y*Math.cos(i)},r={x:e.x+n.x,y:e.y+n.y};this.particleSystem.shipThrust(r,i,this.thrustParticleParams)},this.gameRender=t=>{this.drawBackground(t),this.drawDashboard(t),t.drawPoints(this.createAllPoints(),"#414141","#a1a1a1",!0),this.drawLandingZones(t),this.particleSystemRenderer(t),this._player.render(t)},this.drawBackground=t=>{t.drawTexture(this.background)},this.createAllPoints=()=>[...this.points,{x:1024,y:1024},{x:0,y:1024}],this.gameUpdate=t=>{this.audioSystem.update(t),this.eventSystem.update(t),this.particleSystem.update(t),this.detectCollisions(),this._player.update(t)},this.drawLandingZones=t=>{for(let e=0;e<this.landingPoints.length;e+=2){const i=this.landingPoints[e],s=this.landingPoints[e+1],n=t.createGradient(i,s),r=s.x-i.x;let h=!1;for(let a=0;a<r;a+=4)n.addColorStop(a/r,h?"yellow":"black"),h=!h;t.drawRectangle(i.x,i.y,r,20,0,n)}},this.drawDashboard=t=>{const e="20px arial";let i={x:800,y:100};const s=25,n="#1aff00",r="white",{rotationInDeg:h,speed:a,fuelTime:l}=this._player,c=h<0?h+360:h,d=c<5||c>355?n:r;t.drawText(i,`angle   : ${c.toFixed(2)} °`,0,d,e),i.y+=s;const m=a>0&&a<=2?n:r;t.drawText(i,`speed  : ${a.toFixed(3)} m/s`,0,m,e),i.y+=s;const y=l>0?n:r;t.drawText(i,`fuel      : ${Math.abs(l/1e3).toFixed(2)} s`,0,y,e)},this.update=t=>{this.internalUpdate(t)},this.landerRotateLeft=t=>{this.internalRotateLeft(t)},this.landerRotateRight=t=>{this.internalRotateRight(t)},this.landerThrust=t=>{this.internalThrust(t)},this.handleCollision=t=>{t?this.handleLanded():this.handleCrashed()},this.handleLanded=()=>{if(this.handlingLanding)return;this.handlingLanding=!0;const{speed:t,rotationInDeg:e}=this._player,i=e<=5&&e>=-5,s=t<=2;i&&s?(this.updateScore(),this.level++,this.audioSystem.clearAllSounds(),this.audioSystem.addAudio("audio/VictoryBig.mp3"),this.level>_.length-1?this.startLevelTransitionTimer(4,!1,()=>{this.endGame(!1)}):this.nextLevel()):this.handleCrashed(),this.handlingLanding=!1},this.updateScore=()=>{this.score+=this._player.fuelTime/_[this.level].padSize},this.nextLevel=()=>{this.startLevelTransitionTimer(4,!0,this.start)},this.handleCrashed=()=>{this.internalRender=this.crashRender,this.audioSystem.clearAllSounds(),this.audioSystem.addAudio("audio/Explosion4.mp3"),this.audioSystem.addAudio("audio/Debris3.mp3"),this.particleSystem.shipCrash(this._player.center,this.crashParticleParams),this.startLevelTransitionTimer(4,!1,()=>{this.endGame(!0)})},this.endGame=t=>{this.audioSystem.clearAllSounds(),this._onGameOver(this.score,t)},this.crashRender=t=>{this.drawBackground(t),t.drawPoints(this.createAllPoints(),"#414141","#a1a1a1",!0),this.drawLandingZones(t),this.particleSystemRenderer(t)},this.generateTerrain=()=>{const t=[];this.points=[],this.landingPoints=[];const e=u.nextRange(1024/2,1024*.95);t.push({x:0,y:e,isSafe:!1});const i=(l,c)=>{const d={x:l,y:c,isSafe:!0};t.push(d),this.landingPoints.push(d)},{numLandingPads:s,padSize:n}=_[this.level],r=g/s,h=g*.15;for(let l=0;l<s;l++){const c=l*r,d=c+r-n,m=u.nextRange(g/2,g*.95),y=u.nextRange(c+h,d);i(y,m),i(y+n,m)}const a=u.nextRange(g/2,g*.95);t.push({x:g,y:a,isSafe:!1});for(let l=0;l<t.length;l+=2){const c=this.recursiveTerrain(t[l],t[l+1],7);this.points=[...this.points,...c]}},this.startLevelTransitionTimer=(t,e,i)=>{this.internalUpdate=s=>{this.audioSystem.update(s),this.eventSystem.update(s),this.particleSystem.update(s)},e&&(this.internalRender=s=>{this.gameRender(s),s.drawText({x:100,y:100},`Next level in: ${t}`,0,"#fff")}),this.internalRotateLeft=()=>{},this.internalRotateRight=()=>{},this.internalThrust=()=>{},this.eventSystem.addEvent(1e3,t,()=>{t-=1,t<=0&&i()})}}set onGameOver(t){this._onGameOver=t}detectCollisions(){for(let t=0;t<this.points.length-1;t++){const e=this.points[t],i=this.points[t+1];if(Y(e,i,this._player.collisionShape)){this.handleCollision(e.isSafe&&i.isSafe);return}}}recursiveTerrain(t,e,i=3){if(i<=0)return[t,e];const s=Math.abs(e.x-t.x)/2+t.x,n=.4*u.nextGaussian(0,1)*Math.abs(e.x-t.x),r=.5*(t.y+e.y)+n,h={x:s,y:N(r,300,1024),isSafe:!1},a=this.recursiveTerrain(t,h,i-1),l=this.recursiveTerrain(h,e,i-1);return[...a,...l].filter((c,d,m)=>m.indexOf(c)===d)}}function S(o,t,e){return o.map((i,s)=>{const n=e.getFontHeight(i.style.font),r=e.getTextWidth(i.text,i.style.font);return{text:i.text,onSelect:i.onSelect,bounds:new E(e.middleX-r/2,t+150*s,r+20,n+30),style:i.style}})}function v(o,t){for(let e=0;e<o.length;e++)J(o[e],t)}function J(o,t){const{x:e,y:i,w:s,h:n}=o.bounds,{fillStyle:r,font:h}=o.style;t.drawRectangle(e,i,s,n,0,"black"),t.drawText({x:e+10,y:i+15},o.text,0,r,h)}const w=(o,t,e)=>{for(let i=0;i<t.length;i++)if(t[i].bounds.inBounds(T.getCursorPosition(e,o))){t[i].onSelect();return}},M=(o,t,e)=>{t.some(i=>i.bounds.inBounds(T.getCursorPosition(e,o)))?e.style.cursor="pointer":e.style.cursor=""};function A(o,t){for(var e=[],i=o.charCodeAt(0),s=t.charCodeAt(0);i<=s;++i)e.push(String.fromCharCode(i));return e}class Z{constructor(t,e,i){this.canvas=t,this.controls=e,this.onDoneCallback=i,this.previousTimeStamp=0,this.highScoreStorageKey="lunar-lander-high-scores",this.isGameOver=!1,this.userName="",this.gameModel=new q,this.audioSystem=new B,this.start=()=>{this.initializeKeyboard(),this.initializeMouse(),this.internalUpdate=this.gameModel.update,this.internalRender=this.gameRender,this.internalProcessInput=this.gameProcessInput,this.gameModel.start(),this.previousTimeStamp=performance.now(),requestAnimationFrame(this.gameLoop)},this.endAndReturnToMenu=()=>{this.isGameOver=!0,this.destroy(),this.onDoneCallback()},this.initializeMouse=()=>{this.internalMouseClick=()=>{},this.internalMouseMove=()=>{},this.mouse.register("click",s=>{this.internalMouseClick(s)}),this.mouse.register("mousemove",s=>{this.internalMouseMove(s)})},this.gameLoop=s=>{const n=s-this.previousTimeStamp;this.previousTimeStamp=s,this.processInput(n),this.update(n),this.render(),this.isGameOver||requestAnimationFrame(this.gameLoop)},this.processInput=s=>{this.internalProcessInput(s)},this.update=s=>{this.internalUpdate(s)},this.render=()=>{this.internalRender(this.cr)},this.destroy=()=>{var s;(s=this.controlsKeyboard)===null||s===void 0||s.destroy(),this.mouse.destroy(),this.gameModel.destroy(),this.audioSystem.destroy()},this.gameProcessInput=s=>{this.controlsKeyboard.process(s)},this.gameRender=s=>{this.cr.clear(),this.gameModel.render(this.cr)},this.gameOver=(s,n)=>{this.showGameOverScreen(s,n)},this.showGameOverScreen=(s,n)=>{this.internalProcessInput=this.gameOverProcessInput,this.internalUpdate=this.audioSystem.update,this.audioSystem.addAudio("audio/game_over.mp3",0,!0);const r={font:"32px arial",fillStyle:"#00aaff"},h="Game Over",a="64px arial",l=this.cr.getTextWidth(h,a);let c=[];const d=this.getHighScores();let m=s&&d.length===0||s&&d.length>0&&d.some(f=>f.score<s)||s&&d.length<5;const y=[{text:"Back to Menu",onSelect:()=>{s&&!n&&m&&this.addToHighScore(this.userName,s),this.endAndReturnToMenu()},style:r}];this.internalRender=f=>{this.cr.clear();const p={x:f.middleX-l/2,y:100};f.drawText(p,h,0,"#000",a);const C=(x,G="#000")=>{const F=f.getTextWidth(x,"32px arial");p.x=f.middleX-F/2,p.y+=100,f.drawText(p,x,0,G,"32px arial")};s&&!n?(C(`Score: ${s.toFixed(0)}`),m&&(C("New top 5 Score!","#00aaff"),C(this.userName===""?"<Type your name>":this.userName))):n&&C("You crashed!","#e03910"),c.length===0&&(p.y=850,c=S(y,p.y,f),this.internalMouseClick=x=>{w(x,c,this.canvas)},this.internalMouseMove=x=>{M(x,c,this.canvas)}),(s!==void 0&&!m||n||this.userName.length>0&&this.userName!=="")&&v(c,f)}},this.gameOverProcessInput=s=>{this.typingKeyboard.process(s),this.mouse.process()},this.getHighScores=()=>{const s=localStorage[this.highScoreStorageKey];return s?JSON.parse(s):[]},this.addToHighScore=(s,n)=>{let r=this.getHighScores();r.length>=5&&r.splice(0,1),r.push({username:s,score:parseInt(n.toFixed(0))}),r.sort((h,a)=>h.score<a.score?-1:h.score===a.score?0:1),localStorage[this.highScoreStorageKey]=JSON.stringify(r)},this.cr=new k(t),this.mouse=new T(t),this.gameModel.onGameOver=this.gameOver}play(){this.start()}initializeKeyboard(){this.controlsKeyboard=new b,this.controlsKeyboard.register(this.controls[0],this.gameModel.landerRotateLeft),this.controlsKeyboard.register(this.controls[1],this.gameModel.landerRotateRight),this.controlsKeyboard.register(this.controls[2],this.gameModel.landerThrust),this.typingKeyboard=new b(!0);const t=e=>{this.typingKeyboard.register(e,()=>{this.userName.length<20&&(this.userName+=e)})};A("a","z").forEach(t),A("A","Z").forEach(t),this.typingKeyboard.register("Backspace",()=>{this.userName.length>0?this.userName=this.userName.slice(0,this.userName.length-1):this.userName=""})}}class j{constructor(t){this.menuTitle="Lunar Lander",this.titleFont="120px arial",this.menuOptions=[],this.highScores=[],this.highScoreOptions=[],this.highScoreStorageKey="lunar-lander-high-scores",this.creditsItems=[],this.creditsOptions=[],this.creditsStartingY=850,this.controlOptions=[],this.textOptions=["Temp","Bemp","Zemp"],this.selectedControlOptionIndex=0,this.controlStartingY=300,this.listeningForKey=!1,this.controlsStorageKey="lunar-lander-controls",this.onGameFinished=()=>{this.start()},this.startAudio=()=>{this.bgAudio?this.bgAudio.currentTime=0:(this.bgAudio=new Audio("audio/menu.mp3"),this.bgAudio.loop=!0),this.bgAudio.play()},this.processInput=()=>{this.mouse.process()},this.menuLoop=()=>{this.cr.clear(),this.processInput(),this.render(),this.internalNextFrame()},this.nextFrame=()=>{requestAnimationFrame(this.menuLoop)},this.setMainMenuInternals=()=>{this.internalRender=this.mainMenuRender,this.internalMouseMove=this.mainMenuMouseMove,this.internalMouseClick=this.mainMenuMouseClick,this.internalNextFrame=this.nextFrame},this.mainMenuRender=()=>{v(this.menuOptions,this.cr),this.drawTitle(this.menuTitle,"rgba(255, 0, 0, 1)")},this.mainMenuMouseMove=e=>{M(e,this.menuOptions,this.canvas)},this.mainMenuMouseClick=e=>{w(e,this.menuOptions,this.canvas)},this.initMainOptions=()=>{const e={font:"64px arial",fillStyle:"rgba(255, 0, 0, 1)"},i=[{text:"New Game",onSelect:this.handleNewGame,style:e},{text:"High-scores",onSelect:this.setHighscoreInternals,style:e},{text:"Credits",onSelect:this.setCreditsInternals,style:e},{text:"Controls",onSelect:this.setControlsInternals,style:e}];this.menuOptions=S(i,300,this.cr)},this.handleNewGame=()=>{this.unsetInternals(),this.bgAudio.pause(),this.canvas.style.cursor="none",this.game=new Z(this.canvas,this.getControls(),this.onGameFinished),this.game.play()},this.unsetInternals=()=>{this.internalRender=()=>{},this.internalMouseMove=()=>{},this.internalMouseClick=()=>{},this.internalNextFrame=()=>{}},this.setHighscoreInternals=()=>{this.initHighscoreItems(),this.initHighscoreOptions(),this.internalRender=this.highScoreRender,this.internalMouseMove=this.highScoreMouseMove,this.internalMouseClick=this.highScoreMouseClick},this.initHighscoreItems=()=>{const e=localStorage[this.highScoreStorageKey];e?(this.highScores=JSON.parse(e),this.highScores.reverse()):this.highScores=[]},this.initHighscoreOptions=()=>{const e={font:"32px arial",fillStyle:"green"},i=[{text:"Back to Menu",onSelect:this.setMainMenuInternals,style:e}];this.highScoreOptions=S(i,this.creditsStartingY,this.cr)},this.highScoreRender=()=>{this.drawTitle("High-score","green"),this.cr.drawText({x:300,y:300},"(Username) : (Score)",0,"#000","32px arial");for(let e=0;e<this.highScores.length;e++){const{username:i,score:s}=this.highScores[e];this.cr.drawText({x:300,y:380+80*e},`${i} : ${s}`,0,"#000","32px arial")}v(this.highScoreOptions,this.cr)},this.highScoreMouseClick=e=>{w(e,this.highScoreOptions,this.canvas)},this.highScoreMouseMove=e=>{M(e,this.highScoreOptions,this.canvas)},this.setCreditsInternals=()=>{this.initCreditsTextItems(),this.initCreditsOptions(),this.internalRender=this.creditsRender,this.internalMouseMove=this.creditsMouseMove,this.internalMouseClick=this.creditsMouseClick},this.initCreditsTextItems=()=>{this.creditsItems=["All the credit goes to Matt Bishop.","One small step for Matt, one giant leap for Mattkind.","Thanks to Dizzy Crow for the lander image and sounds.","Assets used from Dizzy Crow are public domain CC0."]},this.initCreditsOptions=()=>{const e={font:"32px arial",fillStyle:"#aaaaff"},i=[{text:"Back to Menu",onSelect:this.setMainMenuInternals,style:e}];this.creditsOptions=S(i,this.creditsStartingY,this.cr)},this.creditsRender=()=>{this.drawTitle("Credits","#aaaaff");for(let e=0;e<this.creditsItems.length;e++)this.cr.drawText({x:120,y:300+80*e},this.creditsItems[e],0,"#000","32px arial");v(this.creditsOptions,this.cr)},this.creditsMouseClick=e=>{w(e,this.creditsOptions,this.canvas)},this.creditsMouseMove=e=>{M(e,this.creditsOptions,this.canvas)},this.setControlsInternals=()=>{this.initControlOptions(),this.internalRender=this.controlsRender,this.internalMouseMove=this.controlsMouseMove,this.internalMouseClick=this.controlsMouseClick},this.controlsRender=()=>{this.drawTitle("Controls","#00aaff"),v(this.controlOptions,this.cr)},this.controlsMouseClick=e=>{w(e,this.controlOptions,this.canvas)},this.controlsMouseMove=e=>{M(e,this.controlOptions,this.canvas)},this.getControls=()=>{const e=localStorage[this.controlsStorageKey];return e?JSON.parse(e):["ArrowLeft","ArrowRight","ArrowUp"]},this.initControlOptions=()=>{const e={font:"32px arial",fillStyle:"#00aaff"};this.listeningForKey||(this.textOptions=this.getControls());const i=[{text:`Rotate Left: ${this.textOptions[0]}`,onSelect:()=>{this.getKeyAndUpdateIndex(0)},style:e},{text:`Rotate Right: ${this.textOptions[1]}`,onSelect:()=>{this.getKeyAndUpdateIndex(1)},style:e},{text:`Thrust: ${this.textOptions[2]}`,onSelect:()=>{this.getKeyAndUpdateIndex(2)},style:e},{text:"Back to Menu",onSelect:()=>{this.stopListeningForKey(),this.setMainMenuInternals()},style:e}];this.controlOptions=S(i,this.controlStartingY,this.cr)},this.getKeyAndUpdateIndex=e=>{this.listeningForKey||(this.startListeningForKey(),this.selectedControlOptionIndex=e,this.textOptions[e]="Press a key",this.initControlOptions())},this.getNextKey=e=>{this.textOptions.indexOf(e.key)===-1?(this.stopListeningForKey(),this.textOptions[this.selectedControlOptionIndex]=e.key,localStorage[this.controlsStorageKey]=JSON.stringify(this.textOptions),this.initControlOptions()):alert(`The key '${e.key}' is already bound, press a different key.`)},this.startListeningForKey=()=>{this.listeningForKey=!0,window.addEventListener("keydown",this.getNextKey)},this.stopListeningForKey=()=>{this.listeningForKey=!1,window.removeEventListener("keydown",this.getNextKey)},this.canvas=document.getElementById(t),this.mouse=new T(this.canvas),this.cr=new k(this.canvas),this.initMainOptions()}main(){this.mouse.register("click",t=>{this.internalMouseClick(t)}),this.mouse.register("mousemove",t=>{this.canvas.style.cursor="",this.internalMouseMove(t)}),this.start()}start(){this.setMainMenuInternals(),this.startAudio(),requestAnimationFrame(this.menuLoop)}render(){this.internalRender()}drawTitle(t,e){const i=this.cr.getTextWidth(t,this.titleFont);this.cr.drawText({x:this.cr.middleX-i/2,y:100},t,0,e,this.titleFont)}}const Q=new j("game-canvas");Q.main();const O=document.getElementById("game-canvas");if(O===null)throw new Error("Helo!");const K=o=>{const{innerWidth:t,innerHeight:e}=o.target,i=(Math.min(t,e)-16).toString();O.style.width=i,O.style.height=i};window.addEventListener("resize",K);K({target:window});