import Button from "@mui/material/Button";
import Link from "next/link";
import DataGridWrapper from "./DataGrid";
import supabase from "@/lib/supabase";

/* 
This page lets you:
 - Create a campaign
 - Upload .csv of phone numbers
 - Create a basic script
 - Publish to a unique URL
*/

// NextJS app dir cache- always dynamically generate:
export const revalidate = 0;

export default async function AdminPage() {
    const { data: campaigns, error } = await supabase
        .from("campaigns")
        .select();
    if (error) {
        console.error(error);
        return JSON.stringify(error);
    }

    return (
        <>
            <div className="flex space-x-3">
                <h2>Campaigns</h2>
                <div>
                    <Link href="/admin/campaigns/create">
                        <Button variant="contained">Create</Button>
                    </Link>
                </div>
            </div>
            <DataGridWrapper table="campaigns" rows={campaigns || []} />
        </>
    );
}
