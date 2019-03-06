import React from 'react';
import PropTypes from 'prop-types';

import { Router, Route, Switch, } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import withTracker from './com/withTracker';
import ProtectedRoute from './com/ProtectedRoute'

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

import AppHeader from './com/AppHeader'
import AppMenu from './com/AppMenu'

import Login from './containers/Login'


const history = createBrowserHistory()

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
  },
});

class App extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    // console.log(this.state.mobileOpen)
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { mobileOpen } = this.state
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppHeader onClick={this.handleDrawerToggle} />
        <AppMenu mobileOpen={mobileOpen} onClose={this.handleDrawerToggle} className={classes.drawer} />
        <main className={classes.content}>
        <div className={classes.toolbar} />
        <Router history={history}>
          <Switch>
            <Route path="/home" component={ProtectedRoute(withTracker(Login))} />
            <Route path="/" component={withTracker(Login)} />
          </Switch>
        </Router>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  // classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  // theme: PropTypes.object.isRequired,
};

//export default App;
export default withStyles(styles, { withTheme: true })(App);
