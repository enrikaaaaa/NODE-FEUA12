const express = require('express');  //importuoja express
const cors = require('cors');   //importuoja cors
const app = express();   //sukuria express aplikacija
const PORT = 3005;  //nurodo port'a "uostas" kuriame bus paleista aplikacija
app.use(express.json()); //leidzia naudoti json
app.use(cors()); //panaudojame cors taisykles

app.get('/', (req, res) => {
    res.send('OK');
}
);

const peoples = 
[
    {name:"Petras", surname:"Petraitis"},
    {name: "Jonas", surname:"Jonaitis"},
    {name:"Antanas", surname:"Antanaitis"}
];
app.get('/peoples', (req, res) => {  //gauna duomenis is peoples
    res.send(peoples);   //siuncia duomenis is peoples
}
);
app.post('/peoples', (req, res) => {   //sukuria nauja post'a
    const {people} = req.body;    //nurodo kad naujas post'as bus people
    peoples.push(people);   //ideda nauja post'a i people
    res.send(peoples);    //siuncia people
}
);
app.listen(PORT, () => {

    console.log(`Server listening at http://localhost:${PORT}`);
});