import { cn } from "@bem-react/classname";


import { ReactSVG } from "react-svg";

import statusUp from "../icons/status-up.svg";
import arrowIcon from "../icons/arrow.svg";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import RoutesEnum from "../../../models/routes";


type NotificationItem = {
    title:string,
    description: string,
    type: TYPE_NOTIFICATION,
    status: boolean,
    linkTitle: string,
}

export enum TYPE_NOTIFICATION {
    NOTICE="normal",
    LINK="link"
}

export default function NotificationItem({title,description,type,status,linkTitle}: NotificationItem) {
    const cnNotificationItem = cn("NotificationItem");

    const navigate = useNavigate();
    
    return (
        <div className={cnNotificationItem({blue:type===TYPE_NOTIFICATION.LINK})}>
            <div className={cnNotificationItem("circle",{visible:status})}></div>
            {type===TYPE_NOTIFICATION.NOTICE && (<div className={cnNotificationItem("icon")}><ReactSVG src={statusUp}/></div>)}
            <div className={cnNotificationItem("col")}>
                <div className={cnNotificationItem("title",{white:type===TYPE_NOTIFICATION.LINK})}>{title}</div>
                <div className={cnNotificationItem("description",{white:type===TYPE_NOTIFICATION.LINK})}>{description}</div>
               {type===TYPE_NOTIFICATION.LINK && (<div className={cnNotificationItem("link")} onClick={()=>navigate(RoutesEnum.SETTINGS)}>{linkTitle}<ReactSVG src={arrowIcon} wrapper="span" className={cnNotificationItem("link-icon")}/></div>)} 
            </div>
        </div>
    );
}
