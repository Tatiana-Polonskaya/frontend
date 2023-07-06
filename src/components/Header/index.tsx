import { cn } from "@bem-react/classname";
import ProfilePreview from "../ProfilePreview";

import Notification from "../Notification";



import "./style.scss";

type Props = {
    imageUrl?: string;
    displayName?: string;
};

const cnHeader = cn("header");

export default function Header(props: Props) {
    return (
        <header className={cnHeader()}>
            <div className={cnHeader("content")}>
                <ProfilePreview {...props} />
                <div className={cnHeader("notifications")}>
                    <Notification />
                </div>
            </div>
        </header>
    );
}
