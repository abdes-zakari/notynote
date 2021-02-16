import React,{ Component } from 'react';
// import Papers from './Papers.js';
import NoteForm from './NoteForm.js';
import ButtonSave from './ButtonSave.js';
import StickersMas from './StickersMas.js';
import Preloader from './Preloader.js';
import Modal from './Modal.js';
import '../App.css';
// import { blue } from '@material-ui/core/colors';
// import Circa from '@material-ui/icons/FiberManualRecord';
import InputSelect from './InputSelect.js';
import qWebChannelPromise from  '../qWebChannelPromise'

class Main extends Component {
    constructor(props) {
      super(props);
      this.displayData = [];
      this.baz='';
      this.allData=[];
      this.colors=['#f50057','#f44336','#2196f3','#009688','#673ab7','#e65100','#ffa000','#43a047','#4e342e'];
      this.state={
           newTitle:'',
           newNote:'',
           noteCat:'',
           allNotes:'',
           showdata : this.displayData,
           dataIsHere:false,
           dataUpdate:false,
           chosedColor:'black',
           clickedNote:[],
           openModal:false,
           clickedId:null,
           pychannel:null,
           editMode:false, // used in modal.js
           editedNote:'', // used in modal.js
           editedTitle:'' // used in modal.js
      }
      this.handleChangeTitle=this.handleChangeTitle.bind(this);
      this.handleChangeBody=this.handleChangeBody.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
      this.onRemoveNote = this.onRemoveNote.bind(this);
      this.chosedColor=this.chosedColor.bind(this);
      this.handleChangeCategory=this.handleChangeCategory.bind(this);
      //this.componentDidMount=this.componentDidMount.bind(this);
      // this.componentWillMount=this.componentWillMount.bind(this);
      
    }


    handleChangeTitle(event) {
      this.setState({newTitle: event.target.value});
    }

    handleChangeBody(event) {
      this.setState({newNote: event.target.value});
    }

    handleChangeCategory(option) {
      this.setState({noteCat: option.value});
    }

    //used in modal.js
    handleEditMode = () => {
      this.setState({ editMode: true });
    };

    //used in modal.js
    handleSaveNote = (id,newNote) => {
      this.onUpdateNote(id,newNote);
      this.setState({ editMode: false });
    };

    //used in modal.js
    onUpdateNote = (id,newnote,newtitle) => {

       let dataToUpdate = { note_title : newtitle , note_body : newnote }

       this.state.pychannel.then((py) => {

          py.objects.backend.updateNotes(id,dataToUpdate,(pyNotes) => {
              const index = this.state.allNotes.findIndex((note)=>{
                return note.id === id
              });
              
              const { allNotes } = this.state;
              allNotes[index].note_title = newtitle;
              allNotes[index].note_body = newnote;

              // this.state.allNotes[index].note_title = newtitle;
              // this.state.allNotes[index].note_body = newnote;

              this.setState({ 
                editMode: false,
                allNotes: allNotes
              });
          });
      })
      

    };
    handleSubmit(event) {

      event.preventDefault();
      let dataToInsert = {note_title: this.state.newTitle,
                          note_body: this.state.newNote,
                          note_category:this.state.noteCat,
                          color: this.state.chosedColor}

      this.state.pychannel.then((py) => {

          py.objects.backend.addNotes(dataToInsert,(lastInsertedId) => {
              let _new={id:parseInt(lastInsertedId),note_title : this.state.newTitle,note_body:this.state.newNote,color:this.state.chosedColor}
              this.setState({
                allNotes:[_new,...this.state.allNotes],
                newTitle:'',
                newNote:'',
                noteCat:''
              });
          });
      })
    }

    onRemoveNote=(id)=>{

      this.state.pychannel.then((py) => {

        py.objects.backend.deleteNote(id,() => {
          this.setState(state => {
            const allNotes = state.allNotes.filter(item => item.id !== id);
            return {allNotes, };
          })
        })
      })
    }

    chosedColor(c){
      this.setState({chosedColor: c});
    }


    UNSAFE_componentWillMount(){

      this.setState({ pychannel : qWebChannelPromise });
    }
      
