import { getXataClient } from "@/lib/xata";

const defaultCredits = 10;

export class UserOutOfCreditsError extends Error {
  constructor(userId: string) {
    super(`User ${userId} doesn't has enough credits.`);
  }
}
export async function createUser(userId: string) {
  const xata = getXataClient();

  const user = await xata.db.Users.create({
    id: userId,
    credits: defaultCredits,
  });

  return user;
}

export async function deductCredits(userId: string, toDeduct = 1) {
  const xata = getXataClient();

  const user = await xata.db.Users.readOrThrow(userId);

  const credits = user.credits;

  if (credits <= 0) {
    throw new UserOutOfCreditsError(userId);
  }

  const newCredits = credits - toDeduct;

  if (newCredits < 0) {
    throw new UserOutOfCreditsError(userId);
  }

  const updated = await user.update({
    credits: newCredits,
  });

  if (!updated) {
    throw new Error(`Failed to updated credits for user ${userId}`);
  }

  return updated.credits;
}

export async function getUser(userId: string) {
  const xata = getXataClient();
  const user = await xata.db.Users.read(userId);
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

export async function canGenerateVideo(userId: string): Promise<boolean> {
  const xata = getXataClient();

  const user = await xata.db.Users.read(userId);
  if (!user) return false;
  return user.credits > 0;
}
