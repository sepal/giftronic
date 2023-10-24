import { getXataClient } from "@/lib/xata";

const defaultCredits = 10;

export async function createUser(userId: string) {
  const xata = getXataClient();

  const user = await xata.db.Users.create({
    id: userId,
    credits: defaultCredits,
  });

  return user;
}

export async function deleteUser(userId: string) {
  const xata = getXataClient();

  const user = await xata.db.Users.delete(userId);

  return user;
}
