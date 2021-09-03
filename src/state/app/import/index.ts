export { namespace } from './actions';
export { default as reducer } from './reducer';

export enum ExpenseCategory {
  Rent = 'Rent', // fixed monthly rent.
  Food = 'Food',
  Transporttation = 'Transporttation',
  Utilities = 'Utilities', // includes electricity, internet, phone.
  HealthMaintaince = 'HealthMaintaince',
  Entertainment = 'Entertainment', // includes movies, traveling, monthly subscription.
  Education = 'Education',
  Other = 'Other',
}
export interface Data {
  date: string;
  amount: string;
  type: ExpenseCategory;
}
