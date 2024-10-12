// src/models/contact.ts
import mongoose, { Schema, Document } from 'mongoose';

interface ExpiredContact extends Document {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  dateAdded: Date;
  status: string;
}

const ExpiredContactSchema: Schema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  dateAdded: { type: Date, required: true },
  status: { type: String, required: true },
});

export default mongoose.models.Contact ||
  mongoose.model<ExpiredContact>('ExpiredContact', ExpiredContactSchema);
