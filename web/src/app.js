const doc = {
    empsBody:document.querySelector("#empsBody"),
    addbutton:document.querySelector("#addbutton"),
    nameInput:document.querySelector("#nameInput"),
    cityInput:document.querySelector("#cityInput"),
    salaryInput:document.querySelector("#salaryInput")
}
const state = {
    host: 'http://localhost:8000',
    endpoint:'employees',
    name:'névtelen',
    city:'ismeretlen',
    salary:0
}

doc.addbutton.addEventListener('click',()=>{
    console.log("mentés...")
    setEmployeeState()
    addEmployees()
})

getEmployees()

function setEmployeeState() {
    if (doc.nameInput.value != "") {
        state.name = doc.nameInput.value      
    }
    if (doc.cityInput.value != "") {
        state.city = doc.cityInput.value
    }
    if (doc.salaryInput.value != "") {
        state.salary = doc.salaryInput.value
    }
    doc.nameInput.value = ""
    doc.cityInput.value = ""
    doc.salaryInput.value = ""
}

function addEmployees() {
    let url = state.host + '/' + state.endpoint
    fetch(url, {
        method:'Post',
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify({
            name: state.name,
            city: state.city,
            salary: state.salary})
    })
}



function getEmployees() {
    let url = state.host + '/' + state.endpoint
    fetch(url)
    .then((response)=> response.json())
    .then(result => {
        console.log(result)
        renderEmployees(result)
    })
}

function renderEmployees(empList) {

    empList.forEach(emp => {
        const tr = document.createElement("tr")
        tr.innerHTML = `
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.city}</td>
            <td>${emp.salary}</td>
            <td>
                <button class="btn btn-primary">
                    Szerkesztés
                </button>
                <button class="btn btn-danger" onclick="deleteEmployee(${emp.id})">
                    Törlés
                </button>
            </td>
        `
        doc.empsBody.appendChild(tr)
        console.log(emp.city)
    });
}

function deleteEmployee(id) {
    let url = state.host + '/' +
        state.endpoint +
        '/' + id
    console.log(url)
    fetch(url, {method:'Delete'})
}