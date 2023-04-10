import { ReactNode } from "react";
import { cn } from "@bem-react/classname";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Menu from "../../components/Menu";

import "./style.scss";

type Props = {
    children?: ReactNode;
};

const cnContent = cn("content")

export default function MainLayout(props: Props) {

    

    return (
        <>
            <Menu />

            <div className={cnContent()}>
                <Header />
                <div className={cnContent("wrapper")}>
                    <section className={cnContent("main")}>{props.children}</section>
                </div>
                <Footer />
            </div>
        </>
    );
}
