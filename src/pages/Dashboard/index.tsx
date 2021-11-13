import React from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import { makeStyles, Typography, Grid, Avatar } from '@material-ui/core';
import { Money, CreditCard, AttachMoney } from '@material-ui/icons';
import MainChart from './mainChart';
import CardOverview from './cardOverview';
import ExpenseByType from './byTypesCard';
import { get, last } from 'lodash';
import { RootState } from '../../state/types/global';
import { MonthData, ReduxData, YearData } from '../../helpers/processData';

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
  const allYear = Object.keys(importedData).filter(key => key !== 'totalAmount');
  const lastYear = last(allYear);
  if (!lastYear)
    return undefined;
  const lastYearData = importedData[lastYear] as YearData;
  const allMonth = Object.keys(lastYearData).filter(key => key !== 'totalAmount' && key !== 'byCategory');
  const lastMonth = last(allMonth);
  if (!lastMonth)
    return undefined;
  const lastMonthData = lastYearData[lastMonth] as MonthData;
  return lastMonthData;
}
const Dashboard = () => {
  const classes = useStyles();
  const importedData: ReduxData = useSelector((state) => get(state, 'import.data', {}));
  const lastMonth = getLastMonthData(importedData);

  return (
    <div className={classes.root}>
      <Grid container justifyContent="space-between" className={classes.overview}>
        <Grid item>
          <CardOverview
            title="Income"
            subtitle="$ 500"
            description={
              <div>
                <span className={classes.success}>12%</span>Since last month
              </div>
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
            subtitle="$ 500"
            description={
              <div>
                <span className={classes.error}>12%</span>Since last month
              </div>
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
            subtitle="$1500"
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
          <MainChart />
        </Grid>
        <Grid item sm={12} lg={4}>
          <ExpenseByType categories={lastMonth?.byCategory} totalAmount={lastMonth?.totalAmount} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
