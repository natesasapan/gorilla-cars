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
        console.log(request);
        // in progess
        return NextResponse.json({ 
            success: true, 
            error: "In progress" 
        }, { status: 201 });
                
    } catch (error) {
        console.error("Error details:", error);
        // in progress
        return NextResponse.json({ 
            success: false, 
            error: "Something went wrong",
        }, { status: 400 });
    }
  
  }

//will be implemented soon
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
