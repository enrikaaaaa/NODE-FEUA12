const express = require('express');  //importuoja express
const app = express();   //sukuria express aplikacija
const PORT = 3000;      //nurodo port'a "uostas" kuriame bus paleista aplikacija

app.get('/', (req, res) => {    //sukuria endpoint'a
    res.send('Hello World!');   //siuncia atsakyma
}
);

const cars = ["Audi", "BMW", "VW", "Mercedes"];
const students = [{id: 1, name: "Jonas", age:10}, {id: 2, name: "Petras", age:10}];

app.get('/cars', (req, res) => {
    res.send(cars); 
}
);

app.get('/students', (req, res) => {    //sukuria endpoint'a
    res.send(students);   //siuncia atsakyma
}
);
app.listen(PORT, () => {    //paleidzia aplikacija
    console.log(`Example app listening at http://localhost:${PORT}`);  //atspausdina pranesima
}
);



