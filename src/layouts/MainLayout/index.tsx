import { ReactNode } from "react";
import { cn } from "@bem-react/classname";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Menu from "../../components/Menu";

import "./style.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type Props = {
    children?: ReactNode;
};

const cnContent = cn("mainLayout");

export default function MainLayout(props: Props) {
    const lastName = useSelector(
        (state: RootState) => state.profile.user.firstname
    );
    const name = useSelector((state: RootState) => state.profile.user.lastname);
    const avatar = useSelector((state: RootState) => state.profile.avatar);

    return (
        <div className={cnContent()}>
            <div className={cnContent("container")}>
                <Menu />
                <div className={cnContent("wrapper")}>
                    <Header
                        displayName={`${name} ${lastName}`}
                        imageUrl={avatar}
                    />
                    <section className={cnContent("main")}>
                        {props.children}
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}
