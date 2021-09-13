import DOM from "./dom.js";
import Store from "./store.js"

export default class ToDo {
    constructor (projectID, taskID, title, dueDate) {
        this.projectID = projectID;
        this.taskID = taskID;
        this.title = title;
        this.dueDate = dueDate;
        
        // add
            // description;
            // priority
            // notes
            // checklist
    }

    static addDefaultTask() {
        // add new task to the array
        var task = new ToDo('project1', 'task1', 'Sample Task', 'No Date');
        var taskList = [];
        taskList.push(task);

        return taskList;
    }

    static addNewTask() {
        const newTaskName = document.getElementById('new-task-name');
        const target = document.querySelector('.active-nav');
        var taskList = Store.getTaskList();

        // get the active Project List element
        var project = document.querySelector('.active-nav');

        // add a new task to the array
        var task = 'task' + String(Store.getTaskCount());
        task = new ToDo(project.id, task,newTaskName.value, 'No Date')
        taskList.push(task);

        // update localStorage variables
        Store.setTaskList(taskList);
        localStorage.taskCount = parseInt(localStorage.taskCount) + 1;

        // hide the new task list within the GUI
        DOM.newTaskDivDispaly('hide');

        // sort $ redraw
        DOM.redrawTaskList(target.id);
    }

    static updateDueDate(target) {
        const targetTask = target.parentElement.previousElementSibling.children[0].id
        const newDate = target.value;
        const activeProject = document.querySelector('.active-nav').id;
        
        // get taskList
        var taskList = Store.getTaskList();

        // update the array
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].taskID == targetTask) {
                taskList[i].dueDate = newDate;
            } 
        }

        // resave to localStorage
        Store.setTaskList(taskList);

        // redraw
        DOM.redrawTaskList(activeProject);
        
    }

    static taskManager(target) {
        const isButton = target.nodeName === 'BUTTON';
        const isP = target.nodeName === 'P';
        const isNoDate = target.classList.contains('no-date');
        const isHref = target.nodeName === 'A';

        // managing button clicks
        if(isButton) {
            switch(target.id) {
                case 'new-task':
                    DOM.newTaskDivDispaly('show');
                    DOM.focusOnInput('new-task-name');
                    break;
                case 'cancel-task':
                    DOM.newTaskDivDispaly('hide');
                    DOM.clearInputValue(document.getElementById('new-task-name'));
                case 'add-task':
                    this.addNewTask();
                    break;    
            }
        }

        // managing 'no date' clicks
        if(isP && isNoDate){
            // Which status are we in?  date picker or current date?
            if (target.classList.contains('no-date')) {
                DOM.showDatePicker(target);
            } else {
                console.log('false');
            }
        }

        if (isHref) {
            // get the taskList
            var taskList = Store.getTaskList();

            // get DOM Elements
            const elementToDelete = target.parentElement.previousElementSibling.children[0].id;
            const activeEl = document.querySelector('.active-nav');
            // need projectID

            console.log(activeEl);

            // for (let i = 0; i < taskList.length; i++) {
            //     if (taskList[i].taskID == elementToDelete) {
            //         taskList.slice(i, 1);
            //     }
            // }
            Store.setTaskList(taskList);     
            DOM.redrawTaskList(activeEl);
        }
    }

    static findTaskDueToday() {
        // get DOM elements
        const taskResultsEl = document.getElementById('task-results');

        // get current date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        // get the todolist variable from local storage
        var taskList = Store.getTaskList();

        // create a temp array to hold the matching values
        var tempArray = [];

        for (var i = 0; i < taskList.length; i++) {
            if (taskList[i].dueDate == today) {
                tempArray.push(taskList[i]);
            }
        }

        // populate the innerHTML for the list results
        var output = '';
        for (let i = 0; i < tempArray.length; i++) {
            
            output += `
            <button class="btn">
                <div class="res1">
                    <input type="radio" name="" id="${tempArray[i].taskID}">
                    <p>${tempArray[i].title}</p>
                </div>
                <div class="res2">
                    <input class="input-date-hidden" type="date" name="" id="">
                    <p class="no-date">${tempArray[i].dueDate}</p>
                    <a href="#">X</a>
                </div>
            </button>
            `;  
        }  
        taskResultsEl.innerHTML = output;
    }

    static findThisWeeksTasks() {
        // get DOM elements
        const taskResultsEl = document.getElementById('task-results');

        // get current date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        // get the date 7 days outs
        var endDate = new Date();
        var dd = String(endDate.getDate() + 7).padStart(2, '0');
        var mm = String(endDate.getMonth() + 1).padStart(2, '0');
        var yyyy = endDate.getFullYear();
        endDate = yyyy + '-' + mm + '-' + dd;
       
        // get the todolist variable from local storage
        var taskList = Store.getTaskList();

        // create a temp array to hold the matching values
        var tempArray = [];

        for (var i = 0; i < taskList.length; i++) {
            if (taskList[i].dueDate >= today && taskList[i].dueDate < endDate) {
                tempArray.push(taskList[i]);
            }
        }

        // populate the innerHTML for the list results
        var output = '';
        for (let i = 0; i < tempArray.length; i++) {
            
            output += `
            <button class="btn">
                <div class="res1">
                    <input type="radio" name="" id="${tempArray[i].taskID}">
                    <p>${tempArray[i].title}</p>
                </div>
                <div class="res2">
                    <input class="input-date-hidden" type="date" name="" id="">
                    <p class="no-date">${tempArray[i].dueDate}</p>
                    <a href="#">X</a>
                </div>
            </button>
            `;  
        }  
        taskResultsEl.innerHTML = output;
    }

    static findAllTasks() {
        // get DOM elements
        const taskResultsEl = document.getElementById('task-results');

        var taskList = Store.getTaskList();
        var output = '';
        for (let i = 0; i < taskList.length; i++) {
            
            output += `
            <button class="btn">
                <div class="res1">
                    <input type="radio" name="" id="${taskList[i].taskID}">
                    <p>${taskList[i].title}</p>
                </div>
                <div class="res2">
                    <input class="input-date-hidden" type="date" name="" id="">
                    <p class="no-date">${taskList[i].dueDate}</p>
                    <a href="#">X</a>
                </div>
            </button>
            `;  
        }  
        taskResultsEl.innerHTML = output;
    }
}