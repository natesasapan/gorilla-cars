// models/userSchema.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    user: { type: String },
    pass: { type: String }
}, { collection: 'creds' });

export const User = mongoose.models.User || mongoose.model('User', userSchema);