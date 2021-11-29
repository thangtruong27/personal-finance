import get from 'lodash/get';
import setWith from 'lodash/setWith';
import moment from 'moment';

//@ts-ignore
export function set(obj, path, value) {
  return setWith(obj, path, value, Object);
}
export const TOTAL_AMOUNT_KEY = 'totalAmount';
export const INCOME_KEY = 'totalIncome';
export const BY_CATEGORY_KEY = 'byCategory';

export enum ExpenseCategory {
  Housing = 'Housing', // fixed monthly house rent, including electricity, internet, phone
  Food = 'Food',
  Transport = 'Transport',
  Health = 'Health',
  Entertainment = 'Entertainment', // includes movies, traveling, monthly subscription.
  Education = 'Education',
  Other = 'Other', // incurred
}

export type ExpenseCategoryKeys = keyof typeof ExpenseCategory;
export type DailyData = {
  date: string;
  amount: string | number;
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
  totalIncome: number;
  totalAmount: number;
};

export type MonthData = {
  [key: string]: DayData | byCategory | number;
  byCategory: byCategory;
  totalIncome: number;
  totalAmount: number;
};

export type YearData = {
  [key: string]: MonthData | byCategory | number;
  byCategory: byCategory;
  totalIncome: number;
  totalAmount: number;
};

export type ReduxData = {
  [key: string]: YearData | number;
  totalIncome: number;
  totalAmount: number;
};

function processData(data: unknown[]) {
  const allDailyData: ReduxData = {
    totalAmount: 0,
    totalIncome: 0
  };
  for (let idx = 0; idx < data.length; idx++) {
    const rowData = data[idx];
    const rowDate = get(rowData, 'date');
    const rowAmount = get(rowData, 'amount', 0);
    const rowCategory: ExpenseCategory = get(rowData, 'category') || ExpenseCategory.Other;

    if (
      rowDate &&
      rowAmount
    ) {
      const currentTime = moment(rowDate);
      
      const currentYear = currentTime.get('year').toString();
      const currentMonth = (currentTime.get('month') + 1).toString();      
      const currentDay = currentTime.get('date').toString();
      
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

      // determine expense or income amount?
      const type =  parseInt(rowAmount) >= 0 ? TOTAL_AMOUNT_KEY : INCOME_KEY;
      const isExpense = type === TOTAL_AMOUNT_KEY;

      // calculate total amount/income
      set(
        allDailyData,
        [currentYear, currentMonth, currentDay, type],
        get(allDailyData, [currentYear, currentMonth, currentDay, type], 0) + rowAmount
      );

      // calculate expense by category
      isExpense && set(allDailyData, [currentYear, currentMonth, currentDay, 'byCategory', rowCategory], {
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
        [currentYear, currentMonth, type],
        get(allDailyData, [currentYear, currentMonth, type], 0) + rowAmount
      );

      isExpense && set(allDailyData, [currentYear, currentMonth, 'byCategory', rowCategory], {
        key: rowCategory,
        totalAmount:
          get(
            allDailyData,
            [currentYear, currentMonth, 'byCategory', rowCategory, type],
            0
          ) + rowAmount,
      });

      /*calculate for the year*/
      set(
        allDailyData,
        [currentYear, type],
        get(allDailyData, [currentYear, type], 0) + rowAmount
      );

      isExpense && set(allDailyData, [currentYear, 'byCategory', rowCategory], {
        key: rowCategory,
        totalAmount:
          get(allDailyData, [currentYear, 'byCategory', rowCategory, 'totalAmount'], 0) + rowAmount,
      });

      allDailyData[type] += rowAmount;
    }
  }

  return allDailyData;
}

function filterDataKeys(data: Object) {
  return Object.keys(data).filter(key => key !== TOTAL_AMOUNT_KEY && key !== INCOME_KEY && key !== BY_CATEGORY_KEY);
}

export {
  processData,
  filterDataKeys
}
