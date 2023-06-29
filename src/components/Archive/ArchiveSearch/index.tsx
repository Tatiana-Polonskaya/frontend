import { cn } from "@bem-react/classname";
import "./style.scss";

import { ReactSVG } from "react-svg";

import SearchIcon from "./icon/search-status.svg";
import { useState } from "react";

type Props = { updateSearch: any };

export default function ArchiveSearch({ updateSearch }: Props) {
    const handleChange = () => {
        updateSearch(value);
    };

    const [value, setValue] = useState("");

    // console.log(value);
    const cnArchiveSearch = cn("archive-search");

    return (
        <div className={cnArchiveSearch("")}>
            <ReactSVG src={SearchIcon} />
            <input
                type="text"
                className={cnArchiveSearch("text")}
                placeholder="Введите название видео"
                onChange={(event) => {
                    setValue(event.target.value);
                }}
            />
            <button
                type="button"
                className={cnArchiveSearch("btn")}
                onClick={handleChange}
            >
                {"Найти"}
            </button>
        </div>
    );
}
