import TestComponent from "../../components/TestApiComponent";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";

export default function TestPage() {
    return (
        <>

            <div className="above-footer">
                <TestComponent />
                <a href="/">to main page</a>
            </div>
            <Footer />
        </>
    );
}
