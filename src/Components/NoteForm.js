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


class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      border:'',
      height:50,
      outlineWidth:0

    }

    this.onFocus=this.onFocus.bind(this);
    this.onBlur=this.onBlur.bind(this);
    
  }
  


  onFocus() {
    this.setState({
        border: '1px solid #14A76C',
        height: 100,
        outlineWidth:0
    })
  }

  onBlur() {
    this.setState({
      border:'',
      height:50,
      outlineWidth:0
    })
  }

  render() {
    // const { classes } = this.props;
    return (
      <div>
         {/*<textarea  className="myTextArea" placeholder="Add Note"  onBlur={this.onBlur} onFocus={this.onFocus} style={{outlineWidth:this.state.outlineWidth,height:this.state.height}} />*/}
         <textarea value={this.props.newData}  className="myTextAreaDark" onChange={this.props.changeProps}  placeholder="Add Note"  onBlur={this.onBlur} onFocus={this.onFocus} style={{outlineWidth:this.state.outlineWidth,height:this.state.height}} />
      {/*<Paper className={classes.root} elevation={1} className="myStyle"
      onFocus={this.onFocus}  onBlur={this.onBlur}
      style={{border: this.state.border,height: this.state.height  }}>
     
          {/*<textarea className="mybtn" wrap="off"  rows="5"></textarea>*/}
         {/*<InputBase className={classes.margin} defaultValue="" placeholder="Add a message" className="mybtn"
         />*/}
       
      {/*</Paper>*/}
      <div>
        
      </div>
    </div>
    );
  }
}

export default withStyles(styles)(NoteForm);
