import Replicate from "replicate";

let replicate: Replicate | null = null;

export function getReplicate() {
  if (replicate) return replicate;

  replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  return replicate;
}
