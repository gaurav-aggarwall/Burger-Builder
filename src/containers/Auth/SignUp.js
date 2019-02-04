import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
 
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import './AuthForm.css';

class SignUp extends Component{
    state = {
        controls:{
            email: {
                elemType: 'input',
                elemConfig: {
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                edited: false
            },
            password: {
                elemType: 'input',
                elemConfig: {
                    type: 'password',
                    placeholder: 'Enter password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                edited: false
            },   
        }
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangeHandler = (event, identifier) => {
        const controlData = {
            ...this.state.controls,
            [identifier]: {
                ...this.state.controls[identifier],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[identifier].validation),
                edited: true
            } 
        };
        this.setState({controls: controlData});
    }

    submitHandler = event => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
    }

    render(){
        const formElem = [];

        for(let key in this.state.controls){
            formElem.push({
                id: key,
                config: this.state.controls[key]
            }); 
        }
        let form = formElem.map(elem => (
            <Input 
                key={elem.id}
                elemType={elem.config.elemType} 
                elemConfig={elem.config.elemConfig} 
                value={elem.config.value}
                valid={elem.config.valid}
                edited={elem.config.edited}
                changed={(event) => this.inputChangeHandler(event, elem.id)}/>     
        ));

        if(this.props.loading)
            form = <Spinner/>

        let errorMsg = null;
        if(this.props.error)
            errorMsg = <p className='Error'>{this.props.error.message}</p>;

        let redirect = null;    
        if(this.props.isAuth){
            redirect = <Redirect to='/' />    
            if(this.props.build)
                redirect = <Redirect to='/checkout' /> 
        }          
        
        return(
            <div className='AuthForm'>
                {errorMsg}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
                {redirect}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,        
        error: state.auth.error,
        isAuth: state.auth.token!=null,
        build: state.burgerBuilder.building        
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, pass) => dispatch(actions.auth(email, pass)) 
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);