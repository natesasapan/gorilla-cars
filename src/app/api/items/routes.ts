import { MongoClient } from 'mongodb'

export async function run() {

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }
  const client = new MongoClient(uri);

  try {
    const database = client.db('creds');
    const creds = database.collection('creds');
    const query = { user: 'admin', pass: "pass1" };
    const user = await creds.findOne(query);
    console.log(user);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

