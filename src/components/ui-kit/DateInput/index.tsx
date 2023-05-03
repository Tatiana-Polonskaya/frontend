import { cn } from "@bem-react/classname";
import "./style.scss";
import { useEffect, useState } from "react";
import IntegerInput from "../IntegerInput";
import isValidDate from "../../../tools/dateValidation";

const cnDateInput = cn("date-input");

interface IDateInputProps {
    label?: string;
}

export default function DateInput(props: IDateInputProps) {
    const [day, setDay] = useState<number>();
    const [month, setMonth] = useState<number>();
    const [year, setYear] = useState<number>();

    const [isValid, setIsValid] = useState(true);

    return (
        <div className={cnDateInput()}>
            <p className={cnDateInput("label")}>{props.label}</p>
            <div className={cnDateInput("main-field")}>
                <IntegerInput
                    className={cnDateInput("field", { wrong: !isValid })}
                    type="text"
                    placeholder="ДД"
                    value={day}
                    onChange={(e) =>
                        setDay(Number(e.target.value) || undefined)
                    }
                />
                <input
                    className={cnDateInput("field")}
                    type="text"
                    placeholder="ММ"
                    value={month}
                    onChange={(e) =>
                        setMonth(Number(e.target.value) || undefined)
                    }
                />
                <input
                    className={cnDateInput("field")}
                    type="text"
                    placeholder="ГГГГ"
                    value={year}
                    onChange={(e) =>
                        setYear(Number(e.target.value) || undefined)
                    }
                />
            </div>
        </div>
    );
}
