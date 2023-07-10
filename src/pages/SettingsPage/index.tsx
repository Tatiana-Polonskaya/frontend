import MainLayout from "../../layouts/MainLayout";
import BannerPersonalArea from "../../components/BannerPersonalArea";

export default function SettingsPage() {
    return (
        <MainLayout>
            <div>SettingsPage</div>
            <BannerPersonalArea tariff={"Maxi"} countRep={10} />
        </MainLayout>
    );
}
