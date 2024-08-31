import {tasks} from "./script.js";
import { selectedCategory,input,showAllTasks } from "./script.js";

export function addTask() {
    // Extracting the text entered inside input field
    let task = input.value.trim();
    if (task == "") {
        alert("Enter a Task to add");
    }
    else if (tasks.All.includes(task)) {
        input.value = "";
        alert("Task is already assigned");
    }
    else {
        input.value = ""; /* after extracting value making input field empty */
        tasks.All.push(task); /* pushing the task entered into the All category to be displayed */

        if (selectedCategory !== "All") {
            tasks[selectedCategory].push(task);
        } 
        
        showAllTasks(selectedCategory);

    }
}