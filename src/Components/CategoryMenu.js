import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Masonry from 'react-masonry-css'
import '../MasonryStyle.css';
import {Link} from 'react-router-dom';

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
  },
  catBox:{
    float:'left',
    
    cursor:'pointer',
    color:'#F0F0F0',
    padding:"10px",
    margin:"10px",
    borderRadius: "0.6rem"
  },
  linkStyle:{
   color: "#FFF",
   textDecoration: "none"
  }
});

class CategoryMenu extends Component {
  constructor(props) {
    super(props);
    this.state={
      new_category:'',
      categories:[]
    }
  }

  Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  render() {
    const { classes } = this.props;
    let listCat= this.props.categories.map((cat, index) =>
      <Link to={"/start/"+cat.id} key={cat.id} className={classes.linkStyle}> 
        <div  className={classes.catBox} style={{backgroundColor:'#434956',textAlign:"center"}} key={index} onClick={() => this.props.getNoteByCategory(cat.id)}> 
            {this.Capitalize(cat.category)}
        </div>
      </Link>
    )

    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12}  className={classes.inside}>
            <div>
              <h3 style={{paddingLeft:"10px"}}> Get notes by category</h3>
              <Masonry
                  breakpointCols={1}
                  className="my-masonry-grid-cat"
                  columnClassName="my-masonry-grid_column-cat"
                  >
                  {listCat}
                </Masonry>
            </div>
          </Grid>

        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(CategoryMenu);