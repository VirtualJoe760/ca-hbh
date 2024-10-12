// src/app/api/user/complete.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    await dbConnect();
    const { email, ...extraInfo } = req.body;
    const user = await User.findOneAndUpdate({ email }, { ...extraInfo, completed: true }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user profile' });
  }
}
