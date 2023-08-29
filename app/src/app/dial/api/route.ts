// Configuration for the runtime environment
export const config = { runtime: "edge" };

// Import the necessary libraries and modules
import supabase from "@/lib/supabase";

// Endpoint URL for status updates
const statusUpdateEndpoint = "YOUR_STATUS_UPDATE_ENDPOINT";
const YOUR_NEXT_NUMBER_ENDPOINT = "YOUR_NEXT_NUMBER_ENDPOINT";
import calculateOverdialRate from "@/lib/dialRate";
const answerRate = 0.15; // Let's just assume 15% answer rate for now and calculate this more dynamically later
const overdialRate = calculateOverdialRate(answerRate);

// Define TypeScript types for incoming request and expected database responses
interface RequestBody {
    To: string;
    From: string;
}

/**
 * This function handles incoming Twilio POST requests. It can be triggered as an initial or a follow-up call.
 *
 * @param {Request} request - The incoming request object.
 * @returns {Response} - Returns a TwiML formatted response to instruct Twilio on how to proceed.
 */
export default async function POST(request: Request) {
    try {
        const body: RequestBody = await request.json();
        const { To, From } = body;

        // Runtime checks for request validation
        if (!From) {
            return new Response("Missing 'From' in request body.", {
                status: 400,
            });
        }

        // Response headers for Twilio and CORS
        const responseHeaders: Record<string, string> = {
            "Content-Type": "text/xml",
            "Cache-Control": "no-cache, no-store",
            Pragma: "no-cache",
            Expires: "-1",
            "Twilio-Webhook-Enabled": "false",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "3600",
        };

        // Check to see if in the URL there is a campaign ID
        const url = new URL(request.url);
        const passedCampaignId = url.searchParams.get("current_campaign_id");
        let campaignId = passedCampaignId; // Start with the provided campaign ID, if any

        // If a campaign ID wasn't provided in the request, fetch it from the agent details
        if (!campaignId) {
            // Retrieve agent details based on the phone number
            const { data: agent, error: agentError } = await supabase
                .from("agents")
                .select("*")
                .match({ dialed_in_from: From })
                .single();

            if (agentError || !agent?.current_campaign_id) {
                console.error("Error fetching agent:", agentError);
                return new Response("Error processing request.", {
                    status: 500,
                    headers: responseHeaders,
                });
            }
            campaignId = agent.current_campaign_id;
        }
        const nextNumberEndpoint = `${YOUR_NEXT_NUMBER_ENDPOINT}?current_campaign_id=${campaignId}`;

        // Fetch N numbers from the database and mark them as "in progress"
        const { data: numbers, error: numbersError } = await supabase
            .from("people")
            .update({ status: "in progress" })
            .match({ campaign_id: campaignId })
            .limit(overdialRate)
            .select("*");

        if (numbersError || !Array.isArray(numbers) || !numbers?.length) {
            console.error("Error fetching numbers:", numbersError);
            return new Response("Error processing request.", {
                status: 500,
                headers: responseHeaders,
            });
        }

        // Construct the TwiML response for dialing multiple numbers with AMD enabled
        const twimlResponse: string = `
        <?xml version="1.0" encoding="UTF-8"?>
        <Response>
            <Dial action="${nextNumberEndpoint}" method="POST" callerId="${From}">
                ${numbers
                    .map(
                        (number) =>
                            `<Number
                        statusCallback="${statusUpdateEndpoint}"
                        statusCallbackEvent="initiated ringing answered completed"
                        statusCallbackMethod="POST"
                        machineDetection="Enable"
                        amdStatusCallback="${statusUpdateEndpoint}">
                        ${number.phone_number}
                    </Number>`
                    )
                    .join("")}
            </Dial>
        </Response>
    `;

        return new Response(twimlResponse, { headers: responseHeaders });
    } catch (error) {
        console.error("Error processing request:", error);
        return new Response("Error processing request.", {
            status: 500,
        });
    }
}
