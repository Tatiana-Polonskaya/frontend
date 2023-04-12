import MainLayout from "../../layouts/MainLayout";
import Chat from "../../components/Chat";

export default function TestPage() {
    return (
        <MainLayout>
            <div
                style={{
                    border: "1px solid red",
                    width: "500px",
                    height: "600px",
                    backgroundColor: "black",
                }}
            >
                <Chat />
            </div>
        </MainLayout>
    );
}
