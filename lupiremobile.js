/* FUNCTIONS */
/* Choose random item from list. */
function choose(n){
	return n[Math.floor(Math.random()*(n.length))];
}

/* Choose random hex color, brightness range optional. */
function newHex(a,b){
	if(typeof a=='undefined'){a=0;}
	if(typeof b=='undefined'){b=16;}
	var digits=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
	var hex='#';
	for(var i=0;i<6;i++){
		hex+=choose(digits.slice(a,b));
	}
	return hex;
}

/* Choose random rgba color with given opacity, brightness range optional. */
function newByte(o,a,b){
	if(typeof a=='undefined'){a=0;}
	if(typeof b=='undefined'){b=256;}
	var digits=[];
	for(var i=0;i<256;i++){
		digits.push(i);
	}
	var byte='rgba(';
	for(i=0;i<3;i++){
		byte+=choose(digits.slice(a,b))+',';
	}
	byte+=o+')';
	return byte;
}

/* Generate an obstacle with a specified distribution. */
function newBlock(p){
	/* Group group[i] has blocks[i]. */
	var group=[0,1,2,2,3,3,3,3,4,4,5,5];
	var sample=[];
	for(var i=0;i<blocks.length;i++){
		for(var j=0;j<p[group[i]];j++){
			sample.push(blocks[i]);
		}
	}
	return choose(sample);
}

/* BLOCKS */
var blocks=[
	full={img:1, goto:[0,1,2,3]},
	
	empty={img:0, goto:[2,3,0,1]},
	
	bslash={img:1, goto:[1,0,3,2]},
	slash={img:0, goto:[3,2,1,0]},
	
	cornertr={img:[1,1,0,0], goto:[0,1,3,2]},
	cornerbr={img:[1,0,0,1], goto:[0,2,1,3]},
	cornerbl={img:[0,0,1,1], goto:[1,0,2,3]},
	cornertl={img:[0,1,1,0], goto:[3,1,2,0]},
	
	vpipe={img:[1,0,1,0], goto:[0,3,2,1]},
	hpipe={img:[0,1,0,1], goto:[2,1,0,3]},
	
	ccw={img:1, goto:[1,2,3,0]},
	cw={img:0, goto:[3,0,1,2]}
];

/* Stylesheet for spinners. */
var spinster=document.createElement('style');
spinster.textContent='@keyframes cwise{ from{transform:rotate(0deg);-webkit-transform:rotate(0deg);} to{transform:rotate(360deg);-webkit-transform:rotate(360deg);} }';
spinster.textContent+='@keyframes ccwise{ from{transform:rotate(360deg);-webkit-transform:rotate(360deg);} to{transform:rotate(0deg);-webkit-transform:rotate(0deg);} }';
document.body.appendChild(spinster);

/* SETTINGS */
var span=3;
var distribution=[0,2,1,0,0,0];
var VMIN=(innerWidth<innerHeight ? innerWidth : innerHeight);
var zoom=VMIN*3/4;
var unit=zoom/span;
var speed=0.1;

/* GAME BOARD */
var game=document.createElement('div');
game.style.position='fixed';
game.style.top='50%';
game.style.left='50%';
game.style.transform='translate(-50%,-50%)';
game.style.webkitTransform='translate(-50%,-50%)';
game.style.transition=speed+'s opacity';
game.style.zIndex='9999';

var compass;

var corners=document.getElementsByClassName('cornerBox');
var inners=document.getElementsByClassName('innerBox');
var rawEdges=document.getElementsByClassName('edgeBox');
var edges;

var goal;
var ball;

var lvl=1;
var pts=0;
var hp=15;

var board=document.createElement('div');
board.style.background='white';
board.style.textAlign='center';
board.style.position='fixed';
board.style.bottom=0;
board.style.left='50%';
board.style.transform='translateX(-50%)';
board.style.webkitTransform='translateX(-50%)';
board.style.transition=speed+'s opacity';
board.style.border='1px solid black';
board.style.padding='5px';
board.style.borderRadius='5px';
board.style.zIndex='9999';
document.body.appendChild(board);

var tab=' | ';

