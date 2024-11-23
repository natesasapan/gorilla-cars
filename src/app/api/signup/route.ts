// app/api/signup/route.ts
import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import { User } from '@/models/userSchema';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        await connectMongoDB();
        
        const { username, password } = await request.json();
        
        // Create new user
        await User.create({
            username,
            password
        });
        
        return NextResponse.json({
            success: true,
            message: "User created successfully!"
        }, { status: 201 });
        
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({
            success: false,
            error: "Failed to create user"
        }, { status: 400 });
    }
}