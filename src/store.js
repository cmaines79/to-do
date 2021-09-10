import Project from "./project.js"

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
}