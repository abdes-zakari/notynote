import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 

class Modal2 extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
      open: false,
      //editMode:false,
      newNote:this.props.clickedNote.note_body
    };
  }
  /*
  this.state = {
    open: false,
    editMode:false,
    newNote:this.props.clickedNote.note_body
  };
  */

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  /*handleEditMode = () => {
    this.setState({ editMode: true });
    //console.log(this.props.openModal);
    if(this.props.openModal==false){
     // this.setState({ editMode: false });
    }
  };*/
  
  handleSaveNote = (id) => {
    //console.log(id);
    this.props.onUpdateNote(id,this.props.editedNote,this.props.editedTitle);
    //this.setState({ editMode: false });
  };
  componentDidUpdate(){
    //console.log('componentDidUpdate');
    //this.newNote = "kaka";
    //console.log(this.newNote);
    //this.setState({newNote: this.props.clickedNote.note_body});
  }
  // copy text
  copa(){
    //document.execCommand('copy');
  }


  render() {
    //console.log(this.props.openModal);
    if(this.props.openModal==false){
       //this.setState({ editMode: false });
     }
    return (
      <div>
        
        <Dialog
          open={this.props.openModal}
          onClose={this.props.handleCloseModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        
        <div style={{backgroundColor:this.props.clickedNote.color}}>
        {this.props.editMode ? 
        <div style={style.divInput}><input style={style.inputTitle} type="text" onChange={this.props.handleChangeEditedTitle} value={this.props.editedTitle}/>
{/*        <div class="input-fill-x">
  <input class="input-fill"  value={this.props.editedTitle} placeholder="Title"/>
  <label class="input-label">Title</label>
</div> */}
        </div>
        
        :
          <DialogTitle id="alert-dialog-title"><span style={{color:"#e6e6e6"}}>{this.props.clickedNote.note_title}</span></DialogTitle>
        }
          <DialogContent >
          {this.props.editMode ? 
            <textarea style={style.textareaCss} onChange={this.props.handleChangeEditedNote} value={this.props.editedNote}  >{this.props.editedNote}</textarea>
          :
            <DialogContentText id="alert-dialog-description" style={{color:"#e6e6e6",width:"510px"}}>
              {this.props.clickedNote.note_body}
            </DialogContentText>
          }  
          </DialogContent>
          <DialogActions>
            {/*<Button onClick={this.props.handleCloseModal} color="primary">
              Disagree
            </Button>*/}
            {/*<Button onClick={this.props.handleCloseModal} color="primary" autoFocus>
              Agree
            </Button>*/}
            <div style={style.ctnAction}>
              
              {this.props.editMode ? 
                <div className="fa fa-save" style={style.actionBtn} onClick={() => this.handleSaveNote(this.props.clickedNote.id,this.state.newNote)}></div>
              : 
                <div className="fa fa-edit" style={style.actionBtn} onClick={this.props.handleEditMode}></div>
              }
              <div className="fa fa-close" style={style.actionBtn} onClick={this.props.handleCloseModal}></div>
              <div className="fa fa-copy" style={style.actionBtn} onClick={this.copa}></div>
            </div>
          </DialogActions>
          </div>
        </Dialog>
      </div>
    );
  }
}


const style = {
  actionBtn: {
    color:'#FFF',
    fontSize:"25px",
    cursor:"pointer",
    marginLeft: "10px"
  },
  ctnAction:{
    display: "flex",
    justifyContent: "flex-end"
  },
  textareaCss:{
    background: "#FFF",
    borderRadius: "8px",
    display: "inline-block",
    height: "150px",
    position: "relative",
    paddingLeft:"18px",
    paddingTop:"18px",
    width: "510px",
    boxShadow:"0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
    resize: "none",
    border: "0",
    outline: "none",
    fontFamily: "'Source Sans Pro', sans-serif",
    fontSize:"1.1em",
  },
  divInput:{
    marginLeft: "22px",
    marginBottom: "15px",
    marginTop: "20px"
  },
  inputTitle:{
    borderRadius: "8px",
    /*backgroundImage: "url('https://inktopiakids.files.wordpress.com/2016/07/6-crumpled.jpg')", */
    padding:"10px",
    outline:"none",
    width: "510px",
    transition:"border-color 0.3s",
    border: "1px solid #d0d0d5",
    fontFamily: "'Source Sans Pro', sans-serif",
    fontSize:"1em",
  }
  

};

export default Modal2;