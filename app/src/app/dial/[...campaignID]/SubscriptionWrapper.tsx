"use client";

import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// This "refreshes" i.e. re-fetches the page upon changes to the viewstate as subscribed by supabase
export default function SubscriptionWrapper({
    campaignID,
    dialInNumber,
}: {
    campaignID: string;
    dialInNumber: number | null;
}) {
    const router = useRouter();
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );
    useEffect(() => {
        const listenOptions = {
            event: "*",
            schema: "public",
            table: "calls",
            filter: `dial_in_number=eq.${dialInNumber},campaignID=eq.${campaignID}`,
        };

        const refresh = (payload: any) => router.refresh();

        const channel = supabase
            .channel("schema-db-changes")
            .on("postgres_changes" as "broadcast", listenOptions, refresh)
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, router, dialInNumber, campaignID]);
    return null;
}
