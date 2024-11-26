import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import { Item } from '@/models/itemSchema';

export async function GET(request: Request) {
  try {
    await connectMongoDB();

    // Fetch all cars from the database
    const cars = await Item.find();
    console.log("Cars from MongoDB:", cars);

    return NextResponse.json(cars, { status: 200 });
  } catch (error) {
    console.error('Error fetching cars:', error);
    return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 });
  }
}





