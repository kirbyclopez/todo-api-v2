import mongoose from "mongoose";
import { IListDocument } from "./list.model";

export interface IBaseItemDocument extends mongoose.Document {
  listId: IListDocument["_id"];
  name: string;
  isComplete?: boolean;
}

export interface IItemDocument extends IBaseItemDocument {
  createdAt: Date;
  updatedAt: Date;
}

const ItemSchema = new mongoose.Schema(
  {
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "List",
    },
    name: { type: String, required: true },
    isComplete: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

const ItemModel = mongoose.model<IItemDocument>("Item", ItemSchema);

export default ItemModel;
