import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/generate",
    "/meme/(rec_[\\w\\d]+)",
    "/meme/(rec_[\\w\\d]+)/edit",
    "/api/user/webhook",
    "/api/video",
    "/api/video/(rec_[\\w\\d]+)",
    "/api/video/(rec_[\\w\\d]+)/file",
    "/api/video/(rec_[\\w\\d]+)/generation",
    "/api/meme",
    "/api/meme/(rec_[\\w\\d]+)",
    "/api/meme/(rec_[\\w\\d]+)/file",
    "/(rec_[\\w\\d]+)/edit",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
