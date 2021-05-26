import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import './ReviewCaseForm.css';
import axiosWithAuth from '../../../utils/axiosWithAuth';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '25rem',
      textAlign: 'center',
    },

    '& .MuiOutlinedInput-root': {
      '& input': {
        color: '#215589',
      },
      '& fieldset': {
        borderColor: '#215589',
      },
      '&:hover fieldset': {
        borderColor: '#215589',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#215589',
      },
    },
    '& .MuiFormLabel-root': {
      color: '#215589',
    },
  },

  uploadPage: {
    display: 'flex',
    flexFlow: 'row no-wrap',
    padding: '1%',
    margin: '0 auto',
    width: '80%',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },

  editForm: {
    marginTop: '5%',
    padding: '1%',
    paddingRight: '10%',
  },

  row: {
    fontSize: '1rem',
    display: 'flex',
    Margin: theme.spacing(2),
  },

  buttonStyles: {
    color: 'white',
    backgroundColor: '#215589',
    marginTop: '3%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&.MuiButton-contained': {
      boxShadow: 'none',
      color: 'white',
      border: '1px solid darkgray',
    },
  },

  checkbox: {
    color: '#205488',
    '&.MUI-checked': {
      color: '#205488',
    },
    '&.MuiIconButton-root': {
      color: '#205488',
    },
  },
}));
const ReviewCaseForm = props => {
  const {
    formValues,
    currentId,
    getPendingCases,
    setVisible,
    isVisible,
  } = props;
  const [editedFormValues, setEditedFormValues] = useState(formValues);
  useEffect(() => {
    setEditedFormValues(formValues);
  }, [formValues, isVisible]);
  const onInputChange = e => {
    const { name, value, checked } = e.target;
    if (
      name === 'filed_in_one_year' ||
      name === 'initial_or_appellate' ||
      name === 'credible'
    ) {
      setEditedFormValues({ ...editedFormValues, [name]: checked });
    } else {
      setEditedFormValues({ ...editedFormValues, [name]: value });
    }
  };
  const classes = useStyles();
  const role = window.localStorage.getItem('role');
  const { handleSubmit } = useForm();
  const onSubmit = evt => {
    evt.preventDefault();
    if (role === 'user') {
      axiosWithAuth()
        .post(`/upload/${currentId}`, editedFormValues)
        .then(res => {
          getPendingCases();
          setVisible(false);
        })
        .catch(err => {
          console.log(err);
        });
    } else if (role === 'admin') {
      axiosWithAuth()
        .post(`/pendingCases/approve/${currentId}`, editedFormValues)
        .then(res => {
          getPendingCases();
          setVisible(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <div className={classes.uploadPage}>
      <div className={classes.editForm}>
        <div className={classes.root}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="hearing-date">
              <label htmlFor="hearing-date">
                <TextField
                  id="hearing-date"
                  label="Hearing Date"
                  type="date"
                  variant="outlined"
                  defaultValue={editedFormValues.case_date}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </label>
            </div>
            <div className="judge">
              <label htmlFor="judge">
                <TextField
                  label="Judge"
                  placeholder="Judge"
                  type="text"
                  variant="outlined"
                  name="judge"
                  onChange={onInputChange}
                  value={editedFormValues.judge}
                />
              </label>
            </div>
            <div className="case-outcome">
              <label htmlFor="case-outcome">
                <TextField
                  label="Case Outcome"
                  placeholder="Case Outcome"
                  variant="outlined"
                  name="case_outcome"
                  onChange={onInputChange}
                  value={editedFormValues.case_outcome}
                />
              </label>
            </div>
            <div className="nation-of-origin">
              <label htmlFor="nation-of-origin">
                <TextField
                  label="Nation of Origin"
                  type="text"
                  variant="outlined"
                  placeholder="Nation of Origin"
                  name="country_of_origin"
                  onChange={onInputChange}
                  value={editedFormValues.country_of_origin}
                />
              </label>
            </div>
            <div className="protected-ground">
              <label htmlFor="protected-ground">
                <TextField
                  label="Protected Ground"
                  variant="outlined"
                  name="protected_grounds"
                  placeholder="Protected Ground"
                  onChange={onInputChange}
                  value={editedFormValues.protected_grounds}
                />
              </label>
            </div>
            <div className="application-type">
              <label htmlFor="application-type">
                <TextField
                  label="Application Type"
                  type="text"
                  variant="outlined"
                  placeholder="Application Type"
                  name="application_type"
                  onChange={onInputChange}
                  value={editedFormValues.application_type}
                />
              </label>
            </div>
            <div className="case-origin-city">
              <label htmlFor="case-origin-city">
                <TextField
                  label="Case Origin City"
                  type="text"
                  variant="outlined"
                  placeholder="Case Origin City"
                  name="case_origin_city"
                  onChange={onInputChange}
                  value={editedFormValues.case_origin_city}
                />
              </label>
            </div>
            <div className="case-origin-state">
              <label htmlFor="case-origin-state">
                <TextField
                  label="Case Origin State"
                  type="text"
                  variant="outlined"
                  placeholder="Case Origin State"
                  name="case_origin_state"
                  onChange={onInputChange}
                  value={editedFormValues.case_origin_state}
                />
              </label>
            </div>
            <div className="applicant-gender">
              <label htmlFor="applicant-gender">
                <TextField
                  label="Applicant Gender"
                  variant="outlined"
                  placeholder="Applicant Gender"
                  name="gender"
                  onChange={onInputChange}
                  value={editedFormValues.gender}
                />
              </label>
            </div>
            <div className="applicant-language">
              <label htmlFor="applicant-language">
                <TextField
                  label="Applicant Language"
                  variant="outlined"
                  placeholder="Applicant Language"
                  name="applicant_language"
                  onChange={onInputChange}
                  value={editedFormValues.applicant_language}
                />
              </label>
            </div>
            <div className="applicant-indigenous-group">
              <label htmlFor="applicant-indigenous-group">
                <TextField
                  label="Applicant Indigenous Group"
                  type="text"
                  variant="outlined"
                  placeholder="Applicant Indigenous Group"
                  name="indigenous_group"
                  onChange={onInputChange}
                  value={editedFormValues.indigenous_group}
                />
              </label>
            </div>
            <div className="type-of-violence-experienced">
              <label htmlFor="type-of-violence-experienced">
                <TextField
                  label="Type of Violence Experienced"
                  type="text"
                  variant="outlined"
                  placeholder="Type of Violence Experienced"
                  name="type_of_violence"
                  onChange={onInputChange}
                  value={editedFormValues.type_of_violence}
                />
              </label>
            </div>
            <FormControl component="fieldset">
              <FormLabel component="legend"></FormLabel>
              <FormGroup className={classes.row}>
                <FormControlLabel
                  control={
                    <Checkbox
                      className={classes.checkbox}
                      checked={editedFormValues.initial_or_appellate}
                      onChange={onInputChange}
                      name="initial_or_appellate"
                    />
                  }
                  label="Appellate Case"
                  labelPlacement="end"
                />
              </FormGroup>
              <FormGroup className={classes.row}>
                <FormControlLabel
                  control={
                    <Checkbox
                      className={classes.checkbox}
                      checked={editedFormValues.filed_in_one_year}
                      onChange={onInputChange}
                      name="filed_in_one_year"
                    />
                  }
                  label="Case was filed Within One Year"
                  labelPlacement="end"
                />
              </FormGroup>
              <FormGroup className={classes.row}>
                <FormControlLabel
                  control={
                    <Checkbox
                      className={classes.checkbox}
                      checked={editedFormValues.credible}
                      onChange={onInputChange}
                      name="credible"
                    />
                  }
                  label="Applicant is Perceived as Credible"
                  labelPlacement="end"
                />
              </FormGroup>
              <FormHelperText></FormHelperText>
            </FormControl>
            <div className="submit-button">
              <Button
                onClick={onSubmit}
                className={classes.buttonStyles}
                variant="contained"
                component="span"
              >
                <p className="button-text">Submit</p>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewCaseForm;
