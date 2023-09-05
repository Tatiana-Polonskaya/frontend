import { ReactSVG } from "react-svg";
import EntryLayout from "../../layouts/EntryLayout";
import RegisterImagePersonal from "../EntryPage/RegisterPage/assets/reg-image-personal.svg";
import EmailVerification from "../EntryPage/RegisterPage/EmailVerification";

export default function LandingPage() {
    return (
        <EntryLayout image={<ReactSVG src={RegisterImagePersonal} />}>
            <EmailVerification />
            {/* {RegisterStep.Error === step && <ActivationErrorPage />} */}
        </EntryLayout>
    );
}
