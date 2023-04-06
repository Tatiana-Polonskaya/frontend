import MainLayout from "../../layouts/MainLayout";

export default function HomePage() {
    const createTestContainers = (n: number) =>
        new Array(n).fill(undefined).map((_, i) => <div key={i}>{i}</div>);

    return <MainLayout>{createTestContainers(50)}</MainLayout>;
}
