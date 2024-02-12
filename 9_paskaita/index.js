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

app.get('/teams', async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('9')
      .collection('teams')
      .find()
      .toArray();
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.get('/teams/:id', async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('9')
      .collection('teams')
      .findOne({ _id: new ObjectId(req.params.id) });
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.post('/teams', async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('9')
      .collection('teams')
      .insertOne(req.body);
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.put('/teams/:id', async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('9')
      .collection('teams')
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
      );
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.delete('/teams/:id', async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('9')
      .collection('teams')
      .deleteOne({ _id: new ObjectId(req.params.id) });
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.get('/athletes', async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('9')
      .collection('athletes')
      .aggregate([
        {
          $lookup: {
            from: 'teams',
            localField: 'team_id',
            foreignField: 'team_id',
            as: 'team',
          },
        },
        {
          $unwind: {
            path: '$athletes',
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      .toArray();
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.get('/athletes/:id', async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('9')
      .collection('athletes')
      .findOne({ _id: new ObjectId(req.params.id) });
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.post('/athletes', async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('9')
      .collection('athletes')
      .insertOne(req.body);
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});
app.put('/athletes/:id', async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('9')
      .collection('athletes')
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
      );
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.delete('/athletes/:id', async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('9')
      .collection('athletes')
      .deleteOne({ _id: new ObjectId(req.params.id) });
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
