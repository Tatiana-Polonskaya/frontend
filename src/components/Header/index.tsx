import { cn } from "@bem-react/classname";
import ProfilePreview from "../ProfilePreview";

import Arrow from "./icons/arrow.svg";
import NotificationStatus from "./icons/notification-status.svg";
import { ReactSVG } from "react-svg";

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
                    <ReactSVG src={NotificationStatus} wrapper="span"/>
                    <span>Уведомления</span>
                    <ReactSVG src={Arrow} wrapper="span"/>
                </div>
            </div>
        </header>
    );
}
