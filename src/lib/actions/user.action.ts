" user server";

import { connect } from "@/lib/mongoDb";
import User from "../models/user.model";

export interface CreateUserParams {
  clerkId: string;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  photo: string;
}

export async function createUser(params: CreateUserParams) {
  try {
    await connect();
    const newUser = await User.create(params);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}
