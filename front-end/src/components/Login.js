import React, { Component } from 'react'
import './styleSheet.css'
import {Link} from 'react-router-dom'

const margin = {
        marginTop : '1em'
}


class Login extends Component {
 
    render() {
        return (
            <div className='login-box'>
                <div className='login-head'>
                    LOGIN
                </div>

                <div className='login-form'>
                    <div class="mb-3">
                        <input type="text" class="form-control" id="userName" placeholder="Use Name" />
                    </div>
                    <div class="mb-3"  style={margin}>
                        <input type="text" class="form-control" id="password" placeholder="Password" />
                    </div>
                    
                    <Link to="/dashboard"> <button type="button" class="btn btn-secondary">Submit</button> </Link>
                </div>
            </div>
        )
    }
}

export default Login