// import { UploadFile } from "@mui/icons-material";
// import { Button, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import UploadFile from "@mui/icons-material/UploadFile";
import { parse } from "csv-parse/sync";
import { redirect } from "next/navigation";
import supabase from "@/lib/supabase";

// handleUpload server action nextjs
async function handleUpload(data: any) {
    "use server";

    // get the file and turn it into json
    const [name, file] = [data.get("name"), data.get("file")];
    const text = await file.text();
    const parsed = parse(text, { columns: true, skip_empty_lines: true }).map(
        // We want to lowercase all the keys and remove any spaces to be replaced with underscores
        (record: any) => {
            const newRecord: any = {};
            Object.keys(record).forEach((key) => {
                newRecord[key.toLowerCase().replace(" ", "_")] = record[key];
            });
            return newRecord;
        }
    );

    // Create a new campaign in the database
    const { data: newCampaign, error } = await supabase
        .from("campaigns")
        .insert({ name, status: "new" })
        .select()
        .single();
    if (error) console.log(error);
    else console.log("Successfully created campaign");

    // Upload each indivdiual record from parsed to db
    const processed = parsed.map((record: any) => ({
        phone_number: record.phone,
        first_name: record.first_name,
        last_name: record.last_name,
        fields: record,
        campaign_id: newCampaign.id,
    }));
    // console.log({ processed });
    const { data: newListMemberRecords, error: recordError } = await supabase
        .from("people")
        .insert(processed);
    if (recordError) console.log(recordError);
    else console.log("Successfully uploaded records");

    // invalidate the cache for /admin/campaigns and /admin/campaigns/[campaignID]

    redirect(`/admin/campaigns/${newCampaign.id}`);
}

// This page is for creating a new dialer campaign
export default function CreateCampaignPage() {
    return (
        <>
            <h2>Create Campaign</h2>
            <form className="space-y-3" action={handleUpload}>
                {/* Start with the name */}
                <TextField
                    placeholder="Campaign Name"
                    size="small"
                    fullWidth
                    name="name"
                />
                <div>
                    <Button
                        component="label"
                        variant="outlined"
                        startIcon={<UploadFile />}
                    >
                        Upload CSV
                        <input type="file" name="file" accept=".csv" hidden />
                    </Button>
                </div>
                <Button variant="contained" type="submit">
                    Next
                </Button>
            </form>
        </>
    );
}
