import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import './Contact.css';
import axios from '../../../axios';
import withErrorHandler from '../../../hocomponents/ErrorHandler/ErrorHandler';
import * as actions from '../../../store/actions/index';

class Contact extends Component{
    state={
        orderForm: {
            name: {
                elemType: 'input',
                elemConfig: {
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                edited: false
            },
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
            street: {
                elemType: 'input',
                elemConfig: {
                    type: 'text',
                    placeholder: 'Enter your street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                edited: false
            },
            city: {
                elemType: 'input',
                elemConfig: {
                    type: 'text',
                    placeholder: 'Enter your city'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                edited: false
            }
        },
        formValid: false,
        redirect: null
    };

    checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    orderHandler = event =>{
        event.preventDefault();
       
        const formData = {};
        for(let elem in this.state.orderForm){
            formData[elem] = this.state.orderForm[elem].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrder(order, this.props.token);
        this.setState({redirect: <Redirect to='/'/> });
    }

    inputChangeHandler = (event, identifier) => {
        const formData = {...this.state.orderForm};
        const updatedFormData = {...formData[identifier]};
        updatedFormData.value = event.target.value;
        updatedFormData.edited = true;
        updatedFormData.valid = this.checkValidity(updatedFormData.value, updatedFormData.validation);
        formData[identifier] = updatedFormData;
        
        let isFormValid = true;

        for(let input in formData){
            isFormValid = formData[input].valid && isFormValid;      
        }
        this.setState({orderForm: formData, formValid: isFormValid});
    }

    render(){
        const formElem = [];

        for(let key in this.state.orderForm){
            formElem.push({
                id: key,
                config: this.state.orderForm[key]
            }); 
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElem.map( elem => (
                    <Input 
                        key={elem.id}
                        elemType={elem.config.elemType} 
                        elemConfig={elem.config.elemConfig} 
                        value={elem.config.value}
                        valid={elem.config.valid}
                        edited={elem.config.edited}
                        changed={(event) => this.inputChangeHandler(event, elem.id)}/>
                ))}
                <Button btnType='Success' disabled={!this.state.formValid}>ORDER</Button> 
            </form>
        );

        if(this.props.loading){
            form = <Spinner/>;
        }
 
        return(
            <div className='Contact'>
                <h4>Enter your Contact Details:</h4>
                {form}
                {this.state.redirect}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.orders.loading,
        token: state.auth.token,
        userId : state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onOrder: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( Contact, axios)); 