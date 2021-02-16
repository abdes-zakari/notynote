import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Masonry from 'react-masonry-css'
import '../MasonryStyle.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  bodyNote:{
    fontWeight:600
  }
});

// function Stickers(props) {
class StickersMas extends Component {
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
  let listNotes2=null;

if(this.props.dataIsHere){

    listNotes2= this.props.listNote.map((note, index) =>
    <div style={{backgroundColor:note.color,color:'#F0F0F0',opacity:this.props.clickedId === note.id? "0" : "1"}} 
         key={index} 
         > 
      <div className="head-note">
         <span onClick={() =>this.props.getClickedNote(note)} className="title-note">{note.note_title}</span>
         <span className="delete-note" onClick={() => this.props.onRemoveNote(note.id)}>
            <i className="fa fa-remove" style={{fontSize:'20px',color:'#F0F0F0'}}></i>
         </span>
      </div>
      <div onClick={() =>this.props.getClickedNote(note)} className="body-note">{note.note_body}</div>
    </div>
);
}

  return (
    <div className={classes.root}>
    <Masonry
              breakpointCols={4}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column">
              {listNotes2}
     </Masonry>
      
    </div>
  );
      }
}

StickersMas.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StickersMas);
