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


app.get('/pets', async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('pets')
      .collection('pet')
      .aggregate([
        {
          $lookup: {
            from: 'people',
            localField: 'ownerId',
            foreignField: '_id',
            as: 'owner',
          },
        },
        {
          $unwind: {
            path: '$owner',
            preserveNullAndEmptyArrays: true, // show pets with an owner
          },
        },
      ])
      // .find()
      .toArray();
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.post('/pets', async (req, res) => {
    try {
      const newPet = { ...req.body, ownerId: new ObjectId(req.body.ownerId) };
      await client.connect();
      const dbRes = await client.db('pets').collection('pet').insertOne(newPet);
      await client.close();
      return res.send(dbRes);
      
    } catch (err) {
      return res.status(500).send({ err });
    }
  });

app.get('/pets/:type', async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('pets')
      .collection('pet')
      .find({ type: req.params.type })
      .toArray();
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});
//neisejo
app.get('/pets/byoldest', async (req, res) => {
  try {
    const {sort} = req.params;
    const sortParam = sort === 'asc' ? 1 : -1;
    await client.connect();
    const data = await client
      .db('pets')
      .collection('pet')
      .find()
      .sort({ age: sortParam })
      .toArray();
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.get('/people', async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('pets')
      .collection('owner')
      .find()
      .toArray();
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
}
);

app.post('/people', async (req, res) => {
  try {
    await client.connect();
    const dbRes = await client.db('pets').collection('owner').insertOne(req.body);
    await client.close();
    return res.send(dbRes);
    return
  } catch (err) {
    return res.status(500).send({ err });
  }
}
);


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
