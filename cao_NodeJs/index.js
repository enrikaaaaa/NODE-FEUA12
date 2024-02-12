const table = document.getElementById("users-list");
const url = "http://localhost:3005/peoples";
const go = document.getElementById("go-to");

fetch(url).then((response) => response.json()).then((peoples) => {  //fetch'ina duomenis is url ir juos paverca i json
    peoples.forEach((people) => {  //ciklas kuris eina per visus duomenis
        const row = document.createElement("tr");  //sukuria eilute
        row.className = "row";
        const name = document.createElement("td");   //sukuria stulpeli
        name.className = "name";
        const surname = document.createElement("td");
        surname.className = "surname";
        name.innerText = people.name;  // irasineja duomenis i stulpeli
        surname.innerText = people.surname; 
        row.appendChild(name);  //i eilute ideda stulpeli
        row.appendChild(surname);
        table.appendChild(row);  //i lentele ideda eilute
    });
    }
    );

    go.addEventListener("click", () => {
    window.location.href = "./add.html"
    });