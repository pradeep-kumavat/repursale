import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for Product
interface Product {
  description: string;
  hsnCode: string;
  quantity: string;
  rate: string;
  taxableAmount: string;
}

// Interface for Entry
interface Entry extends Document {
  buyerName: string;
  mobileNumber: string;
  placeOfSupply: string;
  buyerGST: string;
  state: string;
  district: string;
  invoiceNo: string;
  invoiceDate: Date;
  transport: string;
  type: string;
  products: Product[];
  value: {
    cgst: string;
    sgst: string;
    totalAmount: string;
  };
}

const productSchema = new Schema<Product>({
  description: { type: String, required: [true, "Please provide the product description"] },
  hsnCode: { type: String, required: [true, "Please provide the HSN code"] },
  quantity: { type: String, required: [true, "Please provide the quantity"] },
  rate: { type: String, required: [true, "Please provide the rate"] },
  taxableAmount: { type: String, required: [true, "Please provide the taxable amount"] },
});


const entrySchema = new Schema<Entry>({
  buyerName: { type: String, required: [true, "Please provide the name of the buyer"] },
  mobileNumber: { type: String, required: [true, "Please provide the mobile number of the buyer"] },
  placeOfSupply: { type: String, required: [true, "Please provide the place of supply"] },
  buyerGST: { type: String, required: [true, "Please provide the GST number of the buyer"] },
  state: { type: String, required: [true, "Please provide the state"] },
  district: { type: String, required: [true, "Please provide the district"] },
  invoiceNo: { type: String, required: [true, "Please provide the invoice number"] },
  invoiceDate: { type: Date, required: [true, "Please provide the invoice date"] },
  transport: { type: String, required: [true, "Please provide the transport"] },
  type: { type: String, required: [true, "Please provide the type of entry"] },
  products: { type: [productSchema], required: true },
  value: {
    cgst: { type: String, required: [true, "Please provide the CGST"] },
    sgst: { type: String, required: [true, "Please provide the SGST"] },
    totalAmount: { type: String, required: [true, "Please provide the total amount"] },
  },
});


const Entries: Model<Entry> = mongoose.models.Entries || mongoose.model<Entry>("Entries", entrySchema);

export default Entries;
