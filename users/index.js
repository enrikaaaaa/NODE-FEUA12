const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const URI =
  'mongodb+srv://admin:admin@cluster0.paziki4.mongodb.net/7pamoka?retryWrites=true&w=majority';
const client = new MongoClient(URI);
const app = express();
const PORT = process.env.PORT || 8081;
app.use(express.json());
app.use(cors());
require('dotenv').config();
const url = 'https://jsonplaceholder.typicode.com/users';

app.get('/users', async (req, res) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    await client.connect();
    const dbRes = await client.db('users').collection('user').insertMany(data);
    await client.close();
    return res.send(dbRes);
  } catch (err) {
    return res.status(500).send({ err });
  }
});
app.get('/', async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('users')
      .collection('user')
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
      const dbRes = await client.db('users').collection('user').insertOne({
        id: new ObjectId(),
        name: 'jopapa',
        username: 'jopapa',
        email: false,
        address: {
          street: 'jopapa',
          suite: 'jopapa',
          city: 'jopapa',
          zipcode: 'jopapa',
          geo: {
            lat: 'jopapa',
            lng: 'jopapa',
          },
        },
        phone: 'jopapa',
        website: 'jopapa',
        company: {
          name: 'jopapa',
          catchPhrase: 'jopapa',
          bs: 'jopapa',
        },
      });
      await client.close();
      return res.send(dbRes);
      console.log(dbRes);
    } catch (err) {
      return res.status(500).send({ err });
    }
  });

app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await client.connect();
    const dbRes = await client
      .db('users')
      .collection('user')
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            name: 'parampampam',
            username: 'parampampam',
            email: 'parampampam',
            address: {
              street: 'parampampam',
              suite: 'parampampam',
              city: 'parampampam',
              zipcode: 'parampampam',
              geo: {
                lat: 'parampampam',
                lng: 'parampampam',
              },
            },
            phone: 'parampampam',
            website: 'parampampam',
            company: {
              name: 'parampampam',
              catchPhrase: 'parampampam',
              bs: 'parampampam',
            },
          },
        },
      );
    await client.close();
    return res.send(dbRes);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await client.connect();
    const dbRes = await client
      .db('users')
      .collection('user')
      .deleteOne({ _id: new ObjectId(id) });
    await client.close();
    return res.send(dbRes);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