    componentDidMount() {

      this.state.pychannel.then((py) => {

          py.objects.backend.getNotes((pyNotes) => {

              this.setState({allNotes:pyNotes, dataIsHere:true})

          });
      })

      if(this.props.match.params.id){
        this.fetchNoteByCategory(this.props.match.params.id);
      }
    }

    componentDidUpdate(prevProps){

      if(this.props.allNotesCat ){
        if(this.props.allNotesCat !== prevProps.allNotesCat){
          this.setState({ allNotes : this.props.allNotesCat});
        }
      }

      if(this.props.match.params.id && this.props.match.params.id !== prevProps.match.params.id){

        this.fetchNoteByCategory(this.props.match.params.id);
      }

    }

    fetchNoteByCategory = (id) => {

      this.state.pychannel.then((py) => {

          let sql = "SELECT * FROM notesColor WHERE note_category="+id+" ORDER BY id DESC";

          py.objects.backend.selectQuery(sql,(pyNotes) => {

              this.setState({ allNotes : pyNotes, dataIsHere:true });

          });
      })
    }

    handleChangeEditedNote = (event) => {
      this.setState({editedNote: event.target.value});
    };

    handleChangeEditedTitle = (event) => {
      this.setState({editedTitle: event.target.value});
    };


    getClickedNote(note){
      this.setState({ clickedNote : note,
                      clickedId:note.id,
                      openModal:true,
                      editedNote:note.note_body,
                      editedTitle:note.note_title
                    });
    }


    handleCloseModal = () => {
      this.setState({ openModal: false,clickedId:null,editMode:false,editedNote:'',editedTitle:'' });
    };


    render() {
    
      let listColors= this.colors.map((color, index) =>
          <span key={index} onClick={() => this.chosedColor(color)} className="fa-stack fa-lg colorCircle" style={style.circleSize}>
                <i className="fa fa-circle-thin fa-stack-2x" style={style.thinStyle}></i>
                <i className="fa fa-circle fa-stack-1x " style={{fontSize:"44px",color:color}}></i>
          </span>
      );

      return (
        <div className="App">
            <NoteForm newTitle={this.state.newTitle} newNote={this.state.newNote}  changeTitle={this.handleChangeTitle} changeBody={this.handleChangeBody}/>
            <br/>
            <InputSelect catList={this.props.catList} valueCat={this.state.noteCat} changeCategory={this.handleChangeCategory}/><br/>
            <div className="colors-ctn">{listColors}</div>
           <center><ButtonSave submitProps={this.handleSubmit}/></center> 
            {/*<button onClick={this.getClickedNote.bind(this)}>kaka</button>*/}
            <Modal onUpdateNote={this.onUpdateNote} 
                    clickedNote={this.state.clickedNote}
                    handleCloseModal={this.handleCloseModal.bind(this)}
                    openModal={this.state.openModal}
                    handleEditMode={this.handleEditMode}
                    editMode={this.state.editMode}
                    editedNote={this.state.editedNote}
                    handleChangeEditedNote={this.handleChangeEditedNote.bind(this)}
                    editedTitle={this.state.editedTitle}
                    handleChangeEditedTitle={this.handleChangeEditedTitle.bind(this)}/>
            {this.state.dataIsHere ? 
             <div className="stickerCtn">
              <StickersMas 
              clickedId={this.state.clickedId}
              getClickedNote={this.getClickedNote.bind(this)}  
              onRemoveNote={this.onRemoveNote.bind(this)} 
              dataIsHere={this.state.dataIsHere} 
              listNote={this.state.allNotes} kaka="Brasil"/></div>
            :<Preloader/> }
            {this.state.allNotes.length === 0 && this.state.dataIsHere ? <center><h2 style={style.h1Style} >List is empty</h2></center>:"" }
        </div>
     );
   }
 }


 const style = {
  spanCirle: {
    border:'1px solid white'
  },
  thinStyle:{
    color:'#d9d9d9'
  },
  circleSize:{
    fontSize:"24px",
    cursor: "pointer"
  },
  h1Style:{
    color:"#FFF"
  }
};


export default Main;
