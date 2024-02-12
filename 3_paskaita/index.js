const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3009;
app.use(express.json());
app.use(cors());

let users = [
    {id: 1, name: "Jonas", surname: "Jonaitis" ,role:`ADMIN`},
    {id: 2, name: "Petras", surname: "Petraitis", role:`MANAGER`}];

app.get('/', (req, res) => {
    res.send('Labas  :D');
});

//return all users
app.get('/users', (req, res) => {
    res.send(users);
});

//creates new user
app.post('/users', (req, res) => {
    const fakeId = users.length + 1;
    const user = {...req.body, id: fakeId}; ///creating new user with id
    if (user.name & user.surname & user.role) {
        users.push(user);  //returning new user
        res.send(users); //returning updated list
    } else {
        res.send({error: "Bad request"});
    }
    
});
//update existing user
app.put('/users/:id', (req, res) => {
    const id = +req.params.id;  //id yra stringas (ateina) pliusiukas pakeicia i skaiciu
const updatingUser = req.body;
// users = users.map((user) => user.id === id ? updatingUser : user); //jeigu userio id sutampa su id is url tai updatina useri
const foundIndex = users.findIndex((user) => user.id === id); //iesko userio pagal id
if(foundIndex === -1) {
users.splice(foundIndex, 1, updatingUser); //pakeicia useri pagal id
res.send(updatingUser);
}else {
    res.status(400).send({error: "User not found"});
}
}
);

app.delete('/users/:id', (req, res) => {
    const id = +req.params.id;
    
    const foundIndex = users.findIndex((user) => user.id === id); //iesko userio pagal id
    if(foundIndex === -1) {
        users.splice(foundIndex, 1);
        res.send({message: "User deleted"});
    } else {
        res.status(400).send({error: "User not found"});
    }
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});

