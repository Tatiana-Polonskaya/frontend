export const addDaysToDate = function (days: number, date = new Date()) {
    const newDate = new Date(date.valueOf());
    newDate.setDate(date.getDate() + days);
    return newDate;
};
