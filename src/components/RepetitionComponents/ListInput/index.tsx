import { cn } from "@bem-react/classname";

import "./style.scss";
import { useState } from "react";

const cnButton = cn("button");

export default function ListInput() {
    const [countInput, setCountInput] = useState(1);

    const [arr, setArr] = useState(["Первый пункт"]);
    const [value, setValue] = useState("");

    const result = arr.map((element, index) => {
        return <p key={index} onDoubleClick={() => remove(index)}>
           {element}
        </p>;
     });
  
     function remove(index: number) {
        setArr([...arr.slice(0, index), ...arr.slice(index + 1)]);
     }

    return (
        <div>
            {result}
            <input
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
            <button onClick={(event) => setArr([...arr, value])}>
                Добавить элемент
            </button>
            <input type="text" />
            <button onClick={() => setCountInput((prev) => ++prev)}>
                Добавить еще пункт
            </button>
        </div>
    );
}
