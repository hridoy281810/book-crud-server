
// const express= require('express');
// const app = express();
// const cors= require("cors")
// const port = 4000
// app.use(cors())
// app.use(express.json())

// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = "mongodb+srv://user1:H85cMSJMAVHtMtMM@cluster0.n3cxt.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     const bookCollection= client.db("bookManager").collection("books")



// //insert a book to db

// app.get("/health",(req,res)=>{
// res.send("All is well")
// })   




// app.post("/upload-book",async (req,res)=>{
//     const data = req.body 
//     console.log(data)
//     const result = await bookCollection.insertOne(data)
//     res.send(result)
// })


// app.get('/all-books',async(req,res)=>{
//    const q= req.query
//    console.log(q)
//     const books= bookCollection.find()
//     const result = await books.toArray()
//     res.send(result)
// })



// app.get('/book/:id', async(req, res)=>{
//     const id= req.params.id
    
//     const filter = {_id : new ObjectId(id)}

//     const data = await bookCollection.findOne(filter)

//     res.send(data)

// })

// app.patch('/book/:id', async(req, res)=>{
//     const id= req.params.id
//     const updatedBookData= req.body
//     const filter = {_id : new ObjectId(id)}
//     const updatedDoc={
//         $set:{
//             ...updatedBookData
//         }
//     }

//     const result= await bookCollection.updateOne(filter, updatedDoc)
//     res.send(result)
// })


// app.delete('/book/:id', async(req, res)=>{
//     try{
//         const id= req.params.id
//     const filter = {_id : new ObjectId(id)}

//     const result= await bookCollection.deleteOne(filter)
//     res.send(result)
//     }catch(err){
//       res.send(err.message)
//     }
// })

//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);


// app.listen(port, ()=>{
//     console.log("listening to port 4000")
// })
const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000; 
console.log(process.env.DB_NAME)
console.log(process.env.DB_PASS)
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.x6iur0l.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const bookCollection = client.db('bookManager').collection('books')

// insert a book to db 

app.get('/health', (req,res)=>{
  res.send('All is well')
})


app.post('/upload-book',  async(req,res)=>{
  const data =req.body;
  console.log(data)
  const result = await bookCollection.insertOne(data)
  res.send(result)
})

app.get('/all-book', async(req,res)=>{
  const books = bookCollection.find()
  const result = await books.toArray()
  res.send(result)
})

app.get('/book/:id', async(req,res)=>{
  const id = req.params.id;
  const filter = {_id: new ObjectId(id)}
  const data = await bookCollection.findOne(filter)
  res.send(data)
})


app.patch('/book/:id', async(req,res)=>{
  const id = req.params.id;
const updatedBookData = req.body;
  const filter = {_id: new ObjectId(id)}
  const updatedDoc = {
    $set:{
      ...updatedBookData
    }
  }
  const result = await bookCollection.updateOne(filter,updatedDoc)
  res.send(result)

})

app.delete('/book/:id', async(req,res)=>{
 try{
  const id = req.params.id;
  const filter = {_id: new ObjectId(id)}

  const result = await bookCollection.deleteOne(filter)
  res.send(result)
 }catch(error){
  res.send(error.message)
 }
})
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();

  }
}
run().catch(console.dir);


app.get('/', (req,res)=>{
  res.send('surver is  running')
})

app.listen(port, (req,res)=>{
 console.log(`server is running on port: ${port}`)
})