/* Refreshes game with new settings. */
function newGame(s,d,z,v){
	if(typeof s=='undefined'){s=span;}
	span=s;
	if(typeof d=='undefined'){d=distribution;}
	distribution=d;
	if(typeof z=='undefined'){z=zoom;}
	zoom=z;
	unit=zoom/span;
	if(typeof v=='undefined'){v=speed;}
	speed=v;
	
	/* Updates board. */
	board.style.opacity=1;
	board.textContent='Lives: '+hp+tab+'Points: '+pts+tab+'Level: '+(span-2)+tab+'Sublevel: '+lvl+'/'+(span-2);
	
	if(hp==0 || span==2){
		hide();
		disable();
		ball.remove();
		board.innerText+='\nGAME OVER';
		return 0;
	}
	
	/* Updates gameboard. */
	while(game.lastChild){
		game.removeChild(game.lastChild);
	}
	game.remove();
		
	game.style.background=newByte(3/4,64,192);
	game.style.height=zoom+'px';
	game.style.width=zoom+'px';
	game.style.borderRadius=1/2*unit+'px';
	game.style.opacity=1;
	document.body.appendChild(game);
	
	compass=newBoard();
		
	edges=[];
	for(i=0;i<rawEdges.length;i++){
		rawEdges[i].end=newPath(rawEdges[i].x,rawEdges[i].y);
		edges.push(rawEdges[i]);
	}
	edges.sort(function(a,b){ return a.end.steps-b.end.steps; })
	
	setTimeout(setUp,10000*speed*(1+span/10));
}

/* Starts game. */
function setUp(){
	goal=newGoal();
	ball=newBall(goal.x,goal.y);
	hide();
	enable();
}

