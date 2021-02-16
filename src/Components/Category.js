import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputText from './InputText.js';
import ButtonSave from './ButtonSave.js';
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
  }

  render() {
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
          <Grid item xs={2}></Grid>
          <Grid item xs={8} sm={8} className={classes.inside}>
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

