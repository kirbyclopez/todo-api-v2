import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface IItemDocument extends mongoose.Document {
  name: string;
  isComplete: boolean;
}

export interface IBaseListDocument extends mongoose.Document {
  user: UserDocument["_id"];
  name: string;
  items: [IItemDocument];
}

export interface IListDocument extends IBaseListDocument {
  createdAt: Date;
  updatedAt: Date;
}

const ItemSchema = new mongoose.Schema({
  name: { type: String },
  isComplete: { type: Boolean, default: false },
});

const ListSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    items: [ItemSchema],
  },
  { timestamps: true, versionKey: false }
);

const ListModel = mongoose.model<IListDocument>("List", ListSchema);

export default ListModel;
