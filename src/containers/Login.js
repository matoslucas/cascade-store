import React from 'react';

import {
    Form, Icon, Input, Button,
} from 'antd';

import 'antd/dist/antd.css';
import './Login.css'
import auth from "../utils/Auth";


class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.props.onLogin(values)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>

                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);


class Login extends React.Component {

    constructor(props) {
        super(props)
        // Don't call this.setState() here!
        this.state = {
            isAuthenticated: false,
            isLoading: true,
            showPassword: false,
        }

        this.onLogin = this.onLogin.bind(this)
        this.isAuthenticated = this.isAuthenticated.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.isAuthenticated()
    }

    isAuthenticated() {
        const _self = this

        const promise = auth.isAuthenticated()

        promise.then(user => {
            _self.setState({ isAuthenticated: true, isLoading: false })
            _self.props.history.push("/home");
        }).catch(e => {
            console.log(e)
            _self.setState({ isAuthenticated: false, isLoading: false })
        })

    }


    onLogin(credentials) {

        //console.log(credentials)

        const _self = this
        auth.login(credentials).catch(function (error) {
            // Handle Errors here.
            console.log('onLogin', error)
            //alert(error.message)
            _self.loginOnTrackviaApi(credentials)

        }).then(function (e) {
            console.log(e)

            if (e) {
                _self.props.history.push("/home");
            }

        });


    }

    loginOnTrackviaApi(credentials) {
        const _self = this
        auth.loginApi(credentials).catch(function (error) {
            // Handle Errors here.
            console.log('loginOnTrackviaApi', error)
            alert(error.message)


        }).then(function (e) {
            console.log(e)

            if (e) {
                // create firebase account
                _self.createFirebaseAccount(credentials)
            }

        });
    }

    createFirebaseAccount(credentials) {
        const _self = this
        auth.createFirebaseUser(credentials).catch(function (error) {
            // Handle Errors here.
            console.log('createFirebaseAccount', error)


        }).then(function (e) {
            console.log(e)

            if (e) {

                _self.props.history.push("/home");
            }

        });
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    render() {
        const { isLoading } = this.state
        return (
            <div>
                {
                    isLoading ?
                        null :
                        <div style={{ 
                            marginTop: 30,
                            display:'flex',
                            justifyContent: 'center' }}>
                            <WrappedNormalLoginForm onLogin={this.onLogin} />
                        </div>
                }
            </div>
        );
    }
}

export default Login
