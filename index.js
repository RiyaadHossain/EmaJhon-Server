const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

// Middlewares
app.use(cors());
app.use(express.json());

const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@primarycluster.gzpbs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
        await client.connect()

        const productsColletion = client.db('productsColletion').collection('products')

        app.get('/product', async (req, res) => {
            const query = {}
            const cursor = productsColletion.find(query)
            const products = await cursor.toArray()
            res.send(products)
        })
    }
    finally {
        // await client.close()
    }
}

run().catch(console.dir)


app.get("/", (req, res) => {
  res.send("Node Server Running Successfully 🚀 ");
});

app.listen(port, () => {
  console.log("Listening to Port : ", port);
});
