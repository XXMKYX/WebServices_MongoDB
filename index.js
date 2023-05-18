//npm install express
//npm install mongodb
const assert = require('assert');
var express = require('express'); //llamamos a Express
var app = express();
var bodyParser = require('body-parser');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://xxmkyx:xxmkyx@aplicacionesdistribuida.vcna68s.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const database = client.db("myrudegolems");
const multimedia = database.collection("My Rude Golems");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

/*const uri = `mongodb+srv://${process.env['MONGOUSER']}:${process.env['MONGOPASS']}@cluster-sd.uhhmbgs.mongodb.net/?retryWrites=true&w=majority`;*/


app.get('/test', async function(req, res) {
  res.json({
    query: req.query
  });
})

app.post('/test', (req, res) => {
  res.json({ requestBody: req.body })  // <==== req.body will be a parsed JSON object
})

app.delete('/test', async function(req, res) {
  res.json({
    body: req.body,
    query: req.query
  })
})

app.put('/test', async function(req, res) {
  res.json({
    body: req.body,
    query: req.query
  })
})


app.get('/', async function(req, res) {

  const client = new MongoClient(uri);
  const database = client.db("myrudegolems");
  const multimedia = database.collection("My Rude Golems");
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    // Make the appropriate DB calls
    //await multimedia.insertMany
    res.json({ documents: await get(multimedia) });
  } catch (e) {
    //console.error(e);
    res.json({ ERROR: e })
  } finally {
    await client.close();
  }
})


app.get("/getData", async function(req, res) {
  let data = []
  const findResult = await collection.find({
    message: "Ok"
  });

  for await (const doc of findResult) {
    data.push(doc)
  }
  response.json(data);
})

app.get("/getDataOne", async function(resquest, response) {
  let data = {};

  const id = resquest.query.id;

  const findResult = await collection.findOne({
    '_id': new ObjectId(id)
  });

  console.log(findResult)

  data = findResult

  response.json({
    ok: true,
    data
  });
})


app.get('/:id', async function(req, res) {

  const client = new MongoClient(uri);
  const database = client.db("myrudegolems");
  const multimedia = database.collection("My Rude Golems");
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls

    res.json({ document: await get_id(multimedia, req.params.id) });
  } catch (e) {
    //console.error(e);
    res.json({ ERROR: e })
  } finally {
    await client.close();
  }
})


app.listen(3000, () => {
  console.log('server started');
});


// Funciones
async function get(multimedia) {
  try {

    const options = {
      // sort returned documents in ascending order by title (A->Z)
      //sort: { title: 1 },
      // Include only the `title` and `imdb` fields in each returned document
      //projection: { _id: 0, title: 1, imdb: 1 },
    };

    const cursor = await multimedia.find();
    return cursor.toArray();
    // replace console.dir with your callback to access individual elements
    //await cursor.forEach(console.dir);

  } finally {
    //await client.close();
  }
}

function iterateFunc(doc) {
  console.log(JSON.stringify(doc, null, 4));
}

function errorFunc(error) {
  console.log(error);
}

async function get_id(multimedia, id) {
  try {

    const options = {
      // sort returned documents in ascending order by title (A->Z)
      //sort: { title: 1 },
      // Include only the `title` and `imdb` fields in each returned document
      //projection: { _id: 0, title: 1, imdb: 1 },
    };

    const result = await multimedia.findOne({
      "ID_archivo": id
    });

    if (result) {
      //console.log(`Found a listing in the collection with the name '${id}':`);
      //console.log(result);
      return result;

    } else {
      return (`No listings found with the name '${id}'`);
    }
  } finally {
    //await client.close();
  }
}
