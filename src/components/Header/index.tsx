import { cn } from "@bem-react/classname";
import ProfilePreview from "../ProfilePreview";

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
                <div>Уведомления</div>
            </div>
        </header>
    );
}
