// src/app/api/homeowners/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Homeowner from '@/models/homeowner';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json() as {
      name: string;
      email: string;
      phone: string;
      address: string;
      estimatedHomeValue: number;
      newsletterSubscribed: boolean;
    }; // Define the structure of the request body
    const homeowner = await Homeowner.create(body);
    return NextResponse.json({ success: true, data: homeowner }, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const homeowners = await Homeowner.find({});
    return NextResponse.json({ success: true, data: homeowners }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}
