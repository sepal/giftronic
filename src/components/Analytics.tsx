"use client";
import { useJune } from "@/lib/hooks/useJune";
import { useAuth, useUser } from "@clerk/nextjs";

const UserAnalytics = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const analytics = useJune();

  if (!isLoaded || !isSignedIn || !user) {
    return null;
  }

  analytics?.identify(user.id, {
    email: user.emailAddresses[0].emailAddress,
    avatar: user.imageUrl,
  });
  return <></>;
};

export { UserAnalytics };
