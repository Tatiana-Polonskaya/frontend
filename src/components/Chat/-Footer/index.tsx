import { cn } from "@bem-react/classname";
import "./style.scss";
const cnFooter = cn("chat-footer");

export default function ChatFooter() {
    return (
        <div className={cnFooter()}>
            <div className={cnFooter("message")}>
                <div contentEditable className={cnFooter("textarea")}></div>
            </div>
            <button className={cnFooter("send-btn")}>SEND</button>
        </div>
    );
}
