import { mockFindUserByEmail } from "@/lib/mockApi";

export const checkIfEmailExists = async (email) => {
  return mockFindUserByEmail(email) !== null;
};
