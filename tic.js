/* Randomize the first marker. */
var turn=Math.random()<1/2 ? 0 : 1;

/* Set unit size. */
var unit=100/11;

/* Create menu. */
var menu=document.createElement('div');
menu.style.position='fixed';
menu.style.top='50%';
menu.style.left='50%';
menu.style.height=9*unit+'vmin';
menu.style.width=9*unit+'vmin';
menu.style.transform='translate(-50%,-50%)';
menu.style.zIndex=9999;
menu.innerHTML='<a style=\'background:white;position:absolute;left:100%;cursor:pointer\' onClick=\'menu.remove()\'>exit</a>';
document.body.appendChild(menu);

/* Create board. */
var board=document.createElement('div');
board.style.background='rgba(255,255,255,0.9)';
board.style.position='absolute';
board.style.top=0;
board.style.left=0;
board.style.height=9*unit+'vmin';
board.style.width=9*unit+'vmin';
board.mark=null;
menu.appendChild(board);

/* Create macro and micro maps. */
BOXES=[];
boxes=[[],[],[],[],[],[],[],[],[]];

/* Fill the board. */
for(var i=0;i<3;i++){
	for(var j=0;j<3;j++){
		var BOX=document.createElement('div');				
		BOX.style.position='absolute';
		BOX.style.top=i*100/3+'%';
		BOX.style.left=j*100/3+'%';
		BOX.style.height=100/3+'%';
		BOX.style.width=100/3+'%';
		BOX.mark=null;
		
		for(var k=0;k<3;k++){
			for(var l=0;l<3;l++){
				var box=document.createElement('div');
				
				box.setAttribute('onMouseOver','this.style.background=\'rgba(0,0,0,0.25)\'');
				box.setAttribute('onMouseOut','this.style.background=\'transparent\'');
				box.setAttribute('onClick','pick(this)');
				
				box.style.position='absolute';
				box.style.top=k*100/3+'%';
				box.style.left=l*100/3+'%';
				box.style.height=100/3+'%';
				box.style.width=100/3+'%';
				
				box.macro=3*i+j;
				box.micro=3*k+l;
				box.mark=null;
				boxes[3*i+j].push(box);
				
				if(box.macro%2==0){
					box.style.boxShadow='0 0 1vmin black inset';
				}
				else{
					box.style.boxShadow='0 0 1vmin gray inset';
				}
				
				BOX.appendChild(box);
			}
		}
		BOXES.push(BOX);
		board.appendChild(BOX);
	}
}

/*
+---+---+---+
| 0 | 1 | 2 |
+---+---+---+
| 3 | 4 | 5 |
+---+---+---+
| 6 | 7 | 8 |
+---+---+---+
*/

/* Check for victories. */
function check(m){
	var checkmark=0;
	if(m[0].mark!=null){
		if((m[0].mark==m[1].mark && m[1].mark==m[2].mark) || (m[0].mark==m[3].mark && m[3].mark==m[6].mark)){
			checkmark=1;
		}
	}
	if(m[4].mark!=null){
		if((m[3].mark==m[4].mark && m[4].mark==m[5].mark) || (m[1].mark==m[4].mark && m[4].mark==m[7].mark) || (m[0].mark==m[4].mark && m[4].mark==m[8].mark) || (m[2].mark==m[4].mark && m[4].mark==m[6].mark)){
			checkmark=1;
		}
	}
	if(m[8].mark!=null){
		if((m[6].mark==m[7].mark && m[7].mark==m[8].mark) || (m[2].mark==m[5].mark && m[5].mark==m[8].mark)){
			checkmark=1;
		}
	}
	
	if(checkmark){
		marker(m[0].parentNode);
	}
	else{
		if(m[0].mark!=null && m[1].mark!=null && m[2].mark!=null && m[3].mark!=null && m[4].mark!=null && m[5].mark!=null && m[6].mark!=null && m[7].mark!=null && m[8].mark!=null){
			draw(m[0].parentNode);
		}
	}
}

/* Place a tied marker. */
function draw(obj){
	/* Disable the tied box. */
	obj.mark=2;
	disable(obj);
	obj.style.pointerEvents='none';
}

/* Place a marker. */
function marker(obj){
	/* Place an O. */
	if(turn==0){
		var o=document.createElement('div');
		o.style.boxSizing='border-box';
		o.style.position='absolute';
		o.style.top='10%';
		o.style.left='10%';
		o.style.height='80%';
		o.style.width='80%';
		/* Set O border size based on nested box level, because for some reason percentage isn't supported. */
		var inBOXES=0;
		for(var i=0;i<9;i++){
			if(obj==BOXES[i]){
				inBOXES=1;
				break;
			}
		}
		o.style.border=unit*(obj==board ? 9 : (inBOXES ? 3 : 1))/5+'vmin solid black';
		o.style.borderRadius='50%';
		obj.appendChild(o);
	}
	/* Place an X. */
	else{
		var x1=document.createElement('div');
		x1.style.boxSizing='border-box';
		x1.style.background='black';
		x1.style.position='absolute';
		x1.style.top='10%';
		x1.style.left='40%';
		x1.style.height='80%';
		x1.style.width='20%';
		x1.style.transform='rotate(45deg)';
		obj.appendChild(x1);
		var x2=x1.cloneNode();
		x2.style.transform='rotate(-45deg)';
		obj.appendChild(x2);
	}
	/* Mark the map and disable the marked box. */
	obj.mark=turn;
	disable(obj);
	obj.style.pointerEvents='none';
}

/* Do stuff to a box upon click. */
function pick(b){
	/* Mark box. */
	marker(b);
	
	/* Check victories. */
	check(boxes[b.macro]);
	check(BOXES);
	
	/* Pass turn to other player. */
	turn>0 ? turn=0 : turn=1;
	
	/* Enable next macro box if it isn't won. */
	if(BOXES[b.micro].mark==null){
		/* Disable all boxes. */
		for(i=0;i<9;i++){
			for(var j=0;j<9;j++){
				disable(boxes[i][j]);
			}
		}
		/* Enable next macro box. */
		for(i=0;i<9;i++){
			/* Forces won macro boxes to stay disabled. */
			if(board.mark==null){
				enable(boxes[b.micro][i]);
			}
		}
	}
	/* Enable all macro boxes if it's won. */
	else{
		for(i=0;i<9;i++){
			for(var j=0;j<9;j++){
				/* Forces won macro boxes to stay disabled. */
				if(board.mark==null){
					enable(boxes[i][j]);
				}
			}
		}
	}
	/* Forces won micro boxes to stay disabled. */
	disable(b);
}

/* Disables a box. */
function disable(b){
	b.style.background='rgba(0,0,0,0.25)';
	b.setAttribute('onMouseOver','');
	b.setAttribute('onMouseOut','');
	b.setAttribute('onClick','');
}

/* Enables a box. */
function enable(b){
	/* Forces won boxes to stay disabled. */
	if(b.mark==null){
		b.style.background='transparent';
	}
	b.setAttribute('onMouseOver','this.style.background=\'rgba(0,0,0,0.25)\'');
	b.setAttribute('onMouseOut','this.style.background=\'transparent\'');
	b.setAttribute('onClick','pick(this)');
}
