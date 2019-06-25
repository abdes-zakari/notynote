import React,{ Component } from 'react';
// import Papers from './Papers.js';
import NoteForma from './NoteForma.js';
import ButtonSave from './ButtonSave.js';
import Stickers from './Stickers.js';
import StickersMas from './StickersMas.js';
import Preloader from './Preloader.js';
import Modal2 from './Modal2.js';
import '../App.css';
import { blue } from '@material-ui/core/colors';
// import Circa from '@material-ui/icons/FiberManualRecord';
//import InputSelect from './InputSelectMrida.js';
import InputSelect from './InputSelect.js';


// const electron=window.require('electron');
// window.alert('Hola');
// console.log(knex);
if(window.require){
  console.log(window.require);
  console.log('From Electron');

var knexs =window.require('knex')({
	client: 'sqlite3',
	connection: {
     filename: "./data.db"
	},
    useNullAsDefault: true
 });

}else{
  console.log('From Browser');
}


class FirstPage extends Component {
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
           editMode:false, // used in modal2.js
           editedNote:'', // used in modal2.js
           editedTitle:'' // used in modal2.js
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
      //console.log(option.value);
    }
    //used in modal2.js
    handleEditMode = () => {
      this.setState({ editMode: true });
    };
    //used in modal2.js
    handleSaveNote = (id,newNote) => {
      //console.log(id);
      this.onUpdateNote(id,newNote);
      this.setState({ editMode: false });
    };
    //used in modal2.js
    onUpdateNote = (id,newnote,newtitle) => {
       //console.log(id);
       knexs('notesColor').where('id', '=', id).update({ note_title : newtitle , note_body : newnote }).then(()=>{
          //console.log(id);
          const index = this.state.allNotes.findIndex((note)=>{
            return note.id === id
          });
          //console.log(this.state.allNotes[index]);
          this.state.allNotes[index].note_title = newtitle;
          this.state.allNotes[index].note_body = newnote;
          this.setState({ editMode: false });
          //const editedNote = Object.assign({},this.state.allNotes[index]);
          //editedNote.note_body = newnote;
      });
      

    };
    handleSubmit(event) {
      if(window.require){
        event.preventDefault();
        // let inserted=knexs('notes').insert({note_body: this.state.newNote}, 'id');
        let inserted=knexs('notesColor')
                     .insert({note_title : this.state.newTitle,
                              note_body: this.state.newNote,
                              note_category:this.state.noteCat,
                              color: this.state.chosedColor}
                      , 'id');
        // console.log(inserted);
        inserted.then((id)=>{
          let nova={id:parseInt(id),note_title : this.state.newTitle,note_body:this.state.newNote,color:this.state.chosedColor}
          // console.log(this.state.newNote);
          this.setState({
            allNotes:[nova,...this.state.allNotes],
            newTitle:'',
            newNote:'',
            noteCat:''
          });
          // console.log(this.state.allNotes);
        })
      }
    }

    onRemoveNote=(id)=>{
      // return;
      if(window.require){
      console.log(id+' Removed !!');
      knexs('notesColor').del().where({'id':id}).then((res) => {
        this.setState(state => {
          const allNotes = state.allNotes.filter(item => item.id !== id);
          console.log(allNotes);
          return {allNotes, };
        });
      });
    }
    }
    getColors(){
      //let colors=['#f50057','#f44336','#2196f3','#009688','#673ab7','#e91e63','#ffc107','#4caf50','#4e342e','#006064','#c2185b'];
    }
    chosedColor(c){
           this.setState({chosedColor: c});
          // console.log(event.target.value);
          console.log(c);
    }
    

   
    
    componentDidMount() {
      if(window.require && !this.props.match.params.id){
      // let result=knexs.select('*').from('notesColor');
      let result=knexs.select('*').from('notesColor').orderBy('id','desc');
      result.then((rows)=>{
         // console.log('HOLAA'+rows);
         this.setState({ allNotes : rows, dataIsHere:true });
      })
    }

    if(this.props.match.params.id){

     
      console.log("match");
      console.log(this.props.match.params.id);
      this.fetchNoteByCategory(this.props.match.params.id);
    }
  }
  //componentDidUpdate(){
  //componentWillReceiveProps(nextProps){
    componentDidUpdate(prevProps){
    
    /*
    if(this.props.allNotesCat.length>0){
       console.log('Data is here');
       console.log(this.props.allNotesCat );
    }else{
      console.log('Data empty');
    }*/
    if(this.props.allNotesCat ){
      if(this.props.allNotesCat !== prevProps.allNotesCat){
        console.log('allNotesCat');
        this.setState({ allNotes : this.props.allNotesCat});
      }
       
    }

    if(this.props.match.params.id && this.props.match.params.id !== prevProps.match.params.id){

     
      console.log("match");
      console.log(this.props.match.params.id);
      this.fetchNoteByCategory(this.props.match.params.id);
      
      
    }
    
    //console.log(this.props.allNotesCat );
  }

  fetchNoteByCategory = (id) => {
    if(window.require){
      let result=knexs.select('*').from('notesColor').where('note_category',id).orderBy('id','desc');
      result.then((rows)=>{
        //console.log(rows);
         this.setState({ allNotes : rows, dataIsHere:true });
      })
    }
  }

  handleChangeEditedNote = (event) => {

    this.setState({editedNote: event.target.value});
  };

  handleChangeEditedTitle = (event) => {

    this.setState({editedTitle: event.target.value});
  };
  

getClickedNote(note){
    // console.log(note)
    this.setState({ clickedNote : note,
                    clickedId:note.id,
                    openModal:true,
                    editedNote:note.note_body,
                    editedTitle:note.note_title
                  });
  }


// handleClickOpen = () => {
  //   this.setState({ open: true });
  //   // this.props.btnModal();
  // }

    handleCloseModal = () => {
    this.setState({ openModal: false,clickedId:null,editMode:false,editedNote:'',editedTitle:'' });
    //{this.handleClickOpen}
  };


   render() {
    
    let listColors= this.colors.map((color, index) =>
        <span key={index} onClick={() => this.chosedColor(color)} className="fa-stack fa-lg colorCircle" style={style.circleSize}>
              <i className="fa fa-circle-thin fa-stack-2x" style={style.thinStyle}></i>
              <i className="fa fa-circle fa-stack-1x " style={{fontSize:"44px",color:color}}></i>
        </span>

    );
      if(this.state.data){
         console.log(this.state.data);
      }
      console.log('node+react');
     return (
       <div className="App">
            <NoteForma newTitle={this.state.newTitle} newNote={this.state.newNote}  changeTitle={this.handleChangeTitle} changeBody={this.handleChangeBody}/>
            <br/>
            <InputSelect catList={this.props.catList} valueCat={this.state.noteCat} changeCategory={this.handleChangeCategory}/><br/>
            {/*<InputSelectMrida/><br/> */}
            <div className="colors-ctn">{listColors}</div>
           <center><ButtonSave submitProps={this.handleSubmit}/></center> 
            {/*<button onClick={this.getClickedNote.bind(this)}>kaka</button>*/}
            <Modal2 onUpdateNote={this.onUpdateNote} 
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
            {this.state.allNotes.length == 0 && this.state.dataIsHere ? <center><h2 style={style.h1Style} >List is empty</h2></center>:"" }

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


export default FirstPage;
