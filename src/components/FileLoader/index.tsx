//@ts-nocheck
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, Typography, Card, Button } from '@material-ui/core';
import { Folder as FolderIcon } from '@material-ui/icons';
import CircularProgressWithLabel from '../CircularProgressWithLabel';

import { useDispatch } from 'react-redux';
import { importFile } from '../../state/app/import/actions';

import cx from 'classnames';
import { Status } from '../../state/app/import/reducer';
import { get } from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    padding: theme.spacing(3),
    width: '470px',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: theme.spacing(2),
  },
  loadingRoot: {
    width: '200px',
  },
  loadingLabel: {
    marginTop: theme.spacing(2),
  },
  title: {
    maxWidth: '260px',
    textAlign: 'center',
  },
  icon: {
    height: '50px',
    width: '50px',
  },
  uploadArea: {
    border: '2px dashed #E0E0E0',
    '&:hover': {
      cursor: 'pointer',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    width: '100%',
  },
  divider: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  browseBtn: {
    textTransform: 'none',
  },
}));

export default function FileLoader() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const inputEl = useRef<HTMLInputElement>(null);
  const importState = useSelector((state) => state.import);
  const status = get(importState, 'status', Status.INITIAL);

  /*handlers*/
  const handleTriggerUploadFile = () => {
    if (inputEl.current !== null) {
      inputEl.current.click();
    }
  };

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seletedFiles = e.target.files;
    seletedFiles && dispatch(importFile({ fileRef: seletedFiles[0] }));
  };
  /*end handlers*/

  return (
    <Card className={cx(classes.root, { [classes.loadingRoot]: status === Status.LOADING })}>
      {status === Status.LOADING ? (
        <div>
          <CircularProgressWithLabel />
          <Typography className={classes.loadingLabel} variant="body1">
            Analyzing...
          </Typography>
        </div>
      ) : (
        <div className={classes.uploadArea} onClick={handleTriggerUploadFile}>
          <FolderIcon className={classes.icon} color="primary" />
          <Typography className={classes.title} variant="h5">
            Drag your document (.xls) here to start analyzing.
          </Typography>
          <Typography variant="body1" color="textSecondary" className={classes.divider}>
            OR
          </Typography>
          <Button variant="contained" color="primary" className={classes.browseBtn}>
            Browse file
          </Button>
          <input type="file" hidden ref={inputEl} onChange={handleUploadFile} />
        </div>
      )}
    </Card>
  );
}
