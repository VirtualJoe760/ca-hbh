// src/app/api/expiredContacts/route.ts
import dbConnect from '@/utils/dbConnect';
import Contact from '@/models/expiredContacts';
import { NextRequest, NextResponse } from 'next/server';
import xlsx from 'xlsx';
import formidable from 'formidable';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false, // Disable built-in body parser for file uploads
  },
};

export async function POST(req: NextRequest) {
  await dbConnect(); // Connect to MongoDB using your existing dbConnect function

  const form = new formidable.IncomingForm();
  try {
    // Parse the uploaded file
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const file = files.file;
    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' });
    }

    // Read the file
    const filePath = file.filepath; // Path to the uploaded file
    const fileData = await fs.readFile(filePath);
    const workbook = xlsx.read(fileData, { type: 'buffer' });

    // Parse the first sheet into JSON
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const contacts = xlsx.utils.sheet_to_json(sheet);

    // Map the parsed data to match your ExpiredContacts schema
    const formattedContacts = contacts.map((row: any) => ({
      name: row.name || '',
      address: row.address || '',
      city: row.city || '',
      state: row.state || '',
      zipCode: row.zipCode || '',
      phone: row.phone || '',
      email: row.email || '',
      dateAdded: new Date(row.dateAdded) || new Date(),
      status: row.status || 'Unknown',
    }));

    // Insert the contacts into the MongoDB collection for expired contacts
    await Contact.insertMany(formattedContacts);

    return NextResponse.json({
      success: true,
      message: 'Expired contacts uploaded successfully',
      data: formattedContacts.length,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
}