/* Creates a new randomized gameboard. */
function newBoard(){
	var rcolor=newHex(0,8);
	var boxes=[];
	var map=[];
	for(var i=0;i<span;i++){
		boxes[i]=[];
		map[i]=[];
		for(var j=0;j<span;j++){
			/* Creates background grid. */
			var grid=document.createElement('div');
			grid.style.height=unit+'px';
			grid.style.width=unit+'px';
			grid.style.position='absolute';
			grid.style.top=i*unit+'px';
			grid.style.left=j*unit+'px';
			grid.style.boxSizing='border-box';
			grid.style.boxShadow='inset 0 0 3px '+game.style.backgroundColor;
			game.appendChild(grid);
			
			/* Creates obstacles. */
			var box=document.createElement('div');
			box.x=i;
			box.y=j;
			box.style.position='absolute';
			box.style.top=i*unit+'px';
			box.style.left=j*unit+'px';
			box.style.boxSizing='border-box';
			if((i==0 && j==0) || (i==0 && j==span-1) || (i==span-1 && j==span-1) || (i==span-1 && j==0)){
				/* Removes corner grids. */
				grid.remove();
				
				boxes[i][j]=blocks[0];
				map[i][j]='X';
				box.className='cornerBox';
				box.style.transition=speed+'s border-radius';
				
				/* Specifies function of each corner block. */
				if(i==0 && j==0){
					box.style.borderTopLeftRadius='50%';
					box.addEventListener('mouseover',function(){this.style.borderTopLeftRadius='25%'});
					box.addEventListener('mouseout',function(){this.style.borderTopLeftRadius='50%'});
					box.addEventListener('click',newGame);
				}
				else if(i==0 && j==span-1){
					var exit1=document.createElement('div');
					exit1.style.background='white';
					exit1.style.height=1/2*unit+'px';
					exit1.style.width=1/10*unit+'px';
					exit1.style.borderRadius=100/3+'%';
					exit1.style.position='absolute';
					exit1.style.top=1/4*unit+'px';
					exit1.style.left=9/20*unit+'px';
					exit1.style.transform='rotate(45deg)';
					exit1.style.webkitTransform='rotate(45deg)';
					box.appendChild(exit1);
					var exit2=exit1.cloneNode();
					exit2.style.transform='rotate(-45deg)';
					exit2.style.webkitTransform='rotate(-45deg)';
					box.appendChild(exit2);
					
					box.style.borderTopRightRadius='50%';
					box.addEventListener('mouseover',function(){this.style.borderTopRightRadius='25%'});
					box.addEventListener('mouseout',function(){this.style.borderTopRightRadius='50%'});
					box.addEventListener('click',function(){
						game.style.opacity=0;
						board.style.opacity=0;
						setTimeout(function(){
							game.remove();
							board.remove();
						},100);
					});
				}
				else if(i==span-1 && j==span-1){
					box.style.borderBottomRightRadius='50%';
					box.addEventListener('mouseover',function(){this.style.borderBottomRightRadius='25%'});
					box.addEventListener('mouseout',function(){this.style.borderBottomRightRadius='50%'});
					box.addEventListener('click',hide);
				}
				else if(i==span-1 && j==0){
					box.style.borderBottomLeftRadius='50%';
					box.addEventListener('mouseover',function(){this.style.borderBottomLeftRadius='25%'});
					box.addEventListener('mouseout',function(){this.style.borderBottomLeftRadius='50%'});
					box.addEventListener('click',show);
				}
			}
			else if(i==0 || i==span-1 || j==0 || j==span-1){
				/* Sets up edges. */
				if(i==0 || i==span-1){
					boxes[i][j]=blocks[8];
					map[i][j]=(i==0 ? [3,3,3,3] : [1,1,1,1]);
				}
				else if(j==0 || j==span-1){
					boxes[i][j]=blocks[9];
					map[i][j]=(j==0 ? [0,0,0,0] : [2,2,2,2]);
				}
				box.className='edgeBox';
				box.style.background='rgba(0,0,0,0.25)';
				box.style.transition=2*speed+'s background';
			}
			else{
				/* Sets up inner obstacles. */
				boxes[i][j]=newBlock(distribution);
				map[i][j]=boxes[i][j].goto;
				box.className='innerBox';
				box.style.borderRadius=100/3+'%';
				box.style.transition=2*speed+'s opacity';
			}
			
			/* Sets shorthand for boxes[i][j]. */
			var b=boxes[i][j];
			var color=box.className=='innerBox' ? 'white' : rcolor;
			
			/* Sets style for each type of block. */
			if(b==full || b==empty){
				box.style.background=(b.img ? color : 'transparent');
				box.style.height=unit+'px';
				box.style.width=unit+'px';
			}
			else if(b==bslash || b==slash){
				box.style.background=color;
				box.style.left=(j+2/5)*unit+'px';
				box.style.height=unit+'px';
				box.style.width=1/5*unit+'px';
				box.style.transform='rotate('+[45,-45][b.img]+'deg)';
				box.style.webkitTransform='rotate('+[45,-45][b.img]+'deg)';
			}
			else if(b==cornertr || b==cornerbr || b==cornerbl || b==cornertl){
				box.style.height=unit+'px';
				box.style.width=unit+'px';
				box.style.borderRight=1/2*unit+'px solid '+(b.img[0] ? color : 'transparent');
				box.style.borderTop=1/2*unit+'px solid '+(b.img[1] ? color : 'transparent');
				box.style.borderLeft=1/2*unit+'px solid '+(b.img[2] ? color : 'transparent');
				box.style.borderBottom=1/2*unit+'px solid '+(b.img[3] ? color : 'transparent');
			}
			else if(b==vpipe || b==hpipe){
				box.style.height=unit+'px';
				box.style.width=unit+'px';
				box.style.borderRight=1/5*unit+'px solid '+(b.img[0] ? color : 'transparent');
				box.style.borderTop=1/5*unit+'px solid '+(b.img[1] ? color : 'transparent');
				box.style.borderLeft=1/5*unit+'px solid '+(b.img[2] ? color : 'transparent');
				box.style.borderBottom=1/5*unit+'px solid '+(b.img[3] ? color : 'transparent');				
			}
			else if(b==ccw || b==cw){
				box.style.background=color;
				box.style.left=(j+2/5)*unit+'px';
				box.style.height=unit+'px';
				box.style.width=1/5*unit+'px';
				box.style.animation=['cwise','ccwise'][b.img]+' '+5*speed+'s infinite linear';
			}
			else{
				console.log('Error: Unknown block entered into display().');
			}
			game.appendChild(box);
		}
	}
	/* Returns course directions for each block. */
	return map;
}

/* Gives all edges their path information. */
function newPath(x,y,z,steps){
	if(typeof z=='undefined'){z=compass[x][y][0];}
	if(typeof steps=='undefined'){steps=0;}
	var to=compass[x][y][z];
	var next=[[0,1],[-1,0],[0,-1],[1,0]];
	x+=next[to][0];
	y+=next[to][1];
	if(x!=0 && x!=span-1 && y!=0 && y!=span-1){
		return newPath(x,y,(to+2)%4,(compass[x][y]==empty.goto ? steps+1 : steps+2));
	}
	else{
		return {x:x,y:y,steps:steps};
	}
}

