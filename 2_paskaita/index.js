const express = require('express');  //importuoja express
const cors = require('cors');   //importuoja cors
const app = express();   //sukuria express aplikacija
const PORT = 3004;  //nurodo port'a "uostas" kuriame bus paleista aplikacija

app.use(cors()); //panaudojame cors taisykles

app.get('/', (req, res) => {
    res.send('OK');
}
);

app.listen(PORT, () => {

    console.log(`Server listening at http://localhost:${PORT}`);
});