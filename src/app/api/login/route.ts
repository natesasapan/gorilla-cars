// app/api/login/route.ts
import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import { User } from '@/models/userSchema';
import { NextRequest } from 'next/server';

//checking to see if the uri is correct
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI environment variable is not defined');
}

//authentication function
export async function POST(request: NextRequest) {
    try {
        //checking mongoDB connection
        await connectMongoDB();
  
        //receiving argument from login
        const {username , password} = await request.json();
        //debugging log
        //console.log("Received data:", username);
        
        //using UserSchema to find the username in mongodb
        const userExists = await User.findOne({username: username});

        //if username doesn't exist, deny access
        if (userExists == null) {
          return NextResponse.json({ 
            success: false,
            message: "username or password is incorrect" 
          });
        } else { // user exists, so check password
          const userPass = userExists.toObject().password;
          if (password == userPass) { //password matches, so we return success
            return NextResponse.json({ 
              success: true,
              message: "User is found" 
            });
          } else if (password != userPass) { // user exists, but password doesn't match. deny access
            return NextResponse.json({ 
              success: false,
              message: "username or password is incorrect" 
            });
          }
        }
                
    } catch (error) {
        // If something goes wrong, still return proper JSON
        console.error("Error details:", error);
        return NextResponse.json({ 
            success: false, 
            error: "Something went wrong",
        }, { status: 400 });
    }
  
  }

//was used to test mongo, unused now
export async function GET() {
    try {
      await connectMongoDB();
      const items = await User.find();
      return NextResponse.json({ items })
    } catch(error) {
      console.error("Error details:", error);
      // Ensures that the client will close when you finish/error
      return NextResponse.json({ 
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