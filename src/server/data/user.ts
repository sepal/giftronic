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

export async function canEditMeme(userId: string, memeId: string) {
  const xata = getXataClient();

  const meme = await xata.db.Memes.read(memeId);
  if (!meme || !meme.createdBy) return false;
  return meme.createdBy.id == userId;
}
