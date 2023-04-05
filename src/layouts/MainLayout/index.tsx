import "./style.css";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import { ReactElement, ReactFragment } from "react";
import Header from "../../components/Header";

type ReactNode = ReactFragment | boolean | null | undefined;

type Props = {
    children: ReactNode;
};

export default function MainLayout(props: Props) {
    return (
        <>
            <Menu />
            <div className="content">
                <Header />
                <div className="main-content-wrapper">
                    <section className="main-content">{props.children}</section>
                </div>
                <Footer />
            </div>
        </>
    );
}
