import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme, withTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "yellow !important"
  },
  formControl: {
    //margin: theme.spacing.unit*2,
    //margin:"auto",
    //width:"50%",
    borderColor:"red",
    backgroundColor:"#383d47",
    minWidth: 200,
    outline: "none"
  },
  InputLabel:{
    color:"#808080"
  },
  select:{
    color:"#d4d7de",
    "&:before": {
      borderColor: "red"
    },
    "&:after": {
      borderColor: "green"
    }
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

const theme = createMuiTheme({

  typography: { useNextVariants: true },
  overrides: {
    MuiOutlinedInput: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        //border:"1px solid white",
        borderColor:"yellow",
        "&$focused": { // increase the specificity for the pseudo class
          color: "red",
          borderColor:"red !important"
        }
      }
    }
  }
});

class InputSelect extends React.Component {
  state = {
    age: '',
    name: 'hai',
    labelWidth: 0,
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value);
  };

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
      <center>
        <FormControl variant="outlined" className={classes.formControl}>
        
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-simple"
            className={classes.InputLabel}
          >
            Category
          </InputLabel>
          <Select className={classes.select} 
            value={this.state.age}
            onChange={this.handleChange}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="age"
                id="outlined-age-simple"
              />
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Sport</MenuItem>
            <MenuItem value={20}>Stream</MenuItem>
            <MenuItem value={30}>Science</MenuItem>
          </Select>
          
        </FormControl>
        </center>
        </MuiThemeProvider>

    );
  }
}

InputSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputSelect);