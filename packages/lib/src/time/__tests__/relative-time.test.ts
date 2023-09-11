import { dateDiff, formatLargestPart } from '../relative-time.js';

test('formatLargestPart', () => {
    expect(formatLargestPart({ years: 0, months: 0, days: 0 })).toEqual('0 days');
    expect(formatLargestPart({ years: 0, months: 0, days: 1 })).toEqual('1 day');
    expect(formatLargestPart({ years: 0, months: 0, days: 4 })).toEqual('4 days');
    expect(formatLargestPart({ years: 0, months: 1, days: 0 })).toEqual('1 month');
    expect(formatLargestPart({ years: 0, months: 1, days: 6 })).toEqual('1 month');
    expect(formatLargestPart({ years: 0, months: 2, days: 0 })).toEqual('2 months');
    expect(formatLargestPart({ years: 1, months: 0, days: 0 })).toEqual('1 year');
    expect(formatLargestPart({ years: 1, months: 1, days: 6 })).toEqual('1 year');
    expect(formatLargestPart({ years: 2, months: 0, days: 0 })).toEqual('2 years');
});

test('dateDiff', () => {
    const firstDate = new Date();
    firstDate.setFullYear(2023);
    firstDate.setMonth(6);
    firstDate.setDate(12);
    const secondDate = new Date();
    secondDate.setFullYear(2023);
    secondDate.setMonth(6);
    secondDate.setDate(13);

    expect(dateDiff(firstDate, secondDate)).toEqual({ years: 0, months: 0, days: 1 });

    secondDate.setMonth(8);
    expect(dateDiff(firstDate, secondDate)).toEqual({ years: 0, months: 2, days: 1 });

    secondDate.setFullYear(2027);
    expect(dateDiff(firstDate, secondDate)).toEqual({ years: 4, months: 2, days: 1 });
});
