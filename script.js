import { addTask } from "./addTask.js";
export const tasks = {
    "All": [],
}

export let input = document.querySelector(".input");
let listcontainer = document.querySelector(".listcontainer");
let addbtn = document.querySelector(".add");
let categorylist = document.querySelector(".category-list");
let showcategory = document.querySelector(".show-category");
export let selectedCategory = "All";

let dropdown=document.querySelector("#dropdown");
let alltaskoption=document.createElement("option");
alltaskoption.textContent="All Tasks";
dropdown.append(alltaskoption);

/*setting up button named all to be displayed default in categories list */
let allbtn = document.createElement("button");
allbtn.textContent = "All Tasks";
categorylist.appendChild(allbtn);
allbtn.addEventListener("click", () => {
    showcategory.innerHTML = "";
    showcategory.innerHTML = allbtn.textContent;''
    selectedCategory = "All";
    showAllTasks(selectedCategory);
})


const allCategory = tasks.All; /* storing the All Category Array */


document.querySelector(".add").addEventListener("click", addTask);

export function showAllTasks(category = "All") {
    // document.querySelector(".add").addEventListener("click", addTask);
    listcontainer.innerHTML = "";

    let currentcategory = tasks[category];
    console.log(tasks);
    console.log(currentcategory);

    currentcategory.forEach((task, index) => {
        const taskdiv = document.createElement("div"); /* creating a div for each task added which will contain the added task as input field, an edit button to edit the task, a delete button created to delete the particular task */
        const taskdisplay = document.createElement("p");
        taskdisplay.textContent = task;

        const editbtn = document.createElement("button");  /* edit button to edit the task */
        // editbtn.textContent = "Edit";
        let editicon = document.createElement("i");
        editicon.classList.add("fa-regular", "fa-pen-to-square");
        editbtn.append(editicon);

        const deleteTaskbtn = document.createElement("button");  /* delete button to delete the particular task */
        let trashicon = document.createElement("i");
        trashicon.classList.add("fa-regular", "fa-trash-can");
        deleteTaskbtn.append(trashicon);

        taskdiv.append(taskdisplay, editbtn, deleteTaskbtn);
        listcontainer.appendChild(taskdiv);

        editbtn.addEventListener("click", () => {  /*this is the most important function here */
            input.value = task;
            addbtn.removeEventListener("click", addTask);
            addbtn.addEventListener("click", () => {
                const updatedvalue = input.value.trim();
                input.value = "";
                if (updatedvalue === "") {
                    alert("Task not edited");
                    return;
                }
                let indexofAllintasks = tasks["All"].indexOf(task);
                tasks.All[indexofAllintasks] = updatedvalue;

                if (category !== "All") {
                    tasks[category][index] = updatedvalue;
                }
                document.querySelector(".add").addEventListener("click", addTask);
                showAllTasks(category);
            }, { once: true });
        });

        /* when delete button clicked, at the index we will splice(remove element) the element and again call showAllTasks function and will display all tasks again */
        deleteTaskbtn.addEventListener("click", () => {
            let indexofAllintasks = tasks["All"].indexOf(task);
            tasks.All.splice(indexofAllintasks, 1);

            if (category !== "All") {
                tasks[category].splice(index, 1);
            } 
            showAllTasks(category);
        });
    });
}


showAllTasks();





/* category part */



document.querySelectorAll(".addbtn").forEach(button=>{
    button.addEventListener("click",()=>{
    let newCategory = document.querySelector("#input").value.trim();
    if(newCategory===""){
        newCategory = document.querySelector("#category-input").value.trim();
        document.querySelector("#category-input").value="";
    }
    document.querySelector("#input").value = "";
    tasks[newCategory] = []; /*added the new category as an key into the tasks json and initialized an empty array in frony of it */


    // selectedCategory = newCategory;

    let categorybtn = document.createElement("button");
    categorybtn.textContent = newCategory;
    categorylist.append(categorybtn);

    let dropdownoption=document.createElement("option");
    dropdownoption.textContent=newCategory;
    dropdown.append(dropdownoption);


    categorybtn.addEventListener("click", () => {
        selectedCategory = newCategory;
        showAllTasks(selectedCategory);
        showcategory.innerHTML = "";
        showcategory.innerHTML = newCategory;
    })
})
})

dropdown.addEventListener("change",()=>{
    let changedValue = dropdown.value;
    selectedCategory=changedValue==="All Tasks" ? "All":changedValue;
    showAllTasks(selectedCategory); // Updated to use selectedCategory
    showcategory.innerHTML = selectedCategory; // Updated variable name
})










