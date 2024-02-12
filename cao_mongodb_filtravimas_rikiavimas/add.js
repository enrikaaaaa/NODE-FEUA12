const viewAll = document.getElementById('viewAll');
const name = document.getElementById('name');
const age = document.getElementById('age');
const type = document.getElementById('type');
const submit = document.getElementById('submit');

viewAll.addEventListener('click', () => {
        window.location.href = 'index.html';
});

submit.addEventListener('click', () => {
        fetch('http://localhost:3010/pets', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                        name: name.value,
                        age: age.value,
                        type: type.value,
                }),
        })
        .then((response) => response.json())
        .then((data) => {
                window.location.href = 'index.html';
        })
        .catch((error) => console.error(error));
});