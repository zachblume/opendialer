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
            <DataGridWrapper
                rows={campaigns || []}
                columns={[
                    { field: "name", headerName: "Name" },
                    { field: "status", headerName: "Status" },
                    {
                        field: "created_at",
                        headerName: "Date Created",
                        type: "date",
                    },
                    { field: "progress", headerName: "Progress %" },
                ]}
            />
        </>
    );
}
