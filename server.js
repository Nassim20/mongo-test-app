const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

const uri = process.env.MONGODB_URI;

app.get("/", async (req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("testdb");
    const collection = db.collection("visits");

    await collection.insertOne({ date: new Date() });

    const count = await collection.countDocuments();

    await client.close();

    res.send(`MongoDB connected. Total visits: ${count}`);
  } catch (err) {
    res.status(500).send("Database error: " + err.message);
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
