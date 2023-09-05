export const addDaysToDate = function (days: number, date = new Date()) {
    var newDate = new Date(date.valueOf());
    newDate.setDate(date.getDate() + days);
    return newDate;
};