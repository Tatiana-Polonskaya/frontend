export const getTimeFromData = (datetime: string) => {
    return new Date(Date.parse(datetime)).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
    });
};
