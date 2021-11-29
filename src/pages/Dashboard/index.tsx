import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, Grid, Avatar } from '@material-ui/core';
import { Money, CreditCard, AttachMoney } from '@material-ui/icons';
import MainChart, { ChartData } from './mainChart';
import CardOverview from './cardOverview';
import ExpenseByType from './byTypesCard';
import { get, last } from 'lodash';
import {
  DailyData,
  DayData,
  filterDataKeys,
  INCOME_KEY,
  MonthData,
  ReduxData,
  TOTAL_AMOUNT_KEY,
  YearData,
} from '../../helpers/processData';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  overview: {
    marginBottom: theme.spacing(3),
  },
  error: {
    color: theme.palette.error.dark,
    marginRight: '4px',
  },
  success: {
    color: theme.palette.success.dark,
    marginRight: '4px',
  },
  iconBgRed: {
    backgroundColor: theme.palette.error.dark,
  },
  iconBgGreen: {
    backgroundColor: theme.palette.success.dark,
  },
  iconBgWarning: {
    backgroundColor: theme.palette.warning.main,
  },
  iconBgPrimary: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const getLastMonthData = (importedData: ReduxData): MonthData | undefined => {
  const allYear = filterDataKeys(importedData);
  const lastYear = last(allYear);
  if (!lastYear) return undefined;
  const lastYearData = importedData[lastYear] as YearData;

  const allMonth = filterDataKeys(lastYearData);
  const lastMonth = allMonth.length >= 2 ? allMonth[allMonth.length - 2] : null;
  if (!lastMonth) return undefined;
  const lastMonthData = lastYearData[lastMonth] as MonthData;
  
  return lastMonthData;
};

const getCurrentMonthData = (importedData: ReduxData): MonthData | undefined => {
  const allYear = filterDataKeys(importedData);
  const lastYear = last(allYear);

  if (!lastYear) return undefined;
  const lastYearData = importedData[lastYear] as YearData;

  const allMonth = filterDataKeys(lastYearData);
  const currentMonth = last(allMonth);
  if (!currentMonth) return undefined;
  const lastMonthData = lastYearData[currentMonth] as MonthData;
  
  return lastMonthData;
};

/**
 * Dasboard page
 */

const Dashboard = () => {
  const classes = useStyles();

  const importedData: ReduxData = useSelector((state) => get(state, 'import.data', {}));
  const currentMonth = getCurrentMonthData(importedData);
  const lastMonth = getLastMonthData(importedData);

  if (!currentMonth) return null;

  // calc card data
  
  const totalIncome = Math.abs(currentMonth[INCOME_KEY] || 0);
  const lastMonthIncome = lastMonth ? Math.abs(lastMonth[INCOME_KEY]) : 0;
  const percentageIncome = totalIncome && lastMonthIncome ? (totalIncome - lastMonthIncome)*100/lastMonthIncome : 0;

  const totalExpense = Math.abs(currentMonth[TOTAL_AMOUNT_KEY] || 0);
  const lastMonthExpense = lastMonth ? Math.abs(lastMonth[TOTAL_AMOUNT_KEY] || 0) : 0;
  const percentageExpense = totalExpense && lastMonthExpense ? (totalExpense - lastMonthExpense)*100/lastMonthExpense : 0;
  
  const totalBugdet = Math.abs(importedData[INCOME_KEY]) - Math.abs(importedData[TOTAL_AMOUNT_KEY]);
  const totalBugdetMonth = totalIncome - totalExpense;
  const percentageBudget = (totalBugdet - totalBugdetMonth) ? totalBugdetMonth*100/(totalBugdet - totalBugdetMonth) : 0;

  // calc chart data
  const lastMonthDataKeys = currentMonth && filterDataKeys(currentMonth);
  let chartData: DailyData[] = [];

  lastMonthDataKeys.forEach((dayNum) => {
    const dayData = currentMonth[dayNum] as DayData;
    const data = (dayData && dayData.data) || [];
    chartData = [...chartData, ...data];
  });

  // normalize chart data
  const normalizeExpenseData = chartData.reduce((acc: ChartData[], data) => {
    if (data.amount >= 0){
      acc.push({
        value: data.amount,
        label: moment(data.date).format('DD/MM')
      });
    }
    return acc;
  },[]);

  return (
    <div className={classes.root}>
      <Grid container justifyContent="space-between" className={classes.overview}>
        <Grid item>
          <CardOverview
            title="Income"
            subtitle={`${totalIncome} đ`}
            description={
              percentageIncome ?
              <div>
                <span className={percentageIncome > 0 ? classes.success : classes.error}>
                  {percentageIncome.toFixed(1)}%
                </span>
                Compare to last month
              </div> : undefined 
            }
            icon={
              <Avatar className={classes.iconBgGreen}>
                <Money />
              </Avatar>
            }
          />
        </Grid>
        <Grid item>
          <CardOverview
            title="Expense"
            subtitle={`${totalExpense} đ`}
            description={
              percentageExpense ? <div>
                <span className={percentageExpense > 0 ? classes.success : classes.error}>
                  {percentageExpense.toFixed(1)}%
                </span>
                Compare to last month
              </div> : undefined
            }
            icon={
              <Avatar className={classes.iconBgRed}>
                <CreditCard />
              </Avatar>
            }
          />
        </Grid>
        <Grid item>
          <CardOverview
            title="Total Bugdet"
            subtitle="75 %"
            icon={
              <Avatar className={classes.iconBgWarning}>
                <Money />
              </Avatar>
            }
          />
        </Grid>
        <Grid item>
          <CardOverview
            title="Total Bugdet"
            subtitle={`${totalBugdet} đ`}
            description={
              percentageBudget ? <div>
                <span className={percentageBudget > 0 ? classes.success : classes.error}>
                  {percentageBudget.toFixed(1)}%
                </span>
                Since last month
              </div> : undefined
            }
            icon={
              <Avatar className={classes.iconBgPrimary}>
                <AttachMoney />
              </Avatar>
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item sm={12} lg={8}>
          <MainChart data={normalizeExpenseData} />
        </Grid>
        <Grid item sm={12} lg={4}>
          <ExpenseByType categories={currentMonth?.byCategory} totalAmount={currentMonth?.totalAmount} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
