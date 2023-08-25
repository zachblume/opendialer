// import { UploadFile } from "@mui/icons-material";
// import { Button, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import UploadFile from "@mui/icons-material/UploadFile";
import { parse } from "csv-parse/sync";

// handleUpload server action nextjs
async function handleUpload(data: any) {
    "use server";
    // get the file and turn it into json
    const name = data.get("name");
    const file = data.get("file");
    const text = await file.text();
    const parsed = parse(text, {
        columns: true,
        skip_empty_lines: true,
    });
    console.log({ parsed });
}

// This page is for creating a new dialer campaign
export default function CreateCampaignPage() {
    return (
        <>
            <h1>Create Campaign</h1>
            <form className="space-y-3" action={handleUpload}>
                {/* Start with the name */}
                <TextField placeholder="Campaign Name" size="small" fullWidth name="name" />
                <div>
                    <Button component="label" variant="outlined" startIcon={<UploadFile />}>
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
