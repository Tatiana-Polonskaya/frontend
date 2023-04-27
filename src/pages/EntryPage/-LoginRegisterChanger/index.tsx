import { cn } from "@bem-react/classname";
import { UserType } from "../types";
import Link from "../../../components/ui-kit/Link";
import { PageType } from "../types";
import { useNavigate } from "react-router-dom";

import "./style.scss";

interface LoginRegisterChangerProps {
    pageType: PageType;
}

const cnLoginRegisterChanger = cn("login-register-changer");

export default function LoginRegisterChanger(props: LoginRegisterChangerProps) {
    const navigate = useNavigate();
    return (
        <div className={cnLoginRegisterChanger()}>
            <span>
                {props.pageType === PageType.Register ? (
                    <>Уже есть аккаунт?</>
                ) : (
                    <>Еще нет аккаунта?</>
                )}
            </span>
            {props.pageType === PageType.Register ? (
                <Link onClick={() => navigate("/login")}>Войти</Link>
            ) : (
                <Link onClick={() => navigate("/register")}>
                    Зарегистрироваться
                </Link>
            )}
        </div>
    );
}
