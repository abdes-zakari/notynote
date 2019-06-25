import React,{ Component } from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import FirstPage from './Components/FirstPage.js';
import SecondePage from './Components/SecondePage.js';
import Category from './Components/Category.js';
import Menu from './Menu.js';
import './App.css';
import { Redirect } from 'react-router-dom'

var knexs =window.require('knex')({
	client: 'sqlite3',
	connection: {
     filename: "./data.db"
	},
    useNullAsDefault: true
 });



class App extends Component {
   constructor(props) {
      super(props);
      this.state={
           activePage:<FirstPage/>,
           categories:[],
           allNotesCat:'',
           new_category:''
      }
      // this.componentWillMount=this.componentWillMount.bind(this);
      this.routerList=this.routerList.bind(this);
      this.testdiv=this.testdiv.bind(this);
      this.handleNewCategory=this.handleNewCategory.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
      this.onRemoveCategory=this.onRemoveCategory.bind(this);
      this.getNoteByCategory=this.getNoteByCategory.bind(this);
      
    }
   
   routerList(){
    return(
       <div>
          {/*<Route exact path="/" component={FirstPage} />*/}
          <Route  exact path="/start/:id" render={(props) =>
               <FirstPage {...props} 
                         catList={this.state.categories}
                         allNotesCat={this.state.allNotesCat}

               />
            }
          />
          <Route  exact path="/" render={(props) => 
               <FirstPage {...props} 
                         catList={this.state.categories}
                         allNotesCat={this.state.allNotesCat}

               />
            }
          />
          <Route path="/seconde" component={SecondePage} />
         {/*<Route path="/cat" component={Category}  test="Manchesterunited"/>*/}
          <Route path="/cat" render={(props) => 
               <Category {...props} 
                         catList={this.state.categories}
                         handleNewCategory={this.handleNewCategory} 
                         handleSubmit={this.handleSubmit} 
                         onRemoveCategory={this.onRemoveCategory}
                         new_category={this.state.new_category}
               />
            }
          />
          
        </div>
    );
   }

   testdiv(){
      return(
         <div><h2>React</h2></div>
        );
   }

      // später kommentiren
    getNoteByCategory(id_cat){
      /*
        if(window.require){
          // let result=knexs.select('*').from('notesColor');
          let result=knexs.select('*').from('notesColor').where('note_category', id_cat).orderBy('id','desc');
          result.then((rows)=>{
             // console.log('HOLAA'+rows);
             this.setState({ allNotesCat : rows, dataIsHere:true });
          })
        }*/
        //console.log(this.state.allNotesCat);
        //this.props.history.push('/seconde');
      
       // return <Redirect to='/seconde' />
      }

   handleNewCategory(event) {
      this.setState({new_category: event.target.value});
      console.log(this.state.new_category);
    }
  
    //add new category
    handleSubmit(event) {
      if(window.require){
        event.preventDefault();
  
        let inserted=knexs('categories').insert({category : this.state.new_category}, 'id');
        // console.log(inserted);
        inserted.then((id)=>{
          let nova={id:parseInt(id),category : this.state.new_category}
          // console.log(this.state.newNote);
          this.setState({
            categories:[nova,...this.state.categories],
            new_category:''
          });
          // console.log(this.state.allNotes);
        })
      }
    }
    //delete category
    onRemoveCategory(id){
          if(window.require){
            knexs('categories').del().where({'id':id}).then((res) => {
              this.setState(state => {
                const categories = state.categories.filter(item => item.id !== id);
                console.log(categories);
                return {categories, };
              });
            });
          }
    }

   componentDidMount() {
      if(window.require){
      // let result=knexs.select('*').from('notesColor');
      let resultCat=knexs.select('*').from('categories').orderBy('id','desc');
      resultCat.then((rowsCat)=>{
         // console.log('HOLAA'+rows);
         this.setState({ categories : rowsCat });
      })
    }
  }
/*
  componentWillMount() {
    if(window.require){

    let result=knexs.select('*').from('notesColor').orderBy('id','desc');
    result.then((rows)=>{
      // console.log('HOLAA'+rows);
      this.setState({ allNotes : rows });
     
   })
  }
}*/



   render() {
    let routerList=this.routerList();
     return (
      <BrowserRouter>
       <div className="App">
             <Menu contentPage={routerList} getNoteByCategory={this.getNoteByCategory} catList={this.state.categories}/>   
       </div>
       </BrowserRouter>
     );
   }
 }


export default App;