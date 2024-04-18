const doc = {
    empsBody:document.querySelector("#empsBody"),
    addbutton:document.querySelector("#addbutton"),
    exampleModalLabel:document.querySelector("#exampleModalLabel"),
    idInput:document.querySelector("#idInput"),
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
    setEmployeeState()
    addEmployees()
})

function abc() {
    doc.exampleModalLabel.textContent = "Hózzáadás"
    doc.idInput.value = ""
    doc.nameInput.value = ""
    doc.cityInput.value = ""
    doc.salaryInput.value = ""
}

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
    if (doc.idInput.value == "") {
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
    else if (doc.idInput.value != "") {
        szerkesztes(doc.idInput.value)
    }
}

function szerkesztes(id) {
    const url = state.host + '/' +
        state.endpoint +
        '/' + id
    fetch(url, {
        method:'PUT',
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
                <button class="btn btn-primary" data-id="${emp.id}" data-name="${emp.name}" data-city="${emp.city}" data-salary="${emp.salary}" onclick="updataEmployee(this)" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
    const url = state.host + '/' +
        state.endpoint +
        '/' + id
    fetch(url, {method:'Delete'})
}

function updataEmployee(source) {
    doc.exampleModalLabel.textContent = "Szerkesztés"
    const url = state.host + '/' +
        state.endpoint +
        '/' + source.dataset.id
    console.log(source.dataset.id)
    doc.idInput.value = source.dataset.id
    doc.nameInput.value = source.dataset.name
    doc.cityInput.value = source.dataset.city
    doc.salaryInput.value = source.dataset.salary
    
}