import { cn } from "@bem-react/classname";
import "./style.scss";

type MessageProps = {
    senderName?: string;
    senderDescription?: string;
    time?: string;
    message: string;
    mine?: boolean;
};

const cnMessage = cn("chat-message");

export default function ChatMessage(props: MessageProps) {
    return (
        <div className={cnMessage(null, [cnMessage(props.mine ? "mine" : "other")])}>
            <div className={cnMessage("header")}>
                <div className={cnMessage("sender-info")}>
                    <span className={cnMessage("sender-name")}>{props.senderName || "sender name"}</span>
                    <span>{props.time || "00:00"}</span>
                </div>
                {!props.mine && (
                    <div className={cnMessage("sender-description")}>
                        <span>{props.senderDescription || "sender description"}</span>
                    </div>
                )}
            </div>
            <span>{props.message}</span>
        </div>
    );
}
