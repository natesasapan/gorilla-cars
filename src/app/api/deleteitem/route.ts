import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import { Item } from '@/models/itemSchema';

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id'); // Get the ID from query parameters

    if (!id) {
      return NextResponse.json({ message: 'Item ID is required' }, { status: 400 });
    }

    await connectMongoDB();

    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Item deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json({ message: 'Failed to delete item' }, { status: 500 });
  }
}
