// app/api/checkUsername/route.ts
import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import { User } from '@/models/userSchema';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        await connectMongoDB();
        
        const { username } = await request.json();
        
        // Check if username exists in database
        const existingUser = await User.findOne({ username: username });
        
        return NextResponse.json({
            exists: !!existingUser // converts to boolean and returns true if user exists
        });
        
    } catch (error) {
        console.error("Error checking username:", error);
        return NextResponse.json({
            error: "Error checking username availability"
        }, { status: 500 });
    }
}