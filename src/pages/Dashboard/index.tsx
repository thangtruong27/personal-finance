import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Typography, Grid, Avatar } from '@material-ui/core';
import { Money, CreditCard, AttachMoney } from '@material-ui/icons';
import MainChart from './mainChart';
import CardOverview from './cardOverview';
import ExpenseByType from './byTypesCard';

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
const FileLoaderPage = () => {
  const classes = useStyles();
  //@ts-ignore
  const store = useSelector((state) => state.import.data);
  console.log('store', store);

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
          <ExpenseByType />
        </Grid>
      </Grid>
    </div>
  );
};

export default FileLoaderPage;
