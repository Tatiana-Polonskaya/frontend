import { cn } from "@bem-react/classname";
import "./style.scss";

import PersonalArea from "../PersonalArea";

export default function SettingsStart() {
    const cnSettingsStart = cn("SettingsStart");

    return <PersonalArea isArchive={false} />;
}
