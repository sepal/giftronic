"use client";
import { useJune } from "@/lib/hooks/useJune";
import { useAuth, useUser } from "@clerk/nextjs";
import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";

const UserAnalytics = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const analytics = useJune();
  const posthog = usePostHog();
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) {
      return;
    }
    posthog.identify(user.id, {
      email: user.emailAddresses[0].emailAddress,
    });
  }, []);

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
