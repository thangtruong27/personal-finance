import React from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'column',
  },
  btn: {
    marginTop: theme.spacing(1),
  },
}));

const NullState = () => {
  const classes = useStyles();

  const handleClick = () => {};

  return (
    <div className={classes.root}>
      <Typography variant="h3">No data found.</Typography>
      <Button
        href="/import"
        className={classes.btn}
        color="primary"
        variant="contained"
        onClick={handleClick}
      >
        Import data
      </Button>
    </div>
  );
};

export default NullState;
