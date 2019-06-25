import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

// function Stickers(props) {
class Stickers extends Component {
  // constructor(props) {
  //   super(props);
  // }



 randomColor(){
//  let colors=['#f50057','#f44336','#2196f3','#009688','#673ab7','#e91e63','#ffc107','#4caf50','#4e342e','#006064','#c2185b'];
//  let rand=Math.floor(0 + Math.random() * (colors.length - 0));
//  console.log(rand);
  // return colors[rand];
return "#009688";
}
render() {
  // console.log(props.listNote);
  const { classes } = this.props;
  let listNotes=null;
if(this.props.dataIsHere){
  listNotes= this.props.listNote.map((note, index) =>
  <Grid item xs={3} key={index} onClick={() => this.props.onRemoveNote(note.id)}>
  <Paper style={{backgroundColor:note.color,color:'#FFF'}} className={classes.paper}>{note.note_body} </Paper>
</Grid>
);
}

// console.log(props.kaka);
  return (
    <div className={classes.root}>
      <Grid container spacing={8}>

      {listNotes}

        {/*<<Grid item xs={3} >
          <Paper style={{backgroundColor:'#f50057',color:'#FFF'}} className={classes.paper}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper style={{backgroundColor:'#f44336',color:'#FFF'}} className={classes.paper}>tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper style={{backgroundColor:'#2196f3',color:'#FFF'}} className={classes.paper}>Es ist ein lang erwiesener Fakt, dass ein Leser vom Text abgelenkt wird, wenn er sich ein Layout ansieht. </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper  style={{backgroundColor:'#009688',color:'#FFF'}} className={classes.paper}>Der Standardteil von Lorem Ipsum, genutzt seit 1500, ist reproduziert für die, die es interessiert. </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper style={{backgroundColor:'#673ab7',color:'#FFF'}} className={classes.paper}>Es ist sdsad ein Layout ansieht. </Paper>
        </Grid>*/}
      </Grid>
    </div>
  );
      }
}

Stickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Stickers);
