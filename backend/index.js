const express = require('express');  //importuoja express
const cors = require('cors');   //importuoja cors
const app = express();   //sukuria express aplikacija
const PORT = 4001;      //nurodo port'a "uostas" kuriame bus paleista aplikacija
app.use(cors());
app.use(express.json()); //leidzia naudoti json

// app.get('/', (req, res) => {    //sukuria endpoint'a
//     res.send('Labas vakara');   //siuncia atsakyma
// }
// );

const users  = ["Alex" , "Rose" , "Meghan"];

app.get('/users', (req, res) => {
    res.send(users);   
});

// app.get('/users/:id', (req, res) => {
//     const id = req.params.id;  //paima id is url
//     if(id >= 0 && id < users.length) {    //tikrina ar id yra masyve pagal vartotoju skaiciu
//     const user = users[id];   //paima useri is masyvo pagal id
//     res.send(users[id]);//siuncia atsakyma jei randa useri
//     }else{
//         res.send("User not found"); // kitu atveju klaida
//     }    
// });

app.get('/users/:firstLetter', (req, res) => {
    const { firstLetter } = req.params; //paima raide is url FIRST LETTER DESTRUKTUROZAVIMAS NES PARAMS YRA OBJEKTAS
    // res.send(filteredUsers); //siuncia atsakyma
    console.log(firstLetter);

    
    const filteredUsers = users.filter((user) => user[0].toLowerCase() === firstLetter.toLowerCase());
    res.send(filteredUsers);
});


app.post('/users', (req, res) => {
    const {user} = req.body; //paima useri is body
    users.push(user); //ideda useri i masyva
    res.send(users); //siuncia atsakyma 
});
console.log(users);

app.listen(PORT, () => {    //paleidzia aplikacija
    console.log(`Example app listening at http://localhost:${PORT}`);  // pranesimas paleidimui
}   
);