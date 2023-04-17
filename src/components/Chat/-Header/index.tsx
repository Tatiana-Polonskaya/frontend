import { cn } from "@bem-react/classname";

import "./style.scss";
import { useContext } from "react";
import { ChatContext } from "..";
import { ReactSVG } from "react-svg";
import ExpandIcon from "./icons/expand.svg";

const cnChatHeader = cn("chat-header");

export default function ChatHeader() {
    const { isExpanded, setIsExpanded } = useContext(ChatContext);

    return (
        <div className={cnChatHeader({ expanded: isExpanded })}>
            <ReactSVG
                src={ExpandIcon}
                onClick={() => setIsExpanded((prev) => !prev)}
                className={cnChatHeader("expand-btn")}
                wrapper="div"
                style={{ rotate: isExpanded ? "-90deg" : "90deg" }}
            />
            <span className={cnChatHeader("title")}>Чат поддержки</span>
        </div>
    );
}
