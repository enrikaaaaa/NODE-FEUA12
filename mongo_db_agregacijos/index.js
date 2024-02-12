const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const URI = process.env.MONGO_URI;
const client = new MongoClient(URI);
const app = express();
const PORT = process.env.PORT || 8081;
app.use(express.json());
app.use(cors());

app.get('/users', async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('agregacijos')
      .collection('users')
      .find()
      .toArray();
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.post('/users', async (req, res) => {
  try {
    await client.connect();
    const dbRes = await client
      .db('agregacijos')
      .collection('users')
      .insertOne(req.body);
    await client.close();
    return res.send(dbRes);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.get('/usersCount', async (req, res) => {
  try {
    await client.connect();
    const count = await client
      .db('agregacijos')
      .collection('users')
      .countDocuments();
    await client.close();
    return res.send({ count });
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.get('/usersCount/Jonas', async (req, res) => {
  try {
    await client.connect();
    const count = await client
      .db('agregacijos')
      .collection('users')
      .countDocuments({ name: 'Jonas' });
    await client.close();
    return res.send({ count });
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.get('/cities', async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('agregacijos')
      .collection('users')
      .distinct('city');
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.get('/lowestIncome', async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('agregacijos')
      .collection('users')
      .findOne({}, { sort: { income: 1 } });
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.get('/higestIncome', async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('agregacijos')
      .collection('users')
      .findOne({}, { sort: { income: -1 } });
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.get('/dynamicUsersCount/:name', async (req, res) => {
  try {
    await client.connect();
    const count = await client
      .db('agregacijos')
      .collection('users')
      .countDocuments({ name: req.params.name }); 
    await client.close();
    return res.send({ count });
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
