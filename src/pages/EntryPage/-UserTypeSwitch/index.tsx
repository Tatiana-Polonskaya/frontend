import Tab from "../../../components/ui-kit/Tab";
import { UserType } from "../types";

interface UserTypeSwitchProps {
    currentType: UserType;
    setter: Function;
}

export default function UserTypeSwitch(props: UserTypeSwitchProps) {
    return (
        <>
            <Tab
                selected={props.currentType === UserType.Personal}
                onClick={() => props.setter(UserType.Personal)}
            >
                Для себя
            </Tab>
            <Tab
                selected={props.currentType === UserType.Business}
                onClick={() => props.setter(UserType.Business)}
            >
                Для бизнеса
            </Tab>
        </>
    );
}
