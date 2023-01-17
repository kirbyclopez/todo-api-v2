import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface IBaseListDocument extends mongoose.Document {
  userId: UserDocument["_id"];
  name: string;
}

export interface IListDocument extends IBaseListDocument {
  createdAt: Date;
  updatedAt: Date;
}

const ListSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const ListModel = mongoose.model<IListDocument>("List", ListSchema);

export default ListModel;
