// app/api/login/route.ts
import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import { User } from '@/models/userSchema';
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

/*
async function run () {
    try {
        const database = client.db('creds');
        const creds = database.collection('creds');
        let u = 'admin';
        let p = 'pass1';
        const query = { user: u, pass: p };
        const user = await creds.findOne(query);

        if (user != null) {
            console.log(user)
        }

        if (user == null) {
            console.log("no response")
        }
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
}

run()
*/

export async function POST(request) {
    try {
        const body = await request.json();
        console.log("Received data:", body); // Debug log
        const database = client.db('creds');
        const creds = database.collection('creds');
        let p = body.password;
        let u = body.username;
        const query = { user: u, pass: p };
        const user = await creds.findOne(query);

        let bool = false;

        if (user != null) {
            bool = true;
            console.log("password accepted")
        }

        if (user == null) {
            bool = false;
            console.log("password denied")
        }
                
        // Return proper JSON response
        return NextResponse.json({ 
            success: bool, 
            message: "Route is working!" 
        });
    } catch (error) {
        // If something goes wrong, still return proper JSON
        return NextResponse.json({ 
            success: false, 
            error: "Something went wrong" 
        }, { status: 400 });
    }

}

/*
export async function POST(request: NextRequest) {
    try {
        await connectMongoDB();
        
        // Get username and password from request body
        const { username, password } = await request.json();

        // Look for user with matching username and password
        const user = await User.findOne({ 
            username: username,
            password: password  // Note: In real apps, never store plain passwords!
        });

        // Return true if found, false if not
        return NextResponse.json({ 
            success: user ? true : false 
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Login failed" },
            { status: 400 }
        );
    }
}

*/