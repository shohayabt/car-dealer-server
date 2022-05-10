const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@cluster0.grtxn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const run = async () => {
  try {
    await client.connect();
    const productCollection = client
      .db("productCollection")
      .collection("product");
    // CREATING PRODUCT  API
    app.get("/car", async (request, response) => {
      const query = {};
      const cursor = productCollection.find(query);
      const result = await cursor.toArray();
      response.send(result);
    });
    // GET PRODUCT BY EMAIL
    app.get("/car/:email", async (request, response) => {
      const email = request.params.email;
      const query = { email: email };
      const cursor = productCollection.find(query);
      const result = await cursor.toArray();
      response.send(result);
    });
    // GET SINGLE PRODUCT WITH ID
    app.get("/products/:idName", async (req, res) => {
      const id = req.params.idName;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.findOne(query);
      res.send(result);
    });
    // POST DATA TO DATA BASE
    app.post("/cars", async (req, res) => {
      const cars = req.body;
      const result = await productCollection.insertOne(cars);
      res.send(result);
    });
    // UPDATE TOTAL
    app.put("/products/:id", async (req, res) => {
      const id = req.params.id;
      const updateQuantity = req.body;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          quantity: updateQuantity.updatedProductQuantity,
        },
      };
      const result = await productCollection.updateOne(
        query,
        updatedDoc,
        options
      );
      res.send(result);
    });
    // DELETE ITEMS
    app.delete("/deleteCar/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
};

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("HELLO WORLD FROM NODE JS || EXPRESS");
});

app.listen(port, () => {
  console.log("CRUD SERVER IS RUNNING ");
});
