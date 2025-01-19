let gameSeq = [];
let userSeq = [];
let btns = ['green','yellow','red','blue'];
let allbtn = document.querySelectorAll(".btn");
let h2 = document.querySelector("h2");


let started = false;
let level = 0;
document.addEventListener("keypress",function(){
    if(started == false){
       console.log("game start....");
        started = true;
    }
    levelUp();
});

function gameFlesh(btn){
    btn.classList.add("flesh");
    setTimeout(()=>{
        btn.classList.remove("flesh");
    },500);
};
function userFlash(btn){
    btn.classList.add("userFlesh");
    setTimeout(()=>{
        btn.classList.remove("userFlesh");
    },500);
};


function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*4);
    // let randIdx2 = Math.ceil(0 + Math.random()* 255);
    let randCol = btns[randIdx];
    let randbtn = document.querySelector(`.${randCol}`);
    gameSeq.push(randCol);
    console.log(gameSeq);
    gameFlesh(randbtn);
    
}

function chekedAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
      if(userSeq.length === gameSeq.length){
        setTimeout(levelUp,1000);
      }
    }else{
        h2.innerHTML = `Game Over....Your score was ${level-1} <br>press any key ot start....`;
        let body = document.querySelector("body");
        body.style.backgroundColor = "red";
        setTimeout(()=>{
        body.style.backgroundColor = "white";
    },200);
    // let highScore = gameSeq.length;
    // console.log(highScore);
 
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    chekedAns(userSeq.length - 1);

}

for( btn of allbtn){
    btn.addEventListener("click",btnPress)
}

function reset(){
    gameSeq = [];
    level = 0;
    userSeq = [];
    started = false;
  
}







