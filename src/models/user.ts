import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: 'buyer' | 'seller' | 'admin' | 'agent';
}

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['buyer', 'seller', 'admin', 'agent'], default: 'seller' },
});

export default mongoose.models.User || mongoose.model<User>('User', UserSchema);
