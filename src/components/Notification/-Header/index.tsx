import { ReactSVG } from "react-svg";
import { useContext } from "react";
import { cn } from "@bem-react/classname";

import { NotificationContext } from "..";

import Arrow from "../icons/arrow.svg";
import NotificationStatus from "../icons/notification-status.svg";
import "./style.scss";

export default function HeaderNotification() {
    const cnHeaderNotification = cn("HeaderNotification");
    const {isShow, setIsShow}= useContext(NotificationContext);

    return (
        <div
            className={cnHeaderNotification()}
            onClick={() => setIsShow((prev) => !prev)}
        >
            <ReactSVG
                src={NotificationStatus}
                wrapper="span"
                className={cnHeaderNotification("icon")}
            />
            <span className={cnHeaderNotification("title")}>Уведомления</span>
            <ReactSVG
                src={Arrow}
                wrapper="span"
                className={cnHeaderNotification("icon")}
                style={{ rotate: isShow ? "180deg" : "" }}
            />
        </div>
    );
}
