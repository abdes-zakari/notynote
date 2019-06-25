import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputText from './InputText.js';
import ButtonSave from './ButtonSave.js';
import Masonry from 'react-masonry-css'
import '../MasonryStyle.css';


var knexs =window.require('knex')({
	client: 'sqlite3',
	connection: {
     filename: "./data.db"
	},
    useNullAsDefault: true
 });


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
  },
  deleteBtn:{
    float:'right'
  }
});
class Category extends Component {
  constructor(props) {
    super(props);
    this.state={
      new_category:'',
      categories:[]
    }

    //this.handleNewCategory=this.handleNewCategory.bind(this);
    //this.handleSubmit=this.handleSubmit.bind(this);
  }
/*
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
    let result=knexs.select('*').from('categories').orderBy('id','desc');
    result.then((rows)=>{
       // console.log('HOLAA'+rows);
       this.setState({ categories : rows });
    })
  }
}
*/
  render() {
    //console.log(this.props.catList);
   const { classes } = this.props;
   let listCat= this.props.catList.map((cat, index) =>
    <div style={{backgroundColor:'#434956',color:'#F0F0F0',padding:"10px",margin:"10px",textAlign:"center"}} key={index} > 
        {cat.category}
        <span className="delete-category" onClick={() => this.props.onRemoveCategory(cat.id)}> 
          <i className="fa fa-remove" style={{fontSize:'18px',color:'#F0F0F0'}}></i>
        </span>
    </div>
    );

  
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>

        <Grid item xs={2}>
         {/*empty col*/}
        </Grid>
        <Grid item xs={8} sm={8} className={classes.inside}>
          {/*<Paper className={classes.paper}>xs=3</Paper>*/}
          <h2>Edit Categories</h2>
          <div>
            <InputText value={this.props.new_category} onChange={this.props.handleNewCategory} />
            <ButtonSave submitProps={this.props.handleSubmit}/>
            <Masonry
                breakpointCols={3}
                className="my-masonry-grid-cat"
                columnClassName="my-masonry-grid_column-cat">
                {listCat}
              </Masonry>
          </div>
        </Grid>

      </Grid>
    </div>
  );
}
}



export default withStyles(styles)(Category);

