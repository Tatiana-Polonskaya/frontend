import { FunctionComponent } from "react";
import { useGetDataQuery } from "../../store/api/testApi";
import { TestServerObject } from "../../models";

export default function TestComponent(): JSX.Element {
    const { isLoading, isError, data } = useGetDataQuery();

    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>Error</div>;
    if (!data) return <div>No data</div>;

    return (
        <>
            {data.map((el: TestServerObject) => (
                <div key={el.id}>{el.name}</div>
            ))}
        </>
    );
}
