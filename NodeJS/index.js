const express = require('express');  //importuoja express
const cors = require('cors');   //importuoja cors
const app = express();   //sukuria express aplikacija
const PORT = 3003;  //nurodo port'a "uostas" kuriame bus paleista aplikacija

app.use(cors()); //panaudojame cors taisykles

app.get('/', (req, res) => { 
    res.send('OK');
}
);

const brandsList = ["BMW", "VW", "Porsche"];

app.get('/brands', (req, res) => {
   
    res.json(brandsList);
});

// app.use(express.static('public'));

app.listen(PORT, () => {

    console.log(`Server listening at http://localhost:${PORT}`);
});
