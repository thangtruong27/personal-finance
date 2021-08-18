import React from 'react';
import FileLoader from '../components/FileLoader';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
}));
const FileLoaderPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FileLoader />
    </div>
  );
};

export default FileLoaderPage;
