export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import  dbConnect  from '@/lib/dbConnect';
import { generateInvoicePDF } from '@/lib/pdfGenerator';
import { Buyer } from '@/components/types';
import Entries from '@/models/entryModel';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    // Handle params as Promise (Next.js 15+) or object (Next.js 13-14)
    const resolvedParams = await Promise.resolve(params);
    
    // Fetch invoice from MongoDB - only for the authenticated user
    const { ObjectId } = require('mongodb');
    const invoice = await Entries.findOne({
      _id: new ObjectId(resolvedParams.id),
      userId: user.id
    });

    if (!invoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      );
    }

    // Generate PDF
    const doc = generateInvoicePDF(invoice as unknown as Buyer);
    
    // Create buffer to store PDF
    const chunks: Buffer[] = [];
    
    doc.on('data', (chunk) => chunks.push(chunk));
    
    return new Promise<NextResponse>((resolve, reject) => {
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(chunks);
        
        resolve(
          new NextResponse(pdfBuffer, {
            headers: {
              'Content-Type': 'application/pdf',
              'Content-Disposition': `attachment; filename="invoice-${invoice.invoiceNo}.pdf"`,
              'Content-Length': pdfBuffer.length.toString(),
            },
          })
        );
      });

      doc.on('error', reject);
      
      // Finalize PDF
      doc.end();
    });
    
  } catch (error) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}