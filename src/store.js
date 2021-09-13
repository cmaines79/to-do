import Project from "./project.js"
import ToDo from "./todo.js"

export default class Store {
    static getProjectCount() {
        let projectCount;
        if (localStorage.getItem('projectCount') === null) {
            projectCount = 1;
            this.setProjectCount(projectCount);
        } else {
            projectCount = parseInt(localStorage.projectCount);
        }
        return projectCount;
    }

    static setProjectCount(projectCount) {
        localStorage.projectCount = projectCount;
    }

    static getProjectList() {
        // let projectList = [];
        if(localStorage.getItem('projectList') === null) {
            // create a new projectList based upon default data
            var projectList = Project.addDefaultProjectList();

            // store list in localStorage
            this.setProjectList(projectList);

            // also need to increment project Count since we are creating a new project
            localStorage.projectCount = parseInt(localStorage.projectCount) + 1;

        } else {
            projectList = JSON.parse(localStorage.projectList);
            Project.alphaSort(projectList);
        }
        return projectList;
    }

    static setProjectList(projectList) {
        localStorage.projectList = JSON.stringify(projectList);
    }

    static getTaskList() {
        if(localStorage.getItem('taskList') === null) {
            // create a new taskList based upon default data
            var taskList = ToDo.addDefaultTask();

            // store list in localStorage
            this.setTaskList(taskList);

            // also need to increment task Count since we are creating a new task
            localStorage.taskCount = parseInt(localStorage.taskCount) + 1;
        
        } else {
            taskList = JSON.parse(localStorage.taskList);
            // ADD SORTING BY DUE DATE?
            // ADD SORTING BY IMPORTANCE?
            // ADD SORTING BY ALPHABETICAL?
            // ADD SORTING BY?
        }
        return taskList;
    }

    static setTaskList(taskList) {
        localStorage.taskList = JSON.stringify(taskList);
    }

    static getTaskCount() {
        let taskCount;
        if (localStorage.getItem('taskCount') === null) {
            // create a new taskCount object
            taskCount = 1;
            this.setTaskCount(taskCount);
        } else {
            taskCount = localStorage.taskCount;
        }
        return taskCount;
    }

    static setTaskCount(count) {
        localStorage.taskCount = count;
    }    
}