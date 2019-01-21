import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import './Contact.css';
import axios from '../../../axios';

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
                    required: true
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
                    required: true
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
        loading: false
    };

    checkValidity = (value, rules) => {
        let isValid = false;
        if(rules.required)
            isValid = value.trim() !== ''
        return isValid
    }

    orderHandler = event =>{
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for(let elem in this.state.orderForm){
            formData[elem] = this.state.orderForm[elem].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }

        axios.post('/orders.json', order)
        .then(res =>{
            this.setState({loading: false});
            this.props.history.push('/');    
        })
        .catch(res =>{
            this.setState({loading: false});
        });

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
        console.log(isFormValid);
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

        if(this.state.loading){
            form = <Spinner/>;
        }
 
        return(
            <div className='Contact'>
                <h4>Enter your Contact Details:</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
};

export default connect(mapStateToProps)(Contact); 