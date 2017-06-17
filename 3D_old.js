javascript:
/* Control Panel */
function allNodes(cha,nge,n){
	for(i=0;i<document.getElementsByTagName("*").length;i++){
		document.getElementsByTagName("*")[i].style.transform='translateZ('+cha/n+'px) rotateX('+nge/n+'deg)';
	}
}
var panel=document.createElement("div");
panel.setAttribute("class","panel");
panel.innerHTML="
<br>Hello.<br>
<form onInput='allNodes(5*parseInt(NN.value),parseInt(RR.value)/10,n)'>
Depth<input type='range' id='NN' value='100'></input><br>
Droop<input type='range' id='RR' value='0'></input>
</form>
";
document.getElementsByTagName("html")[0].appendChild(panel);

/* Camera */
function three(event){
	var x=event.clientX;
	var y=event.clientY;
	var xx=(-Math.cos(Math.PI*y/innerHeight))*Math.PI/4;
	var yy=Math.cos(Math.PI*x/innerWidth)*Math.PI/4;
	document.getElementsByTagName("body")[0].style.transform="scale(0.66) perspective(1200px) rotateX("+xx+"rad) rotateY("+yy+"rad) translateX("+(yy*innerWidth/2)+"px) translateY("+(-xx*innerHeight/2)+"px) translateZ(100px)";
	document.getElementsByTagName("body")[0].style.transformOrigin=(innerWidth/2+pageXOffset)+"px "+(innerHeight/2+pageYOffset)+"px";
}

document.getElementsByTagName("html")[0].setAttribute("onMouseMove","three(event)");

/* Node Depth */
function deep(est){
	var i=0;
	var c=new Array();
	for(i=0;i<est.length;i++){
		c[i]=0;
		if(est[i].hasChildNodes()){
			c[i]+=deep(est[i].childNodes);
		}
		else{
			var p=est[i];
			while(p.nodeName!="BODY"){
				p=p.parentNode;
				c[i]++;
			}
		}
	}
	c.sort(function(a,b){return b-a;});
	return c[0];
}

/* Variables */
var n=deep(document.body.childNodes);
var N=500;
var R=0;

/* CSS */
var style=document.createElement("style");
var src="
*{
	transition:transform 1s;
	transform-style:preserve-3d;
	transform:translateZ("+N/(2*n)+"px) rotateX("+(-R/(2*n))+"deg);
	outline:1px dashed rgba(0,0,0,0.1);
	overflow:visible;
}
*:hover{
	transform:translateZ("+N/n+"px) rotateX("+(-R/n)+"deg);
	overflow:visible;
}
html{
	transform-style:flat;
	height:auto !important;
	width:auto !important;
}
body{
	transition:transform 0s,transform-origin 0.25s linear;
	transform:perspective(1200px) translateZ(100px);
	overflow:visible;
}
body:hover{
	transition:transform 0s,transform-origin 0.25s linear;
	transform:perspective(1200px) translateZ(100px);
	overflow:visible;
}
.panel{
	transition:all 0.25s;
	transform:translateZ(100px) !important;
	position:fixed;
	top:0;
	left:0;
	height:25px;
	width:25px;
	background:black;
	border-bottom-right-radius:100%;
	color:red;
	overflow:hidden;
}
.panel:hover{
	transition:all 0.5s;
	height:500px;
	width:250px;
	background:black;
	border:0;
	border-bottom-right-radius:10px;
}
.panel:before{
	transition:all 0.25s;
	transform:none;
	position:fixed;
	top:-7px;
	left:2px;
	content:'+';
	color:white;
	font-size:25px;
}
.panel:hover:before{
	transition:all 1s;
	position:fixed;
	top:0;
	left:225px;
	color:orange;
	transform:rotate(45deg);
	font-size:100px;
}
";
style.innerHTML=src;
document.body.appendChild(style);

/* Prevent Document Overwrite */
void(0);

//toDo{
	comments
	dialogueBox{
		toggleMosaic{
			storeStyles}
		perspective
		distanceHTML
		distancePopout{
			deepestNode}
		toggleSmartPopout{
			parentNode}
		toggleMouse
		toggleSecretEye{
			blink}
		hide
		exit}
	lowerHalf
	droop{
		fixBetter(gMail)}
	viewingFrustum
	pivotRepositioningSystem
	disappearingElements(beta)
	scrollSize
	smoothen{
		zoom
		everything}
}

