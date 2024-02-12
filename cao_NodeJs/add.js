const input_name = document.getElementById("name-input");
const input_surname = document.getElementById("surname-input");
const submit = document.getElementById("add-user-button");
const url = "http://localhost:3005/peoples";

submit.addEventListener("click", () => {
    const name = input_name.value;
    const surname = input_surname.value;
    const people = {name, surname};
    fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        }, 
        body:JSON.stringify({people})
        })
        input_name.value = "";
        input_surname.value = "";       
        window.location.href = "index.html";
    }
    );


