import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import auth from "../utils/Auth";

import './style.css';

const drawerWidth = 240;

const styles = theme => ({
    root: {
      display: 'flex',
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
    
  });


class AppHeader extends Component {

    constructor(props) {
        super(props)
        // Don't call this.setState() here!
        this.state = {
            isAuthenticated: false,
            isLoading: false,
        }

        this.isAuthenticated = this.isAuthenticated.bind(this)
        this.onClickHandler = this.onClickHandler.bind(this)
    }

    componentDidMount() {
        this.isAuthenticated()
    }

    isAuthenticated() {
        const _self = this

        const promise = auth.isAuthenticated()

        promise.then(user => {
            _self.setState({ isAuthenticated: true, isLoading: false })
        }).catch(e => {
            _self.setState({ isAuthenticated: false, isLoading: false })
        })

    }

    onClickHandler() {
        this.props.onClick()
    }

    render() {
        const { isAuthenticated, isLoading } = this.state
        const { classes, theme } = this.props;
        return (

            <AppBar position="fixed" className={classes.appBar} color={'secondary'}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={this.onClickHandler}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className="logo" />
                    
                </Toolbar>
            </AppBar>

        );
    }
}

//export default AppHeader;
export default withStyles(styles, { withTheme: true })(AppHeader);
