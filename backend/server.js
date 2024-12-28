const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'secretpass';
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

client.connect();

// Get all passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// Save a password
app.post('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const insertResult = await collection.insertOne(password);
  res.send({ success: true, result: insertResult });
});

// Delete a password by id
app.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const deleteResult = await collection.deleteOne({ id });
  res.send({ success: true, result: deleteResult });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
