import Store from "./store.js"
import ToDo from "./todo.js"

export default class DOM {
    static redrawProjectList() {
        const resultsEl = document.getElementById('results');
        var projectList = Store.getProjectList();
        let output = '';

        for (let i = 0; i < projectList.length; i++) {
            output += `
            <button id="${projectList[i].projectID}"
            class="btn">${projectList[i].projectName}</button>
            `;
        }
        resultsEl.innerHTML = output;
    }

    static redrawTaskList(match) {
        const taskResultsEl = document.getElementById('task-results');
        var taskList = Store.getTaskList();
        var tempList = [];
        let output = '';

        // find the tasks that match with the specified criteria
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].projectID == match) {
                tempList.push(taskList[i]);
            }
        }

        // populate the innerHTML for the list results
        for (let i = 0; i < tempList.length; i++) {
            
            output += `
            <button class="btn">
                <div class="res1">
                    <input type="radio" name="" id="${tempList[i].taskID}">
                    <p>${tempList[i].title}</p>
                </div>
                <div class="res2">
                    <input class="input-date-hidden" type="date" name="" id="">
                    <p class="no-date">${tempList[i].dueDate}</p>
                    <a href="#">X</a>
                </div>
            </button>
            `;
        }

        taskResultsEl.innerHTML = output;
    }

    static updateActiveClass(element) {
        document.querySelector('.active-nav').classList.remove('active-nav');
        document.getElementById(element).classList.add('active-nav');
    }

    static removeDeleteButton() {
        document.getElementById('delete-list').style.display = 'none';
    }

    static addDeleteButtion() {
        document.getElementById('delete-list').style.display = 'flex';
    }

    static removeAddTaskButton() {
        document.getElementById('new-task').style.display = 'hide';
    }

    static addTaskButton() {
        document.getElementById('new-task').style.display = 'flex';
    }

    static newProjectDivDispaly(option) {
        const newProjectDiv = document.querySelector('.new-project-div');

        if (option == 'show') {
            newProjectDiv.style.display = 'flex';
        } else if (option == 'hide') {
            newProjectDiv.style.display = 'none';
            this.clearInputValue(document.getElementById('new-project-name'));
        }
    }

    static newTaskDivDispaly(option) {
        const newTaskDiv = document.querySelector('.new-task-div');

        if (option == 'show') {
            newTaskDiv.style.display = 'flex';
        } else if (option == 'hide') {
            newTaskDiv.style.display = 'none';
            this.clearInputValue(document.getElementById('new-task-name'));
        }
    }

    static focusOnInput(element) {
        const input = document.getElementById(element);
        input.focus();
        input.select();
    }

    static clearInputValue(element) {
        element.value = '';
    }

    static updateTitle(title) {
        const titleEl1 = document.getElementById('titleH1');

        switch(title) {
            case 'inbox':
                ToDo.findAllTasks();
                break;
            case 'day':
                title = 'Today';
                ToDo.findTaskDueToday();
                break;
            case 'week':
                title = 'This Week';
                ToDo.findThisWeeksTasks();
                break;
        }
        titleEl1.innerText = title;
    }

    static showDatePicker(target) {
        target.classList.remove('no-date');
        target.classList.add('no-date-hidden');
        target.previousElementSibling.classList.remove('input-date-hidden');
        target.previousElementSibling.classList.add('input-date');
    }
}