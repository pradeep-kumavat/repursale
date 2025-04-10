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
  userId: string;
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
  userId: {  // Add userId field
    type: String,
    required: true,
  },
  buyerName: { type: String },
  mobileNumber: { type: String },
  placeOfSupply: { type: String },
  buyerGST: { type: String },
  state: { type: String },
  district: { type: String },
  invoiceNo: { type: String},
  invoiceDate: { 
    type: Date 
  },
  transport: { type: String },
  type: { type: String},
  products: { type: [productSchema], required: true },
  value: {
    cgst: { type: String, required: [true, "Please provide the CGST"] },
    sgst: { type: String, required: [true, "Please provide the SGST"] },
    totalAmount: { type: String, required: [true, "Please provide the total amount"] },
  },
}, {
  toJSON: { getters: true },
  toObject: { getters: true }
});

const Entries: Model<Entry> = mongoose.models.Entries || mongoose.model<Entry>("Entries", entrySchema);

export default Entries;