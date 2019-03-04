import React, { Component } from 'react';
import { Layout } from 'antd';

const {
    Footer
} = Layout;


class AppFooter extends Component {

    render() {
        return (

            <Footer style={{ textAlign: 'center' }}>
                Cascade ©2019
        </Footer>

        );
    }
}

export default AppFooter;
