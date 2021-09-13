import DOM from './dom.js';
import Store from './store.js'

export default class Project {
    constructor(id, projectName) {
        this.projectID = id;
        this.projectName = projectName;
    } 

    static addDefaultProjectList() {
        // add new project to the array
        var project = new Project('project1', 'Sample Project');
        var projectList = [];
        projectList.push(project);

        return projectList;
    }

    static addNewProject() {
        const newProjectName = document.getElementById('new-project-name');
        var projectList = Store.getProjectList();

        // add anew project to the array
        var project = 'project' + String(Store.getProjectCount());
        project = new Project(project, newProjectName.value);
        projectList.push(project);

        // CREATE FOUCS ON THE NEWLY CREATED PROJECT!!!!
        // CREATE FOUCS ON THE NEWLY CREATED PROJECT!!!!
        // CREATE FOUCS ON THE NEWLY CREATED PROJECT!!!!
        // CREATE FOUCS ON THE NEWLY CREATED PROJECT!!!!
        // CREATE FOUCS ON THE NEWLY CREATED PROJECT!!!!
        // CREATE FOUCS ON THE NEWLY CREATED PROJECT!!!!

        // update localStorage variables
        Store.setProjectList(projectList);
        localStorage.projectCount = parseInt(localStorage.projectCount) + 1;

        //hide the new Project list within the GUI
        DOM.newProjectDivDispaly('hide');

        // sort & redraw project GUI
        this.alphaSort(projectList);
        DOM.redrawProjectList();
    }

    static deleteProject(target) {
        var projectList = Store.getProjectList();
        
        // loop through the projectList array and find the item to delete
        for (let i = 0; i < projectList.length; i++) {
            if (projectList[i].projectID == target) {
                projectList.splice(i, 1);
                break;
            }
        }

        // update localStorage variables
        Store.setProjectList(projectList);

        // go back to the default Project List in the GUI
        var titleH1El = document.getElementById('titleH1');
        titleH1El.innterText = 'inbox';
        document.getElementById('inbox').classList.add('active-nav');
        
        // sort & redraw proejct list GUI
        this.alphaSort(projectList);
        DOM.redrawProjectList(projectList);

        location.reload();
    }

    static alphaSort(arr) {
        arr.sort(function(x, y) {
            if(x.projectName < y.projectName) {return -1};
            if(x.projectName > y.projectName) {return 1};
            return 0;
        });
    }

    static ProjectManager(target) {
        const isButton = target.nodeName === 'BUTTON';

        if(isButton) {
            switch(target.id) {
                case 'new-project':
                    DOM.newProjectDivDispaly('show');
                    DOM.focusOnInput('new-project-name');
                    break;
                case 'cancel-btn':
                    DOM.newProjectDivDispaly('hide');
                    DOM.clearInputValue(document.getElementById('new-project-name'));
                    break;
                case 'add-btn':
                    this.addNewProject();
                    break;                   
            }
        }
    }
}
