"use client";
import { useJune } from "@/lib/hooks/useJune";
import { useAuth, useUser } from "@clerk/nextjs";

const UserAnalytics = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn || !user) {
    return null;
  }

  const analytics = useJune();

  analytics?.identify(user.id, {
    email: user.emailAddresses[0].emailAddress,
    avatar: user.imageUrl,
  });
  return <></>;
};

export { UserAnalytics };
