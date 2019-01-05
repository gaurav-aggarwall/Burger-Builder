import React, { Component } from 'react';
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
                value: ''
            },
            email: {
                elemType: 'input',
                elemConfig: {
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                value: ''
            },
            street: {
                elemType: 'input',
                elemConfig: {
                    type: 'text',
                    placeholder: 'Enter your street'
                },
                value: ''
            },
            city: {
                elemType: 'input',
                elemConfig: {
                    type: 'text',
                    placeholder: 'Enter your city'
                },
                value: ''
            },
            delivery: {
                elemType: 'select',
                elemConfig: {
                    options: [
                        {value: 'fast', display: 'Fast'},
                        {value: 'free', display: 'Free'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    };

    orderHandler = event =>{
        event.preventDefault();
        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:{
                name: 'Test',
                address: {
                    street: 'ABC',
                    city: 'XYZ',
                    zip: 'JKL'
                },
            email: 'test@test.com'    
            }
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
        formData[identifier] = updatedFormData;
        this.setState({orderForm: formData});
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
            <form>
                {formElem.map( elem => (
                    <Input 
                        key={elem.id}
                        elemType={elem.config.elemType} 
                        elemConfig={elem.config.elemConfig} 
                        value={elem.config.value}
                        changed={(event) => this.inputChangeHandler(event, elem.id)}/>
                ))}
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button> 
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

export default Contact; 