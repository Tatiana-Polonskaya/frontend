export function convertTime(value: number | string) {
    value = typeof value !== "number" ? +value : value;
    return value < 10
        ? `00:0${value}`
        : value < 60
        ? `00:${value.toFixed(2)}`
        : value < 600
        ? `0${Math.floor(value / 60)}:${(value % 60)<1 ? "00" : Math.floor(value % 60)}`
        : `${Math.floor(value / 60)}:${value % 60}`;
}

export function convertDate(value: string) {
    return value.slice(0, 10).split("-").reverse().join(".");
}
