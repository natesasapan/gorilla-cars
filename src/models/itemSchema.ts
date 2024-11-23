// models/itemSchema.ts
import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    
    make: { type: String },
    model: { type: String },
    year: { type: Number },
    price: { type: Number },
    startDate: { type: Date},
    endDate: {type: Date},
    imageLink: {type: String}

}, { collection: 'cars' });

export const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);