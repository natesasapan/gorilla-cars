// src/app/api/cars/[id]/route.ts
import connectMongoDB from "@/libs/mongodb";
import { Item } from "@/models/itemSchema"; 
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";


interface RouteParams {
  params: { id: string };
}

// GET: Fetch a specific car by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = params;
  await connectMongoDB();

  try {
    const car = await Item.findOne({ _id: id }); // Fetch the car by ID
    if (!car) {
      return NextResponse.json({ message: "Car not found" }, { status: 404 });
    }
    return NextResponse.json(car, { status: 200 });
  } catch (error) {
    console.error("Error fetching car:", error);
    return NextResponse.json({ message: "Failed to fetch car" }, { status: 500 });
  }
}

// PUT: Update a car by ID
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = params;
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
      { new: true } // Return the updated document
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

// DELETE: Remove a car by ID
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  await connectMongoDB();

  try {
    const deletedCar = await Item.findByIdAndDelete(id); // Delete car by ID
    if (!deletedCar) {
      return NextResponse.json({ message: "Car not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Car deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting car:", error);
    return NextResponse.json({ message: "Failed to delete car" }, { status: 500 });
  }
}


