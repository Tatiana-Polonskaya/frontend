const daysMap = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const isBissextile = (year: number) =>
    (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;

export default function isValidDate(year: number, month: number, day: number) {
    if (day > 31 || day < 1 || month > 12 || month < 1 || year < 1869) {
        return false;
    }

    const monthDays =
        month == 2 && isBissextile(year) ? 29 : daysMap[month - 1];
    if (day > monthDays) {
        return false;
    }

    return true;
}
