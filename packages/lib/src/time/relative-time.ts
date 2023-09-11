type TimeSections = {
    years: number;
    months: number;
    days: number;
};

export function formatLargestPart(timeSections: TimeSections): string {
    const keys: Intl.RelativeTimeFormatUnit[] = ['years', 'months', 'days'];
    const largestPart = keys.find((key) => timeSections[key] > 0);

    if (!largestPart) return '0 days';

    const rtf1 = new Intl.RelativeTimeFormat('en', { numeric: 'always' });
    const parts = rtf1.formatToParts(timeSections[largestPart], largestPart);

    console.log(parts, largestPart);

    return `${parts[1].value}${parts[2].value}`;
}

export function dateDiff(startingDate: Date, endingDate: Date): TimeSections {
    const startYear = startingDate.getFullYear();
    const february =
        (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
    const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let yearDiff = endingDate.getFullYear() - startYear;
    let monthDiff = endingDate.getMonth() - startingDate.getMonth();
    if (monthDiff < 0) {
        yearDiff--;
        monthDiff += 12;
    }
    let dayDiff = endingDate.getDate() - startingDate.getDate();
    if (dayDiff < 0) {
        if (monthDiff > 0) {
            monthDiff--;
        } else {
            yearDiff--;
            monthDiff = 11;
        }
        dayDiff += daysInMonth[startingDate.getMonth()];
    }

    return { years: yearDiff, months: monthDiff, days: dayDiff };
}
