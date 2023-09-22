import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { addToValue1, changeValue2 } from "../../store/slices/testSlice";

export default function TestStoreComponent() {
    const dispatch: AppDispatch = useDispatch();
    const value1: number = useSelector((state: RootState) => state.test.value1);
    const value2: string = useSelector((state: RootState) => state.test.value2);

    return (
        <>
            <div>
                <span>Value1 (number): {value1}</span>
                <button onClick={() => dispatch(addToValue1(1))}>+1</button>
            </div>
            <div>
                <span>Value2 (string): {value2}</span>
                <button onClick={() => dispatch(changeValue2(`${value2}a`))}>
                    +a
                </button>
            </div>
        </>
    );
}
