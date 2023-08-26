import DataGridWrapper from "../../DataGrid";
import supabase from "@/lib/supabase";
type CampaignPageProps = {
    params: {
        campaignID: string;
    };
};
export default async function CampaignPage({ params }: CampaignPageProps) {
    const { campaignID } = params;
    const { data: campaign, error } = await supabase
        .from("campaigns")
        .select()
        .eq("id", campaignID)
        .single();

    return (
        <>
            <h2>Campaign: {campaign.name}</h2>
            <p>{campaign.description}</p>
            <Wrapper campaignID={campaignID} />
        </>
    );
}

const columns = [
    { field: "first_nmae", headerName: "First Name" },
    { field: "last_name", headerName: "Last Name" },
    { field: "phone_number", headerName: "Phone Number" },
];

async function Wrapper({ campaignID }: { campaignID: string }) {
    const { data: rows, error } = await supabase
        .from("people")
        .select()
        .eq("campaign_id", campaignID);
    return <DataGridWrapper rows={[...(rows || [])]} columns={columns} />;
}
