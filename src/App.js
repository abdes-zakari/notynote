import React,{ Component } from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import Main from './Components/Main.js';
import SecondePage from './Components/SecondePage.js';
import Category from './Components/Category.js';
import Menu from './Menu.js';
import './App.css';
// import { Redirect } from 'react-router-dom'
import qWebChannelPromise from  './qWebChannelPromise'

class App extends Component {
    constructor(props) {
      super(props);
      this.state={
           activePage:<Main/>,
           categories:[],
           allNotesCat:'',
           new_category:'',
           pychannel:null
      }
      this.routerList=this.routerList.bind(this);
      this.handleNewCategory=this.handleNewCategory.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
      this.onRemoveCategory=this.onRemoveCategory.bind(this);
      this.getNoteByCategory=this.getNoteByCategory.bind(this);
    }
   
    routerList(){
      return(
          <div>
            {/*<Route exact path="/" component={Main} />*/}
            <Route  exact path="/start/:id" render={(props) =>
                 <Main {...props} 
                           catList={this.state.categories}
                           allNotesCat={this.state.allNotesCat}
                 />
              }
            />
            <Route  exact path="/" render={(props) => 
                 <Main {...props} 
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
    }
  
    //add new category
    handleSubmit(event) {
      event.preventDefault();
      this.state.pychannel.then((py) => {
        py.objects.backend.addCategory({category: this.state.new_category},(lastInsertedId) => {
            let _new={id:parseInt(lastInsertedId),category : this.state.new_category}
            this.setState({
              categories:[_new,...this.state.categories],
              new_category:''
            });
        });
      })
    }
    //delete category
    onRemoveCategory(id){
      this.state.pychannel.then((py) => {
          py.objects.backend.deleteCategory(id,() => {
              this.setState(state => {
                const categories = state.categories.filter(item => item.id !== id);
                return {categories, };
              });
          });
      })
    }

    componentDidMount() {
      this.state.pychannel.then((py) => {
        py.objects.backend.getCategories((pyCategories) => {
          this.setState({categories:pyCategories})
        });
      })
    }

    UNSAFE_componentWillMount() {
      this.setState({ pychannel : qWebChannelPromise });
    }

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