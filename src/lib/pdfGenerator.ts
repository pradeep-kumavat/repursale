// lib/pdfGenerator.ts
import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';
import { Product, Buyer } from '@/components/types';

function loadFonts(doc: PDFKit.PDFDocument) {
  const cwd = process.cwd();
  const fontsDir = path.join(cwd, 'public', 'fonts');

  const regularPath = path.join(fontsDir, 'Roboto-Regular.ttf');
  const boldPath = path.join(fontsDir, 'Roboto-Bold.ttf');
  const italicPath = path.join(fontsDir, 'Roboto-Italic.ttf'); // optional

  if (!fs.existsSync(regularPath) || !fs.existsSync(boldPath)) {
    throw new Error(
      `Required font files not found in ${fontsDir}. Please add Roboto-Regular.ttf and Roboto-Bold.ttf (or update paths).`
    );
  }

  doc.registerFont('Regular', regularPath);
  doc.registerFont('Bold', boldPath);

  if (fs.existsSync(italicPath)) {
    doc.registerFont('Italic', italicPath);
  } else {
    doc.registerFont('Italic', regularPath);
  }
}

export function generateInvoicePDF(invoice: Buyer): PDFKit.PDFDocument {
  // IMPORTANT: set font: null to stop PDFKit from trying to auto-load AFM files
  const doc = new PDFDocument({
    size: 'A4',
    margin: 50,
    bufferPages: true,
    font: null as unknown as string, // <- prevents default AFM font loading (fixes ENOENT for Helvetica.afm)
  });

  // Register fonts from public/fonts
  loadFonts(doc);

  // Now safe to use registered font names
  doc
    .font('Bold')
    .fontSize(20)
    .text('TAX INVOICE', { align: 'center' })
    .moveDown(0.5);

  doc.fontSize(10).font('Regular');

  const startY = doc.y;

  // Left side - Invoice Info
  doc
    .fontSize(10)
    .font('Bold')
    .text('Invoice No:', 50, startY)
    .font('Regular')
    .text(invoice.invoiceNo, 130, startY)
    .font('Bold')
    .text('Invoice Date:', 50, startY + 15)
    .font('Regular')
    .text(new Date(invoice.invoiceDate).toLocaleDateString('en-IN'), 130, startY + 15)
    .font('Bold')
    .text('Type:', 50, startY + 30)
    .font('Regular')
    .text(invoice.type.toUpperCase(), 130, startY + 30);

  // Right side - Transport
  doc
    .font('Bold')
    .text('Transport:', 350, startY)
    .font('Regular')
    .text(invoice.transport.toUpperCase(), 430, startY);

  doc.moveDown(3);

  // Buyer Details
  doc
    .fontSize(12)
    .font('Bold')
    .text('Bill To:', 50, doc.y)
    .fontSize(10)
    .font('Regular')
    .moveDown(0.3)
    .text(`Name: ${invoice.buyerName}`, 50)
    .text(`Mobile: ${invoice.mobileNumber}`)
    .text(`Place of Supply: ${invoice.placeOfSupply}`)
    .text(`State: ${invoice.state}`)
    .text(`District: ${invoice.district}`);

  if (invoice.buyerGST) {
    doc.text(`GSTIN: ${invoice.buyerGST}`);
  }

  doc.moveDown(1.5);

  // Products Table
  const tableTop = doc.y;
  const tableHeaders = ['Sr.', 'Description', 'HSN', 'Qty', 'Rate', 'Taxable Amount'];
  const columnWidths = [30, 180, 60, 40, 70, 90];
  const columnPositions = [50, 80, 260, 320, 360, 430];

  doc
    .fontSize(9)
    .font('Bold')
    .fillColor('#000');

  tableHeaders.forEach((header, i) => {
    doc.text(header, columnPositions[i], tableTop, {
      width: columnWidths[i],
      align: i === 0 ? 'center' : 'left',
    });
  });

  doc
    .moveTo(50, tableTop + 15)
    .lineTo(520, tableTop + 15)
    .stroke();

  let currentY = tableTop + 25;

  doc.font('Regular').fontSize(9);

  invoice.products.forEach((product: Product, index: number) => {
    const rowData = [
      (index + 1).toString(),
      product.description,
      product.hsnCode,
      product.quantity,
      `₹${parseFloat(product.rate).toLocaleString('en-IN')}`,
      `₹${parseFloat(product.taxableAmount).toLocaleString('en-IN')}`,
    ];

    rowData.forEach((data, i) => {
      doc.text(data, columnPositions[i], currentY, {
        width: columnWidths[i],
        align: i === 0 ? 'center' : i >= 3 ? 'right' : 'left',
      });
    });

    currentY += 20;
  });

  doc
    .moveTo(50, currentY)
    .lineTo(520, currentY)
    .stroke();

  currentY += 15;

  // Totals
  const subtotal = invoice.products.reduce((sum: number, p: Product) => sum + parseFloat(p.taxableAmount), 0);
  const cgstAmount = (subtotal * parseFloat(invoice.value.cgst)) / 100;
  const sgstAmount = (subtotal * parseFloat(invoice.value.sgst)) / 100;
  const total = parseFloat(invoice.value.totalAmount);

  const summaryX = 350;
  const valueX = 480;

  doc
    .fontSize(9)
    .font('Regular')
    .text('Subtotal:', summaryX, currentY, { width: 100, align: 'right' })
    .text(`₹${subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, valueX, currentY, { width: 90, align: 'right' });

  currentY += 15;

  doc
    .text(`CGST (${invoice.value.cgst}%):`, summaryX, currentY, { width: 100, align: 'right' })
    .text(`₹${cgstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, valueX, currentY, { width: 90, align: 'right' });

  currentY += 15;

  doc
    .text(`SGST (${invoice.value.sgst}%):`, summaryX, currentY, { width: 100, align: 'right' })
    .text(`₹${sgstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, valueX, currentY, { width: 90, align: 'right' });

  currentY += 20;

  doc
    .fontSize(11)
    .font('Bold')
    .rect(summaryX, currentY - 5, 220, 25)
    .stroke()
    .text('Total Amount:', summaryX + 10, currentY, { width: 100, align: 'right' })
    .text(`₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, valueX, currentY, { width: 80, align: 'right' });

  // Footer
  doc
    .fontSize(8)
    .font('Italic')
    .fillColor('#666')
    .text('Thank you for your business!', 50, 750, {
      align: 'center',
      width: 500,
    });

  return doc;
}
