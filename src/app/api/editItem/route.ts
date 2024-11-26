import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import { Item } from '@/models/itemSchema';

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || id === 'undefined') {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    await connectMongoDB();

    const { make, model, year, price, startDate, endDate, imageLink } = await request.json();

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { make, model, year, price, startDate, endDate, imageLink },
      { new: true } // Return the updated document
    );

    if (!updatedItem) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Item updated successfully', item: updatedItem }, { status: 200 });
  } catch (error) {
    console.error('Error updating item:', error);
    return NextResponse.json({ message: 'Failed to update item' }, { status: 500 });
  }
}
