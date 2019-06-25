import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
// import DeleteIcon from '@material-ui/icons/Delete';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
// import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor:'#14A76C',
    '&:hover':{backgroundColor:'#0d724a'}
  },
  
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

// function ButtonSave(props) {
class ButtonSave extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  const { classes } = this.props;
  return (
    <div>
      <Button variant="contained" color="secondary" className={classes.button} onClick={this.props.submitProps} >
      Save
      <SaveIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
      </Button>


      {/*<Button variant="contained" size="small" className={classes.button}>
        <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
        Save
  </Button>*/}
    </div>
  );
}
}

ButtonSave.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonSave);


