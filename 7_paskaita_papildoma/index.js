const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const URI =
  'mongodb+srv://admin:admin@cluster0.paziki4.mongodb.net/7pamoka?retryWrites=true&w=majority';
const client = new MongoClient(URI);
const app = express();
const PORT = process.env.PORT || 8081;
app.use(express.json());
app.use(cors());
require('dotenv').config();

app.get('/', async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('7pamoka')
      .collection('1pratimas')
      .find()
      .toArray();
    await client.close();
    return res.send(data);
    consolw.log(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.post('/', async (req, res) => {
  try {
    await client.connect();
    const dbRes = await client.db('7pamoka').collection('1pratimas').insertOne({
      id: '2',
      title: 'jopapa',
      description: 'jopapa',
      active: false,
    });
    await client.close();
    return res.send(dbRes);
    console.log(dbRes);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

// app.get('/id', async (res) => {
//   try {
//     await client.connect();
//     const data = await client
//       .db('7pamoka')
//       .collection('1pratimas')
//       .find({ id: '2' })
//       .toArray();
//     await client.close();
//     return res.send(data);
//   } catch (err) {
//     return res.status(500).send({ err });
//   }
// });
// nepavyko

app.put('/', async (req, res) => {
  try {
    await client.connect();
    const dbRes = await client
      .db('7pamoka')
      .collection('1pratimas')
      .updateOne(
        { id: '2' },
        {
          $set: {
            title: 'parampampam',
            description: 'parampampam',
            active: true,
          },
        },
      );
    await client.close();
    return res.send(dbRes);
  } catch (err) {
    return res.status(500).send({ err });
  }
});
app.delete('/', async (req, res) => {
  try {
    await client.connect();
    const dbRes = await client
      .db('7pamoka')
      .collection('1pratimas')
      .deleteOne({ id: '2' });
    await client.close();
    return res.send(dbRes);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
