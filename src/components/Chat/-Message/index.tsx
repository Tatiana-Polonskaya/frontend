import { ReactNode } from "react";
import { cn } from "@bem-react/classname";
import "./style.scss";
import { IMessageItem } from "../../../models/chat";

const cnMessage = cn("chat-message");

const mineCnHelper = (is_mine: boolean) => ({ mine: is_mine, other: !is_mine });

type withArrowProps = {
    children?: ReactNode;
    is_mine: boolean;
};

const WithArrow = (props: withArrowProps) => (
    <>
        {!props.is_mine && <div className={cnMessage({ triangle: "other" })} />}
        {props.children}
        {props.is_mine && <div className={cnMessage({ triangle: "mine" })} />}
    </>
);


const getTimeFromData = (datetime: string) =>{
    const newdate = new Date(datetime);
    const minutes = newdate.getMinutes();
    const hours = newdate.getHours()+ 3;
    return (hours < 10 ? "0"+hours: hours) + ":" + (minutes < 10 ? "0"+minutes: minutes)
}

export default function ChatMessage(props: IMessageItem) {
    return (
        <div className={cnMessage("wrapper", mineCnHelper(props.is_mine))}>
            <WithArrow is_mine={props.is_mine}>
                <div className={cnMessage("actual", mineCnHelper(props.is_mine))}>
                    <div className={cnMessage("header")}>
                        <div className={cnMessage("header", { sender: "info" })}>
                            <span className={cnMessage("header", { sender: "name" })}>{props.is_mine ? "me" : "Команда поддержки SpeechUp"}</span>
                            <span>{getTimeFromData(props.created_at)}</span>
                        </div>
                        {!props.is_mine && (
                            <div className={cnMessage("header", { sender: "description" })}>{props.from_user}</div>
                        )}
                    </div>
                    <span>{props.text}</span>
                </div>
            </WithArrow>
        </div>
    );
}
