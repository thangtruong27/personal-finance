import React from 'react';
import Appbar from '../components/Appbar';
import Sidebar from '../components/Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import { RouteProps } from 'react-router-dom';

export interface MainLayoutProps {
  children: React.ReactElement;
}
const useStyles = makeStyles((theme) => ({
  appContainer: {
    backgroundColor: 'rgb(244, 246, 248)',
    display: 'flex',
    height: '100%',
  },
  contentContainer: {
    paddingTop: '64px',
    paddingLeft: '256px',
    width: '100%',
  },
}));

export default function MainLayout(props: MainLayoutProps) {
  const classes = useStyles();
  return (
    <div className={classes.appContainer}>
      <Appbar />
      <Sidebar />
      <div className={classes.contentContainer}>{props.children}</div>
    </div>
  );
}
