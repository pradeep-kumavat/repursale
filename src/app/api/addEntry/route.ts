import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Entries from "@/models/entryModel";


export async function GET() {
  try {
    await dbConnect();
    const entries = await Entries.find();
    return NextResponse.json(entries, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching entries", error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const {
      buyerName,
      mobileNumber,
      placeOfSupply,
      buyerGST,
      state,
      district,
      invoiceNo,
      invoiceDate,
      transport,
      type,
      products,
      value,
    } = body;

    // Validate required fields
    if (
      !buyerName ||
      !mobileNumber ||
      !placeOfSupply ||
      !buyerGST ||
      !state ||
      !district ||
      !invoiceNo ||
      !invoiceDate ||
      !transport ||
      !type ||
      !products ||
      !value
    ) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    const newEntry = new Entries({
        buyerName,
        mobileNumber,
        placeOfSupply,
        buyerGST,
        state,
        district,
        invoiceNo,
        invoiceDate,
        transport,
        type,
        products,
        value,
        }
    );
    const savedEntry = await newEntry.save();
    return NextResponse.json(savedEntry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating entry", error }, { status: 500 });
  }
}
