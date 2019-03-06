import React, { Component } from 'react';
import { Layout } from 'antd';
import AppMenu from './AppMenu'
import auth from "../utils/Auth";



const {
    Sider,
} = Layout;


class AppSider extends Component {

    constructor(props) {
        super(props)
        // Don't call this.setState() here!
        this.state = {
            isAuthenticated: false,
            isLoading: false,
            menuMode:"horizontal",
        }

        this.isAuthenticated = this.isAuthenticated.bind(this)
        this.onBreakpointHandler = this.onBreakpointHandler.bind(this)
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

    onBreakpointHandler(broken){
        console.log(broken);
        if(broken){
            this.setState({menuMode:"inline"})
        }else{
            this.setState({menuMode:"horizontal"})
        }
        
    }

    render() {
        const { isAuthenticated, menuMode, isLoading } = this.state
        return (

            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                width="100%"
                onBreakpoint={this.onBreakpointHandler}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}               
            >
                {isAuthenticated ? <AppMenu menuMode={menuMode} /> : null}
            </Sider>

        );
    }
}

export default AppSider;
