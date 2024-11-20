// models/userSchema.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
}, { collection: 'creds' });

export const User = mongoose.models.User || mongoose.model('User', userSchema);