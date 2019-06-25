import React,{ Component } from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import {Link,NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/AddBox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import logo from './Components/note3.png';
import CategoryMenu from './Components/CategoryMenu';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:'#383d47'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  link: {
    color:'#f2f2f2',
    textDecoration: 'none'
  },
  iconAssets:{
    color:'#f2f2f2'
  }
});

class Menu extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div  >
        <div className={classes.toolbar} ><img src={logo} className="Mylogo" alt="logo" /></div>
        <Divider />
        <List  >
            <Link to="/"  className={classes.link}>
              <ListItem button  > <ListItemIcon className={classes.iconAssets} ><HomeIcon /> </ListItemIcon> Start</ListItem>
            </Link>
            {/*<Link to="/start/5"  className={classes.link}>
              <ListItem button  > <ListItemIcon className={classes.iconAssets} ><HomeIcon /> </ListItemIcon> Cook CAT</ListItem>
            </Link>*/}
            <Link to="/seconde" className={classes.link}>
              <ListItem button  ><ListItemIcon className={classes.iconAssets}><SettingsIcon /> </ListItemIcon>Settings</ListItem>
            </Link>
            <Link to="/cat" className={classes.link}>
              <ListItem  button  ><ListItemIcon className={classes.iconAssets}><AddIcon /> </ListItemIcon>New Category</ListItem>
              </Link>
        </List>
        <Divider />
        <CategoryMenu categories={this.props.catList} getNoteByCategory={this.props.getNoteByCategory}/>
        {/*<List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem className={classes.link}  button key={text}>
              <ListItemIcon className={classes.iconAssets}>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              {text}
            </ListItem>
          ))}
          </List>*/}
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer} >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer  
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer 
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
            {this.props.contentPage}
        </main>
      </div>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Menu);



