import DialerView from "./DialerView";
import SignIn from "./SignIn";
import SubscriptionWrapper from "./SubscriptionWrapper";

type DialerInterfaceProps = {
    campaignID: string;
    dialInNumber: number | null;
};

export default function DialerInterface({
    campaignID,
    dialInNumber,
}: DialerInterfaceProps) {
    // If dialInNumber is null,
    if (!dialInNumber) return <SignIn campaignID={campaignID} />;

    // If dialInNumber is not null, let's start a subscription to the server-side state for this combination
    // and serve that along with the view
    return (
        <>
            <SubscriptionWrapper
                campaignID={campaignID}
                dialInNumber={dialInNumber}
            />
            <DialerView campaignID={campaignID} dialInNumber={dialInNumber} />
        </>
    );
}
