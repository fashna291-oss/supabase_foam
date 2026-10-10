
const {createClient} = supabase;

const supabaseURL = 'https://ozbtwjgfboqlyqirqzng.supabase.co';
const supabaseKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96YnR3amdmYm9xbHlxaXJxem5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2MjY5MTAsImV4cCI6MjEwNzIwMjkxMH0.KjuDSwLug_RAzb3bfNPwMRrKUQmjnC6UutyQy3OFn6o';

const supabaseClient = createClient(supabaseURL, supabaseKEY)

const form = document.getElementById("studentForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const courseInput = document.getElementById("course");

const submitBtn = document.getElementById("submitBtn");
const studentList = document.getElementById("studentList");

let students = [];
let editId = null;

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const student = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        course: courseInput.value.trim()
    };

    let result;

    if(editId !== null){
        result = await supabaseClient
  .from('students')
  .update(student)
  .eq('id', editId)
    } else{
        result = await supabaseClient
  .from('students')
  .insert([student])

    }

  if(result.error){
    console.log(result. error)
    return;
  }

    

    form.reset();
    editId = null;
    submitBtn.textContent = "submit";

    showStudents();
});




 

async  function showStudents() {

        const { data: students, error } = await supabaseClient
        .from("students")
        .select("*")
        .order("id", { ascending: true });


        if(error){
            alert(error.message)
            return;
        }

    studentList.innerHTML = "";

    students.forEach(function(student) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td><button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button></td>
        `;

        row.cells[0].textContent = student.name;
        row.cells[1].textContent = student.email;
        row.cells[2].textContent = student.course;

        row.querySelector(".editBtn").addEventListener("click", function() {
            nameInput.value = student.name;
            emailInput.value = student.email;
            courseInput.value = student.course;

            editId = student.id;
            submitBtn.textContent = "Update";
        });

        row.querySelector(".deleteBtn").addEventListener("click", async function() {
            const confirmDelete = confirm("Do you want to delete this student")
            if(confirmDelete){
                const {error} = await supabaseClient
                .from("students")
                .delete()
                .eq("id", student.id)
            

            if(error){
                alert(error.message);
                return;
            }

            showStudents();
        }
        });

        studentList.appendChild(row);
    });
}

showStudents();