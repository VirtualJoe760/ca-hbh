// src/models/homeowner.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IHomeowner extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
  estimatedHomeValue: number;
  newsletterSubscribed: boolean;
  createdAt: Date;
}

const HomeownerSchema = new Schema<IHomeowner>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  estimatedHomeValue: { type: Number, required: true },
  newsletterSubscribed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Homeowner || mongoose.model<IHomeowner>('Homeowner', HomeownerSchema);
