const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3011;
app.use(express.json());
app.use(cors());

const phones = [
  {
    id: 1,
    brand: "Apple",
    name: "iPhone 12",
    stock: 10,
    category: "Smartphone",
  },
  {
    id: 2,
    brand: "Samsung",
    name: "Galaxy S21",
    stock: 8,
    category: "Smartphone",
  },
  { id: 3, brand: "Google", name: "Pixel 5", stock: 5, category: "none" },
];

app.get("/", (req, res) => {
  res.send("Labas  :D");
});

app.get("/phones", (req, res) => {
  res.send(phones);
});

app.get("/phones/categories/:category", (req, res) => {
  const { category } = req.params;
  const filteredPhones = phones.filter(
    (phone) => phone.category.toLowerCase() === category
  );
  res.send(filteredPhones);
});

app.get("/phones/names", (req, res) => {
  const names = phones.map((phone) => phone.name);
  res.send(names);
});

app.get("/phones/stocks", (req, res) => {
    const stock = +req.params.stock;
    //if phone stock is less than 10, send it back
    const filteredPhones = phones.filter((phone) => phone.stock > 5);
    res.send(filteredPhones.map((phone) => `${phone.name}, ${phone.stock}`));
});

app.get("/phones/:id", (req, res) => {
    const id = +req.params.id;
    const phone = phones.find((phone) => phone.id === id);
    if (!phone) {
        res.status(404).send({ error: "Phone not found" });
    }
    res.send(phone);
});

app.post ("/phones/add", (req, res) => {    
    const phone = {...req.body, id: phones.length + 1};
    if (phone.brand && phone.name && phone.stock && phone.category) {
        phones.push(phone);
        res.send(phones);
    } else {
        res.send({error: "Bad request"});
    }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
