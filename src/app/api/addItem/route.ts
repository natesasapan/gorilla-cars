// app/api/login/route.ts
import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import { Item } from '@/models/itemSchema';
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

      //receiving argument from addItem
      const {make, model, year, price, startDate, endDate, imageLink} = await request.json();
      //debugging log

      await Item.create({make, model, year, price, startDate, endDate, imageLink});

      return NextResponse.json({message: "items added successfully!"}, {status: 201});
              
  } catch (error) {
      // If something goes wrong, still return proper JSON
      console.error("Error details:", error);
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
      const items = await Item.find();
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
{
  "make": "Toyota",
  "model": "Camry",
  "year": "2023",
  "price": "75.99",
  "startDate": "2024-11-25",
  "endDate": "2024-12-02",
  "imageLink": "https://example.com/images/toyota-camry-2023.jpg"
}
*/