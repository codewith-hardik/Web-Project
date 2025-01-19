// const boxes = document.getElementsByClassName("box");
const boxes = document.querySelector(".container").children;


function getRandomColor(){

  

    let r = Math.ceil(0 + Math.random()* 255);         // 1 to 255
    // let r = Math.floor(Math.random()* 255);        0 to 255
    let g = Math.ceil(0 + Math.random()* 255);
    let b = Math.ceil(0 + Math.random()* 255);

    return `rgb(${r}, ${g}, ${b})`;
} 

Array.from(boxes).forEach(e=>{
    e.style.backgroundColor = getRandomColor();
})


