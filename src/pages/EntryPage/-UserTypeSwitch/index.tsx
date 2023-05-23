import { UserType } from "../../../models/entry";
import { setUserType } from "../../../store/slices/entry";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { cn } from "@bem-react/classname";

import Tab from "../../../components/ui-kit/Tab";

import "./style.scss";

const cnUserTypeSwitch = cn("user-type-switch");

export default function UserTypeSwitch() {
    const userType = useAppSelector((state) => state.entry.userType);
    const dispatch = useAppDispatch();
    return (
        <div className={cnUserTypeSwitch()}>
            <Tab
                selected={userType === UserType.Personal}
                onClick={() => dispatch(setUserType(UserType.Personal))}
            >
                Для себя
            </Tab>
            <Tab
                selected={userType === UserType.Business}
                onClick={() => dispatch(setUserType(UserType.Business))}
            >
                Для бизнеса
            </Tab>
        </div>
    );
}
