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

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  content: {
    paddingTop: 0
  },
}));
const data = [
  {
    value: '12000',
    category: 'Food',
    icon: <FoodIcon />,
    percentage: '58%',
  },
  {
    value: '12000',
    category: 'Transport',
    icon: <TransportationIcon />,
    percentage: '58%',
  },
  {
    value: '12000',
    category: 'Housing',
    icon: <ApartmentIcon />,
    percentage: '58%',
  },
  {
    value: '12000',
    category: 'Entertainment',
    icon: <EntertainmentIcon />,
    percentage: '58%',
  },
  {
    value: '12000',
    category: 'Health',
    icon: <HealthIcon />,
    percentage: '58%',
  },
  {
    value: '12000',
    category: 'Education',
    icon: <EducationIcon />,
    percentage: '58%',
  },
  {
    value: '12000',
    category: 'Other',
    percentage: '58%',
  },
];

const ExpenseByType = () => {
  const classes = useStyles();

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
