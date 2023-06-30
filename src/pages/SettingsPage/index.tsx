import MainLayout from "../../layouts/MainLayout";
import BadGoodBlock from "../../components/BadGoodBlock";
import BlockGeneralAnalytics from "../../components/BlockGeneralAnalytics";

export default function SettingsPage() {
    return (
        <MainLayout>
            <div>SettingsPage</div>
            <BadGoodBlock/>
            <BlockGeneralAnalytics N={9}  rank={"sdvsd"}/>
        </MainLayout>
    );
}
