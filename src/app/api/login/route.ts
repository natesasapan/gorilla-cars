// app/api/login/route.ts
import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import { User } from '@/models/userSchema';
import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined');
}

export async function POST(request: NextRequest) {
    try {
        await connectMongoDB();
 
        const { username, password } = await request.json();

        // Validate input
        if (!username || !password) {
            return NextResponse.json({
                success: false,
                message: "Username and password are required"
            }, { status: 400 });
        }
       
        // Find user by username
        const user = await User.findOne({ username });
        
        // Use generic error message to prevent username enumeration
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Invalid credentials"
            }, { status: 401 });
        }

        // Compare password with stored hash
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return NextResponse.json({
                success: false,
                message: "Invalid credentials"
            }, { status: 401 });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET as string,
            { expiresIn: '24h' }
        );

        // Create response
        const response = NextResponse.json({
            success: true,
            message: "Login successful"
        }, { status: 200 });

        // Set HTTP-only cookie
        response.cookies.set({
            name: 'auth_token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 // 24 hours
        });

        return response;
               
    } catch (error) {
        console.error("Error details:", error);
        return NextResponse.json({
            success: false,
            error: "An error occurred during login"
        }, { status: 500 });
    }
}