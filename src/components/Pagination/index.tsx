import { ReactSVG } from "react-svg";

import "./style.scss";
import { cn } from "@bem-react/classname";

import arrow_left from "./arrows/arrow-left.svg";
import arrow_right from "./arrows/arrow-right.svg";

type Props = {
    videosPerPage: number;
    totalVideos: number;
    paginate: Function;
    funcNextPage: Function;
    funcPrevPage: Function;
    currentPage: number;
};

export default function Pagination(props: Props) {
    const pageNumbers = [];
    const maxPage = Math.ceil(props.totalVideos / props.videosPerPage);

    for (let i = 1; i <= maxPage; i++) {
        pageNumbers.push(i);
    }

    let currentPageNumbers = [];
    const numbersPerPagination = 5;
    const deltaPages = Math.floor(numbersPerPagination / 2);

    if (props.currentPage <= numbersPerPagination - 1) {
        currentPageNumbers = pageNumbers.slice(0, numbersPerPagination);
    } else if (props.currentPage + deltaPages > maxPage) {
        let tempDelta =
            Math.abs(maxPage - (props.currentPage + deltaPages)) + deltaPages;
        currentPageNumbers = pageNumbers.slice(
            props.currentPage - tempDelta - 1,
            maxPage
        );
    } else {
        currentPageNumbers = pageNumbers.slice(
            props.currentPage - deltaPages - 1,
            props.currentPage + deltaPages
        );
    }

    const cnPagination = cn("pagination-block");

    return (
        <div className={cnPagination()}>
            <>
                <div
                    className={cnPagination("button", {
                        active: props.currentPage !== pageNumbers[0],
                    })}
                >
                    <ReactSVG
                        src={arrow_left}
                        onClick={() => props.funcPrevPage()}
                        className={cnPagination("button-svg")}
                    />
                </div>
                {currentPageNumbers.at(0) !== pageNumbers.at(0) && (
                    <div className={cnPagination("dot")}>...</div>
                )}

                {currentPageNumbers.map((number) => (
                    <div
                        key={number}
                        className={cnPagination("number", {
                            current: number === props.currentPage,
                        })}
                        onClick={() => props.paginate(number-1)}
                    >
                        {number}
                    </div>
                ))}

                {currentPageNumbers.at(-1) !== pageNumbers.at(-1) && (
                    <div className={cnPagination("dot")}>...</div>
                )}
                <div
                    className={cnPagination("button", {
                        active: props.currentPage !== maxPage,
                    })}
                >
                    <ReactSVG
                        src={arrow_right}
                        onClick={() => props.funcNextPage(maxPage)}
                    />
                </div>
            </>
        </div>
    );
}
