const body = document.querySelector('body');
const renderPets = (pets) => {
    const table = document.getElementById('table');
    table.innerHTML = '';

    const headerRow = document.createElement('tr');
    const headerName = document.createElement('th');
    headerName.textContent = 'Name';
    headerRow.appendChild(headerName);

    const headerType = document.createElement('th');
    headerType.textContent = 'Type';
    headerRow.appendChild(headerType);

    const headerAge = document.createElement('th');
    headerAge.textContent = 'Age';
    headerRow.appendChild(headerAge);

    table.appendChild(headerRow);

    pets.forEach((pet) => {
        const row = document.createElement('tr');

        const cellName = document.createElement('td');
        cellName.textContent = pet.name;
        row.appendChild(cellName);

        const cellType = document.createElement('td');
        cellType.textContent = pet.type;
        row.appendChild(cellType);

        const cellAge = document.createElement('td');
        cellAge.textContent = pet.age;
        row.appendChild(cellAge);

        table.appendChild(row);

        cellName.addEventListener('mouseover', () => {
            cellName.style.backgroundColor = 'grey';
        });
        cellName.addEventListener('mouseout', () => {
            cellName.style.backgroundColor = 'transparent';
        });
    });
};
const addPet = document.getElementById('button');
addPet.addEventListener('click', () => {
        window.location.href = 'Add.html';
});

const dogButton = document.getElementById('dogButton');
dogButton.addEventListener('click', () => {
        fetch('http://localhost:3010/pets/dog')
        .then((response) => response.json())
        .then((data) => {
                renderPets(data);
        })
        .catch((error) => console.error(error));
});

const catButton = document.getElementById('catButton');
catButton.addEventListener('click', () => {
        fetch('http://localhost:3010/pets/cat')
        .then((response) => response.json())
        .then((data) => {
                renderPets(data);
        })
        .catch((error) => console.error(error));
});

const bunnyButton = document.getElementById('bunnyButton');
bunnyButton.addEventListener('click', () => {
        fetch('http://localhost:3010/pets/bunny')
        .then((response) => response.json())
        .then((data) => {
                renderPets(data);
        })
        .catch((error) => console.error(error));
});




fetch('http://localhost:3010/pets')
        .then((response) => response.json())
        .then((data) => {
                renderPets(data);
        })
        .catch((error) => console.error(error));