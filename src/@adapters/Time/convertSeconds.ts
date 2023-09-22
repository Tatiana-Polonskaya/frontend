export default function convertSecondsIntoTime(seconds: number): string {
    if (seconds < 10) {
        return `00:0${seconds.toFixed(0)}`;
    } else if (seconds < 60) {
        return `00:${seconds.toFixed(0)}`;
    } else if (seconds < 600 && seconds % 60 !== 0) {
        return `0${Math.floor(seconds / 60)}:${
            seconds % 60 < 10
                ? "0" + (seconds % 60).toFixed(0)
                : (seconds % 60).toFixed(0)
        }`;
    } else if (seconds < 600 && seconds % 60 === 0) {
        return `0${Math.floor(seconds / 60)}:${(seconds % 60).toFixed(0)}0`;
    } else {
        return `${Math.floor(seconds / 60)}:${(seconds % 60).toFixed(0)}`;
    }
}

export function convertSecondIntoPrettyDuration(seconds: number): string {
    return `${Math.floor(seconds / 60)} минут ${Math.floor(
        seconds % 60
    )} секунд`;
}
