import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import '../App.css';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
    width:"300px",
    position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
     
  },

});
var tata="";
function test(){
  // console.log('hallo');
}

function Papers(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1} className="myStyle">
         <InputBase className={classes.margin} defaultValue="" placeholder="Add a message" className="mybtn" onFocus={test}/>
      </Paper>
    </div>
  );
}

Papers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Papers);
