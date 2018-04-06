import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes, location, history } = props

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            <Link className="header" to="/">Student Evaluations :{'{'}) </Link>
          </Typography>
          {
            location.pathname.indexOf('teachers') > 0 &&
            <Button color="inherit" onClick={() => history.push('/logout')}>Log out</Button>
          }
          {
            location.pathname.indexOf('login') > 0 &&
            <Button color="inherit" onClick={() => history.push('/signup')}>Sign up</Button>
          }
          {
            location.pathname.indexOf('/') > 0 &&
            <Button color="inherit" onClick={() => history.push('/')}>Home</Button>
          }
          {
            /index$/.test(location.pathname) &&
            <Button color="inherit" onClick={() => history.push('/logout')}>Log out</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ButtonAppBar));
