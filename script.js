
const form = document.getElementById("studentForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const courseInput = document.getElementById("course");

const submitBtn = document.getElementById("submitBtn");
const studentList = document.getElementById("studentList");

let students = [];
let editIndex = -1;

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const student = {
        name: nameInput.value,
        email: emailInput.value,
        course: courseInput.value
    };

    if (editIndex === -1) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = -1;
        submitBtn.textContent = "Submit";
    }

    form.reset();
    showStudents();
});

function showStudents() {
    studentList.innerHTML = "";

    students.forEach(function(student, index) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td></td>
            <td></td>
            <td></td>
            <td><button class="editBtn">Edit</button></td>
            <td><button class="deleteBtn">Delete</button></td>
        `;

        row.cells[0].textContent = student.name;
        row.cells[1].textContent = student.email;
        row.cells[2].textContent = student.course;

        row.querySelector(".editBtn").addEventListener("click", function() {
            nameInput.value = student.name;
            emailInput.value = student.email;
            courseInput.value = student.course;

            editIndex = index;
            submitBtn.textContent = "Update";
        });

        row.querySelector(".deleteBtn").addEventListener("click", function() {
            students.splice(index, 1);

            if (editIndex === index) {
                editIndex = -1;
                form.reset();
                submitBtn.textContent = "Submit";
            } else if (editIndex > index) {
                editIndex--;
            }

            showStudents();
        });

        studentList.appendChild(row);
    });
}
