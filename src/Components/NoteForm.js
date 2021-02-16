import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
import '../App.css';
// import { red } from '@material-ui/core/colors';
// import AnimateHeight from 'react-animate-height';
// import TextareaAutosize from 'react-textarea-autosize';


class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      border:'',
      height:50,
      outlineWidth:0,
      addMode:false,
      title:'',
      body:''

    }
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }
  
  onFocus() {
    this.setState({
    //     border: '1px solid #14A76C',
        height: 140,
    //     outlineWidth:0
           addMode:true
    })
  }

  onBlur(event) {

    if (!event.currentTarget.contains(event.relatedTarget) && !this.props.newTitle && !this.props.newNote) {
      //if (!this.props.newTitle && !this.props.newNote) {
          this.setState({addMode:false,height:50,});
      //}
    }

    // this.setState({
    //   border:'',
    //   height:50,
    //   outlineWidth:0
    // })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.contentTextarea} 
           style={{height:this.state.height}}
           onBlur={this.onBlur}
           onFocus={this.onFocus} 
      >
         <textarea value={this.props.newTitle} 
         className={classes.darkTextarea1}
         onChange={this.props.changeTitle}  
         placeholder={this.state.addMode===true ? "Title" : "Add Note"} 
          />
         {this.state.addMode===true &&
         <textarea value={this.props.newNote} 
         className={classes.darkTextarea2}
         onChange={this.props.changeBody}  
         placeholder="Add Note"  
          />
         }
    </div>
    );
  }
}

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
    width:"300px",
    position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
     
  },
  contentTextarea:{
  backgroundColor: '#434956',
  margin:'auto',
  color: '#d4d7de',
  fontSize:'1.1em',
  width: '35%',
  padding: '0px 0px',
  border: '0px solid red',
  borderRadius: '0.3rem',
  boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
  height:"50px",
  // transition: "box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
  // webkitTransition: "height 0.5s ease",
  // mozTransition: "height 0.6s ease",
  // oTransition: "height 0.7s ease",
  transition: "height 0.8s ease",
  outlineWidth:"0"
  },
  darkTextarea1:{
  padding: '5px 8px',
  resize: 'none',
  backgroundColor: '#434956',
  color: '#d4d7de',
  fontSize:'1.1em',
  fontFamily: "'Source Sans Pro', sans-serif",
  width: '100%',
  border: '0px',
  borderRadius: '0.3rem',
  height:"40px",
  // transition: "box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
  // webkitTransition: "height 0.5s ease",
  // mozTransition: "height 0.6s ease",
  // oTransition: "height 0.7s ease",
  // transition: "height 0.8s ease",
  outlineWidth:"0"
  },
  darkTextarea2:{
  padding: '5px 8px',
  resize: 'none',
  backgroundColor: '#434956',
  color: '#d4d7de',
  fontSize:'1.1em',
  fontFamily: "'Source Sans Pro', sans-serif",
  width: '100%',
  border: '0px',
  borderRadius: '0.3rem',
  height:"100px",
  // transition: "box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
  // webkitTransition: "height 0.5s ease",
  // mozTransition: "height 0.6s ease",
  // oTransition: "height 0.7s ease",
  // transition: "height 0.8s ease",
  outlineWidth:"0"
  }

});

export default withStyles(styles)(NoteForm);
