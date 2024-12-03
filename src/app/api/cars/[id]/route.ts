import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import { Item } from "@/models/itemSchema";
import mongoose from "mongoose";

// Update the type to match Next.js route handler requirements
type Props = {
  params: {
    id: string;
  };
};

// Update the function signatures to use the correct type
export async function GET(request: NextRequest, props: Props) {
  const { id } = props.params;
  await connectMongoDB();
  try {
    const car = await Item.findOne({ _id: id });
    if (!car) {
      return NextResponse.json({ message: "Car not found" }, { status: 404 });
    }
    return NextResponse.json(car, { status: 200 });
  } catch (error) {
    console.error("Error fetching car:", error);
    return NextResponse.json({ message: "Failed to fetch car" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, props: Props) {
  const { id } = props.params;
  const {
    make,
    model,
    price,
    year,
    startDate,
    endDate,
    imageLink,
  } = await request.json();
  await connectMongoDB();
  try {
    const updatedCar = await Item.findByIdAndUpdate(
      id,
      { make, model, price, year, startDate, endDate, imageLink },
      { new: true }
    );
    if (!updatedCar) {
      return NextResponse.json({ message: "Car not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Car updated", car: updatedCar }, { status: 200 });
  } catch (error) {
    console.error("Error updating car:", error);
    return NextResponse.json({ message: "Failed to update car" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, props: Props) {
  const { id } = props.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }
  await connectMongoDB();
  try {
    const deletedCar = await Item.findByIdAndDelete(id);
    if (!deletedCar) {
      return NextResponse.json({ message: "Car not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Car deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting car:", error);
    return NextResponse.json({ message: "Failed to delete car" }, { status: 500 });
  }
}