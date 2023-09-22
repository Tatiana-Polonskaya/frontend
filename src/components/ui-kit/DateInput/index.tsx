import { cn } from "@bem-react/classname";
import "./style.scss";
import { useEffect, useState } from "react";
// import IntegerInput from "../IntegerInput";
import Input from "../Input";
import isValidDate from "../../../tools/validations/dateValidation";

const cnDateInput = cn("date-input");

type NumStateAlias = [
    number | undefined,
    React.Dispatch<React.SetStateAction<number | undefined>>,
];

interface IDateInputProps {
    label?: string;
    required?: boolean;
    dayState: NumStateAlias;
    monthState: NumStateAlias;
    yearState: NumStateAlias;
}

const MIN_YEAR = 1900;
const MAX_YEAR = new Date().getFullYear();

export default function DateInput(props: IDateInputProps) {
    const [day, setDay] = props.dayState;
    const [month, setMonth] = props.monthState;
    const [year, setYear] = props.yearState;

    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        if (day && month && year) {
            setIsValid(isValidDate(year, month, day));
        }
    }, [day, month, year]);

    return (
        <div className={cnDateInput("main-field")}>
            <Input
                style={{ textAlign: "center" }}
                type="text"
                inputMode="numeric"
                placeholder="ДД"
                value={day}
                min={1}
                required={props.required}
                onChange={(e) => setDay(Number(e.target.value) || undefined)}
            />
            <Input
                style={{ textAlign: "center" }}
                type="number"
                placeholder="ММ"
                value={month}
                min={1}
                max={12}
                required={props.required}
                onChange={(e) => setMonth(Number(e.target.value) || undefined)}
            />
            <Input
                style={{ textAlign: "center" }}
                type="number"
                placeholder="ГГГГ"
                value={year}
                min={MIN_YEAR}
                max={MAX_YEAR}
                required={props.required}
                onChange={(e) => setYear(Number(e.target.value) || undefined)}
            />
        </div>
    );
}
