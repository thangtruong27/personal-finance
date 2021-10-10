import get from 'lodash/get';
import set from 'lodash/set';
import moment from 'moment';

export enum ExpenseCategory {
  Rent = 'Rent', // fixed monthly house rent, including electricity, internet, phone
  Food = 'Food',
  Transport = 'Transport',
  HealthMaintaince = 'HealthMaintaince',
  Entertainment = 'Entertainment', // includes movies, traveling, monthly subscription.
  Education = 'Education',
  Other = 'Other', // incurred
}
export type DailyData = {
  date: string;
  amount: string;
  category: ExpenseCategory;
};

export type byCategory = {
  [key in ExpenseCategory]?: {
    key: ExpenseCategory;
    totalAmount: number;
  };
};

export type DayData = {
  data: DailyData[];
  byCategory?: byCategory;
  totalAmount: number;
};

export type MonthData = {
  [key: number]: DayData;
  byCategory: byCategory;
  totalAmount: number;
};

export type YearData = {
  [key: number]: MonthData;
  byCategory: byCategory;
  totalAmount: number;
};

export type ReduxData = {
  [key: number]: YearData;
  totalAmount: number;
};

export default function processData(data: unknown[]) {
  const allDailyData: ReduxData = {
    totalAmount: 0,
  };
  for (let idx = 0; idx < data.length; idx++) {
    const rowData = data[idx];
    const rowDate = get(rowData, 'date');
    const rowAmount = get(rowData, 'amount', 0);
    const rowCategory: ExpenseCategory = get(rowData, 'category');

    if (
      rowDate &&
      rowAmount &&
      rowCategory &&
      Object.values(ExpenseCategory).includes(rowCategory)
    ) {
      const currentTime = moment(rowDate);
      const currentYear = currentTime.get('year');
      const currentMonth = currentTime.get('month') + 1;
      const currentWeek = currentTime.get('week');
      const currentDay = currentTime.get('date');

      /* calculate for the day*/
      // add data
      set(
        allDailyData,
        [currentYear, currentMonth, currentDay, 'data'],
        [
          ...get(allDailyData, [currentYear, currentMonth, currentDay, 'data'], []),
          {
            date: currentTime.format('YYYY/MM/DD'),
            category: rowCategory,
            amount: rowAmount,
          },
        ]
      );
      // calculate total amount
      set(
        allDailyData,
        [currentYear, currentMonth, currentDay, 'totalAmount'],
        get(allDailyData, [currentYear, currentMonth, currentDay, 'totalAmount'], 0) + rowAmount
      );
      // calculate amount by category
      set(allDailyData, [currentYear, currentMonth, currentDay, 'byCategory', rowCategory], {
        key: rowCategory,
        totalAmount:
          get(
            allDailyData,
            [currentYear, currentMonth, currentDay, 'byCategory', rowCategory, 'totalAmount'],
            0
          ) + rowAmount,
      });

      /*calculate for the month*/
      set(
        allDailyData,
        [currentYear, currentMonth, 'totalAmount'],
        get(allDailyData, [currentYear, currentMonth, 'totalAmount'], 0) + rowAmount
      );

      set(allDailyData, [currentYear, currentMonth, 'byCategory', rowCategory], {
        key: rowCategory,
        totalAmount:
          get(
            allDailyData,
            [currentYear, currentMonth, 'byCategory', rowCategory, 'totalAmount'],
            0
          ) + rowAmount,
      });

      /*calculate for the year*/
      set(
        allDailyData,
        [currentYear, 'totalAmount'],
        get(allDailyData, [currentYear, 'totalAmount'], 0) + rowAmount
      );

      set(allDailyData, [currentYear, 'byCategory', rowCategory], {
        key: rowCategory,
        totalAmount:
          get(allDailyData, [currentYear, 'byCategory', rowCategory, 'totalAmount'], 0) + rowAmount,
      });

      allDailyData.totalAmount += rowAmount;
    }
  }

  return allDailyData;
}
