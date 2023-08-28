import { Button, TextField } from "@mui/material";

// redirectMe server action
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

async function redirectMe(formData: FormData) {
    "use server";
    // const id = await addPost();
    revalidateTag("posts"); // Update cached posts
    redirect(
        `/dial/${formData.get("campaignId")}/${formData.get("dialInNumber")}`
    ); // Navigate to new route
}

export default function SignIn({ campaignID }: { campaignID: string }) {
    // Basically, this is a form with a text input with name dialInNumber using MUI TextField
    // and a submit button using MUI Button, that then sets the dialInNumber in the URL which is the second router param
    return (
        <form action={redirectMe} className="space-y-3 flex-col">
            <label htmlFor="dialInNumber">Dial In Number</label>
            <input type="hidden" name="campaignId" value={campaignID} />
            <TextField name="dialInNumber" id="dialInNumber" type="number" />
            <Button type="submit">Sign In</Button>
        </form>
    );
}
