// src/models/buyer.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IBuyer extends Document {
  name: string;
  email: string;
  phone: string;
  budget: number;
  interestedLocations: string[];
  prequalified: boolean;
  createdAt: Date;
}

const BuyerSchema = new Schema<IBuyer>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  budget: { type: Number, required: true },
  interestedLocations: { type: [String], required: true },
  prequalified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Buyer || mongoose.model<IBuyer>('Buyer', BuyerSchema);
