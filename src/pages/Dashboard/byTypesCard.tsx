import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
  Table,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  content: {},
}));

const ExpenseByType = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title="Expense by type" />
      <Divider />
      <CardContent className={classes.content}>
        <Table></Table>
      </CardContent>
    </Card>
  );
};

export default ExpenseByType;
