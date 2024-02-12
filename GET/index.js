const express = require('express');
const cors = require('cors');
const app = express();
// const PORT = 3011;
const PORT = process.env.PORT || 8081;
app.use(express.json());
app.use(cors());

const posts = [
  { id: 1, title: 'gera diena', description: 'šiandien yra labai gera diena' },
  { id: 2, title: 'gera diena', description: 'šiandien yra labai gera diena' },
];

app.get('/', (req, res) => {
  res.send('Labas  :D');
});

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const fakeId = posts.length + 1;
  const post = { ...req.body, id: fakeId }; ///creating new  with id
  if (post.title & post.description) {
    posts.push(post); //returning new
    res.send(posts); //returning updated list
  } else {
    res.send({ error: 'Bad request' });
  }
});

app.get('/posts/:id', (req, res) => {
  const id = +req.params.id; //id yra stringas (ateina) pliusiukas pakeicia i skaiciu
  const post = posts.find((post) => post.id === id);
  if (!post) {
    res.status(404).send({ error: 'post not found' });
  }
  res.send(post);
});

//reikia update post


app.delete('/posts/:id', (req, res) => {
  const id = +req.params.id;
  const foundIndex = posts.findIndex((post) => post.id === id); //iesko userio pagal id
  if (foundIndex === 1) {
    posts.splice(foundIndex, 1);
    res.send({ message: 'post deleted' });
    console.log(posts);
  } else {
    res.status(400).send({ error: 'post not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
