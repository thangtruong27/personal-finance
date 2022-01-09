import React, { useRef } from 'react';
import { makeStyles, Typography, Card, Button } from '@material-ui/core';
import { CloudUpload as CloudUploadIcon } from '@material-ui/icons';
import { Folder as FolderIcon } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { importFile } from '../../state/app/import/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    padding: theme.spacing(3),
    width: '470px',
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
  const handleTriggerUploadFile = () => {
    if (inputEl.current !== null) {
      inputEl.current.click();
    }
  };
  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seletedFiles = e.target.files;
    seletedFiles && dispatch(importFile({ fileRef: seletedFiles[0] }));
  };
  return (
    <Card className={classes.root}>
      <div className={classes.uploadArea} onClick={handleTriggerUploadFile}>
        <FolderIcon className={classes.icon} color="primary" />
        <Typography className={classes.title} variant="h5">
          Drag your document here(.xls) to start analyzing.
        </Typography>
        <Typography variant="body1" color="textSecondary" className={classes.divider}>
          OR
        </Typography>
        <Button variant="contained" color="primary" className={classes.browseBtn}>
          Browse file
        </Button>
        <input type="file" hidden ref={inputEl} onChange={handleUploadFile} />
      </div>
    </Card>
  );
}
