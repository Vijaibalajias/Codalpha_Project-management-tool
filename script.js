let currentUser = null; // To store logged-in user info
let darkMode = false;

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        // For the sake of this prototype, mock the login
        currentUser = { username, role: 'Project Manager' };
        document.getElementById('logged-in-user').textContent = username;
        document.getElementById('user-role').textContent = 'Project Manager';

        // Hide login form, show main content
        document.querySelector('main').style.display = 'block';
        document.getElementById('login-section').style.display = 'none';
    }
});

// Project array to store all projects
let projects = [];

// Function to add a new project
function addProject(name, description) {
    const project = {
        name: name,
        description: description,
        tasks: []
    };
    projects.push(project);
    renderProjects();
}

// Function to render all projects in the DOM
function renderProjects() {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = ''; // Clear existing projects

    projects.forEach((project, projectIndex) => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');

        // Project name and description
        const projectTitle = document.createElement('h3');
        projectTitle.textContent = project.name;
        projectCard.appendChild(projectTitle);

        const projectDescription = document.createElement('p');
        projectDescription.textContent = project.description;
        projectCard.appendChild(projectDescription);

        // Task list
        const taskList = document.createElement('div');
        taskList.classList.add('task-list');

        project.tasks.forEach((task, taskIndex) => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.innerHTML = `<p><strong>${task.title}:</strong> ${task.description} | Due: ${task.dueDate}</p>`;

            // Comment Section
            const commentSection = document.createElement('div');
            commentSection.classList.add('comment-section');
            const commentInput = document.createElement('input');
            commentInput.setAttribute('type', 'text');
            commentInput.setAttribute('placeholder', 'Add a comment...');
            const commentButton = document.createElement('button');
            commentButton.textContent = 'Post';
            commentButton.addEventListener('click', () => {
                const commentText = commentInput.value;
                if (commentText) {
                    const comment = document.createElement('p');
                    comment.textContent = commentText;
                    commentSection.appendChild(comment);
                    commentInput.value = '';
                }
            });
            commentSection.appendChild(commentInput);
            commentSection.appendChild(commentButton);
            taskDiv.appendChild(commentSection);

            taskList.appendChild(taskDiv);
        });

        projectCard.appendChild(taskList);

        // Add task form
        const taskForm = document.createElement('form');
        taskForm.innerHTML = `
            <input type="text" placeholder="Task Title" required>
            <input type="date" placeholder="Due Date" required>
            <button type="submit">Add Task</button>
        `;
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const taskTitle = taskForm.querySelector('input[type="text"]').value;
            const taskDueDate = taskForm.querySelector('input[type="date"]').value;
            projects[projectIndex].tasks.push({ title: taskTitle, description: '', dueDate: taskDueDate });
            renderProjects();
        });

        projectCard.appendChild(taskForm);
        projectList.appendChild(projectCard);
    });
}

// Handle project creation
document.getElementById('project-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const projectName = document.getElementById('project-name').value;
    const projectDescription = document.getElementById('project-description').value;
    addProject(projectName, projectDescription);
    document.getElementById('project-name').value = '';
    document.getElementById('project-description').value = '';
});

// Dark mode toggle
document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    darkMode = !darkMode;
    if (darkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});
