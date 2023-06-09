import { Link, Outlet} from "react-router-dom";
import EmptyLayout from "../../../layouts/EmptyLayout";




export default function RecodingPage() {

    return (
        <EmptyLayout>
            <nav>
                <Link to="about">About</Link>
            </nav>
            <Outlet />
        </EmptyLayout>
    );
}