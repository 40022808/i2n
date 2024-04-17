const doc = {
    empsBody:document.querySelector("#empsBody"),
    addbutton:document.querySelector("#addbutton")
}
const state = {
    url: 'http://localhost:8000/employees'
}

doc.addbutton.addEventListener('click',()=>{
    console.log("mentés...")
    addEmployees()
})

function addEmployees() {
    fetch(state.url, {
        method:'Post',
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify({
            name: "Csoda Ernő",
            city: "Szeged",
            salary: 362})
    })
}



function getEmployees() {
    fetch(state.url)
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
                <button class="btn btn-danger">
                    Törlés
                </button>
            </td>
        `
        doc.empsBody.appendChild(tr)
        console.log(emp.city)
    });
}
getEmployees()
