import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import AppFooter from './com/AppFooter'
import AppHeader from './com/AppHeader'

import "antd/dist/antd.css";

import logo from './logo.svg';
import './App.css';

const {
  Content, Sider,
} = Layout;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class App extends Component {

  state = {
    current: 'mail',
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <Layout className="layout">
        <AppHeader />        
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
        </Content>
        <AppFooter />
      </Layout>
    );
  }
}

export default App;
