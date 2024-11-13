import mongoose, { Schema, Document, Model } from "mongoose";

interface IItem extends Document {
    user: String;
    password: String;
}

const ItemSchema = new Schema<IItem>({
    user: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const Item: Model<IItem> = mongoose.models.Item || mongoose.model<IItem>("Item", ItemSchema);
export default Item;