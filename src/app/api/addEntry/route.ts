import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Entries from "@/models/entryModel";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    // Fetch only entries for the logged-in user
    const entries = await Entries.find({ userId: user.id });

    const sanitizedEntries = entries.map(entry => {
      const { userId, ...rest } = entry.toObject();
      return rest;
    });

    return NextResponse.json(sanitizedEntries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching entries" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();

    // Ensure we only store userId, not the entire user object
    const formattedData = {
      ...data,
      userId: user.id,
    };

    const savedEntry = await Entries.create(formattedData);

    return NextResponse.json(savedEntry, { status: 201 });
  } catch (error) {
    console.error("Error creating entry:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the entry" },
      { status: 500 }
    );
  }
}
