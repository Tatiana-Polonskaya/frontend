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

const cnContent = cn("content");

export default function MainLayout(props: Props) {
    const lastName = useSelector((state: RootState) => state.profile.lastName);
    const name = useSelector((state: RootState) => state.profile.name);
    return (
        <>
            <div className={cnContent()}>
                <Menu />
                <div className={cnContent("wrapper")}>
                    <Header displayName={`${name} ${lastName}`}/>
                    <section className={cnContent("main")}>
                        {props.children}
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
}
