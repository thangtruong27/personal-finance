import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
  Table,
} from '@material-ui/core';
import {
  Restaurant as FoodIcon,
  TwoWheeler as TransportationIcon,
  Favorite as HealthIcon,
  Apartment as ApartmentIcon,
  School as EducationIcon,
  Accessibility as EntertainmentIcon,
} from '@material-ui/icons';
import CategoryListItem from '../../components/CategoryListItem';
import { byCategory, ExpenseCategoryKeys } from '../../helpers/processData';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  content: {
    paddingTop: 0
  },
}));

const ICONS = {
  'Food': <FoodIcon />,
  'Transport': <TransportationIcon />,
  'Housing': <ApartmentIcon />,
  'Entertainment': <EntertainmentIcon />,
  'Health': <HealthIcon />,
  'Education': <EducationIcon />,
  'Other': null,
};

export type ExpenseByTypeProps = {
  categories?: byCategory,
  totalAmount?: number
}


const ExpenseByType = (props: ExpenseByTypeProps) => {
  const classes = useStyles();
  const { categories = {}, totalAmount = 0 } = props;
  const categoryKeys = Object.keys(categories) as ExpenseCategoryKeys[];
  
  const data = categoryKeys.map((category) => {
    const categoryTotal = categories[category]?.totalAmount || 0;
    const categoryPercent = (categoryTotal && totalAmount) ?
                            categoryTotal*100/totalAmount :
                            0;

    return ({
      category,
      icon: ICONS[category],
      value: `${categoryTotal} đ`,
      percentage: `${categoryPercent.toFixed(2)} %`
    });
  });

  return (
    <Card className={classes.root}>
      <CardHeader title="Expense by type" />
      <Divider />
      <CardContent className={classes.content}>
        <div>
          {data.map((category) => (
            <CategoryListItem {...category} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseByType;
