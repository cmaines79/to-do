import DOM from "./dom.js"
import Project from "./project.js";
import Store from "./store.js"
import ToDo from "./todo.js";

// do startup things
document.addEventListener('DOMContentLoaded', () => {
    Store.getProjectCount();
    Store.getProjectList();
    Store.getTaskCount();
    Store.getTaskList();
    DOM.redrawProjectList();
    ToDo.findAllTasks();
});

// dynamic linking of the title to the active button (or project) and changing the calsses for .quick-access
document.querySelector('.quick-access').addEventListener('click', (e) => {
    const isButton = e.target.nodeName === 'BUTTON';
    if(isButton) {
        DOM.updateActiveClass(e.target.id);
        DOM.updateTitle(e.target.id);
        DOM.removeDeleteButton();
        DOM.removeAddTaskButton();
        // ADD REDRAWTASK BASED UPON THE REQ CRITERIA
    }
});

// dynamic linking of the title to the active button (or project) and changing classes for the Projects
document.getElementById('results').addEventListener('click', (e) => {
    const titleH1El = document.getElementById('titleH1');
    DOM.addDeleteButtion();
    DOM.addTaskButton();
    DOM.updateActiveClass(e.target.id);
    DOM.redrawTaskList(e.target.id);
    titleH1El.innerText = e.target.innerText;
});

// event listner for the creation of a new Project on mouse click
document.querySelector('.project').addEventListener('click', (e) => {
    Project.ProjectManager(e.target);
});

// event listner for the creation of a new Project on 'Enter
document.querySelector('.project').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        Project.ProjectManager(document.getElementById('add-btn'));    
    }
});

// event listener for the delete button click
document.getElementById('delete-list').addEventListener('click', (e) => {
    Project.deleteProject(document.querySelector('.active-nav').id);
});

// event listener for the creation of a new List on mouse click
document.querySelector('.list').addEventListener('click', (e) => {
    ToDo.taskManager(e.target);
});

// event listener for the creation of a new List on mouse click
document.querySelector('.list').addEventListener('input', (e) => {
    ToDo.updateDueDate(e.target);
});