javascript:
if(!window.ThreeDit){
	ThreeDit=function(a,b){
		function G(a){
			p=a.clientX+g.scrollLeft;
			q=a.clientY+g.scrollTop
		}
		function F(){
			var a=g.scrollLeft-t;
			var b=g.scrollTop-u;
			p=v=g.scrollLeft+r;
			q=w=g.scrollTop+s;
			n+=a;
			o+=b;
			x=v+l.clientLeft-e.pageXOffset;
			y=w+l.clientTop-e.pageYOffset;
			t=g.scrollLeft;u=g.scrollTop
		}
		function E(){
			r=e.innerWidth/2;
			s=e.innerHeight/2;
			p=v=g.scrollLeft+r;
			q=w=g.scrollTop+s;
			x=v+l.clientLeft-e.pageXOffset;
			y=w+l.clientTop-e.pageYOffset
		}
		function D(){
			n+=(p-n)*.05;o+=(q-o)*.05;
			var a=(n-v)/r*5;
			var b=-(o-w)/s*5;
			for(var e=0;e<d.length;e++){
				var f=d[e].node;
				var g=f;
				var h=0;
				var k=0;
				var l=d[e].z;
				f.style[i]=x-h+"px "+(y-k)+"px";
				f.style[j]="rotateY("+a+"deg) rotateX("+b+"deg)translate3d(0px,0px, "+l*c.zDepth+"px)"
			}
		}
		function C(){
			var a;
			for(var b=0;b<d.length;b++){
				d[b].node.style[j]="none"
			}
			delete d;
			d=[];
			A(g,0);
			d.push({node:g,z:0});
			d.sort(function h(a,b){return a.z-b.z});
			var c=0;
			var e=[c];
			d[0].z=c;
			for(var b=1;b<d.length;b++){
				e.push(c=d[b].z==d[b-1].z?c:c+1)
			}
			var f=e[e.length-1];
			for(var b=0;b<d.length;b++){
				d[b].z=e[b]/f}
			}
			function B(a){
				c.perspective=a;
				k[h+"Perspective"]=c.perspective+"px"
			}
			function A(a,b,e){
				if(d.length>=c.maxElems-1)
					return;
				if(!e&&a.tagName=="DIV"&&a.childNodes.length>0){
					d.push({node:a,z:b})
				}
				for(var f=0;f<a.childNodes.length;f++){
					A(a.childNodes[f],b+1,a.childNodes.length<2)
				}
			}
			function z(a){
				f=a;
				g=f.body;
				h="webkitTransform"in g.style?"webkit":"MozTransform"in g.style?"Moz":null;
				i=h+"TransformOrigin";
				j=h+"Transform";
				l=f.documentElement;
				k=l.style;
				m=e.getComputedStyle;
				t=g.scrollLeft;
				u=g.scrollTop;
				k[h+"Perspective"]=c.perspective+"px";k.backgroundImage=m(g).getPropertyValue("background-image");
				k.backgroundColor=m(g).getPropertyValue("background-color");
				C();
				if(!c.initialized){
					E();
					n=p;
					o=q;
					e.addEventListener("resize",E);
					e.addEventListener("scroll",F);
					f.addEventListener("mousemove",G);
					setInterval(D,1e3/60)
				}
				c.initialized=true
			}
			var c={zDepth:300,maxElems:100,perspective:500,initialized:false};
			var d=[];
			var e=a;
			var f=b;
			c.init=z;
			c.recollectElems=C;
			c.render=D;
			c.changePerspective=B;
			return c
		}
		(window,document);
		ThreeDit.init(document);
	}
	else{
		ThreeDit.recollectElems();
	}
	
javascript:
var style=document.createElement("style");
var src="
*{
	transition:color 0.25s,text-shadow 0.25s;
	font-weight:bold;
	text-shadow:0 0 rgba(0,255,255,0.5),0 0 rgba(255,0,0,0.5);
}
*:hover{
	color:rgba(0,0,0,0);
	text-shadow:10px 0 rgba(0,255,255,0.5),-10px 0 rgba(255,0,0,0.5);
}
";
style.innerHTML=src;
document.body.appendChild(style);

void(0);


/* Surface Node Amount */
javascript:
alert(document.body.childNodes.length);

/* Node Amount */
javascript:
function deep(est){
	var i=0;
	var n=0;
	for(i=0;i<est.length;i++){
		n++;
		if(est[i].hasChildNodes()){
			n+=deep(est[i].childNodes);
		}
	}
	return n;
}
alert(deep(document.body.childNodes));

/* Deepest Node */
javascript:
function deep(est){
	var i=0;
	var c=new Array();
	for(i=0;i<est.length;i++){
		c[i]=0;
		if(est[i].hasChildNodes()){
			c[i]+=deep(est[i].childNodes);
		}
		else{
			var p=est[i];
			console.log(p);
			while(p.nodeName!="BODY"){
				p=p.parentNode;
				c[i]++;
			}
		}
	}
	c.sort(function(a,b){return b-a;});
	return c[0];
}
alert(deep(document.body.childNodes));
