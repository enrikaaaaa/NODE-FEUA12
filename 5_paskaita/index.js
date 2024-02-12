const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const URI =
  'mongodb+srv://admin:admin@cluster0.paziki4.mongodb.net/7pamoka?retryWrites=true&w=majority';
const client = new MongoClient(URI);
const app = express();
const PORT = process.env.PORT || 8081;
app.use(express.json());
require('dotenv').config();

app.get('/', async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('news')
      .collection('new')
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
    const dbRes = await client.db('news').collection('new').insertOne({
      _id: Math.random().toString(36).substr(2, 36),
      title: 'jopapa',
      body: 'jopapa',
      tags: 'apapa',
    });
    await client.close();
    return res.send(dbRes);
    //console.log(dbRes);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.get('/news', async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db('news')
      .collection('new')
      .find()
      .sort({ _id: -1})
      .limit(5)      
      .toArray();
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.get('/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();    
    const data = await con
      .db('news')
      .collection('new')
      .findOne({ _id: new ObjectId(id) })
      // .toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const dbRes = await con
      .db('news')
      .collection('new')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { title: 'updated', body: 'updated' } }
      );
    await con.close();
    return res.send(dbRes);
  }
  catch (err) {
    return res.status(500).send({ err });
  }
});

app.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const dbRes = await con
      .db('news')
      .collection('new')
      .deleteOne({ _id: new ObjectId(id) });
    await con.close();
    return res.send(dbRes);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
