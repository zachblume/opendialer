import Button from "@mui/material/Button";
import Link from "next/link";
import DataGridWrapper from "./DataGrid";
import supabase from "@/lib/supabase";

// NextJS app dir cache- always dynamically generate:
export const revalidate = 0;

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
