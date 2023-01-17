import { omit } from "lodash";
import { DocumentDefinition, FilterQuery } from "mongoose";
import UserModel, { BaseUserDocument, UserDocument } from "../model/user.model";

export const createUser = async (
  input: DocumentDefinition<BaseUserDocument>
) => {
  try {
    const user = await UserModel.create(input);

    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
};

export const validatePassword = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const user = await UserModel.findOne({ username });

  if (!user) return false;

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
};

export const findUser = async (query: FilterQuery<UserDocument>) => {
  return UserModel.findOne(query).lean();
};

export const clearUsers = async () => {
  return UserModel.deleteMany();
};
