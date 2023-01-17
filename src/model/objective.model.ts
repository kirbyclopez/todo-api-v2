import mongoose from "mongoose";

export interface BaseObjectiveDocument extends mongoose.Document {
  name: string;
  description: string;
  reason: string;
  targetDate: Date;
  completedDate?: Date;
}

export interface ObjectiveDocument extends BaseObjectiveDocument {
  createdAt: Date;
  updatedAt: Date;
}

const objectiveSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    reason: { type: String, required: true },
    targetDate: { type: Date, required: true },
    completedDate: { type: Date },
  },
  { timestamps: true }
);

const ObjectiveModel = mongoose.model<ObjectiveDocument>(
  "Objective",
  objectiveSchema
);

export default ObjectiveModel;
