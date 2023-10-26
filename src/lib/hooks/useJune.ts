import { useEffect, useState } from "react";
import { AnalyticsBrowser } from "@june-so/analytics-next";

export function useJune() {
  const [analytics, setAnalytics] = useState<AnalyticsBrowser | undefined>();
  const JUNE_KEY = process.env.NEXT_PUBLIC_JUNE_KEY;

  useEffect(() => {
    if (!JUNE_KEY) {
      return;
    }

    const loadAnalytics = async () => {
      let response = AnalyticsBrowser.load({
        writeKey: JUNE_KEY,
      });

      setAnalytics(response);
    };

    loadAnalytics();
  }, [JUNE_KEY]);

  return analytics;
}
