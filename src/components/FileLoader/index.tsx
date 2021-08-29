import React, { useRef } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { CloudUpload as CloudUploadIcon } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { importFile } from '../../state/app/import/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    padding: '37px 53px',
    width: '470px',
  },
  title: {},
  description: {
    color: 'rgba(0,0,0,0.54)',
    marginTop: '5px',
    maxWidth: '350px',
  },
  fileReq: {
    marginTop: '12px',
    color: 'rgba(0,0,0,0.54)',
    fontSize: '12px',
  },
  example: {
    color: '#2196F3',
    marginLeft: '20px',
  },
  icon: {
    height: '50px',
    width: '50px',
    color: ' #9E9E9E',
  },
  uploadArea: {
    width: '350px',
    height: '140px',
    border: '2px dashed #E0E0E0',
    borderRadius: '2px',
    marginTop: '5px',
    '&:hover': {
      cursor: 'pointer',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadLabel: {
    color: ' #229DF8',
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
    <div className={classes.root}>
      <Typography className={classes.title} variant="h2">
        Upload data
      </Typography>
      <Typography className={classes.description} variant="body2">
        Import daily personal consumption expenditures data to analytic
      </Typography>
      <Typography variant="body2" className={classes.fileReq}>
        File requirements: excels, max file size of 10MB
        <a className={classes.example}>See example</a>
      </Typography>
      <div className={classes.uploadArea} onClick={handleTriggerUploadFile}>
        <CloudUploadIcon className={classes.icon} />
        <Typography variant="h6" className={classes.uploadLabel}>
          Browse to upload
        </Typography>
        <input type="file" hidden ref={inputEl} onChange={handleUploadFile} />
      </div>
    </div>
  );
}