/* BALL */
/* Creates a new ball at given coordinates. */
function newBall(x,y){
	var ball=document.createElement('div');
	ball.style.background='white';
	ball.style.position='absolute';
	ball.style.top=x*unit+'px';
	ball.style.left=y*unit+'px';
	ball.style.width=2/5*unit+'px';
	ball.style.height=2/5*unit+'px';
	ball.style.borderRadius='50%';
	ball.style.margin=3/10*unit+'px';
	ball.style.transition=speed+'s top, '+speed+'s left, '+speed+'s background';
	ball.style.transitionTimingFunction='linear';
	ball.style.pointerEvents='none';
	game.appendChild(ball);
	return ball;
}

/* Moves the ball to its path end, where it decides settings for the new gameboard. */
function move(h,k,x,y,z){
	if(typeof z=='undefined'){z=compass[x][y][0];}
	
	if(x>0 && x<span-1 && y>0 && y<span-1){
		getByXY(x,y).style.opacity=1;
	}
	
	var to=compass[x][y][z];
	var next=[[0,1],[-1,0],[0,-1],[1,0]];
	x+=next[to][0];
	y+=next[to][1];
	ball.style.top=unit*x+'px';
	ball.style.left=unit*y+'px';
	if(x!=0 && x!=span-1 && y!=0 && y!=span-1){
		setTimeout(function(){ move(h,k,x,y,(to+2)%4); },1000*speed);
	}
	else{
		/* If correct. */
		if(goal.end.x==h && goal.end.y==k){
			/* Make green. */
			for(var i=0;i<edges.length;i++){
				edges[i].style.background='rgba(0,128,0,0.5)';
			}
			ball.style.background='green';
			/* Heighten hp and lvl. */
			pts+=goal.end.steps;
			if(lvl==span-2){
				span++;
				lvl=1;
			}
			else{
				lvl++;
			}
		}
		/* If incorrect. */
		else{
			/* Make red. */
			for(var i=0;i<edges.length;i++){
				edges[i].style.background='rgba(128,0,0,0.5)';
			}
			ball.style.background='red';
			/* Lower hp and lvl. */
			hp--;
			if(span>3){
				if(lvl==1){
					span--;
					lvl=span-2;
				}
				else{
					lvl--;
				}
			}
		}
		/* End current gameboard. */
		setTimeout(show,10000*speed);
		setTimeout(newGame,20000*speed);
	}
}

/* Retrieves an inner block by its (x,y) coordinates. */
function getByXY(x,y){
for(var i=0;i<inners.length;i++){
	if(inners[i].x==x && inners[i].y==y){
		return inners[i];
	}
}
}

/* Hides all inner blocks. */
function hide(){
	for(var i=0;i<inners.length;i++){
		inners[i].style.opacity=0;
	}
}

/* Shows all inner blocks. */
function show(){
	for(var i=0;i<inners.length;i++){
		inners[i].style.opacity=1;
	}
}

/* Picks the ball starting point based on path length. */
function newGoal(){
	var goals={};
	for(var i=0;i<edges.length;i++){
		/*
		if(edges[i].end.steps>(Math.pow(span,2))/2){
			break;
		}
		*/
		if(goals[edges[i].end.steps]==undefined){
			goals[edges[i].end.steps]=[edges[i]];
		}
		else{
			goals[edges[i].end.steps].push(edges[i]);
		}
	}
	key=Object.keys(goals);
	return choose(goals[key[key.length-1]]);
	/* return choose(goals[key[Math.floor(key.length*lvl/(span-1))]]); */
}

/* Make edges clickable. */
function enable(){
	for(var i=0;i<edges.length;i++){
		edges[i].style.background='transparent';
		edges[i].addEventListener('mouseover',onmouseover);
		edges[i].addEventListener('mouseout',onmouseout);
		edges[i].addEventListener('click',guess);
	}
}

/* Remove edge clickability. */
function disable(){
	for(var i=0;i<edges.length;i++){
		edges[i].style.background='rgba(0,0,0,0.25)';
		edges[i].removeEventListener('mouseover',onmouseover);
		edges[i].removeEventListener('mouseout',onmouseout);
		edges[i].removeEventListener('click',guess);
	}
}

function onmouseover() {
	this.style.background='rgba(0,0,0,0.25)';
}

function onmouseout() {
	this.style.background='transparent';
}

/* Start the ball with your prospective destination. */
function guess(){
	disable();
	move(this.x,this.y,goal.x,goal.y);
}

/* Begin. */
newGame();
