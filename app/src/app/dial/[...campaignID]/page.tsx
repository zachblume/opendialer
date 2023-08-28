import { Box, Tab, Tabs, Tooltip } from "@mui/material";
import DataGridWrapper from "../../DataGrid";
import supabase from "@/lib/supabase";
import Link from "next/link";

// NextJS app dir cache- always dynamically generate:
export const revalidate = 0;

type DialPageProps = {
    params: {
        campaignID: string;
    };
};

export default async function DialPage({ params }: DialPageProps) {
    const { campaignID: rawParams } = params;
    const campaignID = rawParams?.[0];
    const tab = rawParams?.[1] || "contacts";

    return (
        <>
            <CampaignName campaignID={campaignID} />
            {/* <Wrapper campaignID={campaignID} tab={tab} /> */}
        </>
    );
}

const CampaignName = async ({ campaignID }: { campaignID: string }) => {
    const { data: campaign, error } = await supabase
        .from("campaigns")
        .select()
        .eq("id", campaignID)
        .single();
    const link = `/dial/${campaignID}`;
    return (
        <>
            <Tooltip title={campaignID} arrow placement="bottom-start">
                <h2>Campaign: {campaign.name}</h2>
            </Tooltip>
            <p>{campaign.description}</p>
            <p>
                Public dialer link:{" "}
                <a href={link} target="_new">
                    {link}
                </a>
            </p>
        </>
    );
};
