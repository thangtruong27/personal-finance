import React from 'react';
import {
  makeStyles,
  Typography,
  Card,
  CardContent,
  Avatar,
} from '@material-ui/core';
import { Money as MoneyIcon, SvgIconComponent } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '240px',
    height: '136px',
    backgroundColor: '#fff',
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  description: {
    paddingTop: theme.spacing(2),
  },
}));

function CardOverview(props: {
  title: string;
  subtitle?: string;
  description?: string | React.ReactElement;
  icon?: React.ReactElement;
}) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.iconContainer}>{props.icon}</div>
        <Typography color="textSecondary" variant="body1">
          {props.title}
        </Typography>
        <Typography variant="h3">{props.subtitle}</Typography>
        <Typography
          color="textSecondary"
          variant="subtitle2"
          className={classes.description}
        >
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CardOverview;
