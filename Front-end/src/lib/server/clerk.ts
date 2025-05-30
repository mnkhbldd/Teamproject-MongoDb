import { auth } from "@clerk/nextjs/server";
export const getClerkToken = async () => {
  try {
    const { getToken } = await auth();
    return getToken();
  } catch (error) {
    console.error("Error getting Clerk token:", error);
    return null;
  }
};
