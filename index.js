const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://shohayab:H3w!seB._w9LMcN@cluster0.grtxn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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
    // CREATING FRIENDS  API
    app.get("/car", async (request, response) => {
      const query = {};
      const cursor = productCollection.find(query);
      const result = await cursor.toArray();
      response.send(result);
    });

    app.get("/car/:id", async (request, response) => {
      const id = request.params.id;
      console.log(id);
      const query = { _id: id };
      const result = await productCollection.findOne(query);
      console.log(result);
      response.send(result);
    });
    // POST DATA TO DATA BASE
    app.post("/cars", async (req, res) => {
      const cars = req.body;
      const result = await productCollection.insertOne(cars);
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
