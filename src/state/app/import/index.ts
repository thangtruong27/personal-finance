export { namespace } from './actions';
export { default as reducer } from './reducer';

export enum ExpenseCategory {
  Rent = 'Rent', // fixed monthly house rent, including electricity, internet, phone
  Food = 'Food',
  Transport = 'Transport',
  HealthMaintaince = 'HealthMaintaince',
  Entertainment = 'Entertainment', // includes movies, traveling, monthly subscription.
  Education = 'Education',
  Other = 'Other', // incurred
}
export interface Data {
  date: string;
  amount: string;
  type: ExpenseCategory;
}
