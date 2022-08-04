import { MongoClient } from "mongodb";
//   /api/new-meetup   ==>  the url of this file
// POST /api/new-meetup // if a request is sent to this url 👆👆, it will trigger the function which we have to define in this file


async function handler(req, res) {

    if (req.method === 'POST') {
        const data = req.body;   // data is an object

        // Store the data in a database
        const client = await MongoClient.connect(
          'mongodb+srv://willi:Iqe5r0RrEKwoFuvq@cluster0.mplam.mongodb.net/meetups?retryWrites=true&w=majority'
        );  // returns a promise(a connected client)
        const db = client.db();   // get hold of d database we are connecting to
    
        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);   // insert one new document(object) into that collection  
        console.log(result);  // an object with a generated Id

        client.close(); 

        // Send a response  // set a http status code   
        res.status(201).json({ message: 'Meetup inserted!' });
    };
};

export default handler;









// MongoClient.connect: establishes a connection to d database and this code should never run on d client side cuz u would expose ur credentials to ur user
// but in this api routes, its no problem cuz the code we define here will never end up on the client side. so dis is a secure place to store credentials


// req => contains data about the incoming request
// res => will be needed for sending back a response

// now from that request object we can get things like the headers, the request body and also d request method



// MONGODB
// NOSQL: collection full of documents 
// A document is just an object

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 5, 12345 Some City",
//     description: "This is a first meetup!",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 10, 12345 Some City",
//     description: "This is a second meetup!",
//   },
// ];