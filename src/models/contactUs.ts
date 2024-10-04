import mongoose, { Document, Schema } from "mongoose";

interface IContactUs extends Document {
  name: string;
  email: string;
  message: string;
}

const ContactUsSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const ContactUs = mongoose.models.ContactUs || mongoose.model<IContactUs>("ContactUs", ContactUsSchema);