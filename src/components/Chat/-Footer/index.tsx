import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";
import SendIcon from "./icons/send.svg";

import "./style.scss";

const cnFooter = cn("chat-footer");

export default function ChatFooter() {
    return (
        <div className={cnFooter()}>
            <div className={cnFooter("send-area")}>
                <div contentEditable className={cnFooter("textarea")} />
            </div>
            <ReactSVG
                beforeInjection={(svg) =>
                    svg.addEventListener("click", () => console.log("send"))
                }
                src={SendIcon}
                className={cnFooter("send-btn")}
            />
        </div>
    );
}
