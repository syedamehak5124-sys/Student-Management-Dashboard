// 1. Array to hold student records globally
const studentsList = [];

// 2. JavaScript Constructor Function for Student Objects
function Student(name, age, course) {
    this.name = name;
    this.age = age;
    this.course = course;
    this.id = Date.now() + Math.random().toString(36).substr(2, 5); // Unique key

    // Object Method 1: Introduce Student
    this.introduce = function() {
        alert(`Hello! My name is ${this.name} and I am ${this.age} years old.`);
    };

    // Object Method 2: Show Course Details
    this.getCourseDetails = function() {
        alert(`${this.name} is deeply invested in learning "${this.course}".`);
    };
}

// 3. Form Submission Handler (Prevents refresh and creates records dynamically)
document.getElementById('student-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Page refresh ko rokne ke liye

    // Input values fetch karna
    const nameInput = document.getElementById('student-name');
    const ageInput = document.getElementById('student-age');
    const courseInput = document.getElementById('student-course');

    // Naya student object instantiate karna constructor ke through
    const newStudent = new Student(nameInput.value.trim(), ageInput.value, courseInput.value.trim());

    // Array mein push karna
    studentsList.push(newStudent);

    // UI render aur counter refresh karna
    renderStudents();
    updateCounter();

    // Form clear karna
    this.reset();
});

// 4. Function to Render Student Cards dynamically in UI
function renderStudents() {
    const container = document.getElementById('students-container');
    container.innerHTML = ''; // Pehle se mojood template clear karna

    studentsList.forEach((student) => {
        // Card wrapper structure
        const card = document.createElement('div');
        card.className = 'student-card';

        card.innerHTML = `
            <div class="student-info">
                <h4><i class="fa-solid fa-circle-user" style="color: #4f46e5; margin-right: 5px;"></i> ${student.name}</h4>
                <p><strong>Age:</strong> ${student.age}</p>
                <p><strong>Course:</strong> <span style="color: #4f46e5; font-weight:500;">${student.course}</span></p>
            </div>
            <div class="card-actions">
                <button class="btn-action btn-intro" data-id="${student.id}"><i class="fa-solid fa-bullhorn"></i> Greet</button>
                <button class="btn-action btn-course" data-id="${student.id}"><i class="fa-solid fa-circle-info"></i> Details</button>
            </div>
        `;

        container.appendChild(card);
    });

    // Action buttons ke events setup karna dynamic lists ke liye
    attachMethodEvents();
}

// 5. Function to link action buttons to Object Methods
function attachMethodEvents() {
    // Greet (Introduce) Button Event
    document.querySelectorAll('.btn-intro').forEach(button => {
        button.addEventListener('click', function() {
            const studentId = this.getAttribute('data-id');
            const targetStudent = studentsList.find(s => s.id === studentId);
            if (targetStudent) targetStudent.introduce(); // Object ka method call ho raha ha
        });
    });

    // Course Details Button Event
    document.querySelectorAll('.btn-course').forEach(button => {
        button.addEventListener('click', function() {
            const studentId = this.getAttribute('data-id');
            const targetStudent = studentsList.find(s => s.id === studentId);
            if (targetStudent) targetStudent.getCourseDetails(); // Object ka method call ho raha ha
        });
    });
}

// 6. Function to update Auto Counter
function updateCounter() {
    document.getElementById('student-counter').innerText = `Total: ${studentsList.length}`;
}

// 7. Live Feature 1: Digital Clock using setInterval()
setInterval(() => {
    const clockElement = document.getElementById('digital-clock');
    const now = new Date();
    clockElement.innerText = now.toLocaleTimeString();
}, 1000);

// 8. Live Feature 2: Study Timer using setInterval()
let totalSeconds = 0;
setInterval(() => {
    totalSeconds++;
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    document.getElementById('study-timer').innerText = `Study Session: ${minutes}m ${seconds}s`;
}, 1000);