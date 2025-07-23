let h1=document.createElement('h1');
let h2=document.createElement('h2');
let container=document.createElement('div');
let subContainer1=document.createElement('div');
let subContainer2=document.createElement('div');
let red=document.createElement('div');
let green=document.createElement('div');
let orange=document.createElement('div');
let violet=document.createElement('div');
let scoreCard=document.createElement('h2');
let body=document.querySelector('body');
let score=0;

red.setAttribute('class', 'red btn' );
green.setAttribute('class', 'green btn' );
orange.setAttribute('class', 'orange btn' );
violet.setAttribute('class', 'violet btn' );
red.setAttribute('type', 'button');
green.setAttribute('type', 'button');
orange.setAttribute('type', 'button' );
violet.setAttribute('type', 'button' );
container.setAttribute('id', 'container');
subContainer1.setAttribute('class', 'subContainer');
subContainer2.setAttribute('class', 'subContainer');
subContainer1.setAttribute('id', 'subContainer1');
subContainer2.setAttribute('id', 'subContainer2');
h1.innerText='Simon Game'
h2.innerText='Press any key to start the game';
scoreCard.innerText=`Score: ${score}`;

subContainer1.append(red);
subContainer1.append(green);
subContainer2.append(orange);
subContainer2.append(violet);
container.append(subContainer1);
container.append(subContainer2);
body.append(h1);
body.append(h2);
body.append(container);
body.append(scoreCard);



let level=0;
let gameStarted=false;
let gameSequence=[];
let userSequence=[];
let colors=['red', 'green', 'orange', 'violet'];

document.addEventListener('keypress', function() {
    if(gameStarted==false){
        gameStarted=true;
        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash');
    }, 1000);
}

function levelUp(){
    level++;
    h2.innerText=`Level ${level}`;
    let randIdx=Math.floor(Math.random()*4);
    let randColor=colors[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);

    btnFlash(randBtn);
    gameSequence.push(randColor);
    // console.log(gameSequence);
}

function gameOver(){
    level=0;
    gameSequence=[];
    userSequence=[];
    setTimeout(() => {
        h2.innerText='Press any key to start the game';
        body.style.backgroundColor='white';
    }, 2000);
    h2.innerText='GAME OVER';
    body.style.backgroundColor='red';
    gameStarted=false;
    
}

function btnPress(){
    let btn=this;
    let color=btn.classList[0];
    userSequence.push(color);
    btnFlash(btn);
    let currentIdx=userSequence.length-1;
    if(userSequence[currentIdx]===gameSequence[currentIdx]){
        if (userSequence.length === gameSequence.length) {
            setTimeout(levelUp, 1000); 
            scoreCard.innerText=`Score: ${score++}`;
            userSequence = [];
        }
    }else{
        gameOver();
    }

}

let allBtns=document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener('click', btnPress);
}

