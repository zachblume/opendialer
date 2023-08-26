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

export default async function AdminPage() {
    const { data: campaigns } = await supabase.from("campaigns").select();
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
