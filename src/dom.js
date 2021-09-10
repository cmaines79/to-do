import Store from "./store.js"

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

    static newProjectDivDispaly(option) {
        const newProjectDiv = document.querySelector('.new-project-div');

        if (option == 'show') {
            newProjectDiv.style.display = 'flex';
        } else if (option == 'hide') {
            newProjectDiv.style.display = 'none';
            this.clearInputValue(document.getElementById('new-project-name'));
        }
    }

    static focusOnInput() {
        const input = document.getElementById('new-project-name');
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
                break;
            case 'day':
                title = 'Today';
                break;
            case 'week':
                title = 'This Week';
                break;
        }
        titleEl1.innerText = title;
    }
}