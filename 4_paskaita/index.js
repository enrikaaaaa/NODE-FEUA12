const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const URI = 'mongodb+srv://admin:admin@cluster0.paziki4.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(URI);
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Labas  :D');
});

app.get('/', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('demo1').collection('cars').find().toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
  return res.send('Labas');
});
app.post('/', async (re, res) => {
  try {
    const con = await client.connect();
    const dbRes = await con
      .db('demo1')
      .collection('cars')
      .insertOne({ name: 'Petras', surname: 'Slekys' });
    await con.close();
    return res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
  return res.send('Labas');
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
