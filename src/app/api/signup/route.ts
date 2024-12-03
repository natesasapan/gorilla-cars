import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import { User } from '@/models/userSchema';
import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
    try {
        await connectMongoDB();
       
        const { username, password } = await request.json();
        
        // Input validation
        if (!username || !password) {
            return NextResponse.json({
                success: false,
                error: "Username and password are required"
            }, { status: 400 });
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return NextResponse.json({
                success: false,
                error: "Username already exists"
            }, { status: 409 });
        }
        
        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
       
        // Create new user with hashed password
        await User.create({
            username,
            password: hashedPassword
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
        }, { status: 500 });
    }
}