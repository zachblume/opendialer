import { Box, Tab, Tabs, Tooltip } from "@mui/material";
import DataGridWrapper from "../../DataGrid";
import supabase from "@/lib/supabase";
import Link from "next/link";

// NextJS app dir cache- always dynamically generate:
export const revalidate = 0;

type CampaignPageProps = {
    params: {
        campaignID: string;
    };
};

export default async function CampaignPage({ params }: CampaignPageProps) {
    const { campaignID: rawParams } = params;
    const campaignID = rawParams?.[0];
    const tab = rawParams?.[1] || "contacts";

    return (
        <>
            <CampaignName campaignID={campaignID} />
            <Wrapper campaignID={campaignID} tab={tab} />
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

const DataGridWrapperL2 = async ({ campaignID }: { campaignID: string }) => {
    const { data: rows, error } = await supabase
        .from("people")
        .select()
        .eq("campaign_id", campaignID);
    return <DataGridWrapper table={"people"} rows={rows || []} />;
};

async function Wrapper({
    campaignID,
    tab,
}: {
    campaignID: string;
    tab: string;
}) {
    const linkBase = `/admin/campaigns/${campaignID}`;
    const tabs = [
        {
            label: "Contacts",
            value: "contacts",
            content: <DataGridWrapperL2 campaignID={campaignID} />,
        },
        { label: "Script", value: "script" },
        { label: "Results", value: "results" },
        { label: "Publish", value: "publish" },
    ].map((tab) => ({ ...tab, link: `${linkBase}/${tab.value}` }));

    const currentTabContent = tabs.find((t) => t.value === tab)?.content;

    return (
        <>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    marginBottom: "1rem",
                }}
            >
                <Tabs value={tab}>
                    {tabs.map((tab) => (
                        <Tab
                            label={tab.label}
                            value={tab.value}
                            key={tab.value}
                            component={Link}
                            href={tab.link}
                        />
                    ))}
                </Tabs>
            </Box>
            {currentTabContent}
        </>
    );
}
