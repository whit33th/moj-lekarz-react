import { subMonths, startOfMonth, endOfMonth } from 'date-fns';

const MONTH_NAMES = {
  1: 'Sty',
  2: 'Lut',
  3: 'Mar',
  4: 'Kwi',
  5: 'Maj',
  6: 'Cze',
  7: 'Lip',
  8: 'Sie',
  9: 'Wrz',
  10: 'Paź',
  11: 'Lis',
  12: 'Gru'
};

export function getLast5MonthsRanges() {
  return Array.from({ length: 5 }, (_, i) => {
    const date = subMonths(new Date(), i);
    return {
      startDate: startOfMonth(date),
      endDate: endOfMonth(date),
      name: MONTH_NAMES[date.getMonth() + 1]
    };
  }).reverse();
}
