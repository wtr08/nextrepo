import { MongoClient } from "mongodb";

// api/all-meetups
// req = request res = response
async function handler(req, res) {
  if (req.method === "GET") {
    const client = await MongoClient.connect(
      "mongodb+srv://root:hJklqOffVqDQnTCP@nextcluster.svxtzqy.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    res.status(200).json({ meetups });
  }
}

export default handler;
