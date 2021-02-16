import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor:'#383d47'
  },
  inside:{
    color:'white'
  }
});
class Settings extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {

  const { classes } = this.props;
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>

        <Grid item xs={1}>
          
        </Grid>
        <Grid item xs={8}  className={classes.inside}>
          {/*<Paper className={classes.paper}>xs=3</Paper>*/}
          <h2>Settings</h2>
          {/*<div>
            <label>Number of</label>
            <input type="text"/>
          </div>*/}
        </Grid>

      </Grid>
    </div>
  );
}
}



export default withStyles(styles)(Settings);

