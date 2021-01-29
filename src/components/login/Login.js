import React, { Component } from 'react'
import LoginHome from './LoginHome'
import Signup from './Signup'

export default class Login extends Component {
    render() {
        return (
            <div>
                <LoginHome />
                <Signup />
            </div>
        )
    }
}
