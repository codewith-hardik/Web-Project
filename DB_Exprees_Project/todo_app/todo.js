// let todo = [];
// let req = prompt("Enter Your reqest:-");
// while(true){
//     if(req == "quit"){
//         console.log(`you quiting todo game`);
//         break;
//     }else if(req == 'list'){
//         console.log(`---------`);
//         for(let i = 0; i < todo.length; i++){
//             console.log(i,todo[i]);
//         }
//         console.log(`----------`);
//     }else if(req == 'add'){
//         let add = prompt(`add your todo task`);
//         todo.push(add);
//         console.log(`task add`);
//     }else if(req == 'delete'){
//         let del = prompt(`Enter your todo Index`);
//         todo.splice(del,1);
//         console.log("task deleted");
//     }else{
//        console.log(`wrong request`);
//     }
//     req = prompt("Enter Your reqest:-");
// }


// ***********todo app using DOM JavaScript............

// let writetask = document.getElementById("writetask");
// let addtaskbtn = document.getElementById("addtaskbtn");
// let tasklist = document.getElementById("tasklist");
// // let delbtn = document.querySelector(".deltask");
// let list = document.getElementsByClassName("list");

// addtaskbtn.addEventListener("click",(e)=>{
//     let task = document.createElement("li");
//     task.innerText = writetask.value;
//     tasklist.appendChild(task);
//    writetask.value = "";

//    let delbtn = document.createElement("button");
//    delbtn.innerHTML = "Delete";
//    delbtn.classList.add = "deltask";
//    task.appendChild(delbtn);

  
// });

// let delbtns = document.querySelectorAll(".deltask");

// tasklist.addEventListener("click", (e)=>{
//     if(e.target.nodeName = "BUTTON"){
//         let listItem = e.target.parentElement;
//         listItem.remove();
//     }

// });




// Chat GPT Code 

// JavaScript for ToDo App

document.addEventListener("DOMContentLoaded", () => {
    const addTaskBtn = document.getElementById("addtaskbtn");
    const writeTaskInput = document.getElementById("writetask");
    const taskList = document.getElementById("tasklist");
    
    // Function to add a new task
    const addTask = () => {
        const taskText = writeTaskInput.value.trim();
        if (taskText === "") {
            alert("Task cannot be empty!");
            return;
        }

        // Create a new list item
        const listItem = document.createElement("li");
        listItem.className = "list";

        // Add task text
        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;

        // Add delete button
        const deleteButton = document.createElement("button");
        deleteButton.className = "deltask";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            taskList.removeChild(listItem);
        });

        // Append elements to the list item
        listItem.appendChild(taskSpan);
        listItem.appendChild(deleteButton);

        // Add the list item to the task list
        taskList.appendChild(listItem);

        // Clear the input field
        writeTaskInput.value = "";
    };

    // Add event listener to the Add Task button
    addTaskBtn.addEventListener("click", addTask);

    // Allow pressing Enter to add a task
    writeTaskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });
});












