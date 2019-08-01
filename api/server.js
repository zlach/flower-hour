const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const Flower = require("./models/flower");
require("./db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("http://localhost:3000/client/public"));

// get a list of flowers

// returns a list of objects

app.post("/flower", async (req, res) => {
  const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  const newFlower = await Flower.create(data);
  console.log(newFlower);
  res.send(newFlower);
});

app.post("/pluck", async (req, res) => {
  const flower = await Flower.findOneAndDelete({ _id: req.body._id });

  res.send(flower);
});

app.get("/flower", async (req, res) => {
  const flowers = await Flower.find();
  console.log(flowers);
  res.send(flowers);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
