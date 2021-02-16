import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: "#434956",
    color:'white',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      /*borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',*/
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
    color:"white",
    '&:focus': {
      color:"red",
    }
  },
});

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
  typography: { useNextVariants: true },
  overrides: {
    MuiFormLabel: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: "orange",
        "&$focused": { // increase the specificity for the pseudo class
          color: "white"
        }
      }
    }
  }
});

function InputText(props) {
  const { classes } = props;

  return (
    <MuiThemeProvider theme={theme}>
    <div className={classes.root}>

      <FormControl className={classes.margin}>
        <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
          Add New Category
        </InputLabel>
        <InputBase
          id="bootstrap-input"
          placeholder="New Category"
          value={props.value} onChange={props.onChange} 
          classes={{
            root: classes.bootstrapRoot,
            input: classes.bootstrapInput,
          }}
        />
      </FormControl>
    </div>
    </MuiThemeProvider>
  );
}

InputText.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputText);
